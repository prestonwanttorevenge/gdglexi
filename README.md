# GDGLexi — Landing Page Khóa Học IELTS & VSTEP

Landing Page giới thiệu **GDGLexi** — chương trình đào tạo và luyện thi chứng chỉ tiếng Anh **IELTS** & **VSTEP** lớp nhỏ, được tài trợ và trực thuộc **Google Developer Groups on Campus - DUT** tại Trường Đại học Bách Khoa - Đại học Đà Nẵng (54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng). Dự án được xây dựng bằng **HTML5 + CSS3 + Vanilla JS (ES6+ Modules)**.

## 1. Công nghệ & Kiến trúc

- **HTML Partials tách theo nội dung (`src/partials/`):** Mỗi phần (Header, Hero Bento, Courses, Methodology, Testimonials, FAQ, Contact, Footer, Overlays) nằm trong một file HTML riêng và được nạp động qua `src/js/core/partialLoader.js`.
- **CSS3 Phân tầng (`src/styles/`):** Chia nhỏ theo `tokens.css`, `base.css`, `layout.css`, `components.css`, nạp qua `main.css` với `@layer`, bảng màu `oklch()` (Light/Dark Mode), hairline borders và Bento Grid.
- **Vanilla JavaScript (ES6+ Modules):** Tách rõ `core/` (storage, dom, partialLoader) và `modules/` (theme, navbar, courses, wishlist, faq, contactForm, toast).
- **Mock Data tập trung:** Dữ liệu nằm tại `src/data/mockData.js`.

## 2. Danh sách 6/6 Tính năng Trọng tâm

1. **Quản lý Điều hướng & Hiệu ứng Cuộn (`src/js/modules/navbar.js`):** Đổi style Navbar khi cuộn `> 50px` (`backdrop-filter: blur`, thu gọn chiều cao) kèm hàm cleanup listener và Mobile Drawer Menu.
2. **Bộ lọc Tab & Tìm kiếm Danh mục (`src/js/modules/courses.js`):** Lọc theo tab (*Tất cả*, *IELTS*, *VSTEP*, *Cấp tốc*, *Nền tảng*) và ô tìm kiếm debounced 200ms, cập nhật `aria-live="polite"`.
3. **Modal Chi tiết & Drawers (`src/js/modules/courses.js`, `navbar.js`, `wishlist.js`):** Khóa cuộn nền (`overflow: hidden`), đóng bằng phím `Esc` hoặc click Backdrop, khôi phục focus.
4. **Accordion FAQ (`src/js/modules/faq.js`):** Cơ chế mở duy nhất 1 câu tại một thời điểm (single-open).
5. **Form Liên hệ & Tư vấn (`src/js/modules/contactForm.js`):** Validate trực tiếp họ tên, email, SĐT; giả lập gửi bất đồng bộ `setTimeout` 1,5 giây có spinner + khóa nút chống spam; hiện Toast và reset form.
6. **Đồng bộ Cục bộ với `localStorage` (`src/js/core/storage.js`):** Lưu và khôi phục Light/Dark Mode và Wishlist sau khi tải lại trang.

## 3. Cấu trúc thư mục

```text
├── index.html
├── README.md
└── src/
    ├── data/
    │   └── mockData.js
    ├── partials/
    │   ├── header.html
    │   ├── hero.html
    │   ├── courses.html
    │   ├── methodology.html
    │   ├── testimonials.html
    │   ├── faq.html
    │   ├── contact.html
    │   ├── footer.html
    │   └── overlays.html
    ├── styles/
    │   ├── tokens.css
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── main.css
    └── js/
        ├── core/
        │   ├── dom.js
        │   ├── partialLoader.js
        │   └── storage.js
        ├── modules/
        │   ├── contactForm.js
        │   ├── courses.js
        │   ├── faq.js
        │   ├── navbar.js
        │   ├── theme.js
        │   ├── toast.js
        │   └── wishlist.js
        └── main.js
```

## 4. Hướng dẫn chạy & Triển khai (Deploy)

Vì dự án sử dụng **ES6 Modules** và **HTML Partials (`fetch`)**, hãy chạy qua máy chủ tĩnh cục bộ (tránh mở trực tiếp bằng `file://` do CORS):

- **VS Code Live Server:** Chuột phải vào `index.html` → chọn **Open with Live Server**.
- **Node.js:** `npx serve .`
- **Deploy (GitHub Pages / Vercel / Netlify):** Trỏ trực tiếp thư mục gốc (không cần build command).
