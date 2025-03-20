import { Request, Response } from "express";
import { recognizeSpeech } from "../services/googleSpeechService";
import { translateText } from "../services/googleTranslationService";

export class SpeechController {
	public async handleSpeechRecognition(
		req: Request,
		res: Response
	): Promise<void> {
		try {
			const audioData = req.body.audio; // Assuming audio data is sent in the request body
			const recognizedText = await recognizeSpeech(audioData);
			res.status(200).json({ recognizedText });
		} catch (error) {
			res.status(500).json({ error: "Error recognizing speech" });
		}
	}

	public async handleTranslation(req: Request, res: Response): Promise<void> {
		try {
			const { text } = req.body; // Assuming text to translate is sent in the request body
			const translatedText = await translateText(text, "en"); // Translate to English
			res.status(200).json({ translatedText });
		} catch (error) {
			res.status(500).json({ error: "Error translating text" });
		}
	}
}
