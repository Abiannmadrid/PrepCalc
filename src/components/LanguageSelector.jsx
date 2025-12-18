// LanguageSelector.jsx - Language selection dropdown
export default function LanguageSelector({ language, setLanguage }) {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
      { code: 'pt', name: 'Português' },
      { code: 'de', name: 'Deutsch' },
      { code: 'ja', name: '日本語' },
      { code: 'it', name: 'Italiano' },
      { code: 'zh', name: '中文' },
      { code: 'ko', name: '한국어' },
      { code: 'pl', name: 'Polski' }
    ];
  
    return (
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)} 
        className="bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    );
  }