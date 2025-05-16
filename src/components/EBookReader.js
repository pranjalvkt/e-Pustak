"use client";
import React, { useRef, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function EBookReader({ onBack, book }) {
  if (!book) {
    return <></>;
  }

  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="h-full w-full flex flex-col page-bg">
      <header className="bg-[#2c1810] text-white p-4 shadow-lg flex items-center fixed w-full">
        <button onClick={onBack} className="mr-4">
          <FiArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-serif">{book.title}</h1>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 my-10">
        <div
          ref={containerRef}
          className={`flex-1 max-w-2xl bg-white p-8 md:p-12 shadow-2xl rounded-lg min-h-[60vh] flex flex-col transition-transform duration-300`}
          style={{
            backgroundImage:
              "linear-gradient(to right, #f8f4e8 2px, transparent 1px)",
            backgroundSize: "30px 100%",
          }}
        >
          <div className="flex-1">
            <p
              className="text-lg text-center md:text-xl font-serif leading-relaxed text-[#2c1810]"
              dangerouslySetInnerHTML={{ __html: book.pages }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
