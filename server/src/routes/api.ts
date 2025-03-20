import { Router } from 'express';
import SpeechController from '../controllers/speechController';
import TranslationController from '../controllers/translationController';

const router = Router();
const speechController = new SpeechController();
const translationController = new TranslationController();

router.post('/speech-to-text', speechController.recognizeSpeech);
router.post('/translate', translationController.translateText);

export default function setApiRoutes(app) {
    app.use('/api', router);
}