"use client";
import EBookReader from "@/components/EBookReader";
import Header from "@/components/v2/Header";
import React, { useState } from "react";

const About = () => {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentBook, setCurrentBook] = useState(null);
  const readBook = (book) => {
    setCurrentBook(book);
    setView("reader");
  };
  if (view === "reader") {
    return <EBookReader book={currentBook} onBack={() => setView("home")} />;
  }
  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelect={readBook}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">About e-Pustak</h1>

        <p className="text-lg mb-6 leading-relaxed">
          <strong>e-Pustak</strong> is a spiritual and devotional e-library
          designed to bring sacred texts and hymns to your fingertips. Whether
          you're seeking solace, inspiration, or a deeper connection with
          spirituality, E-Pustak offers a curated collection of:
        </p>

        <ul className="list-disc list-inside mb-6 text-lg">
          <li>Aartis</li>
          <li>Bhajans</li>
          <li>Chalisas</li>
          <li>Mantras</li>
          <li>Stotras</li>
          <li>And more...</li>
        </ul>

        <p className="text-lg mb-6 leading-relaxed">
          This platform allows you to:
        </p>

        <ul className="list-disc list-inside mb-6 text-lg">
          <li>
            Browse by Category: Easily navigate through various categories to
            find the content that resonates with you.
          </li>
          <li>
            Search Functionality: Quickly locate specific hymns or texts using
            thr intuitive search feature.
          </li>
          <li>
            Save Favorites: Bookmark your preferred items for quick access
            anytime.
          </li>
          <li>
            Personalized Recommendations: Discover new content tailored to your
            interests.
          </li>
          <li>
            Multi-Language Support: Enjoy content in multiple languages to cater
            to a diverse audience.
          </li>
        </ul>

        <p className="text-lg mb-6 leading-relaxed">
          At e-Pustak, my aim to make spiritual literature accessible and
          convenient, fostering a space for reflection, devotion, and learning.
          Whether you're at home, traveling, or seeking a moment of peace,
          E-Pustak is here to accompany you on your spiritual journey.
        </p>

        <p className="text-lg font-semibold text-center">
          Happy reading! <br />— Pranjal Tripathi
        </p>
      </div>
    </>
  );
};

export default About;
