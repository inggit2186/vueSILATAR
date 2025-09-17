# Voice Message Implementation Plan

- [ ] Add data properties for recording (isRecording, mediaRecorder, audioChunks, audioUrl)
- [ ] Add microphone button in template next to emoji and send buttons
- [ ] Implement recordVoice() method: Request microphone permission, start MediaRecorder, collect chunks
- [ ] Implement stopRecording() method: Stop recorder, create blob, convert to base64, prepare for send
- [ ] Modify sendMessage() to handle audio messages (send base64 data with type 'audio')
- [ ] Update message display: Add condition for audio messages with play button
- [ ] Add playAudio() method to play the audio blob
- [ ] Update fetchMessages() to handle audio messages (decode base64 to blob)
- [ ] Add visual feedback: Recording indicator on mic button
- [ ] Handle errors: Microphone permission, browser support
