// This file exports TypeScript interfaces and types used throughout the server application.

export interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
}

export interface TranslationResult {
    translatedText: string;
    detectedSourceLanguage: string;
}

export interface AudioStream {
    audioData: Buffer;
    format: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}