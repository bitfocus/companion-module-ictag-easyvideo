const { InstanceBase, Regex, runEntrypoint, InstanceStatus, combineRgb } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const OSC = require('osc')
const { getPresets } = require('./presets')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')

class easyVideoInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.updateStatus('connecting')
		this.osc_server_init()

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
		this.updateStatus(InstanceStatus.Ok)
		this.setPresetDefinitions(getPresets())
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
		this.osc.close()
		this.log('debug', 'osc closed')
		delete this.osc
		this.log('debug', 'this.osc deleted')
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
		// Recreate OSC server if remote host/port or local port (infoPort) / feedback setting changed
		const desiredLocalPort = this.config.feedbackEnabled && this.config.infoPort ? this.config.infoPort : '0'
		if (
			this.config.port != this.osc.options.remotePort ||
			this.config.host != this.osc.options.remoteAddress ||
			desiredLocalPort != this.osc.options.localPort
		) {
			this.log('debug', 'host or port configuration changed - reloading osc server')
			this.osc_server_init()
		}
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Remote IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Remote Port',
				width: 4,
				regex: Regex.PORT,
				tooltip: 'Default Port is 1366',
			},
			{
				type: 'checkbox',
				id: 'feedbackEnabled',
				label: 'Enable Feedback',
				width: 10,
			},
			{
				type: 'textinput',
				id: 'infoPort',
				label: 'Info Port',
				isVisibleExpression: '$(options:feedbackEnabled) == true',
				width: 4,
				regex: Regex.PORT,
				tooltip: 'Default Port is 4334',
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}
	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}

	/**
	 * Initialisation method for the OSC server used to send and receive messages
	 */
	osc_server_init() {
		this.updateStatus('connecting')
		var self = this
		this.log('debug', 'osc_server_init method started')
		if (this.osc) {
			try {
				this.osc.close()
				delete this.osc
			} catch (e) {
				// Ignore
			}
		}
		/**
		 * Create an osc.js UDP Port listening on port defined in config.
		 * */
		const localPort = this.config.feedbackEnabled && this.config.infoPort ? this.config.infoPort : '0'

		this.osc = new OSC.UDPPort({
			localAddress: '0.0.0.0',
			remoteAddress: this.config.host,
			localPort: localPort,
			remotePort: this.config.port,
			broadcast: true,
			metadata: true,
		})

		/**
		 * Listener to receive messages
		 */
		this.osc.on('message', (oscMsg, timeTag, info) => {
			this.log('debug', `Received OSC message from: ${JSON.stringify(info)}`)

			const address = oscMsg.address
			const args = oscMsg.args || []

			this.log('debug', `OSC Content is: ${JSON.stringify(oscMsg)}`)

			// Only update variables if feedback is enabled in config
			if (!this.config || !this.config.feedbackEnabled) {
				return
			}

			// Helper to format seconds to H:MM:SS or M:SS
			const formatSeconds = (sec) => {
				// If no usable value provided, return placeholder
				if (sec === null || sec === undefined || sec === '') return '--:--'
				const n = Number(sec)
				if (Number.isNaN(n)) return '--:--'
				const sign = n < 0 ? '-' : ''
				let s = Math.abs(Math.floor(n))
				const hours = Math.floor(s / 3600)
				const minutes = Math.floor((s % 3600) / 60)
				const seconds = s % 60
				if (hours > 0) {
					// H:MM:SS (hours no padding)
					return `${sign}${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
				}
				// MM:SS (minutes padded to 2 digits)
				return `${sign}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
			}

			// Helper to format playState to human readable
			const formatPlayState = (ps) => {
				if (ps === null || ps === undefined || ps === '') return 'not ready'
				// numeric codes
				if (typeof ps === 'number') {
					switch (ps) {
						case 1:
							return 'playing'
						case 2:
							return 'paused'
						case 0:
							return 'stopped'
						default:
							return 'not ready'
					}
				}
				// string values
				if (typeof ps === 'string') {
					const s = ps.toLowerCase()
					if (s.includes('play')) return 'playing'
					if (s.includes('pause')) return 'paused'
					if (s.includes('stop')) return 'stopped'
					return 'not ready'
				}
				return 'not ready'
			}

			try {
				if (address === '/ict_ev/info/playback') {
					// ifffii -> clipId, clipTime, clipDuration, clipRemain, clipLoop, playState
					const clipId = args[0]?.value ?? null
					const clipTime = args[1]?.value ?? null
					const clipDuration = args[2]?.value ?? null
					const clipRemain = args[3]?.value ?? null
					const clipLoop = args[4]?.value ?? null
					const playState = args[5]?.value ?? null

					const values = {
						playback_clipId: clipId,
						playback_clipTime: clipTime,
						playback_clipDuration: clipDuration,
						playback_clipRemain: clipRemain,
						playback_clipTimeFormatted: formatSeconds(clipTime),
						playback_clipDurationFormatted: formatSeconds(clipDuration),
						playback_clipRemainFormatted: formatSeconds(clipRemain),
						playback_clipLoop: clipLoop,
						playback_clipLoopFormatted: clipLoop === 1 ? 'Looping' : clipLoop === 0 ? 'Not Looping' : 'unknown',
						playback_playState: playState,
						playback_playStateFormatted: formatPlayState(playState),
					}
					this.updateFeedbacks()
					if (typeof this.setVariableValues === 'function') {
						this.setVariableValues(values)
					} else if (typeof this.setVariable === 'function') {
						Object.entries(values).forEach(([k, v]) => this.setVariable(k, v))
					} else {
						this.log('debug', `Variable update: ${JSON.stringify(values)}`)
					}
				} else if (address === '/ict_ev/info/currentFile') {
					// issfi -> clipId, clipName, clipPath, clipDuration, clipLoop
					const clipId = args[0]?.value ?? null
					const clipName = args[1]?.value ?? ''
					const clipPath = args[2]?.value ?? ''
					const clipDuration = args[3]?.value ?? null
					const clipLoop = args[4]?.value ?? null

					const values = {
						current_clipId: clipId,
						current_clipName: clipName,
						current_clipPath: clipPath,
						current_clipDuration: clipDuration,
						current_clipDurationFormatted: formatSeconds(clipDuration),
						current_clipLoop: clipLoop,
						current_clipLoopFormatted: clipLoop === 1 ? 'Looping' : clipLoop === 0 ? 'Not Looping' : 'unknown',
					}

					if (typeof this.setVariableValues === 'function') {
						this.setVariableValues(values)
					} else if (typeof this.setVariable === 'function') {
						Object.entries(values).forEach(([k, v]) => this.setVariable(k, v))
					} else {
						this.log('debug', `Variable update: ${JSON.stringify(values)}`)
					}
				}
			} catch (e) {
				this.log('error', `Error handling OSC message ${address}: ${e.message}`)
			}
		})

		/**
		 * Properly logging error
		 */
		this.osc.on('error', (err) => {
			this.log('error', 'Error: ' + err.message)
			this.updateStatus('UnknownError', err.message)
		})

		// Open the socket.
		this.osc.open()

		this.log('debug', `osc_server_init method finished ${this.osc}`)
		this.updateStatus(InstanceStatus.Ok)
	}
}

runEntrypoint(easyVideoInstance, UpgradeScripts)
