import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { changeLanguage } = useContext(LanguageContext);

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>Hindi</button>
    </div>
  );
};

export default LanguageSwitcher;