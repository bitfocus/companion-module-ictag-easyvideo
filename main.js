const { InstanceBase, Regex, runEntrypoint, InstanceStatus, combineRgb } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const OSC = require('osc')
const presets = {}

class easyVideoInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config
		this.updateStatus('connecting')
		this.osc_server_init()

		this.updateActions() // export actions
		this.updateStatus(InstanceStatus.Ok)
		this.setPresetDefinitions(presets)
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
		if (this.config.port != this.osc.options.remotePort || this.config.host != this.osc.remoteAddress) {
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
				tooltip: 'Default Port is 1366'
			},
		]
	}

	updateActions() {
		let path
		let args = []

		this.setActionDefinitions({
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
					const videoId = event.options.videoId;
			
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/play`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [
						{
							type: 'i', // Use 'T' for true, 'F' for false
							value: videoId - 1,
						},
					];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
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
					const videoId = event.options.videoId;
			
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/cue`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [
						{
							type: 'i', // Use 'T' for true, 'F' for false
							value: videoId - 1,
						},
					];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
				},
			},
			pause: {
				name: 'Pause/Play',
				options: [],
				callback: async (event) => {
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/pause`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
				},
			},
			stop: {
				name: 'Stop',
				options: [],
				callback: async (event) => {
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/stop`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
				},
			},
			next: {
				name: 'Next Clip',
				options: [],
				callback: async (event) => {
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/next`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
				},
			},
			prev: {
				name: 'Previous Clip',
				options: [],
				callback: async (event) => {		
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/prev`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
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
					const overlay = event.options.overlay;	
					// Dynamically replace 'X' in the path with the selected client ID
					const path = `/ict_ev/overlay`;
			
					// Set the 'type' based on whether 'isActive' is true or false
					const args = [
						{
							type: 'i', // Use 'T' for true, 'F' for false
							value: overlay - 1,
						},
					];
			
					// Send the OSC message
					this.osc.send({
						address: path,
						args: args,
					});
			
					// Log the message for debugging purposes
					this.log(
						'debug',
						`Sent OSC to ${this.config.host}:${this.config.port} with path: ${path} and args: ${JSON.stringify(args)}`
					);
				},
			},
	})		
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
			this.osc = new OSC.UDPPort({
				localAddress: '0.0.0.0',
				remoteAddress: this.config.host,
				localPort: '0',
				remotePort: this.config.port,
				broadcast: true,
				metadata: true,
			})
	
			/**
			 * Listener to receive messages
			 */
			/* this.osc.on('message', (oscMsg, timeTag, info) => {
				this.log('debug', `Received OSC message from: ${JSON.stringify(info)}`)
	
				const address = oscMsg['address']
				const args = oscMsg['args'][0]
				const value = args['value']
	
				this.log('debug', `OSC Content is: ${JSON.stringify(oscMsg)}`)
			}) */
	
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


/**
* PRESETS
*/


presets[`Pause`] = {
	type: 'button', // This must be 'button' for now
	category: 'Controls', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Pause`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: 'Pause\nPlay', // You can use variables from your module here
		size: '18',
		color: combineRgb(0, 0, 0),
		bgcolor: combineRgb(255,255,0),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'pause',
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}
presets[`Stop`] = {
	type: 'button', // This must be 'button' for now
	category: 'Controls', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Stop`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `Stop`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(255,0,0),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'stop',
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}
presets[`Prev`] = {
	type: 'button', // This must be 'button' for now
	category: 'Controls', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Prev`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `Prev\nClip`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,204,0	),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'prev',
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}

presets[`Next`] = {
	type: 'button', // This must be 'button' for now
	category: 'Controls', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Next`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `Next\nClip`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,204,0	),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'next',
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}
presets[`Overlay_on`] = {
	type: 'button', // This must be 'button' for now
	category: 'Overlay', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `On`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `PiP\nOn`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,51,204),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'overlay',
					options: {
						overlay: '2' 
					},
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}
presets[`Overlay_off`] = {
	type: 'button', // This must be 'button' for now
	category: 'Overlay', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Off`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `PiP\nOff`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,51,204),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'overlay',
					options: {
						overlay: '1' 
					},
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}
presets[`Overlay_toggle`] = {
	type: 'button', // This must be 'button' for now
	category: 'Overlay', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Off`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `PiP\nToggle`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,51,204),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'overlay',
					options: {
						overlay: '3' 
					},
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}

presets[`Overlay_toggle`] = {
	type: 'button', // This must be 'button' for now
	category: 'Overlay', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
	name: `Off`, // A name for the preset. Shown to the user when they hover over it
	style: {
		// This is the minimal set of style properties you must define
		text: `PiP\nToggle`, // You can use variables from your module here
		size: '18',
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(0,51,204),
	},
	steps: [
		{
			down: [
				{
					// add an action on down press
					actionId: 'overlay',
					options: {
						overlay: '3' 
					},
				},
			],
			up: [],
		},
	],
	feedbacks: [], // You can add some presets from your module here
}

for (let i = 1; i <= 99; i++) {
	presets[`play_${i}`] = {
		type: 'button',
		category: 'Video',
		style: {
			text: 'Play\nVIDEO ' + i,
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 153, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'play',
						options: {
							videoId: i,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets[`cue_${i}`] = {
		type: 'button',
		category: 'Cue Video',
		style: {
			text: 'Cue\nVIDEO ' + i,
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(128,0,255),
		},
		steps: [
			{
				down: [
					{
						actionId: 'cue',
						options: {
							videoId: i,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
}