import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const useTranslation = () => {
  const { language } = useContext(LanguageContext);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const res = await fetch(`/locales/${language}/common.json`);
        const data = await res.json();
        setTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    };
    loadTranslations();
  }, [language]);

  const localise = (key) => translations[key] || key;

  return { localise };
};

export default useTranslation;