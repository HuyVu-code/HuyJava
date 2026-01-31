import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-white fade-in">
      
      {/* 1. HERO BANNER */}
      <div 
        className="position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "450px",
          backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed" // Hiệu ứng trượt ảnh nền
        }}
      >
        <div className="position-absolute w-100 h-100 bg-black opacity-50"></div>
        <div className="position-relative z-1 container">
          <h1 className="display-3 fw-bold text-uppercase ls-2">Câu Chuyện Của Chúng Tôi</h1>
          <div style={{ width: "80px", height: "4px", backgroundColor: "#fff", margin: "20px auto" }}></div>
          <p className="fs-5 opacity-75">Hành trình kiến tạo phong cách quý ông từ 2026</p>
        </div>
      </div>

      {/* 2. THƯƠNG HIỆU & SỨ MỆNH */}
      <div className="container my-5 py-5">
        <div className="row align-items-center g-5">
          <div className="col-md-6">
            <img 
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070" 
              className="img-fluid shadow-lg" 
              alt="Tailor working" 
            />
          </div>
          <div className="col-md-6">
            <h6 className="text-warning fw-bold text-uppercase mb-2">Về Velvet & Silk</h6>
            <h2 className="fw-bold mb-4 display-6">Nơi Vẻ Đẹp Cổ Điển Chạm Ngõ Hiện Đại</h2>
            <p className="text-muted lh-lg">
              Ra đời vào năm 2026, <b>Velvet & Silk</b> không chỉ là một thương hiệu thời trang, mà là tuyên ngôn của sự lịch lãm. Chúng tôi tin rằng, trang phục không chỉ để mặc, mà là để thể hiện khí chất.
            </p>
            <p className="text-muted lh-lg">
              Tên gọi <b>"Velvet" (Nhung)</b> tượng trưng cho sự sang trọng, quyền quý. <b>"Silk" (Lụa)</b> đại diện cho sự mềm mại, tinh tế. Sự kết hợp này tạo nên những bộ trang phục vừa vặn hoàn hảo, giúp phái mạnh tự tin chinh phục mọi thử thách.
            </p>
            
            {/* --- CHỮ KÝ SỐ (ĐÃ SỬA LỖI ẢNH) --- */}
            <div className="mt-4">
                <p 
                    style={{ 
                        fontFamily: "'Brush Script MT', cursive", // Font chữ ký nghệ thuật
                        fontSize: "45px", 
                        color: "#b8860b", // Màu vàng đồng sang trọng
                        transform: "rotate(-5deg)", // Nghiêng nhẹ cho giống viết tay thật
                        display: "inline-block",
                        margin: 0
                    }}
                >
                    Vũ Hoàng Huy
                </p>
            </div>
            <p className="small fw-bold mt-2">- Vũ Hoàng Huy (Founder)</p>
            
          </div>
        </div>
      </div>

      {/* 3. GIÁ TRỊ CỐT LÕI (ICON) */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm h-100 border-bottom border-3 border-dark">
                <i className="fa-solid fa-gem display-4 text-dark mb-3"></i>
                <h5 className="fw-bold text-uppercase">Chất Lượng Thượng Hạng</h5>
                <p className="text-muted small">Sử dụng những thước vải nhập khẩu cao cấp nhất, từng đường kim mũi chỉ được chăm chút tỉ mỉ.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm h-100 border-bottom border-3 border-dark">
                <i className="fa-solid fa-scissors display-4 text-dark mb-3"></i>
                <h5 className="fw-bold text-uppercase">Thiết Kế Độc Bản</h5>
                <p className="text-muted small">Phom dáng Slimfit hiện đại, tôn dáng người Việt nhưng vẫn giữ được nét oai phong cổ điển.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 bg-white shadow-sm h-100 border-bottom border-3 border-dark">
                <i className="fa-solid fa-heart display-4 text-dark mb-3"></i>
                <h5 className="fw-bold text-uppercase">Tận Tâm Phục Vụ</h5>
                <p className="text-muted small">Khách hàng là trung tâm. Chính sách đổi trả linh hoạt và tư vấn phong cách 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. HỆ THỐNG CỬA HÀNG */}
      <div className="py-5 bg-black text-white">
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="text-warning text-uppercase ls-2 mb-2">Ghé thăm chúng tôi</h5>
            <h2 className="fw-bold text-uppercase display-5">Hệ Thống Cửa Hàng</h2>
            <p className="opacity-50">Trải nghiệm không gian mua sắm đẳng cấp tại 2 thành phố lớn</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="border border-secondary p-4 bg-dark">
                
                {/* Khu vực TP.HCM */}
                <div className="mb-4">
                  <h4 className="fw-bold border-bottom border-secondary pb-2 mb-3">
                    <i className="fa-solid fa-location-dot text-warning me-2"></i> TP. HỒ CHÍ MINH
                  </h4>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">Store 1: Velvet & Silk Bình Thạnh</h6>
                      <small className="opacity-75">31 Lê Văn Duyệt, P.03, Q. Bình Thạnh</small>
                    </div>
                    <a href="#" className="btn btn-sm btn-outline-light rounded-0">Chỉ đường</a>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">Store 2: Velvet & Silk Quận 1</h6>
                      <small className="opacity-75">65 Lê Lợi, P. Bến Nghé, Quận 1 (Gần Saigon Centre)</small>
                    </div>
                    <a href="#" className="btn btn-sm btn-outline-light rounded-0">Chỉ đường</a>
                  </div>
                </div>

                {/* Khu vực HÀ NỘI */}
                <div>
                  <h4 className="fw-bold border-bottom border-secondary pb-2 mb-3">
                    <i className="fa-solid fa-location-dot text-warning me-2"></i> HÀ NỘI
                  </h4>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                    <div>
                      <h6 className="fw-bold text-uppercase mb-1">Store 3: Velvet & Silk Tràng Tiền</h6>
                      <small className="opacity-75">Tầng 3, Tràng Tiền Plaza, Q. Hoàn Kiếm</small>
                    </div>
                    <a href="#" className="btn btn-sm btn-outline-light rounded-0">Chỉ đường</a>
                  </div>
                </div>

                <div className="text-center mt-4">
                    <p className="mb-1 text-warning fw-bold">HOTLINE: 0973.457.533</p>
                    <small className="opacity-50">Giờ mở cửa: 08:30 - 22:00 (Tất cả các ngày trong tuần)</small>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="text-center py-5">
        <h3 className="fw-bold mb-3">Bạn đã sẵn sàng thay đổi phong cách?</h3>
        <Link to="/" className="btn btn-dark btn-lg rounded-0 px-5 fw-bold shadow">XEM SẢN PHẨM MỚI</Link>
      </div>

    </div>
  );
}

export default About;