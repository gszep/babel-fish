import { Router } from "express";
import { SpeechController } from "../controllers/speechController";
import TranslationController from "../controllers/translationController";
import { Express } from "express";

const router = Router();
const speechController = new SpeechController();
// TranslationController is already an instance, don't use 'new'

router.post(
	"/speech-to-text",
	speechController.handleSpeechRecognition.bind(speechController)
);
router.post(
	"/translate",
	TranslationController.translate.bind(TranslationController)
);

export default function setApiRoutes(app: Express): void {
	app.use("/api", router);
}
