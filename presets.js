const { combineRgb } = require('@companion-module/base')

/**
 * PRESETS
 */
function getPresets() {
	const presets = {}
	presets[`TextHeader`] = {
		category: 'Controls and Feedbacks',
		name: 'Actions',
		type: 'text',
		text: 'Control media playback',
	}
	presets[`Pause`] = {
		type: 'button', // This must be 'button' for now
		category: 'Controls and Feedbacks', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
		name: `Pause`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: '⏯', // You can use variables from your module here
			size: '60',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
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
		feedbacks: [
			{
				feedbackId: 'mediaState',
				options: {
					state: 'playing',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 200, 0),
				},
			},
			{
				feedbackId: 'mediaState',
				options: {
					state: 'paused',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 255, 0),
				},
			},
		], // You can add some presets from your module here
	}

	presets[`Stop`] = {
		type: 'button', // This must be 'button' for now
		category: 'Controls and Feedbacks', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
		name: `Stop`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: `⏹`, // You can use variables from your module here
			size: '60',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
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
		feedbacks: [
			{
				feedbackId: 'mediaState',
				options: {
					state: 'stopped',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		], // You can add some presets from your module here
	}

	presets[`Prev`] = {
		type: 'button', // This must be 'button' for now
		category: 'Controls and Feedbacks', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
		name: `Prev`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: `⏮`, // You can use variables from your module here
			size: '60',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
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
		category: 'Controls and Feedbacks', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
		name: `Next`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: `⏭`, // You can use variables from your module here
			size: '60',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
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
	presets[`TextHeader2`] = {
		category: 'Controls and Feedbacks',
		name: 'Feedbacks Playback',
		type: 'text',
		text: 'Checkbox "PlayInfo" in easyVideo settings must be enabled!\nUpdated depending on the adjustable push rate.',
	}
	presets[`MediaState`] = {
		type: 'button', // This must be 'button' for now
		category: 'Controls and Feedbacks', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
		name: `MediaState`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: '', // You can use variables from your module here
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaState',
				options: {
					state: 'playing',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(255, 255, 255),
					bgcolor: combineRgb(0, 200, 0),
				},
			},
			{
				feedbackId: 'mediaState',
				options: {
					state: 'paused',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 255, 0),
				},
			},
			{
				feedbackId: 'mediaState',
				options: {
					state: 'stopped',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
			{
				feedbackId: 'mediaState',
				options: {
					state: 'notReady',
				},
				style: {
					// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(128, 128, 128),
				},
			},
		], // You can add some presets from your module here
	}
	presets[`playback_mediaDuration`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Media duration`,
		style: {
			text: `Duration:\n$(easyVideo:playback_clipDurationFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	}

	presets[`mediaPosition`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Playhead position`,
		style: {
			text: `Position:\n$(easyVideo:playback_clipTimeFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaProgressBar',
				options: {
					type: 'countUp',
				},
			},
		],
	}

	presets[`mediaRemaining`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Time remaining`,
		style: {
			text: `Remain:\n$(easyVideo:playback_clipRemainFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'center:top',
		},
		steps: [],
		feedbacks: [
			{
				feedbackId: 'mediaProgressBar',
				options: {
					type: 'countDown',
				},
			},
		],
	}
	presets[`playback_clipLoopFormatted`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Clip Looping`,
		style: {
			text: `$(easyVideo:playback_clipLoopFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	}
	presets[`playback_clipId`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Current Clip ID`,
		style: {
			text: `Clip ID:\n$(easyVideo:playback_clipId)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	}
	presets[`TextHeader3`] = {
		category: 'Controls and Feedbacks',
		name: 'Feedbacks File',
		type: 'text',
		text: 'Checkbox "FileInfo" in easyVideo settings must be enabled!\nUpdates once whenever the clip changes or runs in a loop.',
	}
	presets[`current_mediaDuration`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Media duration`,
		style: {
			text: `Duration:\n$(easyVideo:current_clipDurationFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	}
	presets[`fileName`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Clip Name`,
		style: {
			text: `Clip Name:\n$(easyVideo:current_clipName)`,
			size: '10',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'left:top',
		},
		steps: [],
		feedbacks: [],
	}
	presets[`filePath`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Clip Path`,
		style: {
			text: `Clip Path:\n$(easyVideo:current_clipPath)`,
			size: '10',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			alignment: 'left:top',
		},
		steps: [],
		feedbacks: [],
	}
	presets[`current_clipLoopFormatted`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Clip Looping`,
		style: {
			text: `$(easyVideo:current_clipLoopFormatted)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
	}

	presets[`current_clipId`] = {
		type: 'button',
		category: 'Controls and Feedbacks',
		name: `Current Clip ID`,
		style: {
			text: `Clip ID:\n$(easyVideo:current_clipId)`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [],
		feedbacks: [],
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
			bgcolor: combineRgb(0, 51, 204),
		},
		steps: [
			{
				down: [
					{
						// add an action on down press
						actionId: 'overlay',
						options: {
							overlay: '2',
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
			bgcolor: combineRgb(0, 51, 204),
		},
		steps: [
			{
				down: [
					{
						// add an action on down press
						actionId: 'overlay',
						options: {
							overlay: '1',
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
		name: `Toggle`, // A name for the preset. Shown to the user when they hover over it
		style: {
			// This is the minimal set of style properties you must define
			text: `PiP\nToggle`, // You can use variables from your module here
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 51, 204),
		},
		steps: [
			{
				down: [
					{
						// add an action on down press
						actionId: 'overlay',
						options: {
							overlay: '3',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [], // You can add some presets from your module here
	}

	// Generate presets for videos 0-99
	for (let i = 0; i <= 99; i++) {
		presets[`play_${i}`] = {
			type: 'button',
			category: 'Video',
			name: `Play Video ${i}`,
			style: {
				text: 'Play\nVIDEO ' + i,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(72, 72, 72),
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
			feedbacks: [
				{
					feedbackId: 'clipState',
					options: {
						clipId: i,
						state: 'playing',
					},
					style: {
						// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
						color: combineRgb(255, 255, 255),
						bgcolor: combineRgb(0, 200, 0),
					},
				},
				{
					feedbackId: 'clipState',
					options: {
						clipId: i,
						state: 'paused',
					},
					style: {
						// The style property is only valid for 'boolean' feedbacks, and defines the style change it will have.
						color: combineRgb(0, 0, 0),
						bgcolor: combineRgb(255, 255, 0),
					},
				},
			],
		}

		presets[`cue_${i}`] = {
			type: 'button',
			category: 'Cue Video',
			name: `Cue Video ${i}`,
			style: {
				text: 'Cue\nVIDEO ' + i,
				size: '18',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(128, 0, 255),
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

	return presets
}

module.exports = {
	getPresets,
}
