import useTranslation from "@/hooks/useTranslation";
import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
const ComboBox = ({ searchQuery, setSearchQuery, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState(searchQuery);
  const { localise } = useTranslation();
  const comboBoxRef = useRef(null);
  const [allBooks, setallBooks] = useState([]);

  useEffect(() => {
    fetch("/json/aartis.json")
      .then((res) => {
        res.json().then((data) => {
            setallBooks(data.book);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
    if (value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    setInputValue('');
    setSearchQuery('');
    setIsOpen(false);
  };

  useEffect(() => {
    const filtered = allBooks.filter((category) =>
      category.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (comboBoxRef.current && !comboBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={comboBoxRef} className="relative">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        className="w-full py-2 pl-10 pr-4 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
        type="text"
        placeholder={localise("search")}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue.length > 0) setIsOpen(true);
        }}
      />

      {/* Dropdown options */}
      {isOpen && filteredOptions.length > 0 && (
        <div
          className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto mt-1"
          role="listbox"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((category) => (
              <div
                key={category.id}
                className="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg"
                role="option"
                onClick={() => handleCategorySelect(category)}
              >
                <span>{category.name}</span>
              </div>
            ))
          ) : (
            <div className="py-2 px-4 text-gray-500">
              {localise("no_results")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
