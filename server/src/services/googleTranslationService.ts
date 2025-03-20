import { Translate } from '@google-cloud/translate/build/src/v2';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

const translateClient = new Translate();

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    try {
        const [translation] = await translateClient.translate(text, targetLanguage);
        return translation;
    } catch (error) {
        console.error('Error translating text:', error);
        throw new Error('Translation failed');
    }
};

export const detectLanguage = async (text: string): Promise<string> => {
    try {
        const [detection] = await translateClient.detect(text);
        return detection.language;
    } catch (error) {
        console.error('Error detecting language:', error);
        throw new Error('Language detection failed');
    }
};