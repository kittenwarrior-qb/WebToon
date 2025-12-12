const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'wattpad',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4'
};

async function seed() {
  const conn = await mysql.createConnection(config);
  
  console.log('Connected to MySQL');
  
  // Clear data
  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  await conn.query('TRUNCATE TABLE review_likes');
  await conn.query('TRUNCATE TABLE story_reviews');
  await conn.query('TRUNCATE TABLE votes');
  await conn.query('TRUNCATE TABLE story_comments');
  await conn.query('TRUNCATE TABLE story_tags');
  await conn.query('TRUNCATE TABLE tags');
  await conn.query('TRUNCATE TABLE favorite_list_items');
  await conn.query('TRUNCATE TABLE favorite_lists');
  await conn.query('TRUNCATE TABLE story_reads');
  await conn.query('TRUNCATE TABLE followed_stories');
  await conn.query('TRUNCATE TABLE follows');
  await conn.query('TRUNCATE TABLE reading_history');
  await conn.query('TRUNCATE TABLE chapters');
  await conn.query('TRUNCATE TABLE stories');
  await conn.query('TRUNCATE TABLE users');
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');
  
  console.log('Cleared existing data');
  
  // Insert Users
  await conn.query(`
    INSERT INTO users (username, email, password_hash, role, bio, avatar_url) VALUES
    ('admin', 'admin@webtoon.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'admin', 'Administrator account', 'https://i.pravatar.cc/150?img=1'),
    ('author_kim', 'kim@webtoon.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'author', 'Tác giả truyện tranh chuyên nghiệp', 'https://i.pravatar.cc/150?img=2'),
    ('author_lee', 'lee@webtoon.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'author', 'Yêu thích viết truyện fantasy', 'https://i.pravatar.cc/150?img=3'),
    ('author_park', 'park@webtoon.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'author', 'Chuyên viết romance và drama', 'https://i.pravatar.cc/150?img=4'),
    ('reader_john', 'john@example.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'reader', 'Đọc giả cuồng nhiệt', 'https://i.pravatar.cc/150?img=5'),
    ('reader_jane', 'jane@example.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'reader', 'Thích đọc truyện hành động', 'https://i.pravatar.cc/150?img=6'),
    ('reader_mike', 'mike@example.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'reader', 'Fan của truyện kinh dị', 'https://i.pravatar.cc/150?img=7'),
    ('reader_sarah', 'sarah@example.com', '$2a$10$rZ5qH8qF5qH8qF5qH8qF5.N5qH8qF5qH8qF5qH8qF5qH8qF5qH8qF', 'reader', 'Yêu thích romance', 'https://i.pravatar.cc/150?img=8')
  `);

  console.log('Inserted users');
  
  // Insert Tags
  await conn.query(`
    INSERT INTO tags (name, usage_count) VALUES
    ('Action', 15), ('Romance', 20), ('Fantasy', 18), ('Drama', 12), ('Comedy', 10),
    ('Horror', 8), ('Mystery', 7), ('Sci-Fi', 6), ('Slice of Life', 9), ('Adventure', 14)
  `);
  
  console.log('Inserted tags');
  
  // Insert Stories
  const stories = [
    [2, 'Tower of God', 'Câu chuyện về một cậu bé tên Bam leo lên tòa tháp bí ẩn để tìm kiếm người bạn duy nhất của mình. Mỗi tầng là một thử thách mới với những kẻ thù nguy hiểm.', 'https://picsum.photos/seed/tower/400/600', 'published', '["Action", "Fantasy", "Adventure"]'],
    [2, 'The God of High School', 'Giải đấu võ thuật quy tụ các cao thủ từ khắp nơi. Người chiến thắng sẽ được ban cho bất kỳ điều ước nào họ muốn.', 'https://picsum.photos/seed/god/400/600', 'published', '["Action", "Comedy", "Adventure"]'],
    [3, 'Solo Leveling', 'Trong thế giới nơi con người có thể trở thành thợ săn, Sung Jin-Woo là thợ săn yếu nhất. Nhưng sau một던전 chết chóc, anh nhận được sức mạnh để level up không giới hạn.', 'https://picsum.photos/seed/solo/400/600', 'published', '["Action", "Fantasy", "Adventure"]'],
    [3, 'Noblesse', 'Cadis Etrama Di Raizel thức dậy sau 820 năm ngủ và phải thích nghi với thế giới hiện đại trong khi bảo vệ những người bạn mới.', 'https://picsum.photos/seed/noble/400/600', 'published', '["Action", "Fantasy", "Drama"]'],
    [4, 'True Beauty', 'Lim Ju-kyung là một cô gái bình thường, nhưng với kỹ năng trang điểm tuyệt vời, cô trở thành nữ thần tại trường mới. Liệu bí mật của cô có được giữ kín?', 'https://picsum.photos/seed/beauty/400/600', 'published', '["Romance", "Comedy", "Drama"]'],
    [4, 'Cheese in the Trap', 'Hong Seol là sinh viên năm ba phải đối mặt với Yoo Jung, một senior hoàn hảo nhưng đầy bí ẩn. Mối quan hệ phức tạp giữa họ dần được hé lộ.', 'https://picsum.photos/seed/cheese/400/600', 'published', '["Romance", "Drama", "Mystery"]'],
    [2, 'Sweet Home', 'Sau khi gia đình qua đời, Cha Hyun-soo chuyển đến chung cư cũ. Đột nhiên, con người bắt đầu biến thành quái vật dựa trên ham muốn của họ.', 'https://picsum.photos/seed/sweet/400/600', 'published', '["Horror", "Action", "Drama"]'],
    [3, 'The Breaker', 'Shi-Woon Yi là học sinh bị bắt nạt cho đến khi gặp Han Chun-Woo, một cao thủ võ thuật. Cuộc sống của cậu thay đổi hoàn toàn khi bước vào thế giới Murim.', 'https://picsum.photos/seed/breaker/400/600', 'published', '["Action", "Drama", "Adventure"]'],
    [4, 'Lore Olympus', 'Phiên bản hiện đại của thần thoại Hy Lạp, kể về mối tình giữa Persephone và Hades trong thế giới của các vị thần.', 'https://picsum.photos/seed/lore/400/600', 'published', '["Romance", "Fantasy", "Drama"]'],
    [2, 'Unordinary', 'Trong thế giới nơi mọi người đều có siêu năng lực, John dường như là người duy nhất không có. Nhưng sự thật phức tạp hơn nhiều.', 'https://picsum.photos/seed/unord/400/600', 'published', '["Action", "Drama", "Mystery"]']
  ];
  
  for (const story of stories) {
    await conn.query('INSERT INTO stories (user_id, title, description, cover_url, status, tags) VALUES (?, ?, ?, ?, ?, ?)', story);
  }
  
  console.log('Inserted stories');

  // Insert Chapters
  const chapters = [
    [1, 'Chương 1: Bam và Rachel', 'Bam sống trong bóng tối suốt đời cho đến khi gặp Rachel. Cô là ánh sáng duy nhất trong cuộc đời cậu. Nhưng một ngày nọ, Rachel quyết định rời bỏ cậu để leo lên Tòa Tháp. Bam không thể chấp nhận điều này và quyết định đuổi theo cô...', 1, 1],
    [1, 'Chương 2: Thử thách đầu tiên', 'Bam bước vào Tòa Tháp và gặp Headon, người giám hộ tầng đầu tiên. Thử thách đầu tiên là đánh bại con Rồng Trắng khổng lồ để lấy quả cầu. Đây là thử thách được thiết kế để loại bỏ những người yếu đuối...', 2, 1],
    [1, 'Chương 3: Yuri Zahard', 'Khi Bam gần như tuyệt vọng, công chúa Yuri Zahard xuất hiện. Cô bị thu hút bởi sự quyết tâm của Bam và quyết định cho cậu mượn Black March, một trong 13 vũ khí huyền thoại...', 3, 1],
    [3, 'Chương 1: Thợ săn yếu nhất', 'Sung Jin-Woo được biết đến là thợ săn yếu nhất của nhân loại. Trong một던전 rank E, anh phải đối mặt với cái chết khi cả nhóm rơi vào bẫy...', 1, 1],
    [3, 'Chương 2: Hệ thống', 'Jin-Woo tỉnh dậy trong bệnh viện và phát hiện ra một cửa sổ màn hình kỳ lạ chỉ mình anh nhìn thấy. Đây là "Hệ thống" cho phép anh level up như trong game...', 2, 1],
    [5, 'Chương 1: Lim Ju-kyung', 'Ju-kyung luôn bị bắt nạt vì ngoại hình. Cô quyết định chuyển trường và thay đổi bản thân bằng kỹ năng trang điểm học từ YouTube...', 1, 1],
    [5, 'Chương 2: Ngày đầu tiên', 'Với gương mặt hoàn hảo sau khi trang điểm, Ju-kyung trở thành tâm điểm chú ý tại trường mới. Mọi người đều nghĩ cô là nữ thần...', 2, 1]
  ];
  
  for (const chapter of chapters) {
    await conn.query('INSERT INTO chapters (story_id, title, content, chapter_order, is_published) VALUES (?, ?, ?, ?, ?)', chapter);
  }
  
  console.log('Inserted chapters');
  
  // Insert story_tags
  const storyTags = [
    [1,1],[1,3],[1,10], [2,1],[2,5],[2,10], [3,1],[3,3],[3,10],
    [4,1],[4,3],[4,4], [5,2],[5,5],[5,4], [6,2],[6,4],[6,7],
    [7,6],[7,1],[7,4], [8,1],[8,4],[8,10], [9,2],[9,3],[9,4], [10,1],[10,4],[10,7]
  ];
  
  for (const [storyId, tagId] of storyTags) {
    await conn.query('INSERT INTO story_tags (story_id, tag_id) VALUES (?, ?)', [storyId, tagId]);
  }
  
  console.log('Inserted story_tags');
  
  await conn.end();
  console.log('✅ Seed completed successfully!');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
