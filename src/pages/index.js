"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  FiSearch,
  FiStar,
  FiBook,
  FiGlobe,
  FiThumbsUp,
  FiX,
} from "react-icons/fi";
import Link from "next/link";
import EBookReader from "@/components/EBookReader";
import { LanguageContext } from "@/context/LanguageContext";
import useTranslation from "../hooks/useTranslation";
import categories from "@/utils/categories";
import ComboBox from "@/components/ComboBox";

const App = () => {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState();
  const [favorites, setFavorites] = useState([]);

  const { language, changeLanguage } = useContext(LanguageContext);
  const { localise } = useTranslation();

  useEffect(() => {
    fetch("/json/aartis.json")
      .then((res) => {
        res.json().then((data) => {
          setBooks(data.book);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (item) => {
    if (!favorites.some((fav) => fav.id === item.id)) {
      const newFavorites = [...favorites, item];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      alert(localise("favouriteExist"));
    }
  };

  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== itemId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleCategorySelect = (category) => {
    setView("reader");
    setCurrentBook(category);
  };

  if (view === "reader") {
    return <EBookReader book={currentBook} onBack={() => setView("home")} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f4e8]">
      <header className="bg-[#2c1810] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-serif">{localise("appTitle")}</h1>
            <button
              onClick={() => {
                if (language === "hi") {
                  changeLanguage("en");
                } else {
                  changeLanguage("hi");
                }
              }}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiGlobe className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <ComboBox
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <section className="mb-8" id="favorites">
          <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
            <FiStar className="mr-2" /> {localise("favourite")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites?.map((book) => (
              <div
                key={book.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
              >
                <h3
                  className="font-serif text-lg text-[#2c1810]"
                  onClick={() => {
                    setCurrentBook(book);
                    setView("reader");
                  }}
                >
                  {book.title}
                </h3>
                <FiX
                  className="absolute bottom-5 right-4"
                  onClick={() => removeFromFavorites(book.id)}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8" id="categories">
          <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
            <FiBook className="mr-2" /> {localise("categories")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.en}
                className="px-4 py-2 bg-white rounded-full text-[#2c1810] hover:bg-[#2c1810] hover:text-white transition-colors shadow-sm cursor-pointer"
                href={"category/" + category.id}
              >
                {language === "en" ? category.en : category.hi}
              </Link>
            ))}
          </div>
        </section>

        <section id="all">
          <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
            <FiThumbsUp className="mr-2" /> {localise("recommendations")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books &&
              books?.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
                >
                  <h3
                    className="font-serif text-lg text-[#2c1810]"
                    onClick={() => {
                      setCurrentBook(book);
                      setView("reader");
                    }}
                  >
                    {book.title}
                  </h3>
                  <FiStar
                    className={`absolute bottom-5 right-4 ${
                      favorites.some((fav) => fav.id === book.id)
                        ? "text-yellow-500 fill-current"
                        : "text-gray-500"
                    }`}
                    onClick={() => addToFavorites(book)}
                  />
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
