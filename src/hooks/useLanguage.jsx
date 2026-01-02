import React, { createContext, useContext, useState } from 'react';

const translations = {
    tr: {
        clock: 'Saat',
        stopwatch: 'Kronometre',
        timer: 'Sayaç',
        settings: 'Ayarlar',
        about: 'Hakkında',
        language: 'Dil',
        theme: 'Tema',
        wallpaper: 'Arkaplan Değiştir',
    },
    en: {
        clock: 'Clock',
        stopwatch: 'Stopwatch',
        timer: 'Timer',
        settings: 'Settings',
        about: 'About',
        language: 'Language',
        theme: 'Theme',
        wallpaper: 'Change Wallpaper',
    },
    fr: {
        clock: 'Horloge',
        stopwatch: 'Chronomètre',
        timer: 'Minuteur',
        settings: 'Paramètres',
        about: 'À propos',
        language: 'Langue',
        theme: 'Thème',
        wallpaper: 'Changer le fond',
    },
    de: {
        clock: 'Uhr',
        stopwatch: 'Stoppuhr',
        timer: 'Timer',
        settings: 'Einstellungen',
        about: 'Über',
        language: 'Sprache',
        theme: 'Thema',
        wallpaper: 'Hintergrund ändern',
    }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('tr'); // Default to TR as requested implicitly by user language

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, languages: Object.keys(translations) }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
