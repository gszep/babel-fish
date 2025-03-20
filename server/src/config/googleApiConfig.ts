import { config } from 'dotenv';

config();

const googleApiConfig = {
    speechToText: {
        apiKey: process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY,
        endpoint: 'https://speech.googleapis.com/v1/speech:recognize',
    },
    translation: {
        apiKey: process.env.GOOGLE_TRANSLATION_API_KEY,
        endpoint: 'https://translation.googleapis.com/language/translate/v2',
    },
};

export default googleApiConfig;