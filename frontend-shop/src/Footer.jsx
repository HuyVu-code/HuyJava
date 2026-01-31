import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-dark py-5 mt-auto" style={{ backgroundColor: "#000", color: "#fff" }}>
      <div className="container">
        <div className="row">
          {/* CỘT 1: THƯƠNG HIỆU */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <Link to="/" className="text-decoration-none text-white">
              <h5 className="fw-bold text-uppercase mb-3">VELVET & SILK</h5>
            </Link>
            <p className="small opacity-75">
              Thương hiệu thời trang hàng đầu Việt Nam. <br />
              Phong cách thời thượng cho quý cô hiện đại.
            </p>
          </div>

          {/* CỘT 2: LIÊN HỆ */}
          <div className="col-md-4 mb-4 text-center">
            <h5 className="fw-bold text-uppercase mb-3">LIÊN HỆ</h5>
            <p className="small mb-2">
              <i className="fa-solid fa-phone me-2"></i> Hotline: <strong>0973.457.533</strong>
            </p>
            <p className="small opacity-75">
              <i className="fa-solid fa-envelope me-2"></i> Email: vuhoanghuy2005lop9a3phuochoa@gmail.com
            </p>
            <p className="small opacity-75">
               <i className="fa-solid fa-location-dot me-2"></i> 31 Lê Văn Duyệt, Bình Thạnh, TP.HCM
            </p>
          </div>

          {/* CỘT 3: MẠNG XÃ HỘI */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="fw-bold text-uppercase mb-3">THEO DÕI</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-4 mt-3">
              <a href="https://www.facebook.com/share/17mH1e7JSw/" target="_blank" rel="noreferrer" className="text-white fs-3">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/huyvuhoang2k5" target="_blank" rel="noreferrer" className="text-white fs-3">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@wwuy2k5" target="_blank" rel="noreferrer" className="text-white fs-3">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-top border-secondary my-4 opacity-25"></div>
        
        <div className="text-center opacity-50 small">
          © 2026 Velvet & Silk Fashion Group. Designed by Vu Hoang Huy.
        </div>
      </div>
    </footer>
  );
}

export default Footer;