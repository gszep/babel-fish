import { AudioContext } from "standardized-audio-context";

export const processAudioStream = async (
	stream: MediaStream
): Promise<AudioBuffer> => {
	const audioContext = new AudioContext();
	const mediaStreamSource = audioContext.createMediaStreamSource(stream);
	const analyser = audioContext.createAnalyser();

	mediaStreamSource.connect(analyser);

	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	analyser.getByteFrequencyData(dataArray);

	// Convert Uint8Array to Float32Array (required by copyToChannel)
	const floatArray = new Float32Array(bufferLength);
	for (let i = 0; i < bufferLength; i++) {
		// Normalize values from [0,255] to [-1.0,1.0]
		floatArray[i] = dataArray[i] / 128.0 - 1.0;
	}

	const audioBuffer = audioContext.createBuffer(
		1,
		bufferLength,
		audioContext.sampleRate
	);
	audioBuffer.copyToChannel(floatArray, 0);

	return audioBuffer;
};

export const convertAudioToWav = (audioBuffer: AudioBuffer): Blob => {
	const wavData = audioBufferToWav(audioBuffer);
	return new Blob([new Uint8Array(wavData)], { type: "audio/wav" });
};

const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
	const numChannels = buffer.numberOfChannels;
	const sampleRate = buffer.sampleRate;
	const format = 1; // PCM
	const bitDepth = 16;

	const byteRate = (sampleRate * numChannels * bitDepth) / 8;
	const blockAlign = (numChannels * bitDepth) / 8;

	const bufferLength = buffer.length * numChannels * (bitDepth / 8);
	const wavBuffer = new ArrayBuffer(44 + bufferLength);
	const view = new DataView(wavBuffer);

	// RIFF identifier
	writeString(view, 0, "RIFF");
	// file length minus RIFF identifier length and file description length
	view.setUint32(4, 36 + bufferLength, true);
	// RIFF type
	writeString(view, 8, "WAVE");
	// format chunk identifier
	writeString(view, 12, "fmt ");
	// format chunk length
	view.setUint32(16, 16, true);
	// sample format (raw)
	view.setUint16(20, format, true);
	// channel count
	view.setUint16(22, numChannels, true);
	// sample rate
	view.setUint32(24, sampleRate, true);
	// byte rate (sample rate * block align)
	view.setUint32(28, byteRate, true);
	// block align (channel count * bytes per sample)
	view.setUint16(32, blockAlign, true);
	// bits per sample
	view.setUint16(34, bitDepth, true);
	// data chunk identifier
	writeString(view, 36, "data");
	// data chunk length
	view.setUint32(40, bufferLength, true);

	for (let channel = 0; channel < numChannels; channel++) {
		const channelData = buffer.getChannelData(channel);
		for (let i = 0; i < channelData.length; i++) {
			view.setInt16(
				44 + (channel * buffer.length + i) * 2,
				channelData[i] * 0x7fff,
				true
			);
		}
	}

	return wavBuffer;
};

const writeString = (view: DataView, offset: number, string: string): void => {
	for (let i = 0; i < string.length; i++) {
		view.setUint8(offset + i, string.charCodeAt(i));
	}
};
