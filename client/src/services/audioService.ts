import { useEffect, useRef } from "react";

interface AudioService {
	mediaRecorder: MediaRecorder | null;
	audioChunks: Blob[];
	isRecording: boolean;
	startRecording: (onDataAvailable: (data: Blob) => void) => void;
	stopRecording: () => Promise<Blob>;
	checkIsRecording: () => boolean;
}

const audioService: AudioService = {
	mediaRecorder: null,
	audioChunks: [],
	isRecording: false,

	startRecording: (onDataAvailable: (data: Blob) => void) => {
		audioService.audioChunks = [];
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				audioService.mediaRecorder = new MediaRecorder(stream);
				if (audioService.mediaRecorder) {
					audioService.mediaRecorder.ondataavailable = (
						event: BlobEvent
					) => {
						audioService.audioChunks.push(event.data);
						if (onDataAvailable) {
							onDataAvailable(event.data);
						}
					};
					audioService.mediaRecorder.start();
					audioService.isRecording = true;
				}
			})
			.catch((error) => {
				console.error("Error accessing audio devices:", error);
			});
	},

	stopRecording: () => {
		return new Promise<Blob>((resolve) => {
			if (audioService.mediaRecorder) {
				audioService.mediaRecorder.onstop = () => {
					const audioBlob = new Blob(audioService.audioChunks, {
						type: "audio/wav",
					});
					audioService.audioChunks = [];
					audioService.isRecording = false;
					resolve(audioBlob);
				};
				audioService.mediaRecorder.stop();
			} else {
				resolve(new Blob([])); // Return empty blob if no recorder
			}
		});
	},

	checkIsRecording: () => {
		return audioService.isRecording;
	},
};

export default audioService;
