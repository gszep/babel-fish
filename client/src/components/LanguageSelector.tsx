import React from 'react';

const LanguageSelector: React.FC<{ onLanguageChange: (language: string) => void }> = ({ onLanguageChange }) => {
    const languages = [
        { code: 'ja', name: 'Japanese' },
        { code: 'en', name: 'English' },
        // Add more languages as needed
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onLanguageChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="language-select">Select Language:</label>
            <select id="language-select" onChange={handleChange}>
                {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                        {language.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;