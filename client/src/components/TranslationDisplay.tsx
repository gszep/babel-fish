import React from 'react';

const TranslationDisplay: React.FC<{ translatedText: string }> = ({ translatedText }) => {
    return (
        <div className="translation-display">
            <h2>Translated Text</h2>
            <p>{translatedText}</p>
        </div>
    );
};

export default TranslationDisplay;