-- Dữ liệu bảng Categories (Danh mục)
-- Tắt kiểm tra khóa ngoại để xóa cho mượt
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa sạch dữ liệu cũ
TRUNCATE TABLE order_item;
TRUNCATE TABLE order_details;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE users;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO categories (id, name) VALUES (1, 'Áo Thun');
INSERT INTO categories (id, name) VALUES (2, 'Quần Jean');
INSERT INTO categories (id, name) VALUES (3, 'Phụ Kiện');

-- Dữ liệu bảng Users (Người dùng) - Mật khẩu mẫu: admin123, Huy2005-
INSERT INTO users (id, username, password, full_name, email, phone, role, created_at) VALUES (3, 'admin', 'admin123', 'Huy Java Administrator', 'admin@huyjava.com', NULL, 'ADMIN', '2026-01-28 09:10:10');
INSERT INTO users (id, username, password, full_name, email, phone, role, created_at) VALUES (13, 'Huy', 'Huy2005-', '', 'Huy@gmail.com', '0973457533', 'USER', '2026-01-28 12:50:05');

-- Dữ liệu bảng Products (Sản phẩm)
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (1, 'Quần Jean Rách Gối', 350000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZN5SYDa3QQLkg-zvZvzz9Cd9lNCbqg5Q-Tg&s', 'Quần jean phong cách bụi bặm', 2, '2026-01-28 09:09:17', 300000, 'Collection - Travelling');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (4, 'Áo Măng Tô Dạ Cao Cấp', 1500000, 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', 'Chất liệu dạ lông cừu nhập khẩu.', NULL, '2026-01-28 11:27:17', 1000000, 'Khuyến mãi - Sale 50%');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (5, 'Vest Nam Lịch Lãm', 2200000, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop', 'Thiết kế Slimfit ôm dáng.', NULL, '2026-01-28 11:27:17', 1500000, 'Khuyến mãi - Sale 50%');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (6, 'Đầm Lụa Velvet Đỏ', 850000, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop', 'Quyến rũ và nổi bật.', NULL, '2026-01-28 11:27:17', 500000, 'Collection - Tết-Chan');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (7, 'Áo Thun Oversize Đen', 350000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', 'Cotton 100% thoáng mát.', NULL, '2026-01-28 11:27:17', 0, NULL);
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (8, 'Quần Jean Slimfit Xanh', 550000, 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop', 'Co giãn 4 chiều thoải mái.', NULL, '2026-01-28 11:27:17', NULL, 'Collection - Travelling');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (9, 'Áo Polo', 350000, 'https://myo.vn/wp-content/uploads/2023/11/sg-11134201-22120-fb9lzhztj0kve2.jpg', 'cũng đẹp', NULL, '2026-01-28 11:57:19', NULL, NULL);
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (10, 'ÁO', 500000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjfncwx7LJPJn-E3lhCs3R1w-DjpbTXjYJFQ&s', 'đẹp', NULL, '2026-01-28 20:38:56', 300000, NULL);
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (12, 'Áo Sơ Mi Premium Flower', 530000, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...', 'Họa tiết hoa văn mùa hè.', NULL, '2026-01-29 06:45:59', 50000, 'Collection - Office Style');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (23, 'Quần Short Kaki Travelling Kem', 199000, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', 'Quần short thoáng mát.', NULL, '2026-01-29 08:02:00', 100000, 'Collection - Travelling');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (27, 'Áo Dài Cách Tân Red Lucky', 1200000, 'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800', 'Màu đỏ may mắn đón Tết.', NULL, '2026-01-29 08:02:00', 600000, 'Khuyến mãi - Sale 50%');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (37, 'Vali Du Lịch Size 24 Nhựa PC', 850000, 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800', 'Vali nhựa cao cấp, chống va đập.', NULL, '2026-01-29 08:12:29', 400000, 'Collection - Travelling');
INSERT INTO products (id, name, price, image_url, description, category_id, created_at, import_price, category) VALUES (89, 'Áo Thun Mua 1 Tặng 1', 150000, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', 'Chương trình tri ân khách hàng.', NULL, '2026-01-29 08:20:08', 50000, 'Khuyến mãi - Mua 1 Tặng 1');

-- Dữ liệu bảng Orders (Đơn hàng)
INSERT INTO orders (id, user_id, total_money, status, address, phone, created_at, customer_name, total_price) VALUES (1, NULL, NULL, 'PAID', 'Số 1 Võ Văn Ngân, Thủ Đức, HCM', NULL, '2026-01-28 21:09:33', 'Khách Hàng Mẫu', 1850000);

-- Dữ liệu bảng Order Items (Chi tiết đơn hàng)
INSERT INTO order_item (id, price, product_name, quantity, order_id) VALUES (2, 350000, 'Quần Jean Rách Gối', 1, 1);
INSERT INTO order_item (id, price, product_name, quantity, order_id) VALUES (3, 1500000, 'Áo Măng Tô Dạ Cao Cấp', 1, 1);