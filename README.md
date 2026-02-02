# 🛒 Shop App Backend (Spring Boot)

Dự án Backend cho hệ thống bán hàng, được viết bằng **Java Spring Boot**.
Dự án sử dụng **H2 Database** (In-memory) giúp triển khai nhanh gọn mà không cần cấu hình Database phức tạp bên ngoài.

## 🚀 Công nghệ sử dụng
* **Java 17**
* **Spring Boot 3.x**
* **Spring Data JPA**
* **H2 Database** (Tự động reset dữ liệu khi khởi động lại)
* **Maven**
* **Docker** (Hỗ trợ deploy dễ dàng)

## 📂 Cấu trúc dữ liệu
Dữ liệu mẫu (`data.sql`) sẽ tự động được nạp khi khởi động server:
* **Users:** `admin` / `admin123`
* **Products:** Có sẵn 3 sản phẩm mẫu (Áo, Quần, Túi).
* **Categories:** Áo thun, Quần Jean, Phụ kiện.

## 🛠️ Hướng dẫn cài đặt & Chạy (Local)

### Cách 1: Chạy trực tiếp bằng Maven
1.  Clone dự án về máy.
2.  Mở Terminal tại thư mục gốc.
3.  Chạy lệnh:
    ```bash
    mvn spring-boot:run
    ```
4.  Server sẽ chạy tại: `http://localhost:8080`

### Cách 2: Chạy bằng Docker
1.  Build Image:
    ```bash
    docker build -t shop-backend .
    ```
2.  Run Container:
    ```bash
    docker run -p 8080:8080 shop-backend
    ```

## 🔌 Danh sách API chính

| Phương thức | Đường dẫn | Mô tả |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Lấy danh sách sản phẩm |
| `GET` | `/api/orders` | Lấy lịch sử đơn hàng |
| `POST` | `/api/orders` | Tạo đơn hàng mới (Thanh toán) |
| `GET` | `/api/categories` | Lấy danh sách danh mục |

## ☁️ Triển khai (Deploy) trên Render

1.  Push code lên GitHub.
2.  Vào **Render.com** -> New **Web Service**.
3.  Kết nối với Repo GitHub.
4.  Chọn **Runtime**: `Docker`.
5.  Bấm **Create Web Service**.
*(Do dùng H2 Database nên không cần cấu hình biến môi trường nào cả).*

---
**Author:** Vu Hoang Huy