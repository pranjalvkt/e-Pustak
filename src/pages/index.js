"use client";
import React, { useState, useContext } from "react";
import Header from "@/components/v2/Header";
import FavoritesList from "@/components/v2/FavoritesList";
import BookList from "@/components/v2/BookList";
import EBookReader from "@/components/EBookReader";
import { useBooks } from "@/hooks/useBooks";
import { useFavorites } from "@/hooks/useFavorites";
import useTranslation from "@/hooks/useTranslation";
import { LanguageContext } from "@/context/LanguageContext";
import categories from "@/utils/categories";
import Link from "next/link";
import { FiBook } from "react-icons/fi";

export default function App() {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBook, setCurrentBook] = useState(null);

  const books = useBooks();
  const { favorites, add, remove, exists } = useFavorites();
  const { localise } = useTranslation();
  const { language } = useContext(LanguageContext);

  const readBook = (book) => {
    setCurrentBook(book);
    setView("reader");
  };

  const addToFavorites = (book) => {
    if (!exists(book.id)) {
      add(book);
    } else {
      alert(localise("favouriteExist"));
    }
  };

  if (view === "reader") {
    return <EBookReader book={currentBook} onBack={() => setView("home")} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f4e8]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelect={readBook}
      />
      <main className="max-w-6xl mx-auto p-4">
        <FavoritesList
          favorites={favorites}
          onRead={readBook}
          onRemove={remove}
          localise={localise}
        />

        <section className="mb-8">
          <h2 className="text-xl font-serif text-[#2c1810] mb-4 flex items-center">
            <FiBook className="mr-2" /> {localise("categories")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="px-4 py-2 bg-white rounded-full text-[#2c1810] hover:bg-[#2c1810] hover:text-white shadow-sm"
              >
                {language === "en" ? category.en : category.hi}
              </Link>
            ))}
          </div>
        </section>

        <BookList
          books={books}
          onRead={readBook}
          onFavorite={addToFavorites}
          favorites={favorites}
          localise={localise}
          remove={remove}
        />
      </main>
      <p className="fixed bottom-0 w-full text-center p-4 bg-white text-gray-500">Crafted with passion ❤️‍🔥👨🏻‍💻 by Pranjal.</p>
    </div>
  );
}
