import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchText, setSearchText] = useState("");

    return (
        <SearchContext.Provider value={{ searchText, setSearchText }}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() { {/*เพื่อดึงค่าจากข้อมูลโดยตรงจาก context*/}
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within SearchProvider"); {/*ถ้าไม่มี context จะขึ้น error*/}
    }
    return context; {/*ถ้ามี context จะคืนค่า context ออกมา*/}
}
