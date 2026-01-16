import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../contexts/SearchContext";

export function ArticleList() {
  const { searchText, addTagToSearch } = useSearch();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

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
    setShowAll(false); // Reset showAll เมื่อ searchText เปลี่ยน
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

  const displayedArticles = showAll ? articles : articles.slice(0, 4);
  const hasMore = articles.length > 4;

  return (
    <div className="w-full px-4 py-4 space-y-4 lg:max-w-7xl lg:mx-auto lg:px-4 lg:py-8 lg:space-y-6">
      {displayedArticles.map((article, index) => (
        <div
          key={article.eid || index}
          className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden mb-4 lg:flex-row lg:gap-6 lg:shadow-none lg:mb-20 lg:rounded-none"
        >
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
                  <button
                    key={tagIndex}
                    type="button"
                    onClick={() => addTagToSearch(tag)}
                    className="text-xs text-gray-500 hover:text-blue-600 hover:underline cursor-pointer transition-colors"
                  >
                    {tag}
                    {tagIndex < article.tags.length - 1 && ","}
                  </button>
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

          {/* ปุ่ม copy link สีฟ้า (ถ้ามี url) */}
          {article.url && (
            <div className="absolute top-80 right-4 lg:relative lg:top-0 lg:right-0 lg:shrink-0 lg:flex lg:items-start lg:pt-1">
              <button
                type="button"
                onClick={() => {
                  copyToClipboard(article.url);
                  setCopiedIndex(index);
                  setTimeout(() => setCopiedIndex(null), 2000);
                }}
                className="hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 lg:px-4 lg:py-2 lg:text-sm"
                title="Copy link"
              >
                {copiedIndex === index ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 lg:h-5 lg:w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 lg:h-5 lg:w-5"
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
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      ))}

      {/* ปุ่ม View More / Show Less */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="hover:cursor-pointer text-blue-600 px-6 py-2 rounded-lg text-sm font-medium transition-colors underline"
          >
            {showAll ? "แสดงน้อยลง" : "แสดงเพิ่มเติม"}
          </button>
        </div>
      )}
    </div>
  );
}
