

WebToon - Nền tảng đọc truyện trực tuyến
=========================================

Mục tiêu
--------
WebToon là nền tảng đọc và chia sẻ truyện trực tuyến, được xây dựng với mục đích học tập fullstack development. Dự án tập trung vào CRUD truyện, quản lý chapters, đọc truyện, tương tác xã hội (follow, vote, comment), và quản lý reading lists. Frontend sử dụng React với React Router và Bootstrap, Backend dùng Node.js Express kết nối MySQL. Hình ảnh được lưu trữ trên Cloudinary.

Tính năng chính
---------------
**Xác thực & Người dùng**
- Đăng ký và đăng nhập với JWT authentication
- Quản lý profile với avatar và background banner
- Phân quyền: Admin, Author, Reader
- Theo dõi tác giả yêu thích

**Quản lý truyện**
- Tạo, chỉnh sửa, xóa truyện với cover image
- Gắn tags và phân loại theo thể loại
- Quản lý chapters với thứ tự tùy chỉnh
- Publish/Unpublish chapters
- Rich text editor cho nội dung

**Đọc truyện**
- Giao diện đọc tối ưu, responsive
- Lưu vị trí đọc tự động (Continue Reading)
- Reading history và progress tracking
- Reading lists (công khai/riêng tư)

**Tương tác xã hội**
- Vote chapters yêu thích
- Comment và reply theo thread
- Review và đánh giá truyện (1-5 sao)
- Follow stories để nhận thông báo

**Tìm kiếm & Khám phá**
- Tìm kiếm theo tiêu đề, mô tả, tags
- Lọc theo thể loại, độ dài, thời gian cập nhật
- Browse genres với thumbnail grid
- Latest stories và trending section

Công nghệ sử dụng
-----------------
**Frontend**
- React 19.2.0
- React Router 7.9.4
- React Bootstrap 2.10.10
- Axios cho API calls
- Tailwind CSS 4.1.14

**Backend**
- Node.js 18+ với Express 4.18
- MySQL 8.0 (thay vì SQL Server)
- JWT authentication (jsonwebtoken)
- bcryptjs cho password hashing
- multer cho file upload
- Swagger UI cho API documentation

**Database**
- MySQL 8.0 với utf8mb4 encoding
- Hỗ trợ đầy đủ Unicode (tiếng Việt)

**Media Storage**
- Cloudinary cho images (cover, avatar, banner)
- Database chỉ lưu URL

**DevOps**
- Docker & Docker Compose
- Hot-reload cho development
- Seed data script (JavaScript)

Cấu trúc dự án
--------------
```
webtoon/
├── backend/
│   ├── src/
│   │   ├── modules/          # Feature modules
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── stories/
│   │   │   ├── chapters/
│   │   │   ├── comments/
│   │   │   ├── votes/
│   │   │   ├── follows/
│   │   │   ├── reviews/
│   │   │   └── upload/
│   │   ├── mw/              # Middleware
│   │   ├── docs/            # Swagger docs
│   │   ├── app.js
│   │   └── db.js
│   ├── database/
│   │   ├── createdb.sql
│   │   └── seed.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── docker-compose.yml
├── .env
└── README.md
```

Yêu cầu hệ thống
----------------
- Node.js 18+ (LTS)
- Docker & Docker Compose
- Tài khoản Cloudinary (optional, cho upload ảnh)

Khởi chạy nhanh với Docker
---------------------------
**1. Clone repository và cấu hình**
```bash
git clone <repository-url>
cd webtoon
```

**2. Chạy tất cả services với Docker Compose**
```bash
docker-compose up -d --build
```

Services sẽ chạy tại:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Documentation: http://localhost:4000/docs
- MySQL: localhost:3307

**3. Seed dữ liệu mẫu**
```bash
docker exec webtoon-backend node database/seed.js
```

**4. Tài khoản mẫu**
- Admin: `admin@webtoon.com` / `password123`
- Author: `kim@webtoon.com` / `password123`
- Reader: `john@example.com` / `password123`

Cấu hình môi trường
-------------------
File `.env` trong root directory:
```env
# Database
DB_ROOT_PASSWORD=rootpassword123
DB_NAME=wattpad
DB_USER=sa
DB_PASSWORD=123
DB_PORT=3307

# Backend
NODE_ENV=development
BACKEND_PORT=4000
JWT_SECRET=your-secret-key-change-in-production

# Frontend
FRONTEND_PORT=3000
REACT_APP_API_URL=http://localhost:4000

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Development không dùng Docker
------------------------------
**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**MySQL:**
Cần cài MySQL 8.0 local và chạy:
```bash
mysql -u root -p < backend/database/createdb.sql
node backend/database/seed.js
```

Luồng xác thực
--------------
- Đăng ký qua đường dẫn POST /auth/register với username, email, password
- Đăng nhập qua POST /auth/login nhận về access token dạng JWT
- FE đính kèm header Authorization với giá trị Bearer token cho các yêu cầu bảo vệ

Đầu mục API chính
-----------------
Auth
- POST /auth/register
- POST /auth/login

Users và social
- GET /users/:id để lấy profile cơ bản
- POST /social/follow/:userId để theo dõi
- DELETE /social/follow/:userId để bỏ theo dõi

Stories
- GET /stories với tham số q và tag cho tìm kiếm cơ bản
- POST /stories tạo truyện ở trạng thái draft
- POST /stories/:id/publish đổi trạng thái sang published

Chapters
- GET /chapters/by-story/:storyId để liệt kê chương theo thứ tự
- GET /chapters/:id để đọc một chương
- POST /chapters/create để tạo chương mới với order_index và published_at tùy chọn
- POST /chapters/:id/progress để lưu vị trí đọc
- POST /chapters/:id/vote và DELETE /chapters/:id/vote để vote hoặc gỡ vote
- GET /chapters/:id/comments và POST /chapters/:id/comments để lấy và thêm comment

Upload cover
------------
- POST /upload/cover nhận form data với field file
- Backend dùng multer memory storage và đẩy lên Cloudinary
- Phản hồi trả về url để lưu trong bảng stories

Mô hình dữ liệu cốt lõi
-----------------------
- users id username email password_hash avatar_url bio
- stories id author_id title description cover_url status created_at updated_at
- chapters id story_id title body order_index published_at
- tags id name slug
- story_tags story_id tag_id
- comments id chapter_id user_id content parent_id created_at
- votes chapter_id user_id created_at
- follows follower_id following_user_id created_at
- reading_lists id user_id name is_private created_at
- reading_list_items list_id story_id order_index added_at
- reading_progress user_id story_id chapter_id percent updated_at

Quy ước và bảo mật
------------------
- Luôn dùng tham số hóa truy vấn khi thao tác với mssql
- Mật khẩu phải được hash bằng bcrypt với salt rounds bằng 10 trở lên
- JWT đặt thời gian sống hợp lý và lưu trên bộ nhớ FE. Không lưu trong localStorage nếu không cần
- Với ảnh do người dùng tải lên cần kiểm tra loại tệp và kích thước ở tầng backend

Tính năng nâng cao (Roadmap)
-----------------------------
- [ ] Admin dashboard
- [ ] Notification system (realtime)
- [ ] Advanced analytics cho authors
- [ ] Reading statistics và insights
- [ ] Social sharing
- [ ] Mobile app (React Native)
- [ ] Redis caching cho performance
- [ ] Elasticsearch cho full-text search
- [ ] WebSocket cho realtime comments
- [ ] Email notifications
- [ ] Multi-language support

Deploy miễn phí
---------------
**Frontend:** Vercel, Netlify, Cloudflare Pages
**Backend:** Render, Railway, Fly.io
**Database:** Railway MySQL, Aiven
**Media:** Cloudinary (25GB free)

Xem chi tiết hướng dẫn deploy trong file `DEPLOYMENT.md`

Đóng góp
--------
Dự án này được tạo ra cho mục đích học tập. Mọi đóng góp đều được chào đón!

Giấy phép
---------
MIT License - Dùng cho mục đích học tập và phi thương mại