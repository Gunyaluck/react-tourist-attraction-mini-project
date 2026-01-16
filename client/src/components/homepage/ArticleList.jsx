import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../contexts/SearchContext";

export function ArticleList() {
  const { searchText } = useSearch();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const url = searchText.trim()
          ? `http://localhost:4001/trips?keywords=${encodeURIComponent(
              searchText
            )}`
          : `http://localhost:4001/trips`;
        const response = await axios.get(url);
        setArticles(response.data.data || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchText]);

  const truncateDescription = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 lg:py-12">
        <p className="text-gray-500 text-sm lg:text-base">กำลังโหลด...</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 lg:py-12">
        <p className="text-gray-500 text-sm lg:text-base">ไม่พบผลลัพธ์</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-4 space-y-4 lg:max-w-7xl lg:mx-auto lg:px-4 lg:py-8 lg:space-y-6">
      {articles.map((article, index) => (
        <div key={article.eid || index} className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden mb-4 lg:flex-row lg:gap-6 lg:shadow-none lg:mb-20 lg:rounded-none">
          {/* รูปภาพใหญ่ */}
          <div className="w-full h-48 shrink-0 lg:w-96 lg:h-80">
            <img
              src={article.photos?.[0] || ""}
              alt={article.title}
              className="w-full h-full object-cover lg:rounded"
            />
          </div>

          {/* เนื้อหา + รูปภาพเล็ก 3 รูป*/}
          <div className="flex-1 flex flex-col justify-between p-4 min-w-0 gap-3 lg:py-1 lg:px-0 lg:gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-2 leading-tight line-clamp-2 lg:text-lg lg:line-clamp-none">
                {article.title}
              </h2>
              <p className="text-gray-600 text-xs mb-2 leading-relaxed line-clamp-3 lg:text-sm lg:line-clamp-none">
                {truncateDescription(article.description, 100)}
              </p>
              <a
                href={article.url || "#"}
                className="text-blue-500 hover:text-blue-600 text-xs font-medium inline-block mb-2 underline lg:text-sm"
              >
                อ่านต่อ
              </a>
              <div className="flex flex-wrap gap-1.5">
                {article.tags?.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-xs text-gray-500">
                    {tag}
                    {tagIndex < article.tags.length - 1 && ","}
                  </span>
                ))}
              </div>
            </div>

            {/* รูปภาพเล็ก 3 รูป */}
            <div className="shrink-0 flex flex-row gap-2 w-full mt-2 lg:mt-0">
              {article.photos?.slice(1, 4).map((photo, photoIndex) => (
                <div
                  key={photoIndex}
                  className="w-full h-20 rounded overflow-hidden lg:h-full"
                >
                  <img
                    src={photo}
                    alt={`${article.title} - ${photoIndex + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ไอคอน link สีฟ้า (ถ้ามี url) */}
          {article.url && (
            <div className="absolute top-4 right-4 lg:relative lg:top-0 lg:right-0 lg:shrink-0 lg:flex lg:items-start lg:pt-1">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 lg:h-6 lg:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
