"use client";
import React, { useContext } from "react";
import { FiGlobe } from "react-icons/fi";
import ComboBox from "../ComboBox";
import { LanguageContext } from "@/context/LanguageContext";
import useTranslation from "@/hooks/useTranslation";

const Header = ({ searchQuery, setSearchQuery, onSelect }) => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { localise } = useTranslation();

  return (
    <header className="bg-[#2c1810] text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-serif">{localise("appTitle")}</h1>
          <button
            onClick={() => changeLanguage(language === "hi" ? "en" : "hi")}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <FiGlobe className="w-6 h-6" />
          </button>
        </div>
        <ComboBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCategorySelect={onSelect}
        />
      </div>
    </header>
  );
};

export default Header;