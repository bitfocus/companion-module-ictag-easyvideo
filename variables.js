module.exports = function (self) {
	// Define variables that will be updated from OSC info messages
	self.setVariableDefinitions([
		// /ict_ev/info/playback
		{ variableId: 'playback_clipId', name: 'Playback: Clip ID' },
		{ variableId: 'playback_clipTime', name: 'Playback: Clip Time' },
		{ variableId: 'playback_clipDuration', name: 'Playback: Clip Duration' },
		{ variableId: 'playback_clipRemain', name: 'Playback: Clip Remain' },
		{ variableId: 'playback_clipTimeFormatted', name: 'Playback: Clip Time (formatted)' },
		{ variableId: 'playback_clipDurationFormatted', name: 'Playback: Clip Duration (formatted)' },
		{ variableId: 'playback_clipRemainFormatted', name: 'Playback: Clip Remain (formatted)' },
		{ variableId: 'playback_clipLoop', name: 'Playback: Clip Loop' },
		{ variableId: 'playback_clipLoopFormatted', name: 'Playback: Clip Loop (formatted)' },
		{ variableId: 'playback_playState', name: 'Playback: Play State' },
		{ variableId: 'playback_playStateFormatted', name: 'Playback: Play State (formatted)' },

		// /ict_ev/info/currentFile
		{ variableId: 'current_clipId', name: 'Current File: Clip ID' },
		{ variableId: 'current_clipName', name: 'Current File: Clip Name' },
		{ variableId: 'current_clipPath', name: 'Current File: Clip Path' },
		{ variableId: 'current_clipDuration', name: 'Current File: Clip Duration' },
		{ variableId: 'current_clipDurationFormatted', name: 'Current File: Clip Duration (formatted)' },
		{ variableId: 'current_clipLoop', name: 'Current File: Clip Loop' },
		{ variableId: 'current_clipLoopFormatted', name: 'Current File: Clip Loop (formatted)' },
	])

	// Initialize formatted variables with placeholder so UI shows --:-- before any OSC is received
	const _initialFormatted = {
		playback_clipTimeFormatted: '--:--',
		playback_clipDurationFormatted: '--:--',
		playback_clipRemainFormatted: '--:--',
		playback_playStateFormatted: 'not ready',
		current_clipDurationFormatted: '--:--',
	}

	if (typeof self.setVariableValues === 'function') {
		self.setVariableValues(_initialFormatted)
	} else if (typeof self.setVariable === 'function') {
		Object.entries(_initialFormatted).forEach(([k, v]) => {
			self.setVariable(k, v)
		})
	} else {
		self.log && self.log('debug', `Initial variables: ${JSON.stringify(_initialFormatted)}`)
	}
}
