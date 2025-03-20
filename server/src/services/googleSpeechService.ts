import { SpeechClient } from "@google-cloud/speech";
import { Readable } from "stream";
import { Translate } from "@google-cloud/translate/build/src/v2";

// Create speech client
const speechClient = new SpeechClient();
// Create translation client
const translateClient = new Translate();

export const recognizeSpeech = async (audioData: Buffer): Promise<string> => {
	try {
		const request = {
			audio: {
				content: audioData.toString("base64"),
			},
			config: {
				encoding: "LINEAR16",
				sampleRateHertz: 16000,
				languageCode: "ja-JP",
			},
		};

		// Use type assertion to bypass TS error
		const response = (await speechClient.recognize(request as any))[0];

		if (!response.results || response.results.length === 0) {
			return "";
		}

		const transcription = response.results
			.map((result: any) =>
				result.alternatives && result.alternatives[0]
					? result.alternatives[0].transcript || ""
					: ""
			)
			.join("\n");

		console.log(`Transcription: ${transcription}`);
		return transcription;
	} catch (error) {
		console.error("Error during speech recognition:", error);
		throw new Error("Speech recognition failed");
	}
};

export const transcribeAudio = async (audioStream: Readable): Promise<void> => {
	const streamingConfig = {
		config: {
			encoding: "LINEAR16",
			sampleRateHertz: 16000,
			languageCode: "ja-JP",
		},
		interimResults: false,
	};

	// Use type assertion to bypass TS error
	const recognizeStream = speechClient
		.streamingRecognize(streamingConfig as any)
		.on("data", (data: any) => {
			if (
				data.results &&
				data.results[0] &&
				data.results[0].alternatives &&
				data.results[0].alternatives[0]
			) {
				console.log(
					`Transcription: ${data.results[0].alternatives[0].transcript}`
				);
			}
		})
		.on("error", (error) => {
			console.error("Error during transcription:", error);
		});

	audioStream.pipe(recognizeStream);
};

export const translateText = async (
	text: string,
	target = "en"
): Promise<string> => {
	try {
		// Use type assertion for translateClient.translate
		const translation = (await translateClient.translate(text, target))[0];
		return translation;
	} catch (error) {
		console.error("Error translating text:", error);
		throw new Error("Translation failed");
	}
};
