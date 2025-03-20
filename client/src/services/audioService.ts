import { useEffect, useRef } from 'react';

const audioService = {
    mediaRecorder: null,
    audioChunks: [],
    isRecording: false,

    startRecording: (onDataAvailable) => {
        audioService.audioChunks = [];
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                audioService.mediaRecorder = new MediaRecorder(stream);
                audioService.mediaRecorder.ondataavailable = event => {
                    audioService.audioChunks.push(event.data);
                    if (onDataAvailable) {
                        onDataAvailable(event.data);
                    }
                };
                audioService.mediaRecorder.start();
                audioService.isRecording = true;
            })
            .catch(error => {
                console.error('Error accessing audio devices:', error);
            });
    },

    stopRecording: () => {
        return new Promise((resolve) => {
            if (audioService.mediaRecorder) {
                audioService.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioService.audioChunks, { type: 'audio/wav' });
                    audioService.audioChunks = [];
                    audioService.isRecording = false;
                    resolve(audioBlob);
                };
                audioService.mediaRecorder.stop();
            }
        });
    },

    isRecording: () => {
        return audioService.isRecording;
    }
};

export default audioService;