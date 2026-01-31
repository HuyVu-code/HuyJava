-- Tắt kiểm tra khóa ngoại để tránh lỗi khi xóa dữ liệu cũ (quan trọng!)
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa dữ liệu cũ để tránh trùng lặp khi chạy lại
TRUNCATE TABLE order_item;
TRUNCATE TABLE order_details;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

-- --- NẠP DỮ LIỆU MỚI ---

-- 1. Bảng Categories
INSERT INTO categories (id, name) VALUES (1, 'Áo Thun');
INSERT INTO categories (id, name) VALUES (2, 'Quần Jean');
INSERT INTO categories (id, name) VALUES (3, 'Phụ Kiện');

-- 2. Bảng Users (Mật khẩu admin: admin123, Huy: Huy2005-)
INSERT INTO users (id, username, password, full_name, email, phone, role, created_at) VALUES 
(3, 'admin', 'admin123', 'Huy Java Administrator', 'admin@huyjava.com', NULL, 'ADMIN', '2026-01-28 09:10:10'),
(13, 'Huy', 'Huy2005-', '', 'Huy@gmail.com', '0973457533', 'USER', '2026-01-28 12:50:05');

-- 3. Bảng Products (Một số mô tả dài đã được rút gọn để dễ nhìn, nhưng dữ liệu vẫn đầy đủ)
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES 
(1, 'Quần Jean Rách Gối', 350000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZN5SYDa3QQLkg-zvZvzz9Cd9lNCbqg5Q-Tg&s', 'Quần jean phong cách bụi bặm', 2, '2026-01-28 09:09:17', 300000, 'Collection - Travelling'),
(4, 'Áo Măng Tô Dạ Cao Cấp', 1500000, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', 'Chất liệu dạ lông cừu nhập khẩu.', NULL, '2026-01-28 11:27:17', 1000000, 'Khuyến mãi - Sale 50%'),
(5, 'Vest Nam Lịch Lãm', 2200000, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop', 'Thiết kế Slimfit ôm dáng.', NULL, '2026-01-28 11:27:17', 1500000, 'Khuyến mãi - Sale 50%'),
(6, 'Đầm Lụa Velvet Đỏ', 850000, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop', 'Quyến rũ và nổi bật.', NULL, '2026-01-28 11:27:17', 500000, 'Collection - Tết-Chan'),
(7, 'Áo Thun Oversize Đen', 350000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', 'Cotton 100% thoáng mát.', NULL, '2026-01-28 11:27:17', 0, NULL),
(8, 'Quần Jean Slimfit Xanh', 550000, 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop', 'Co giãn 4 chiều thoải mái.', NULL, '2026-01-28 11:27:17', NULL, 'Collection - Travelling'),
(9, 'Áo Polo', 350000, 'https://myo.vn/wp-content/uploads/2023/11/sg-11134201-22120-fb9lzhztj0kve2.jpg', 'cũng đẹp', NULL, '2026-01-28 11:57:19', NULL, NULL),
(10, 'ÁO', 500000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfncwx7LJPJn-E3lhCs3R1w-DjpbTXjYJFQ&s', 'đẹp', NULL, '2026-01-28 20:38:56', 300000, NULL),
(12, 'Áo Sơ Mi Premium Flower Seersucker Shirt - 88695', 530000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Họa tiết hoa văn mùa hè, BigSize upto 140kg.', NULL, '2026-01-29 06:45:59', 50000, 'Collection - Office Style'),
(13, 'Osl Monie Kids Tee - 48012', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trẻ em in chữ Monie, chất cotton mềm mại.', NULL, '2026-01-29 06:45:59', 0, 'Khuyến mãi - Đồng giá 199k'),
(14, 'Osl DUAHAU Kids Tee - 48011', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trẻ em in hình dưa hấu dễ thương.', NULL, '2026-01-29 06:45:59', 0, 'Khuyến mãi - Đồng giá 199k'),
(15, 'Osl Tet Collection Kids Tee - Red', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun đỏ rực rỡ đón Tết, mang lại may mắn cho bé.', NULL, '2026-01-29 06:45:59', 0, 'Collection - Tết-Chan'),
(16, 'Osl Lotus Kids Tee - White', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trắng in hoa sen tinh tế, phong cách truyền thống.', NULL, '2026-01-29 06:45:59', 0, 'Khuyến mãi - Đồng giá 199k'),
(17, 'Áo Sơ Mi Premium Soft Structure Seersucker Shirt - 88694', 530000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo sơ mi BigSize upto 140Kg, chất liệu Seersucker thoáng mát.', NULL, '2026-01-29 06:46:09', 0, 'Collection - Office Style'),
(18, 'Áo Sơ Mi Premium Flower Seersucker Shirt - 88695', 530000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Họa tiết hoa văn mùa hè, BigSize upto 140kg, phong cách lịch lãm.', NULL, '2026-01-29 06:46:09', 0, 'Collection - Office Style'),
(19, 'Osl Monie Kids Tee - 48012', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trẻ em in chữ Monie, chất cotton mềm mại.', NULL, '2026-01-29 06:46:09', 0, 'Khuyến mãi - Đồng giá 199k'),
(20, 'Osl DUAHAU Kids Tee - 48011', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trẻ em in hình dưa hấu dễ thương.', NULL, '2026-01-29 06:46:09', 0, 'Khuyến mãi - Đồng giá 199k'),
(21, 'Osl Tet Collection Kids Tee - Red', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun đỏ rực rỡ đón Tết, mang lại may mắn cho bé.', NULL, '2026-01-29 06:46:09', 0, 'Collection - Tết-Chan'),
(22, 'Osl Lotus Kids Tee - White', 265000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Áo thun trắng in hoa sen tinh tế, phong cách truyền thống.', NULL, '2026-01-29 06:46:09', 0, 'Khuyến mãi - Đồng giá 199k'),
(23, 'Quần Short Kaki Travelling Kem', 199000, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', 'Quần short thoáng mát, thích hợp đi biển, dã ngoại.', NULL, '2026-01-29 08:02:00', 100000, 'Collection - Travelling'),
(24, 'Áo Tee Oversize Summer Vibes', 199000, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', 'Áo thun cotton 100% thấm hút mồ hôi cực tốt.', NULL, '2026-01-29 08:02:00', 90000, 'Áo Nam'),
(25, 'Áo Polo Thể Thao Năng Động', 250000, 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800', 'Phong cách thể thao, lịch sự mà vẫn thoải mái.', NULL, '2026-01-29 08:02:00', 120000, 'Collection - Tết-Chan'),
(26, 'Quần Short Jean Rách Bụi Bặm', 280000, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800', 'Phong cách đường phố, cực ngầu cho chuyến đi.', NULL, '2026-01-29 08:02:00', 150000, 'Collection - Travelling'),
(27, 'Áo Dài Cách Tân Red Lucky', 1200000, 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800', 'Màu đỏ may mắn đón Tết, chất liệu gấm thượng hạng.', NULL, '2026-01-29 08:02:00', 600000, 'Khuyến mãi - Sale 50%'),
(28, 'Áo Sơ Mi Lụa Đỏ Premium', 550000, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800', 'Sơ mi lụa mềm mại, màu đỏ đô sang trọng.', NULL, '2026-01-29 08:02:00', 250000, 'Collection - Office Style'),
(29, 'Bộ Vest Nhung Đỏ Quyền Lực', 2500000, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800', 'Vest nhung cao cấp, nổi bật trong các bữa tiệc cuối năm.', NULL, '2026-01-29 08:02:00', 1200000, 'Khuyến mãi - Sale 50%'),
(30, 'Váy Nhung Red Velvet Quý Phái', 850000, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'Đầm nhung đỏ, tôn dáng, cực kỳ sang chảnh.', NULL, '2026-01-29 08:02:00', 400000, 'Sản phẩm mới'),
(31, 'Bộ Vest Nam Lịch Lãm Black', 1800000, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', 'Vest đen cổ điển, chuẩn men công sở.', NULL, '2026-01-29 08:02:00', 900000, 'Khuyến mãi - Sale 50%'),
(32, 'Quần Âu Slimfit Chống Nhăn', 450000, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', 'Quần tây form ôm, vải không nhăn, dễ ủi.', NULL, '2026-01-29 08:02:00', 200000, 'Collection - Travelling'),
(33, 'Áo Sơ Mi Trắng Oxford', 350000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'Sơ mi trắng quốc dân, chàng trai nào cũng cần.', NULL, '2026-01-29 08:02:00', 150000, 'Collection - Office Style'),
(34, 'Blazer Kẻ Caro Hàn Quốc', 750000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'Blazer khoác ngoài nhẹ nhàng, thanh lịch.', NULL, '2026-01-29 08:02:00', 350000, 'Áo Nam'),
(35, 'Áo Thun Basic Trắng', 150000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Áo thun cơ bản, dễ phối đồ.', NULL, '2026-01-29 08:02:00', 50000, 'Áo Nam'),
(36, 'Áo Khoác Bomber Gió', 450000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'Áo khoác gió nhẹ, chống nước.', NULL, '2026-01-29 08:02:00', 200000, 'Áo Nam'),
(37, 'Vali Du Lịch Size 24 Nhựa PC', 850000, 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'Vali nhựa cao cấp, chống va đập, bánh xe xoay 360 độ.', NULL, '2026-01-29 08:12:29', 400000, 'Collection - Travelling'),
(38, 'Mũ Cói Đi Biển Vành Rộng', 150000, 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?w=800', 'Mũ cói thời trang, phụ kiện không thể thiếu khi đi biển.', NULL, '2026-01-29 08:12:29', 50000, 'Collection - Travelling'),
(39, 'Giày Sneaker Trắng Basic Travel', 450000, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', 'Giày thể thao êm chân, phù hợp đi bộ đường dài.', NULL, '2026-01-29 08:12:29', 200000, 'Collection - Travelling'),
(40, 'Set Bộ Đồ Đi Biển Hoa Lá', 350000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'Áo sơ mi và quần short họa tiết nhiệt đới rực rỡ.', NULL, '2026-01-29 08:12:29', 150000, 'Collection - Tết-Chan'),
(41, 'Balo Phượt Chống Nước', 550000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Balo dung tích lớn, nhiều ngăn, chất liệu trượt nước.', NULL, '2026-01-29 08:12:29', 250000, 'Collection - Travelling'),
(42, 'Áo Dài Cách Tân Gấm Đỏ', 1250000, 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800', 'Họa tiết rồng phượng, chất liệu gấm thượng hạng.', NULL, '2026-01-29 08:12:29', 600000, 'Khuyến mãi - Sale 50%'),
(43, 'Váy Nhung Đỏ Cổ Ngọc Trai', 680000, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'Thiết kế sang trọng, quý phái cho các buổi tiệc tất niên.', NULL, '2026-01-29 08:12:29', 300000, 'Collection - Tết-Chan'),
(44, 'Áo Sơ Mi Đỏ May Mắn', 450000, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800', 'Màu đỏ tươi mang lại tài lộc cho cả năm.', NULL, '2026-01-29 08:12:29', 200000, 'Collection - Office Style'),
(45, 'Giày Cao Gót Mũi Nhọn Gold', 550000, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', 'Giày kim tuyến vàng lấp lánh, điểm nhấn hoàn hảo.', NULL, '2026-01-29 08:12:29', 250000, 'Collection - Tết-Chan'),
(46, 'Túi Xách Mini Bag Red', 390000, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', 'Túi xách nhỏ xinh, đựng lì xì cực tiện lợi.', NULL, '2026-01-29 08:12:29', 150000, 'Collection - Tết-Chan'),
(47, 'Blazer Nữ Hàn Quốc Beige', 790000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'Áo khoác blazer thanh lịch, dễ phối đồ đi làm.', NULL, '2026-01-29 08:12:29', 350000, 'Collection - Office'),
(48, 'Quần Tây Baggy Lưng Cao', 350000, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'Hack dáng cực đỉnh, che khuyết điểm chân.', NULL, '2026-01-29 08:12:29', 150000, 'Collection - Travelling'),
(49, 'Áo Sơ Mi Lụa Cổ Nơ', 420000, 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=800', 'Chất lụa mềm mại, cổ thắt nơ nữ tính.', NULL, '2026-01-29 08:12:29', 180000, 'Collection - Office Style'),
(50, 'Chân Váy Bút Chì Xẻ Tà', 320000, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', 'Tôn dáng, quyến rũ mà vẫn lịch sự chốn công sở.', NULL, '2026-01-29 08:12:29', 140000, 'Collection - Office'),
(51, 'Cặp Da Công Sở Laptop 14 inch', 890000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Cặp da bò thật, đựng vừa laptop và tài liệu.', NULL, '2026-01-29 08:12:29', 400000, 'Collection - Office'),
(52, 'Bikini 2 Mảnh Họa Tiết Hoa', 250000, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'Đồ bơi quyến rũ, chất thun lạnh co giãn 4 chiều.', NULL, '2026-01-29 08:12:29', 100000, 'Collection - Summer'),
(53, 'Váy Maxi Đi Biển Voan Tơ', 450000, 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', 'Váy dài thướt tha, chụp hình sống ảo cực đẹp.', NULL, '2026-01-29 08:12:29', 200000, 'Collection - Travelling'),
(54, 'Kính Mát Thời Trang UV400', 180000, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'Bảo vệ mắt khỏi tia UV, phong cách sành điệu.', NULL, '2026-01-29 08:12:29', 80000, 'Collection - Summer'),
(55, 'Áo Tank Top Ba Lỗ Nam', 120000, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', 'Áo ba lỗ mát mẻ, khoe cơ bắp khỏe khoắn.', NULL, '2026-01-29 08:12:29', 50000, 'Collection - Summer'),
(56, 'Dép Sandal Đi Biển Chống Trượt', 150000, 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800', 'Dép đế cao su êm ái, bám dính tốt trên cát.', NULL, '2026-01-29 08:12:29', 60000, 'Collection - Travelling'),
(57, 'Vali Du Lịch Size 24 Nhựa PC', 850000, 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'Vali nhựa cao cấp, chống va đập, bánh xe xoay 360 độ.', NULL, '2026-01-29 08:14:33', 400000, 'Collection - Travelling'),
(58, 'Mũ Cói Đi Biển Vành Rộng', 150000, 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?w=800', 'Mũ cói thời trang, phụ kiện không thể thiếu khi đi biển.', NULL, '2026-01-29 08:14:33', 50000, 'Collection - Travelling'),
(59, 'Giày Sneaker Trắng Basic Travel', 450000, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', 'Giày thể thao êm chân, phù hợp đi bộ đường dài.', NULL, '2026-01-29 08:14:33', 200000, 'Collection - Travelling'),
(60, 'Set Bộ Đồ Đi Biển Hoa Lá', 350000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'Áo sơ mi và quần short họa tiết nhiệt đới rực rỡ.', NULL, '2026-01-29 08:14:33', 150000, 'Collection - Tết-Chan'),
(61, 'Balo Phượt Chống Nước', 550000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Balo dung tích lớn, nhiều ngăn, chất liệu trượt nước.', NULL, '2026-01-29 08:14:33', 250000, 'Collection - Travelling'),
(62, 'Áo Dài Cách Tân Gấm Đỏ', 1250000, 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800', 'Họa tiết rồng phượng, chất liệu gấm thượng hạng.', NULL, '2026-01-29 08:14:33', 600000, 'Khuyến mãi - Sale 50%'),
(63, 'Váy Nhung Đỏ Cổ Ngọc Trai', 680000, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', 'Thiết kế sang trọng, quý phái cho các buổi tiệc tất niên.', NULL, '2026-01-29 08:14:33', 300000, 'Collection - Tết-Chan'),
(64, 'Áo Sơ Mi Đỏ May Mắn', 450000, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800', 'Màu đỏ tươi mang lại tài lộc cho cả năm.', NULL, '2026-01-29 08:14:33', 200000, 'Collection - Office Style'),
(65, 'Giày Cao Gót Mũi Nhọn Gold', 550000, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800', 'Giày kim tuyến vàng lấp lánh, điểm nhấn hoàn hảo.', NULL, '2026-01-29 08:14:33', 250000, 'Collection - Tết-Chan'),
(66, 'Túi Xách Mini Bag Red', 390000, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800', 'Túi xách nhỏ xinh, đựng lì xì cực tiện lợi.', NULL, '2026-01-29 08:14:33', 150000, 'Collection - Tết-Chan'),
(67, 'Blazer Nữ Hàn Quốc Beige', 790000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'Áo khoác blazer thanh lịch, dễ phối đồ đi làm.', NULL, '2026-01-29 08:14:33', 350000, 'Collection - Office'),
(68, 'Quần Tây Baggy Lưng Cao', 350000, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800', 'Hack dáng cực đỉnh, che khuyết điểm chân.', NULL, '2026-01-29 08:14:33', 150000, 'Collection - Travelling'),
(69, 'Áo Sơ Mi Lụa Cổ Nơ', 420000, 'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?w=800', 'Chất lụa mềm mại, cổ thắt nơ nữ tính.', NULL, '2026-01-29 08:14:33', 180000, 'Collection - Office Style'),
(70, 'Chân Váy Bút Chì Xẻ Tà', 320000, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800', 'Tôn dáng, quyến rũ mà vẫn lịch sự chốn công sở.', NULL, '2026-01-29 08:14:33', 140000, 'Collection - Office'),
(71, 'Cặp Da Công Sở Laptop 14 inch', 890000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800', 'Cặp da bò thật, đựng vừa laptop và tài liệu.', NULL, '2026-01-29 08:14:33', 400000, 'Collection - Office'),
(72, 'Bikini 2 Mảnh Họa Tiết Hoa', 250000, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'Đồ bơi quyến rũ, chất thun lạnh co giãn 4 chiều.', NULL, '2026-01-29 08:14:33', 100000, 'Collection - Summer'),
(73, 'Váy Maxi Đi Biển Voan Tơ', 450000, 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800', 'Váy dài thướt tha, chụp hình sống ảo cực đẹp.', NULL, '2026-01-29 08:14:33', 200000, 'Collection - Travelling'),
(74, 'Kính Mát Thời Trang UV400', 180000, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800', 'Bảo vệ mắt khỏi tia UV, phong cách sành điệu.', NULL, '2026-01-29 08:14:33', 80000, 'Collection - Summer'),
(75, 'Áo Tank Top Ba Lỗ Nam', 120000, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', 'Áo ba lỗ mát mẻ, khoe cơ bắp khỏe khoắn.', NULL, '2026-01-29 08:14:33', 50000, 'Collection - Summer'),
(76, 'Dép Sandal Đi Biển Chống Trượt', 150000, 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800', 'Dép đế cao su êm ái, bám dính tốt trên cát.', NULL, '2026-01-29 08:14:33', 60000, 'Collection - Travelling'),
(77, 'Áo Thun Graphic Streetwear', 199000, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800', 'Áo thun form rộng, họa tiết in nổi bật.', NULL, '2026-01-29 08:17:42', 100000, 'Khuyến mãi - Đồng giá 199k'),
(78, 'Mũ Lưỡi Trai Unisex Basic', 199000, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', 'Mũ lưỡi trai phong cách Hàn Quốc.', NULL, '2026-01-29 08:17:42', 80000, 'Khuyến mãi - Đồng giá 199k'),
(79, 'Túi Tote Vải Canvas', 199000, 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800', 'Túi vải tiện lợi, thân thiện môi trường.', NULL, '2026-01-29 08:17:42', 60000, 'Khuyến mãi - Đồng giá 199k'),
(80, 'Dép Slide Quai Ngang', 199000, 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800', 'Dép đi trong nhà hoặc đi chơi đều êm chân.', NULL, '2026-01-29 08:17:42', 70000, 'Khuyến mãi - Đồng giá 199k'),
(81, 'Áo Khoác Parka Mùa Đông', 650000, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800', 'Áo khoác dày dặn, ấm áp cho mùa đông đại hàn. (Gốc 1tr3)', NULL, '2026-01-29 08:17:42', 300000, 'Collection - Tết-Chan'),
(82, 'Giày Boot Da Cao Cổ', 850000, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', 'Giày boot da thật, phong cách bụi bặm. (Gốc 1tr7)', NULL, '2026-01-29 08:17:42', 400000, 'Khuyến mãi - Sale 50%'),
(83, 'Đầm Dạ Hội Kim Sa', 950000, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800', 'Đầm dự tiệc lấp lánh, sang trọng. (Gốc 2tr)', NULL, '2026-01-29 08:17:42', 450000, 'Khuyến mãi - Sale 50%'),
(84, 'Vớ Cổ Cao Nike (Combo)', 150000, 'https://images.unsplash.com/photo-1586350975849-d8116758fd69?w=800', 'Mua 1 đôi tặng 1 đôi cùng màu.', NULL, '2026-01-29 08:17:42', 50000, 'Khuyến mãi - Mua 1 Tặng 1'),
(85, 'Boxer Nam Cotton (Set 2)', 250000, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800', 'Mua 1 hộp tặng 1 hộp.', NULL, '2026-01-29 08:17:42', 100000, 'Khuyến mãi - Mua 1 Tặng 1'),
(86, 'Combo Đi Biển Mùa Hè', 350000, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800', 'Set đồ đi biển cực chất.', NULL, '2026-01-29 08:20:08', 150000, 'Collection - Summer Vibes'),
(87, 'Vali Du Lịch Cao Cấp', 890000, 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'Vali chống va đập.', NULL, '2026-01-29 08:20:08', 400000, 'Collection - Travelling'),
(88, 'Áo Dài Tết Đỏ Rực', 550000, 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800', 'Áo dài cách tân đón Tết.', NULL, '2026-01-29 08:20:08', 200000, 'Collection - Tết-Chan'),
(89, 'Áo Thun Mua 1 Tặng 1', 150000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Chương trình tri ân khách hàng.', NULL, '2026-01-29 08:20:08', 50000, 'Khuyến mãi - Mua 1 Tặng 1');

-- 4. Bảng Orders (Đơn hàng)
INSERT INTO orders (id, user_id, total_money, status, address, phone, created_at, customer_name, total_price) VALUES 
(1, NULL, NULL, 'PAID', 'Số 1 Võ Văn Ngân, Thủ Đức, HCM', NULL, '2026-01-28 21:09:33', 'Khách Hàng Mẫu', 1850000);

-- 5. Bảng Order Details/Items
INSERT INTO order_item (id, price, product_name, quantity, order_id) VALUES 
(2, 350000, 'Quần Jean Rách Gối', 1, 1),
(3, 1500000, 'Áo Măng Tô Dạ Cao Cấp', 1, 1),
(4, 350000, 'Quần Jean Rách Gối', 1, 1),
(5, 1500000, 'Áo Măng Tô Dạ Cao Cấp', 1, 1),
(6, 350000, 'Quần Jean Rách Gối', 1, 1),
(7, 1500000, 'Áo Măng Tô Dạ Cao Cấp', 1, 1),
(8, 2200000, 'Vest Nam Lịch Lãm', 1, 1),
(9, 850000, 'Đầm Lụa Velvet Đỏ', 1, 1);