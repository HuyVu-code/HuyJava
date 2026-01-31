# 🛍️ Shop Quần Áo - E-commerce Website

Đồ án cuối khóa môn Lập trình Web Java, xây dựng hệ thống thương mại điện tử với kiến trúc **Monolithic** (Spring Boot + ReactJS).

🔗 **Live Demo:**
* Frontend: [https://huy-java-e22x.vercel.app](https://huy-java-e22x.vercel.app)
* Backend: (Dán link Render của ông vào đây, ví dụ: https://shop-quan-ao.onrender.com)

---

## 🚀 Tính Năng (Features)

### 1. Chức năng cơ bản (Core Features)
* ✅ **Quản lý Sản phẩm:** Xem danh sách, chi tiết, thêm/sửa/xóa (CRUD).
* ✅ **Quản lý Danh mục:** Phân loại sản phẩm (Áo, Quần, Phụ kiện...).
* ✅ **Quản lý Đơn hàng:** Đặt hàng, lưu thông tin người mua, trạng thái đơn.
* ✅ **Quản lý Người dùng:** Đăng ký, Đăng nhập (Phân quyền Admin/User).

### 2. Chức năng nâng cao (Advanced Features)
* ⭐ **Deploy Cloud:** Hệ thống được triển khai thực tế trên môi trường Cloud (Aiven DB, Render BE, Vercel FE).
* ⭐ **Data Seeding:** Tự động nạp dữ liệu mẫu khi khởi chạy ứng dụng.
* ⭐ **RESTful API:** Thiết kế API chuẩn REST cho Frontend tiêu thụ.
* *(Nếu ông có chức năng Tìm kiếm hay Upload ảnh thì ghi thêm dòng này vào: ⭐ Tìm kiếm & Lọc sản phẩm nâng cao)*

---

## 🛠️ Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
| :--- | :--- |
| **Backend** | Java 21, Spring Boot 3.5, Spring Data JPA, Hibernate |
| **Frontend** | ReactJS, Axios, Bootstrap/Tailwind |
| **Database** | MySQL (Lưu trữ trên **Aiven Cloud**) |
| **DevOps** | Docker, Git, Maven, Render, Vercel |

---

## ⚙️ Hướng Dẫn Cài Đặt & Chạy (Localhost)

### 1. Yêu cầu (Prerequisites)
* Java JDK 21+
* Node.js 18+
* Git

### 2. Cài đặt Backend
```bash
# Clone dự án
git clone [https://github.com/huyjava/shop-quan-ao.git](https://github.com/huyjava/shop-quan-ao.git)
cd backend

# Cấu hình Database (trong application.properties)
# spring.datasource.url=jdbc:mysql://...

# Chạy ứng dụng (Dữ liệu mẫu sẽ tự động được nạp từ file data.sql)
./mvnw clean spring-boot:run