import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UseCart } from "./CartContext";
import Header from "./Header"; // Đảm bảo đúng đường dẫn Header của ông

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = UseCart();

  return (
    <div className="bg-white min-vh-100 d-flex flex-column">
      {/* Header luôn hiện để khách thấy tên User và số lượng giỏ hàng */}
      <Header />

      <div className="container flex-grow-1" style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <h2 className="fw-bold mb-5 text-uppercase">Giỏ hàng của bạn</h2>

        {cart.length === 0 ? (
          <div className="text-center py-5 border shadow-sm rounded-0">
            <p className="fs-5 opacity-50 mb-4">Giỏ hàng đang trống!</p>
            <Link to="/" className="btn btn-dark rounded-0 px-5 py-3 fw-bold">QUAY LẠI CỬA HÀNG</Link>
          </div>
        ) : (
          <div className="row g-5">
            {/* 1. DANH SÁCH SẢN PHẨM BÊN TRÁI */}
            <div className="col-lg-8">
              {cart.map((item, index) => (
                <div key={index} className="d-flex align-items-center border-bottom pb-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '120px', height: '150px', objectFit: 'cover' }}
                    className="border shadow-sm"
                  />
                  <div className="ms-4 flex-grow-1">
                    <h5 className="fw-bold text-uppercase mb-1">{item.name}</h5>
                    <p className="small text-muted mb-2">Size: {item.size} | Màu: {item.color}</p>
                    <p className="fw-bold text-danger fs-5 mb-3">{item.price?.toLocaleString()} VNĐ</p>

                    <div className="d-flex align-items-center gap-2">
                      <div className="input-group" style={{ width: '130px' }}>
                        <button className="btn btn-outline-dark rounded-0 px-3" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}>-</button>
                        <input type="text" className="form-control text-center border-dark fw-bold" value={item.quantity} readOnly />
                        <button className="btn btn-outline-dark rounded-0 px-3" onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}>+</button>
                      </div>
                      <button className="btn text-danger ms-3" onClick={() => removeFromCart(item.id, item.size, item.color)}>
                        <i className="fa-solid fa-trash-can fs-5"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. TỔNG ĐƠN HÀNG & NÚT THANH TOÁN BÊN PHẢI */}
            <div className="col-lg-4">
              <div className="p-4 border bg-light rounded-0 sticky-top" style={{ top: '120px' }}>
                <h4 className="fw-bold mb-4 text-center text-uppercase">Tổng đơn hàng</h4>
                <div className="d-flex justify-content-between mb-3 fs-6">
                  <span className="text-muted">Tạm tính:</span>
                  <span className="fw-bold text-dark">{getTotalPrice().toLocaleString()} VNĐ</span>
                </div>
                <div className="d-flex justify-content-between mb-3 fs-6">
                  <span className="text-muted">Phí vận chuyển:</span>
                  <span className="text-success fw-bold text-uppercase small">Miễn phí</span>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-between mb-5">
                  <span className="fw-bold fs-5">TỔNG CỘNG:</span>
                  <span className="fw-bold fs-5 text-danger">{getTotalPrice().toLocaleString()} VNĐ</span>
                </div>

                {/* NÚT THANH TOÁN - ĐÃ LÀM NỔI BẬT */}
                <button
                  className="btn btn-dark w-100 py-4 rounded-0 fw-bold text-uppercase shadow-sm mb-3"
                  onClick={() => navigate('/checkout')}
                  style={{ letterSpacing: '2px', transition: '0.3s' }}
                >
                  Tiếp tục thanh toán
                </button>

                <div className="text-center">
                  <Link to="/" className="text-decoration-none text-dark small opacity-75 fw-bold">
                    <i className="fa-solid fa-arrow-left me-2"></i> TIẾP TỤC MUA SẮM
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer đồng bộ với toàn trang */}
      <footer className="footer-dark py-5 bg-black text-white border-top border-secondary mt-auto">
        <div className="container text-center">
          <p className="opacity-50 small mb-0">© 2026 Velvet & Silk Fashion Group. Designed by Vu Hoang Huy.</p>
        </div>
      </footer>
    </div>
  );
}

export default Cart;