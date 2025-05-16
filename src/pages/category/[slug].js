"use client";
import { LanguageContext } from "@/context/LanguageContext";
import useTranslation from "@/hooks/useTranslation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiGlobe,
  FiSearch,
  FiStar,
  FiTarget,
  FiX,
} from "react-icons/fi";
import { getCategoryTextById } from "@/utils/helper";
import Link from "next/link";
import UnderDevelopment from "@/components/UnderDevelopment";
import EBookReader from "@/components/EBookReader";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query;

  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);

  const { language, changeLanguage } = useContext(LanguageContext);
  const { localise } = useTranslation();

  const currentCategory = getCategoryTextById(slug, language);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`/json/${slug}.json`)
      .then((res) => res.json())
      .then((data) => setBooks(data.book || []))
      .catch(console.error);
  }, [slug]);

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

  if (currentBook) {
    return (
      <EBookReader
        book={currentBook}
        onBack={() => setCurrentBook(null)}
      />
    );
  }

  return (
    <>
      <header className="bg-[#2c1810] text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <Link href="/">
              <FiArrowLeft className="w-6 h-6 cursor-pointer" />
            </Link>
            <h1 className="text-2xl font-serif">{localise("appTitle")}</h1>
            <button
              onClick={() =>
                changeLanguage(language === "hi" ? "en" : "hi")
              }
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiGlobe className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={localise("search")}
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-[#f8f4e8]">
        <main className="max-w-6xl mx-auto p-4">
          <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
            <FiTarget className="mr-2" /> {currentCategory}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.length > 0 ? (
              books
                .filter((book) =>
                  book.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((book) => (
                  <div
                    key={book.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
                  >
                    <h3
                      className="font-serif text-lg text-[#2c1810]"
                      onClick={() => setCurrentBook(book)}
                    >
                      {book.title}
                    </h3>
                    <FiX
                      className={`absolute bottom-5 right-4 text-red-500 cursor-pointer ${
                        favorites.some((fav) => fav.id === book.id)
                          ? ""
                          : "hidden"
                      }`}
                      onClick={() => removeFromFavorites(book.id)}
                    />
                    <FiStar
                      className={`absolute bottom-5 right-10 cursor-pointer ${
                        favorites.some((fav) => fav.id === book.id)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-500"
                      }`}
                      onClick={() => addToFavorites(book)}
                    />
                  </div>
                ))
            ) : (
              <UnderDevelopment />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
