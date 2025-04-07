"use client";
import React, { useState, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const EBook = ({ onBack }) => {
    const book = {
        title: "The Great Gatsby",
        pages: [
          "Chapter 1: In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
          "Whenever you feel like criticizing any one, he told me, just remember that all the people in this world haven't had the advantages that you've had.",
          "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that.",
          "In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores."
        ]
      };
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef(null);
  
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [direction, setDirection] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientX);
    };
  
    const handleTouchMove = (e) => {
      setTouchEnd(e.touches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;
  
      if (isLeftSwipe && currentPage < book.pages.length - 1) {
        setDirection(1);
        setCurrentPage(prev => prev + 1);
      }
      if (isRightSwipe && currentPage > 0) {
        setDirection(-1);
        setCurrentPage(prev => prev - 1);
      }
  
      setTouchStart(null);
      setTouchEnd(null);
    };
  
    const nextPage = () => {
      if (currentPage < book.pages.length - 1 && !isAnimating) {
        setDirection(1);
        setCurrentPage(prev => prev + 1);
      }
    };
  
    const prevPage = () => {
      if (currentPage > 0 && !isAnimating) {
        setDirection(-1);
        setCurrentPage(prev => prev - 1);
      }
    };
  
    return (
      <div className="h-screen w-full flex flex-col bg-[#f8f4e8]">
        <header className="bg-[#2c1810] text-white p-4 shadow-lg flex items-center">
          <button onClick={onBack} className="mr-4">
            <FiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-serif">{book.title}</h1>
        </header>
  
        <div className="flex-1 flex items-center justify-center p-4">
          <button
            onClick={prevPage}
            className="hidden md:block p-4 text-[#2c1810] hover:text-[#5a3d30] transition-colors"
            disabled={currentPage === 0}
          >
            <FiArrowLeft className="w-6 h-6" />
          </button>
  
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              ref={containerRef}
              className="flex-1 max-w-2xl bg-white p-8 md:p-12 shadow-2xl rounded-lg min-h-[60vh] flex flex-col"
              style={{
                backgroundImage: "linear-gradient(to right, #f8f4e8 2px, transparent 1px)",
                backgroundSize: "30px 100%"
              }}
              initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
              transition={{ duration: 0.3 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex-1">
                <p className="text-lg md:text-xl font-serif leading-relaxed text-[#2c1810]">
                  {book.pages[currentPage]}
                </p>
              </div>
              <div className="text-center mt-8 text-[#2c1810] font-serif">
                Page {currentPage + 1} of {book.pages.length}
              </div>
            </motion.div>
          </AnimatePresence>
  
          <button
            onClick={nextPage}
            className="hidden md:block p-4 text-[#2c1810] hover:text-[#5a3d30] transition-colors"
            disabled={currentPage === book.pages.length - 1}
          >
            <FiArrowRight className="w-6 h-6" />
          </button>
        </div>
  
        <div className="md:hidden text-center p-4 text-[#2c1810] text-sm">
          Swipe left or right to navigate between pages
        </div>
      </div>
    );
  };

  export default EBook