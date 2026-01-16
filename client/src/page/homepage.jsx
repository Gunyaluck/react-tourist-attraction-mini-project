import { SearchProvider } from "../contexts/SearchContext";
import { Header } from "../components/layout/header";
import { ArticleList } from "../components/homepage/ArticleList";

export function Homepage() {
    return (
        <SearchProvider> {/*ใช้วิธี React Context API เพราะไม่ต้องส่ง props หลายชั้น จึงทำให้การจัดการ state ง่ายขึ้น*/}
            <div className="min-h-screen bg-white lg:bg-white">
                <Header />
                <ArticleList />
            </div>
        </SearchProvider>
    );
}