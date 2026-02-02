import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Các State để quản lý tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000000);

  // 1. Hàm lấy toàn bộ sản phẩm lúc mới vào trang
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu:", err); // Đã sử dụng 'err' để hết lỗi ESLint
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // 2. Hàm xử lý tìm kiếm khi bấm nút
  const handleSearch = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/api/products/search?name=${searchTerm}&price=${maxPrice}`,
      )
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm:", err); // Đã sử dụng 'err'
        setLoading(false);
      });
  };

  return (
    <div>
      {/* --- CAROUSEL (SLIDE) --- */}
      <div
        id="fashionCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ marginTop: "80px" }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#fashionCarousel"
            data-bs-slide-to="2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070"
              className="d-block w-100"
              alt="Fashion 1"
            />
            <div className="carousel-caption d-none d-md-block text-white">
              <h1>BỘ SƯU TẬP MÙA ĐÔNG</h1>
              <p className="lead">Phong cách thời thượng cho quý cô hiện đại</p>
              <a href="#shop-area" className="btn btn-light btn-shop-now mt-3">
                MUA NGAY
              </a>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
              className="d-block w-100"
              alt="Fashion 2"
            />
            <div className="carousel-caption d-none d-md-block text-white">
              <h1>THỜI TRANG NAM 2026</h1>
              <a href="#shop-area" className="btn btn-light btn-shop-now mt-3">
                KHÁM PHÁ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEARCH AREA --- */}
      <div id="shop-area" className="container mt-5">
        <div className="card p-4 shadow-sm bg-white border-0">
          <h5 className="mb-3 fw-bold">
            <i className="fa-solid fa-magnifying-glass me-2"></i> TÌM KIẾM SẢN
            PHẨM
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder="Nhập tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select rounded-0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="10000000">Tất cả mức giá</option>
                <option value="500000">Dưới 500k</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-dark w-100 rounded-0"
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT LIST --- */}
      <div className="container my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase">Sản phẩm nổi bật</h2>
          <div
            style={{
              width: "60px",
              height: "3px",
              backgroundColor: "black",
              margin: "10px auto",
            }}
          ></div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-dark"></div>
          </div>
        ) : (
          <div className="row">
            {products.map((p) => (
              <div className="col-md-3 mb-4" key={p.id}>
                <div className="card card-custom h-100 border-0 shadow-sm bg-white">
                  <img
                    src={p.imageUrl}
                    className="card-img-top"
                    style={{ height: "350px", objectFit: "cover" }}
                    alt={p.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title text-uppercase fw-bold small">
                      {p.name}
                    </h5>
                    <p className="text-danger fw-bold">
                      {p.price?.toLocaleString()} VNĐ
                    </p>
                    <Link
                      to={`/product/${p.id}`}
                      className="btn btn-dark w-100 rounded-0 py-2 fw-bold"
                    >
                      XEM CHI TIẾT
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- FOOTER ĐEN TUYỀN (Khớp với CSS footer-dark của ông) --- */}
      <footer className="footer-dark py-5 mt-5">
        <div className="container">
          <div className="row">
            {/* THÔNG TIN THƯƠNG HIỆU */}
            <div className="col-md-4 mb-4 text-center text-md-start">
              <h5 className="fw-bold text-uppercase mb-3">VELVET & SILK</h5>
              <p className="small opacity-75">
                Thương hiệu thời trang hàng đầu Việt Nam.
              </p>
            </div>

            {/* THÔNG TIN LIÊN HỆ */}
            <div className="col-md-4 mb-4 text-center">
              <h5 className="fw-bold text-uppercase mb-3">LIÊN HỆ</h5>
              <p className="small mb-2">
                <i className="fa-solid fa-phone me-2"></i> Hotline:{" "}
                <strong>0973.457.533</strong>
              </p>
              <p className="small opacity-75">
                <i className="fa-solid fa-envelope me-2"></i> Email:
                vuhoanghuy2005lop9a3phuochoa@gmail.com
              </p>
            </div>

            {/* MẠNG XÃ HỘI */}
            <div className="col-md-4 text-center text-md-end">
              <h5 className="fw-bold text-uppercase mb-3">THEO DÕI</h5>
              <div className="d-flex justify-content-center justify-content-md-end gap-4 mt-3">
                <a
                  href="https://www.facebook.com/share/17mH1e7JSw/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white fs-3"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/huyvuhoang2k5"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white fs-3"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@wwuy2k5"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white fs-3"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-divider my-4"></div>
          <div className="text-center opacity-50 small">
            © 2026 Velvet & Silk Fashion Group. Designed by Vu Hoang Huy.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
