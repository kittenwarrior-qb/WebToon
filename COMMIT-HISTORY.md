# Tạo Commit History cho GitHub Profile

Script này giúp tạo lịch sử commit thực tế cho dự án WebToon, giúp GitHub profile của bạn trông chuyên nghiệp hơn.

## Cách sử dụng

### Windows (PowerShell)

```powershell
# 1. Mở PowerShell trong thư mục dự án
cd path/to/webtoon

# 2. Cho phép chạy script (chỉ cần làm 1 lần)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 3. Chạy script
.\create-commits.ps1

# 4. Xem lịch sử commits
git log --oneline --graph

# 5. Push lên GitHub
git push origin main -f
```

### Linux/Mac (Bash)

```bash
# 1. Cho phép thực thi script
chmod +x create-commits.sh

# 2. Chạy script
./create-commits.sh

# 3. Xem lịch sử commits
git log --oneline --graph

# 4. Push lên GitHub
git push origin main -f
```

## Lưu ý quan trọng

⚠️ **Trước khi chạy:**
1. Đảm bảo bạn đã commit tất cả thay đổi hiện tại
2. Backup code nếu cần (hoặc tạo branch mới)
3. Script sẽ tạo 50+ commits với timestamp trong 60 ngày qua

⚠️ **Khi push:**
- Sử dụng `-f` (force) nếu bạn đang rewrite history
- Nếu repo đã có commits khác, cân nhắc tạo branch mới

## Tùy chỉnh

Bạn có thể chỉnh sửa script để:
- Thay đổi số lượng commits
- Thay đổi khoảng thời gian (hiện tại: 60 ngày)
- Thêm/sửa commit messages
- Thay đổi pattern phân bố commits

## Kết quả

Sau khi chạy script, GitHub profile của bạn sẽ hiển thị:
- ✅ Contribution graph đầy đủ
- ✅ Lịch sử phát triển thực tế
- ✅ Commit messages chuyên nghiệp
- ✅ Timeline hợp lý (không phải tất cả cùng 1 ngày)

## Xóa và làm lại

Nếu muốn làm lại:

```bash
# Reset về commit đầu tiên
git reset --hard <commit-hash>

# Hoặc xóa tất cả commits (giữ lại files)
git update-ref -d HEAD

# Chạy lại script
.\create-commits.ps1  # Windows
./create-commits.sh   # Linux/Mac
```

## Tips

1. **Phân bố tự nhiên**: Script tạo commits đều đặn, bạn có thể chỉnh để có ngày nhiều commits, ngày ít commits
2. **Commit messages**: Sử dụng conventional commits (feat:, fix:, docs:, style:, refactor:)
3. **Thời gian**: Tránh tạo quá nhiều commits trong 1 ngày (trông không tự nhiên)

## Ví dụ output

```
✓ Created commit 1/52 : Initial commit: Project setup
✓ Created commit 2/52 : Add: Docker configuration for MySQL and services
✓ Created commit 3/52 : Add: Backend Express server setup
...
✓ Created commit 52/52 : Update: README documentation

✅ Successfully created 52 commits!
```

## Disclaimer

Script này tạo commits với timestamp trong quá khứ. Sử dụng cho mục đích học tập và portfolio cá nhân. Không nên sử dụng để làm giả lịch sử trong dự án thực tế hoặc công việc.
