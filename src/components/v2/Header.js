"use client";
import React, { useContext } from "react";
import { FiArrowLeft, FiGlobe, FiInfo } from "react-icons/fi";
import ComboBox from "../ComboBox";
import { LanguageContext } from "@/context/LanguageContext";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ searchQuery, setSearchQuery, onSelect }) => {
  const { language, changeLanguage } = useContext(LanguageContext);
  const { localise } = useTranslation();
  const router = useRouter();

  return (
    <>
      <header className="bg-[#2c1810] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            {router.asPath !== "/" && (
              <Link href="/">
                <FiArrowLeft className="w-6 h-6 cursor-pointer" />
              </Link>
            )}
            <h1 className="text-2xl font-serif">{localise("appTitle")}</h1>
            <div className="flex">
              <button
                onClick={() => changeLanguage(language === "hi" ? "en" : "hi")}
                className="p-2 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <FiGlobe className="w-6 h-6 mx-2" title="Change Language" />
              </button>
              <Link
                href="/about"
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <FiInfo className="w-6 h-6" title="About" />
              </Link>
            </div>
          </div>
          <ComboBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onCategorySelect={onSelect}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
