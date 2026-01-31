import React, { useState } from 'react';
import { UseCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import toast from 'react-hot-toast';
import axios from 'axios';
import LocationPicker from "./LocationPicker"; // Nhớ import bản đồ

function Checkout() {
    const { cart, getTotalPrice } = UseCart();
    const navigate = useNavigate();

    // Quản lý trạng thái thanh toán & Form
    const [paymentMethod, setPaymentMethod] = useState('qr');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardType, setCardType] = useState('none');
    
    const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
    const [shippingFee, setShippingFee] = useState(0); 

    // Tổng tiền thanh toán = Tiền hàng + Ship
    const finalTotal = getTotalPrice() + shippingFee;

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

    // Nhận phí ship từ bản đồ
    const handleDistanceChange = (fee) => {
        setShippingFee(fee);
    };

    const handleOrder = async (e) => {
        e.preventDefault();

        // 1. Validate: Phải có phí ship (tức là đã chọn map)
        if (shippingFee === 0) {
            toast.error("Vui lòng chọn vị trí trên bản đồ để tính ship!", { position: "top-center" });
            return;
        }

        setIsProcessing(true); // Hiện màn hình chờ

        // 2. Logic trạng thái thanh toán
        let payStatus = "Chưa thanh toán"; 
        if (paymentMethod === 'qr' || paymentMethod === 'visa') {
            payStatus = "Đã thanh toán";
        }

        // Random ngày giao (2-3 ngày tới)
        const today = new Date();
        today.setDate(today.getDate() + Math.floor(Math.random() * 2) + 2);
        const deliveryDateStr = today.toLocaleDateString('vi-VN');

        const orderData = {
            customerName: form.name,
            phone: form.phone,
            email: form.email,
            address: form.address,
            items: cart,
            totalPrice: finalTotal,
            shippingFee: shippingFee,
            paymentMethod: paymentMethod.toUpperCase(),
            paymentStatus: payStatus,
            deliveryStatus: `Dự kiến giao: ${deliveryDateStr}`,
        };

        // Giả lập xử lý 3 giây (để khách hồi hộp)
        setTimeout(async () => {
            try {
                // 3. Gửi đơn hàng về Backend
                await axios.post("http://localhost:8080/api/orders", orderData);

                setIsProcessing(false);

                // ===============================================
                // 🔊 ÂM THANH "TING TING" (Bất kể phương thức nào cũng kêu)
                // ===============================================
                const audio = new Audio('/success-sound.mp3');
                audio.play().catch(err => console.log("Lỗi âm thanh:", err));

                // Thông báo thành công tùy phương thức
                let msg = "Đặt hàng thành công!";
                if (paymentMethod === 'qr') msg = "Đã nhận được chuyển khoản!";
                if (paymentMethod === 'visa') msg = "Thanh toán thẻ thành công!";
                if (paymentMethod === 'cod') msg = "Đã chốt đơn COD thành công!";

                toast.success(msg, {
                    duration: 6000,
                    position: 'top-center',
                    icon: '💰',
                    style: { background: '#28a745', color: '#fff', fontWeight: 'bold' },
                });

                // Chuyển trang sau 4s
                setTimeout(() => {
                    // localStorage.removeItem("cart"); // Bỏ comment nếu muốn xóa giỏ hàng
                    navigate('/history'); 
                }, 4000); 

            } catch (err) {
                setIsProcessing(false);
                toast.error("Lỗi kết nối Server!", { position: "top-center" });
                console.error(err);
            }
        }, 3000); 
    };

    return (
        <div className="bg-white min-vh-100 d-flex flex-column position-relative">
            {/* MÀN HÌNH CHỜ XÁC NHẬN */}
            {isProcessing && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white" style={{ zIndex: 9999, opacity: 0.98 }}>
                    <div className="spinner-grow text-success mb-3" style={{ width: '4rem', height: '4rem' }}></div>
                    <h4 className="fw-bold text-uppercase text-success animate__animated animate__flash animate__infinite">Đang xử lý đơn hàng...</h4>
                    <p className="small opacity-75">Đang kết nối tới hệ thống kho vận...</p>
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
                                <input type="text" className="form-control rounded-0 border-dark py-2" required placeholder="VU HOANG HUY" 
                                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="tel" className="form-control rounded-0 border-dark py-2" required placeholder="Số điện thoại" 
                                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="email" className="form-control rounded-0 border-dark py-2" placeholder="Email" 
                                        value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                                </div>
                            </div>
                            
                            {/* Ô NHẬP ĐỊA CHỈ & BẢN ĐỒ TỰ ĐỘNG */}
                            <div className="mb-2">
                                <label className="form-label small fw-bold">ĐỊA CHỈ (Nhập để Map tự tìm)</label>
                                <textarea className="form-control rounded-0 border-dark" rows="2" required placeholder="Ví dụ: 242 Bưng Ông Thoàn, Quận 9..."
                                    value={form.address} onChange={e => setForm({...form, address: e.target.value})}></textarea>
                            </div>

                            {/* Component Bản Đồ: Nhận addressQuery để tự bay tới */}
                            <LocationPicker 
                                addressQuery={form.address} 
                                onDistanceChange={handleDistanceChange} 
                            />

                            <h4 className="fw-bold my-4 text-uppercase border-bottom pb-2">Phương thức thanh toán</h4>
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
                            
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Tạm tính:</span>
                                <span className="fw-bold">{getTotalPrice().toLocaleString()} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 text-danger">
                                <span><i className="fa-solid fa-truck-fast me-1"></i> Phí ship (theo Map):</span>
                                <span className="fw-bold">+ {shippingFee.toLocaleString()} VNĐ</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 border-top pt-3">
                                <span className="fw-bold fs-5">TỔNG CỘNG:</span>
                                <span className="fw-bold fs-5 text-danger">{finalTotal.toLocaleString()} VNĐ</span>
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