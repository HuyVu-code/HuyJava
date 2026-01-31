import { useState } from "react";
import Swal from "sweetalert2";
import "./ContactButton.css"; 

function ContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showZalo, setShowZalo] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: "", email: "", phone: "", content: "" });

  const toggleMenu = () => setIsOpen(!isOpen);

  // 4. TRƯỢT XUỐNG CỬA HÀNG
  const scrollToStore = () => {
    const section = document.getElementById("store-system");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else {
        // Nếu đang ở trang khác (không phải trang chủ), chuyển về trang chủ rồi trượt xuống
        window.location.href = "/#store-system"; 
    }
  };

  // 3. GỬI EMAIL (GIẢ LẬP)
  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setShowEmailForm(false);
    Swal.fire({
        icon: 'success',
        title: 'Đã gửi thành công!',
        text: `Cảm ơn ${emailForm.name}! Tin nhắn của bạn đã được chuyển đến Gmail của Admin.`,
        confirmButtonColor: '#000'
    });
    setEmailForm({ name: "", email: "", phone: "", content: "" });
  };

  return (
    <>
      <div className="contact-widget">
        {/* NÚT CHÍNH RUNG LẮC */}
        <button className={`shake-btn ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
          {isOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-phone-volume"></i>}
        </button>

        {/* MENU BUNG RA */}
        {isOpen && (
          <div className="contact-menu">
            
            {/* 1. GỌI ĐIỆN */}
            <a href="tel:0973457533" className="contact-item">
              <div className="contact-icon bg-danger"><i className="fa-solid fa-phone"></i></div>
              <span>Hotline: 0973.457.533</span>
            </a>

            {/* 2. ZALO */}
            <div className="contact-item" onClick={() => setShowZalo(true)}>
              <div className="contact-icon bg-primary"><i className="fa-solid fa-comment-dots"></i></div>
              <span>Chat Zalo (Huy)</span>
            </div>

            {/* 3. EMAIL */}
            <div className="contact-item" onClick={() => setShowEmailForm(true)}>
              <div className="contact-icon bg-warning text-dark"><i className="fa-solid fa-envelope"></i></div>
              <span>Gửi Email hỗ trợ</span>
            </div>

            {/* 4. CỬA HÀNG (BAY XUỐNG DƯỚI) */}
            <div className="contact-item" onClick={scrollToStore}>
              <div className="contact-icon bg-success"><i className="fa-solid fa-location-dot"></i></div>
              <span>Hệ thống cửa hàng</span>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL HIỆN QR ZALO --- */}
      {showZalo && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content rounded-4 overflow-hidden">
                <div className="modal-header border-0 pb-0">
                    <button type="button" className="btn-close" onClick={() => setShowZalo(false)}></button>
                </div>
                <div className="modal-body text-center pt-0 pb-4">
                    <h5 className="fw-bold mb-3">QUÉT MÃ ZALO</h5>
                    {/* Link ảnh Zalo mẫu, ông nhớ thay bằng ảnh thật của ông nhé */}
                    <img  
                        src="/zalo-qr.jpg" 
        className="img-fluid rounded shadow-sm" 
        alt="Zalo QR" 
        style={{ maxWidth: '100%', height: 'auto' }}
    />
                    <p className="mt-3 mb-0 fw-bold">Vũ Hoàng Huy</p>
                    <small className="text-muted">Kết bạn để được tư vấn nhanh nhất</small>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL FORM GỬI EMAIL --- */}
      {showEmailForm && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-0 border-0">
                <div className="modal-header bg-black text-white rounded-0">
                    <h5 className="modal-title fw-bold">ĐỂ LẠI LỜI NHẮN</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={() => setShowEmailForm(false)}></button>
                </div>
                <div className="modal-body p-4">
                    <form onSubmit={handleSendEmail}>
                        <div className="mb-3">
                            <input type="text" className="form-control rounded-0 bg-light border-0 py-3" placeholder="Tên của bạn" required 
                                value={emailForm.name} onChange={e => setEmailForm({...emailForm, name: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control rounded-0 bg-light border-0 py-3" placeholder="Email của bạn" required 
                                value={emailForm.email} onChange={e => setEmailForm({...emailForm, email: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <input type="tel" className="form-control rounded-0 bg-light border-0 py-3" placeholder="Số điện thoại của bạn" required 
                                value={emailForm.phone} onChange={e => setEmailForm({...emailForm, phone: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control rounded-0 bg-light border-0 py-3" rows="4" placeholder="Nội dung cần tư vấn..." required
                                value={emailForm.content} onChange={e => setEmailForm({...emailForm, content: e.target.value})}></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark w-100 py-3 rounded-0 fw-bold">GỬI CHO CHÚNG TÔI</button>
                    </form>
                    <p className="text-muted small text-center mt-3 mb-0">Tin nhắn sẽ được gửi về Email của Admin.</p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactButton;