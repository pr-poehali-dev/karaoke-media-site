-- Insert test songs data
INSERT INTO songs (title, artist, genre, language, duration, image_url, views_count) VALUES
('Bohemian Rhapsody', 'Queen', 'Рок', 'Английский', '5:55', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 15420),
('Миллион алых роз', 'Алла Пугачёва', 'Поп', 'Русский', '4:12', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 8930),
('Lose Yourself', 'Eminem', 'Рэп', 'Английский', '5:26', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 12567),
('Summertime', 'Ella Fitzgerald', 'Джаз', 'Английский', '3:45', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 5234),
('Группа крови', 'Кино', 'Рок', 'Русский', '4:45', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 9876),
('Billie Jean', 'Michael Jackson', 'Поп', 'Английский', '4:54', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 18345),
('Around the World', 'Daft Punk', 'Электро', 'Английский', '7:09', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 6789),
('La Vie en Rose', 'Édith Piaf', 'Классика', 'Французский', '3:30', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 4321),
('Владимирский централ', 'Михаил Круг', 'Блюз', 'Русский', '4:20', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 7654),
('Despacito', 'Luis Fonsi', 'Поп', 'Испанский', '3:47', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 25678),
('Back in Black', 'AC/DC', 'Рок', 'Английский', '4:15', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 11234),
('Smooth Criminal', 'Michael Jackson', 'Поп', 'Английский', '4:17', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 14567),
('Hotel California', 'Eagles', 'Рок', 'Английский', '6:30', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 13890),
('Imagine', 'John Lennon', 'Поп', 'Английский', '3:03', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 16789),
('Кукушка', 'Виктор Цой', 'Рок', 'Русский', '6:14', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 10456),
('Blinding Lights', 'The Weeknd', 'Поп', 'Английский', '3:20', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 22345),
('Shape of You', 'Ed Sheeran', 'Поп', 'Английский', '3:54', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 19876),
('Chandelier', 'Sia', 'Поп', 'Английский', '3:36', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg', 8765);

-- Insert test user
INSERT INTO users (username, email, full_name, avatar_url) VALUES
('demo_user', 'demo@karaoke.com', 'Демо Пользователь', 'https://cdn.poehali.dev/projects/2e4e6cbd-f704-42f3-937c-46d6448ab5d2/files/014b11b9-a5bf-43f4-b395-d7b58231d95e.jpg');