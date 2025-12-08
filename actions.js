const { Regex } = require('@companion-module/base')

module.exports = function (self) {
	self.setActionDefinitions({
		play: {
			name: 'Video (with ID)',
			options: [
				{
					type: 'textinput',
					label: 'Video number',
					id: 'videoId',
					default: '1',
					regex: Regex.NUMBER,
					useVariables: true,
				},
			],
			callback: async (event) => {
				const videoId = Number(event.options.videoId)

				const path = `/ict_ev/play`
				const args = [
					{
						type: 'i',
						value: videoId,
					},
				]

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		cue: {
			name: 'Cue Video (with ID)',
			options: [
				{
					type: 'textinput',
					label: 'Video number',
					id: 'videoId',
					default: '1',
					regex: Regex.SIGNED_NUMBER,
					useVariables: true,
				},
			],
			callback: async (event) => {
				const videoId = Number(event.options.videoId)
				const path = `/ict_ev/cue`
				const args = [
					{
						type: 'i',
						value: videoId,
					},
				]

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		pause: {
			name: 'Pause/Play',
			options: [],
			callback: async (event) => {
				const path = `/ict_ev/pause`
				const args = []

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		stop: {
			name: 'Stop',
			options: [],
			callback: async (event) => {
				const path = `/ict_ev/stop`
				const args = []

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		next: {
			name: 'Next Clip',
			options: [],
			callback: async (event) => {
				const path = `/ict_ev/next`
				const args = []

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		prev: {
			name: 'Previous Clip',
			options: [],
			callback: async (event) => {
				const path = `/ict_ev/prev`
				const args = []

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		loadFolder: {
			name: 'Load Media Folder',
			options: [
				{
					type: 'textinput',
					label: 'Folder path',
					id: 'folderPath',
					default: '',
					useVariables: true,
				},
			],
			callback: async (event) => {
				const folderPath = event.options && event.options.folderPath ? event.options.folderPath : ''
				const path = `/ict_ev/loadFolder`
				const args = [
					{
						type: 's',
						value: folderPath,
					},
				]

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},

		overlay: {
			name: 'Overlay',
			options: [
				{
					type: 'dropdown',
					label: 'State',
					id: 'overlay',
					default: '1',
					choices: [
						{ id: '1', label: 'Off' },
						{ id: '2', label: 'On' },
						{ id: '3', label: 'Toggle' },
					],
					minChoicesForSearch: 0,
				},
			],
			callback: async (event) => {
				const overlay = Number(event.options.overlay)
				const path = `/ict_ev/overlay`
				const args = [
					{
						type: 'i',
						value: overlay - 1,
					},
				]

				self.osc.send({
					address: path,
					args: args,
				})

				self.log(
					'debug',
					`Sent OSC to ${self.config.host}:${self.config.port} with path: ${path} and args: ${JSON.stringify(args)}`,
				)
			},
		},
	})
}
