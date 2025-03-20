import { SpeechClient } from '@google-cloud/speech';
import { Readable } from 'stream';
import { google } from 'googleapis';
import { config } from '../config/googleApiConfig';

const speechClient = new SpeechClient();

export const transcribeAudio = async (audioStream: Readable) => {
    const request = {
        config: {
            encoding: 'LINEAR16',
            sampleRateHertz: 16000,
            languageCode: 'ja-JP',
        },
        interimResults: false,
    };

    const recognizeStream = speechClient
        .streamingRecognize(request)
        .on('data', (data) => {
            console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
        })
        .on('error', (error) => {
            console.error('Error during transcription:', error);
        });

    audioStream.pipe(recognizeStream);
};

export const translateText = async (text: string) => {
    const translate = google.translate({
        version: 'v2',
        auth: config.GOOGLE_API_KEY,
    });

    const [translation] = await translate.translations.list({
        q: text,
        target: 'en',
    });

    return translation.translatedText;
};