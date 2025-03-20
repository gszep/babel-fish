import axios from 'axios';

const GOOGLE_TRANSLATION_API_URL = 'https://translation.googleapis.com/language/translate/v2';
const API_KEY = process.env.GOOGLE_API_KEY; // Ensure to set your Google API key in the environment variables

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
    try {
        const response = await axios.post(GOOGLE_TRANSLATION_API_URL, {
            q: text,
            target: targetLanguage,
            key: API_KEY,
        });

        return response.data.data.translations[0].translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        throw new Error('Translation failed');
    }
};