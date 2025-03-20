import React, { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import TranslationDisplay from "./components/TranslationDisplay";
import LanguageSelector from "./components/LanguageSelector";
import { translateText } from "./services/translationService";

const App: React.FC = () => {
	const [translatedText, setTranslatedText] = useState("");
	const [language, setLanguage] = useState("en"); // Default to English

	const handleTranslation = (text: string) => {
		translateText(text, language).then((translation) => {
			setTranslatedText(translation);
		});
	};

	return (
		<div className="App">
			<h1>BABEL 魚</h1>
			<LanguageSelector
				selectedLanguage={language}
				onLanguageChange={setLanguage}
			/>
			<AudioRecorder onAudioCaptured={handleTranslation} />
			<TranslationDisplay translatedText={translatedText} />
		</div>
	);
};

export default App;
