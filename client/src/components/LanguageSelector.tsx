import React from "react";

interface LanguageSelectorProps {
	selectedLanguage: string;
	onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	selectedLanguage,
	onLanguageChange,
}) => {
	const languages = [
		{ code: "ja", name: "Japanese" },
		{ code: "en", name: "English" },
		// Add more languages as needed
	];

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onLanguageChange(event.target.value);
	};

	return (
		<div>
			<label htmlFor="language-select">Select Language:</label>
			<select
				id="language-select"
				onChange={handleChange}
				value={selectedLanguage}
			>
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
