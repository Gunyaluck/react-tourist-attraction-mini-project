# เที่ยวไหนดี - Tourist Attraction Search Platform

เว็บแอปพลิเคชันสำหรับค้นหาสถานที่ท่องเที่ยวในประเทศไทย พัฒนาด้วย React และ Express.js

## ✨ ฟีเจอร์หลัก

- 🔍 **ค้นหาสถานที่ท่องเที่ยว** - ค้นหาจากชื่อ, คำอธิบาย, หรือหมวดหมู่
- 💡 **Autocomplete Suggestions** - แสดงคำแนะนำขณะพิมพ์ (แสดงเมื่อพิมพ์ 2 ตัวอักษรขึ้นไป)
- 🏷️ **คลิกหมวดหมู่เพื่อค้นหา** - คลิกที่ tag เพื่อเพิ่มคำค้นหา (ไม่ซ้ำ)
- 📋 **Copy Link** - คัดลอกลิงก์รายละเอียดเพิ่มเติมลงใน Clipboard
- 📱 **Responsive Design** - รองรับทั้ง Mobile และ Desktop
- 👁️ **View More** - แสดง 4 รายการแรก และมีปุ่ม "แสดงเพิ่มเติม" เพื่อดูรายการทั้งหมด

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 18.2** - UI Library
- **Vite 5.4** - Build Tool
- **Tailwind CSS 4.1** - Styling Framework
- **Axios** - HTTP Client
- **React Context API** - State Management

### Backend
- **Express.js** - Web Framework
- **Node.js** - Runtime Environment
- **CORS** - Cross-Origin Resource Sharing

## 📦 การติดตั้ง

### Prerequisites
- Node.js (v16 หรือสูงกว่า)
- npm หรือ yarn

### ติดตั้ง Dependencies

#### Client (Frontend)
```bash
cd client
npm install
```

#### Server (Backend)
```bash
cd server
npm install
```

## 🚀 การรันโปรเจกต์

### รัน Server (Backend)
```bash
cd server
npm start
```
Server จะรันที่ `http://localhost:4001`

### รัน Client (Frontend)
```bash
cd client
npm run dev
```
Client จะรันที่ `http://localhost:5173` (หรือ port อื่นที่ Vite กำหนด)

## 📁 โครงสร้างโปรเจกต์

```
react-tourist-attraction-mini-project/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── homepage/
│   │   │   │   ├── ArticleList.jsx    # แสดงรายการสถานที่ท่องเที่ยว
│   │   │   │   └── SearchBar.jsx      # ช่องค้นหา + Autocomplete
│   │   │   └── layout/
│   │   │       └── header.jsx         # Header component
│   │   ├── contexts/
│   │   │   └── SearchContext.jsx      # Context API สำหรับจัดการ search state
│   │   ├── page/
│   │   │   └── homepage.jsx          # หน้า Homepage
│   │   └── App.jsx
│   └── package.json
├── server/                 # Backend (Express.js)
│   ├── app.js             # Express server
│   ├── db.js              # ข้อมูลสถานที่ท่องเที่ยว
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### GET `/trips`
ค้นหาสถานที่ท่องเที่ยว

**Query Parameters:**
- `keywords` (optional) - คำค้นหา

**Response:**
```json
{
  "data": [
    {
      "eid": "1",
      "title": "คู่มือเที่ยวเกาะช้าง...",
      "description": "...",
      "photos": ["url1", "url2", ...],
      "tags": ["เกาะ", "ทะเล", ...],
      "url": "https://..."
    }
  ]
}
```

**ตัวอย่าง:**
- `GET /trips` - ดึงข้อมูลทั้งหมด
- `GET /trips?keywords=เกาะ` - ค้นหาจากคำว่า "เกาะ"

## 🎨 ฟีเจอร์ที่ใช้งาน

### 1. การค้นหา
- พิมพ์คำค้นหาในช่องค้นหา
- ระบบจะค้นหาจาก title, description, และ tags
- แสดงผลลัพธ์ทันที

### 2. Autocomplete
- แสดงคำแนะนำขณะพิมพ์ (2 ตัวอักษรขึ้นไป)
- ใช้คีย์บอร์ด (Arrow Up/Down, Enter, Escape) เพื่อเลือก
- Highlight คำที่พิมพ์ใน suggestions

### 3. คลิกหมวดหมู่
- คลิกที่ tag เพื่อเพิ่มคำค้นหา
- สามารถคลิกหลาย tag ได้ (จะต่อกันด้วย space)
- ไม่แสดง tag ซ้ำ

### 4. Copy Link
- คลิกปุ่มสีฟ้าเพื่อ copy link
- แสดง feedback เมื่อ copy สำเร็จ

### 5. View More
- แสดง 4 รายการแรก
- คลิก "แสดงเพิ่มเติม" เพื่อดูทั้งหมด
- คลิก "แสดงน้อยลง" เพื่อย่อกลับ

## 📱 Responsive Design

- **Mobile**: Layout แนวตั้ง, Card design, ปุ่มและ text เล็กลง
- **Desktop (lg)**: Layout แนวนอน, รูปภาพใหญ่ขึ้น, spacing เพิ่มขึ้น

## 🔧 Development

### Build สำหรับ Production
```bash
cd client
npm run build
```

### Preview Production Build
```bash
cd client
npm run preview
```

## 📝 License

ISC

## 👨‍💻 Author

react-tourist-attraction-mini-project
