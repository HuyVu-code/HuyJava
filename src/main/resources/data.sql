-- Nạp Categories
INSERT INTO categories (id, name) VALUES (1, 'Áo Thun');
INSERT INTO categories (id, name) VALUES (2, 'Quần Jean');
INSERT INTO categories (id, name) VALUES (3, 'Phụ Kiện');

-- Nạp Sản phẩm (Lưu ý: Đổi link ảnh nếu muốn)
INSERT INTO products (name, price, image_url, description, category_id, created_at) VALUES 
('Quần Jean Rách', 350000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm4aa0a5m16r70', 'Bụi bặm', 2, CURRENT_TIMESTAMP),
('Áo Thun Basic', 150000, 'https://down-vn.img.susercontent.com/file/sg-11134201-22120-ef9lzhztj0kvb1', 'Cotton 100%', 1, CURRENT_TIMESTAMP),
('Túi Đeo Chéo', 199000, 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lm4aa0a5m16r70', 'Tiện lợi', 3, CURRENT_TIMESTAMP);

-- Nạp User Admin (để test đăng nhập nếu cần)
INSERT INTO users (username, password, full_name, email, role, created_at) VALUES 
('admin', 'admin123', 'Admin Huy', 'admin@gmail.com', 'ADMIN', CURRENT_TIMESTAMP);