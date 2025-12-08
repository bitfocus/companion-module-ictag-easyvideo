const { combineRgb } = require('@companion-module/base')
const { graphics } = require('companion-module-utils')

module.exports = async function (self) {
	self.setFeedbackDefinitions({
		mediaProgressBar: {
			type: 'advanced',
			name: 'Playhead progress bar',
			description: 'Displays as a bar showing progress through current media clip',
			options: [
				{
					id: 'type',
					type: 'dropdown',
					label: 'Type',
					choices: [
						{ id: 'countUp', label: 'Count up (bar fills from left)' },
						{ id: 'countDown', label: 'Count down (bar shrinks to right)' },
					],
					default: 'countUp',
				},
			],
			callback: (feedback) => {
				let posPercent =
					(self.getVariableValue('playback_clipTime') / self.getVariableValue('playback_clipDuration')) * 100
				let remainingSeconds =
					self.getVariableValue('playback_clipDuration') - self.getVariableValue('playback_clipTime')
				let colors
				let val
				switch (feedback.options.type) {
					case 'countUp':
						colors = [
							{ size: 100, color: combineRgb(0, 200, 0), background: combineRgb(0, 50, 0), backgroundOpacity: 255 },
						]
						val = posPercent
						break
					case 'countDown':
					default:
						colors = [
							{
								size: posPercent,
								color: combineRgb(0, 50, 0),
								background: combineRgb(0, 0, 0),
								backgroundOpacity: 255,
							},
							{
								size: 100 - posPercent,
								color: combineRgb(0, 200, 0),
								background: combineRgb(0, 200, 0),
								backgroundOpacity: 255,
							},
						]
						val = 100
						break
				}
				const options = {
					width: feedback.image.width,
					height: feedback.image.height,
					colors: colors,
					barLength: 62,
					barWidth: 6,
					value: val,
					type: 'horizontal',
					offsetX: 5,
					offsetY: 50,
					opacity: 255,
				}

				let bgcolor = combineRgb(0, 0, 0)
				if (remainingSeconds < 11 && remainingSeconds > 0) {
					bgcolor = combineRgb(255, 0, 0)
				}

				return {
					imageBuffer: graphics.bar(options),
					bgcolor: bgcolor,
				}
			},
		},
		mediaState: {
			name: 'Playback feedback',
			type: 'boolean',
			label: 'Playback state',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'state',
					type: 'dropdown',
					label: 'State',
					choices: [
						{ id: 'playing', label: 'Playing' },
						{ id: 'paused', label: 'Paused' },
						{ id: 'stopped', label: 'Stopped' },
						{ id: 'notReady', label: 'Not ready' },
					],
					default: 'playing',
				},
			],
			callback: (feedback) => {
				if (self.getVariableValue('playback_playStateFormatted') == feedback.options.state) {
					return true
				}
				return false
			},
		},
		clipState: {
			name: 'Clip ID feedback',
			type: 'boolean',
			label: 'Clip ID feedback',
			defaultStyle: {
				bgcolor: combineRgb(0, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [
				{
					id: 'clipId',
					type: 'textinput',
					label: 'Clip ID to match',
					default: '',
				},
				{
					id: 'state',
					type: 'dropdown',
					label: 'Play state filter',
					choices: [
						{ id: 'both', label: 'Playing or Paused' },
						{ id: 'playing', label: 'Playing only' },
						{ id: 'paused', label: 'Paused only' },
					],
					default: 'both',
				},
			],
			callback: (feedback) => {
				const targetRaw = feedback.options && feedback.options.clipId
				const stateFilter = feedback.options && feedback.options.state
				const currentId = self.getVariableValue('playback_clipId')
				const currentState = (self.getVariableValue('playback_playStateFormatted') || '').toLowerCase()
				// Accept numeric 0 as valid target — coerce to string after null/undefined check
				const target = targetRaw === undefined || targetRaw === null ? '' : String(targetRaw).trim()
				if (target === '') {
					return false
				}
				if (String(currentId) !== target) {
					return false
				}
				// State filtering
				switch (stateFilter) {
					case 'playing':
						return currentState === 'playing'
					case 'paused':
						return currentState === 'paused'
					case 'both':
					default:
						return currentState === 'playing' || currentState === 'paused'
				}
			},
		},
	})
}
