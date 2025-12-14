

WebToon - App đọc truyện
=========================================

Tính năng chính
---------------
**Xác thực & Người dùng**
- Đăng ký và đăng nhập với JWT authentication
- Phân quyền: Admin, Author, Reader
- Quản lý profile
- Theo dõi tác giả 

**Quản lý truyện**
- Tạo, chỉnh sửa, xóa truyện
- Gắn tags và tìm kiếm phân loại theo thể loại
- Quản lý chapters với thứ tự tùy chỉnh
- Publish/Unpublish chapters

**Đọc truyện**
- Giao diện đọc tối ưu, responsive
- Lưu vị trí đọc tự động (Continue Reading)
- Reading history và progress tracking

**Tương tác xã hội**
- Comment và reply theo từng thread
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
- Axios
- Tailwind CSS 4

**Backend**
- Node.js 18+ với Express 4.18
- MySQL
- Swagger UI

**DevOps**
- Docker & Docker Compose
- Hot-reload cho development
- Seed data

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
DB_NAME=webtoon
DB_USER=user
DB_PASSWORD=123
DB_PORT=3307

# Backend
NODE_ENV=development
BACKEND_PORT=4000
JWT_SECRET=your-secret-key-change-in-production

# Frontend
FRONTEND_PORT=3000
REACT_APP_API_URL=http://localhost:4000

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Đầu mục API chính
-----------------
Auth
- POST /auth/register
- POST /auth/login

Users và social
- GET /users/:id 
- POST /social/follow/:userId
- DELETE /social/follow/:userId

Stories
- GET /stories
- POST /stories
- POST /stories/:id/publish

Chapters
- GET /chapters/by-story/:storyId 
- GET /chapters/:id
- POST /chapters/create 
- POST /chapters/:id/progress 
- POST /chapters/:id/vote và DELETE /chapters/:id/vote
- GET /chapters/:id/comments và POST /chapters/:id/comments 

Đóng góp
--------
Dự án này được tạo ra cho mục đích học tập. Mọi đóng góp đều được chào đón!
