import { SearchBar } from "../homepage/SearchBar";

export function Header() {
  return (
    <div className="bg-white flex flex-col items-center pt-6 pb-4 px-4 lg:pt-12 lg:pb-8 lg:px-0">
      <h1 className="text-3xl font-bold text-blue-500 mb-6 lg:text-5xl lg:font-semibold lg:mb-12">
        เที่ยวไหนดี
      </h1>
      <SearchBar />
    </div>
  );
}
