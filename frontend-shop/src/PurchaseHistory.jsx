import React from 'react';
import Header from "./Header";
import { Link } from 'react-router-dom';

function PurchaseHistory() {
    // DỮ LIỆU GIẢ LẬP ĐỂ HIỆN THỊ (Sau này ông sẽ gọi từ API Spring Boot)
    const orders = [
        {
            id: "VELVET-2026-001",
            date: "29/01/2026",
            status: "success", // success: Thành công, processing: Đang xử lý
            statusText: "Thanh toán thành công",
            total: "500,000 VNĐ",
            items: [
                {
                    name: "ÁO SIÊU NHÂN",
                    size: "M",
                    color: "Đen",
                    quantity: 1,
                    price: 500000,
                    image: "/ao-sieunhan.jpg" // Nhớ để ảnh này trong public nhé
                }
            ]
        }
    ];

    return (
        <div className="bg-white min-vh-100">
            <Header />
            <div className="container mt-5 pt-5">
                <h3 className="fw-bold text-uppercase border-bottom pb-3 mb-4 mt-4">
                    <i className="fa-solid fa-clock-rotate-left me-2"></i> Lịch sử đơn hàng
                </h3>

                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div key={index} className="card rounded-0 border-dark mb-5 shadow-sm">
                            {/* HEADER ĐƠN HÀNG */}
                            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                                <div>
                                    <span className="fw-bold me-3">MÃ ĐƠN: <span className="text-primary">{order.id}</span></span>
                                    <span className="small text-secondary">{order.date}</span>
                                </div>
                                <span className={`badge ${order.status === 'success' ? 'bg-success' : 'bg-warning'} text-uppercase p-2`}>
                                    {order.statusText}
                                </span>
                            </div>

                            {/* CHI TIẾT SẢN PHẨM */}
                            {/* PHẦN CHI TIẾT SẢN PHẨM TRONG PURCHASEHISTORY.JSX */}
                            {/* PHẦN HIỆN ẢNH SẢN PHẨM TRONG PURCHASEHISTORY.JSX */}
                            <div className="card-body">
                                {order.items.map((item, i) => (
                                    <div key={i} className="d-flex align-items-center mb-3">
                                        {/* SỬ DỤNG BIẾN item.image ĐỂ HIỆN ĐÚNG ẢNH SẢN PHẨM */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '100px', height: '120px', objectFit: 'cover' }}
                                            className="border shadow-sm bg-white"
                                            onError={(e) => {
                                                // Nếu đường dẫn item.image bị lỗi, nó sẽ hiện ảnh này để không bị trống
                                                e.target.src = "https://via.placeholder.com/100x120?text=Product+Image";
                                            }}
                                        />
                                        <div className="ms-4 flex-grow-1">
                                            <h5 className="fw-bold mb-1 text-uppercase">{item.name}</h5>
                                            <p className="mb-0 small opacity-75">Phân loại: {item.color}, {item.size}</p>
                                            <p className="mb-0 fw-bold">x{item.quantity}</p>
                                        </div>
                                        <div className="text-end">
                                            <span className="fw-bold text-danger fs-5">500,000 VNĐ</span>
                                        </div>
                                    </div>
                                ))}

                                {/* THANH TRẠNG THÁI TIMELINE */}
                                <div className="mt-4 pt-4 border-top">
                                    <div className="row text-center position-relative">
                                        <div className="col-3">
                                            <div className="rounded-circle bg-success text-white d-inline-block p-2 mb-1"><i className="fa-solid fa-check"></i></div>
                                            <p className="small fw-bold mb-0">Đã đặt</p>
                                        </div>
                                        <div className="col-3">
                                            <div className="rounded-circle bg-success text-white d-inline-block p-2 mb-1"><i className="fa-solid fa-money-bill-1-wave"></i></div>
                                            <p className="small fw-bold mb-0">Đã nhận tiền</p>
                                        </div>
                                        <div className="col-3 opacity-25">
                                            <div className="rounded-circle bg-secondary text-white d-inline-block p-2 mb-1"><i className="fa-solid fa-truck"></i></div>
                                            <p className="small fw-bold mb-0">Đang giao</p>
                                        </div>
                                        <div className="col-3 opacity-25">
                                            <div className="rounded-circle bg-secondary text-white d-inline-block p-2 mb-1"><i className="fa-solid fa-box-open"></i></div>
                                            <p className="small fw-bold mb-0">Hoàn tất</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer bg-light d-flex justify-content-end py-3">
                                <span className="fs-5 fw-bold text-dark">THÀNH TIỀN: <span className="text-danger">{order.total}</span></span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5">
                        <i className="fa-solid fa-box-open fs-1 opacity-25 mb-3"></i>
                        <p className="opacity-50">Bạn chưa có đơn hàng nào thành công.</p>
                        <Link to="/" className="btn btn-dark rounded-0 px-4">QUAY LẠI MUA SẮM</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PurchaseHistory;