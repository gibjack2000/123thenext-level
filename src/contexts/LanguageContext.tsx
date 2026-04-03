import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'en' | 'es';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('site-lang');
      return (saved === 'es' ? 'es' : 'en') as Lang;
    } catch {
      return 'en';
    }
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem('site-lang', newLang); } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
