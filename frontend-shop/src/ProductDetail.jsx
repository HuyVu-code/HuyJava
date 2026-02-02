import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"; // Thêm hiệu ứng bay
import toast from 'react-hot-toast'; // Thêm thông báo
import { UseCart } from "./CartContext";
import "./Home.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartCount, addToCart } = UseCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlying, setIsFlying] = useState(false); // Trạng thái ảnh đang bay

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => { setProduct(res.data); })
      .catch((err) => { console.error("Lỗi:", err); })
      .finally(() => { setLoading(false); });
  }, [id]);

  // LOGIC: Vừa bay ảnh, vừa hiện thông báo, vừa thêm vào giỏ
  const handleAddToCartClick = () => {
    // 1. Kích hoạt ảnh bay
    setIsFlying(true);

    // 2. Thêm vào giỏ thực tế (gửi đủ data để hiện trong trang Cart)
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });

    // 3. Hiện thông báo Toast có nút xem nhanh
    toast.success((t) => (
      <span>
        Đã thêm vào giỏ!
        <button
          onClick={() => { toast.dismiss(t.id); navigate('/cart'); }}
          className="btn btn-link btn-sm fw-bold text-primary p-0 ms-2 text-decoration-none"
        >
          XEM NGAY
        </button>
      </span>
    ), { duration: 3000 });

    // 4. Reset trạng thái bay sau khi hoàn tất animation
    setTimeout(() => setIsFlying(false), 800);
  };

  if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><div className="spinner-border"></div></div>;

  return (
    <div className="bg-white min-vh-100 position-relative d-flex flex-column">

      {/* 1. HEADER ĐEN (Sử dụng Header component chung của ông hoặc code cứng dưới đây) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 text-decoration-none" to="/">VELVET & SILK</Link>
          <div className="d-flex align-items-center gap-4 text-white fw-bold small">
            <Link to="/cart" className="text-white text-decoration-none position-relative">
              <i className="fa-solid fa-cart-shopping me-2"></i> GIỎ HÀNG
              {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>{cartCount}</span>}
            </Link>
            <span onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>ADMIN <i className="fa-regular fa-circle-user ms-1 fs-5"></i></span>
          </div>
        </div>
      </nav>

      {/* 2. NỘI DUNG NỀN TRẮNG */}
      <div className="container flex-grow-1" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        {product && (
          <div className="row g-5">
            <div className="col-md-6 position-relative">
              {/* ẢNH GỐC */}
              <div className="p-2 border shadow-sm bg-white">
                <img src={product.imageUrl} className="img-fluid w-100" style={{ maxHeight: "600px", objectFit: "cover" }} alt="product" />
              </div>

              {/* HIỆU ỨNG ẢNH BAY (FLY TO CART) */}
              <AnimatePresence>
                {isFlying && (
                  <motion.img
                    src={product.imageUrl}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: window.innerWidth > 992 ? 400 : 100, // Bay về hướng giỏ hàng trên Header
                      y: -500,
                      opacity: 0,
                      scale: 0.1,
                      rotate: 360
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                      position: 'fixed',
                      width: '100px',
                      zIndex: 9999,
                      pointerEvents: 'none',
                      left: '30%',
                      top: '40%'
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="col-md-6 text-dark pt-2">
              <h1 className="display-6 fw-bold text-uppercase">{product.name}</h1>
              <h3 className="text-danger fw-bold my-3">{product.price?.toLocaleString()} VNĐ</h3>

              <div className="mb-4">
                <p className="small fw-bold mb-2 text-uppercase">MÀU SẮC: {selectedColor}</p>
                <div className="d-flex gap-2">
                  {["Đen", "Xám"].map(c => (
                    <button key={c} className={`btn btn-sm rounded-0 border ${selectedColor === c ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setSelectedColor(c)}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="small fw-bold mb-2 text-uppercase">KÍCH THƯỚC:</p>
                <div className="d-flex gap-2">
                  {["S", "M", "L", "XL"].map(s => (
                    <button key={s} className={`btn rounded-0 border px-3 ${selectedSize === s ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setSelectedSize(s)}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="mb-5 d-flex align-items-center gap-3">
                <p className="small fw-bold mb-0 text-uppercase">SỐ LƯỢNG:</p>
                <div className="input-group" style={{ width: "120px" }}>
                  <button className="btn btn-outline-dark rounded-0" onClick={() => quantity > 1 && setQuantity(quantity - 1)}>-</button>
                  <input type="text" className="form-control text-center border-dark" value={quantity} readOnly />
                  <button className="btn btn-outline-dark rounded-0" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <button className="btn btn-outline-dark w-100 py-4 fw-bold rounded-0" onClick={handleAddToCartClick}>
                    THÊM VÀO GIỎ
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-danger w-100 py-4 fw-bold rounded-0">
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FOOTER 3 CỘT */}
      <footer className="footer-dark py-5 bg-black text-white border-top border-secondary mt-auto">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
              <h5 className="fw-bold mb-2 text-uppercase">VELVET & SILK</h5>
              <p className="small opacity-50 mb-0">Thương hiệu thời trang hàng đầu Việt Nam.</p>
            </div>
            <div className="col-md-4 text-center mb-4 mb-md-0">
              <h6 className="fw-bold text-uppercase mb-3">Liên hệ</h6>
              <p className="small mb-1"><i className="fa-solid fa-phone me-2"></i>Hotline: 0973.457.533</p>
              <p className="small opacity-75"><i className="fa-solid fa-envelope me-2"></i>Email: vuhoanghuy2005lop9a3phuochoa@gmail.com</p>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <h6 className="fw-bold text-uppercase mb-3">Theo dõi</h6>
              <div className="d-flex justify-content-center justify-content-md-end gap-3">
                <a href="https://facebook.com/share/17mH1e7JSw/" target="_blank" rel="noreferrer" className="text-white fs-4"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://instagram.com/huyvuhoang2k5" target="_blank" rel="noreferrer" className="text-white fs-4"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://tiktok.com/@wwuy2k5" target="_blank" rel="noreferrer" className="text-white fs-4"><i className="fa-brands fa-tiktok"></i></a>
              </div>
            </div>
          </div>
          <hr className="my-4 opacity-25" />
          <div className="text-center opacity-25 small">© 2026 Velvet & Silk Fashion Group. Designed by Vu Hoang Huy.</div>
        </div>
      </footer>
    </div>
  );
}
export default ProductDetail;