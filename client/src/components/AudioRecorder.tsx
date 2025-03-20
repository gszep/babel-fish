import React, { useEffect, useRef, useState } from "react";

interface AudioRecorderProps {
	onAudioCaptured?: (text: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioCaptured }) => {
	const [isRecording, setIsRecording] = useState(false);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		mediaRecorderRef.current = new MediaRecorder(stream);

		mediaRecorderRef.current.ondataavailable = (event) => {
			audioChunksRef.current.push(event.data);
		};

		mediaRecorderRef.current.onstop = async () => {
			const audioBlob = new Blob(audioChunksRef.current, {
				type: "audio/wav",
			});
			audioChunksRef.current = [];
			// Here you can send the audioBlob to your server for processing
			if (onAudioCaptured) {
				// Simulate text from audio for this example
				onAudioCaptured("Sample Japanese text from audio");
			}
		};

		mediaRecorderRef.current.start();
		setIsRecording(true);
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
	};

	useEffect(() => {
		return () => {
			if (mediaRecorderRef.current && isRecording) {
				stopRecording();
			}
		};
	}, [isRecording]);

	return (
		<div>
			<button onClick={isRecording ? stopRecording : startRecording}>
				{isRecording ? "Stop Recording" : "Start Recording"}
			</button>
		</div>
	);
};

export default AudioRecorder;
