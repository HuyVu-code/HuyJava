import React, { useState } from 'react';
import { UseCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import toast from 'react-hot-toast';

function Checkout() {
    const { cart, getTotalPrice } = UseCart();
    const navigate = useNavigate();

    // Quản lý trạng thái thanh toán
    const [paymentMethod, setPaymentMethod] = useState('qr');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('none');

    // Tự động nhận diện Visa (số 4) hoặc Mastercard (số 5)
    const handleCardChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNumber(formattedValue);

        if (value.startsWith('4')) setCardType('visa');
        else if (value.startsWith('5')) setCardType('mastercard');
        else setCardType('none');
    };

    const handleOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true); // Đợi 15 giây "định mệnh"

        setTimeout(() => {
            setIsProcessing(false);

            // 🔊 PHÁT ÂM THANH TING TING (File success-sound.mp3 trong thư mục public)
            const audio = new Audio('/success-sound.mp3');
            audio.play().catch(err => console.log("Lỗi âm thanh:", err));

            toast.success(`Velvet & Silk đã nhận được thanh toán!`, {
                duration: 6000,
                position: 'top-center',
                icon: '💰',
                style: { background: '#28a745', color: '#fff', fontWeight: 'bold' },
            });

            setTimeout(() => navigate('/'), 4000);
        }, 15000); // 15 giây
    };

    return (
        <div className="bg-white min-vh-100 d-flex flex-column position-relative">
            {/* MÀN HÌNH CHỜ XÁC NHẬN */}
            {isProcessing && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white" style={{ zIndex: 9999, opacity: 0.98 }}>
                    <div className="spinner-grow text-success mb-3" style={{ width: '4rem', height: '4rem' }}></div>
                    <h4 className="fw-bold text-uppercase text-success animate__animated animate__flash animate__infinite">Đang kiểm tra tiền về...</h4>
                    <p className="small opacity-75">Vui lòng chờ trong 15 giây để xác nhận</p>
                </div>
            )}

            <Header />
            <div className="container mt-5 pt-5 flex-grow-1">
                <div className="row g-5">
                    {/* BÊN TRÁI: FORM THÔNG TIN & VISA */}
                    <div className="col-lg-7 mt-4">
                        <h4 className="fw-bold mb-4 text-uppercase border-bottom pb-2">Thông tin giao hàng</h4>
                        <form onSubmit={handleOrder}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">HỌ VÀ TÊN</label>
                                <input type="text" className="form-control rounded-0 border-dark py-2" required placeholder="VU HOANG HUY" />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3"><input type="tel" className="form-control rounded-0 border-dark py-2" required placeholder="Số điện thoại" /></div>
                                <div className="col-md-6 mb-3"><input type="email" className="form-control rounded-0 border-dark py-2" required placeholder="Email" /></div>
                            </div>
                            <div className="mb-4"><textarea className="form-control rounded-0 border-dark" rows="3" required placeholder="Địa chỉ giao hàng"></textarea></div>

                            <h4 className="fw-bold mb-4 text-uppercase border-bottom pb-2">Phương thức thanh toán</h4>
                            <div className="d-flex flex-wrap gap-4 mb-4">
                                <div className="form-check">
                                    <input className="form-check-input border-dark" type="radio" name="payment" id="qr" checked={paymentMethod === 'qr'} onChange={() => setPaymentMethod('qr')} />
                                    <label className="form-check-label fw-bold" htmlFor="qr">Quét mã QR</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input border-dark" type="radio" name="payment" id="visa" checked={paymentMethod === 'visa'} onChange={() => setPaymentMethod('visa')} />
                                    <label className="form-check-label fw-bold" htmlFor="visa">Thẻ VISA / Mastercard</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input border-dark" type="radio" name="payment" id="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                                    <label className="form-check-label fw-bold" htmlFor="cod">Ship COD</label>
                                </div>
                            </div>

                            {/* HIỆN FORM VISA KHI CHỌN */}
                            {paymentMethod === 'visa' && (
                                <div className="p-4 border bg-light mb-4 animate__animated animate__fadeIn">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="fw-bold mb-0">THÔNG TIN THẺ (TEST: 4242...)</h6>
                                        <div className="fs-3 d-flex gap-2">
                                            <i className={`fa-brands fa-cc-visa ${cardType === 'visa' ? 'text-primary' : 'opacity-25'}`}></i>
                                            <i className={`fa-brands fa-cc-mastercard ${cardType === 'mastercard' ? 'text-danger' : 'opacity-25'}`}></i>
                                        </div>
                                    </div>
                                    <input type="text" className="form-control rounded-0 border-dark mb-3" placeholder="4242 4242 4242 4242" value={cardNumber} onChange={handleCardChange} />
                                    <div className="row">
                                        <div className="col-6"><input type="text" className="form-control rounded-0 border-dark" placeholder="MM/YY" /></div>
                                        <div className="col-6"><input type="password" className="form-control rounded-0 border-dark" placeholder="CVV" /></div>
                                    </div>
                                </div>
                            )}

                            <button type="submit" className="btn btn-dark w-100 py-3 rounded-0 fw-bold shadow-lg">XÁC NHẬN ĐẶT HÀNG</button>
                        </form>
                    </div>

                    {/* BÊN PHẢI: TỔNG ĐƠN HÀNG & QR */}
                    <div className="col-lg-5 mt-4">
                        <div className="p-4 border bg-light rounded-0 shadow-sm sticky-top" style={{ top: '120px' }}>
                            <h5 className="fw-bold mb-4 text-uppercase border-bottom pb-2 text-center">Tóm tắt đơn hàng</h5>
                            <div className="mb-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {cart.map((item, index) => (
                                    <div key={index} className="d-flex align-items-center mb-3 border-bottom pb-2">
                                        <img src={item.image} alt={item.name} style={{ width: '50px', height: '60px', objectFit: 'cover' }} className="border bg-white" />
                                        <div className="ms-3 flex-grow-1 small">
                                            <span className="fw-bold text-uppercase">{item.name}</span>
                                            <div className="fw-bold text-danger">{(item.price * item.quantity).toLocaleString()} VNĐ</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-between mb-4 border-top pt-3">
                                <span className="fw-bold fs-5">TỔNG CỘNG:</span>
                                <span className="fw-bold fs-5 text-danger">{getTotalPrice().toLocaleString()} VNĐ</span>
                            </div>

                            {paymentMethod === 'qr' && (
                                <div className="text-center p-3 border bg-white shadow-sm mt-3 animate__animated animate__fadeIn">
                                    <p className="small fw-bold text-primary mb-2 text-uppercase">Quét mã TPBank để thanh toán</p>
                                    <img src="/qr-tpbank.jpg" alt="TPBank QR" className="img-fluid border mb-2 shadow-sm" style={{ maxWidth: '220px' }} />
                                    <p className="mb-0 fw-bold text-dark">VU HOANG HUY</p>
                                    <p className="mb-0 fw-bold text-primary">STK: 0000 5692 537</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;