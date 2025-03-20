import { Request, Response } from "express";
import { translateText } from "../services/googleTranslationService";

class TranslationController {
	async translate(req: Request, res: Response) {
		const { text } = req.body;

		if (!text) {
			return res
				.status(400)
				.json({ error: "Text is required for translation." });
		}

		try {
			const translatedText = await translateText(text, "en");
			return res.json({ translatedText });
		} catch (error) {
			console.error("Translation error:", error);
			return res.status(500).json({ error: "Failed to translate text." });
		}
	}
}

export default new TranslationController();
