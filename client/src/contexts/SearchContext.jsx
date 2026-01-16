import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");

  const addTagToSearch = (tag) => {
    setSearchText((prev) => {
      // แยกคำที่มีอยู่แล้วเป็น array
      const words = prev
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);

      // ตรวจสอบว่า tag นี้มีอยู่แล้วหรือไม่
      const tagExists = words.some(
        (word) => word.toLowerCase() === tag.toLowerCase()
      );

      // ถ้ามีอยู่แล้ว ไม่ต้องเพิ่ม
      if (tagExists) {
        return prev;
      }

      // ถ้ายังไม่มี ให้เพิ่ม tag ใหม่
      return words.length > 0 ? `${prev} ${tag}` : tag;
    });
  };

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText, addTagToSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  {
    /*เพื่อดึงค่าจากข้อมูลโดยตรงจาก context*/
  }
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
    {
      /*ถ้าไม่มี context จะขึ้น error*/
    }
  }
  return context;
  {
    /*ถ้ามี context จะคืนค่า context ออกมา*/
  }
}
