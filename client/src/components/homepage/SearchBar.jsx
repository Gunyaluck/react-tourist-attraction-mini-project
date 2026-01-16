import { useState, useEffect, useRef } from "react";
import { useSearch } from "../../contexts/SearchContext";
import axios from "axios";

export function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { searchText, setSearchText } = useSearch();
  {
    /*SearchContext จะจัดการ state ของ searchText*/
  }
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Sync searchValue กับ searchText จาก context (เมื่อมีการเปลี่ยนแปลงจากภายนอก เช่น คลิก tag)
  useEffect(() => {
    if (searchText !== searchValue) {
      setSearchValue(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  // ดึง suggestions จาก API
  useEffect(() => {
    if (searchValue.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/trips?keywords=${encodeURIComponent(
            searchValue
          )}`
        );
        const trips = response.data.data || [];

        // สร้าง suggestions จาก titles และ tags
        const uniqueSuggestions = new Set();
        const searchLower = searchValue.toLowerCase();

        trips.forEach((trip) => {
          // เพิ่ม tags ที่ตรงกับคำค้นหา
          trip.tags?.forEach((tag) => {
            if (tag.toLowerCase().includes(searchLower)) {
              uniqueSuggestions.add(tag);
            }
          });

          // เพิ่มคำจาก title ที่ตรงกับคำค้นหา
          const titleWords = trip.title.split(/[\s,]+/).filter((word) => {
            const wordLower = word.toLowerCase();
            return wordLower.includes(searchLower) && word.length >= 2;
          });
          titleWords.forEach((word) => {
            if (word.length >= 2 && word.length <= 20) {
              uniqueSuggestions.add(word);
            }
          });
        });

        // เรียงลำดับตามความยาว (คำสั้นก่อน)
        const suggestionsArray = Array.from(uniqueSuggestions)
          .sort((a, b) => a.length - b.length)
          .slice(0, 5);

        setSuggestions(suggestionsArray);
        setShowSuggestions(suggestionsArray.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setSearchText(value);
    setSelectedIndex(-1);
  };

  const handleSelectSuggestion = (suggestion) => {
    {
      /*การเลือก suggestion*/
    }
    setSearchValue(suggestion);
    setSearchText(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    {
      /*การกดปุ่มบนคีย์บอร์ดเมื่อมี suggestions*/
    }
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      {
        /*การกดลง*/
      }
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      {
        /*การกดขึ้น*/
      }
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      {
        /*การกด enter*/
      }
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      {
        /*การกด escape*/
      }
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  // ปิด suggestions เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col gap-2 w-full px-4 lg:flex-row lg:items-center lg:gap-4 lg:max-w-4xl">
      <label
        htmlFor="search"
        className="text-gray-700 font-medium text-sm lg:text-base lg:whitespace-nowrap"
      >
        ค้นหาที่เที่ยว
      </label>
      <div className="relative w-full lg:flex-1">
        <input
          ref={inputRef}
          id="search"
          type="text"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            searchValue.length >= 2 &&
            suggestions.length > 0 &&
            setShowSuggestions(true)
          }
          placeholder="หาที่เที่ยวแล้วไปด้วยกัน ..."
          className="w-full border-b-2 border-gray-300 pb-2 focus:outline-none focus:border-blue-500 placeholder:text-gray-400 text-sm lg:text-base"
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => {
              // Escape special characters สำหรับ regex
              const escapedSearch = searchValue.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              );
              const regex = new RegExp(`(${escapedSearch})`, "gi");
              const parts = suggestion.split(regex);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors ${
                    index === selectedIndex ? "bg-blue-50" : ""
                  }`}
                >
                  <span className="text-gray-700">
                    {parts.map((part, i) =>
                      part.toLowerCase() === searchValue.toLowerCase() ? (
                        <span key={i} className="font-semibold text-blue-600">
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
