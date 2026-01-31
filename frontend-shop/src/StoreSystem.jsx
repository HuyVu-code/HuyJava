import React, { useState } from "react";

function StoreSystem() {
  // 1. DANH SÁCH CỬA HÀNG (Đã có tọa độ để Map tự nhảy)
  const stores = [
    {
      id: 1,
      city: "Hồ Chí Minh",
      district: "Quận Bình Thạnh",
      name: "VELVET & SILK - BÌNH THẠNH",
      address: "31 Lê Văn Duyệt, P.03, Q. Bình Thạnh, TP. HCM",
      phone: "02836222000",
      time: "8h00 - 20h00 (Kể cả CN và ngày lễ)",
      lat: 10.7951,
      lng: 106.6953
    },
    {
      id: 2,
      city: "Hồ Chí Minh",
      district: "Quận 1",
      name: "VELVET & SILK - QUẬN 1",
      address: "65 Lê Lợi, P. Bến Nghé, Quận 1, TP. HCM",
      phone: "02838221111",
      time: "9h00 - 22h00 (Kể cả CN và ngày lễ)",
      lat: 10.7745,
      lng: 106.6997
    },
    {
      id: 3,
      city: "Hà Nội",
      district: "Quận Hoàn Kiếm",
      name: "VELVET & SILK - HÀ NỘI",
      address: "Tràng Tiền Plaza, Q. Hoàn Kiếm, Hà Nội",
      phone: "02439335555",
      time: "9h30 - 21h30 (Kể cả CN và ngày lễ)",
      lat: 21.0253,
      lng: 105.8528
    }
  ];

  // State quản lý cửa hàng đang chọn (Mặc định chọn cái đầu tiên)
  const [selectedStore, setSelectedStore] = useState(stores[0]);

  // Hàm xử lý khi chọn cửa hàng khác
  const handleStoreChange = (e) => {
    const selectedDistrict = e.target.value;
    const store = stores.find(s => s.district === selectedDistrict);
    if (store) setSelectedStore(store);
  };

  return (
    // QUAN TRỌNG: id="store-system" để nút liên hệ trượt xuống đây
    <div id="store-system" className="container my-5 py-5 border-top bg-white">
      <h2 className="text-center fw-bold mb-5 text-uppercase">Hệ thống cửa hàng</h2>
      
      <div className="row g-4">
        {/* CỘT TRÁI: MENU CHỌN & THÔNG TIN */}
        <div className="col-lg-4">
          <div className="p-4 border shadow-sm h-100 bg-light">
            <h4 className="fw-bold mb-4">Tìm cửa hàng</h4>
            
            <div className="mb-3">
                <label className="small fw-bold mb-1">Chọn tỉnh thành</label>
                <select className="form-select rounded-0 border-dark mb-3">
                    <option>Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="small fw-bold mb-1">Chọn cửa hàng</label>
                <select 
                    className="form-select rounded-0 border-dark"
                    onChange={handleStoreChange} 
                    value={selectedStore.district}
                >
                    {stores.map(store => (
                        <option key={store.id} value={store.district}>
                            {store.district}
                        </option>
                    ))}
                </select>
            </div>

            <div className="border-top pt-4">
                <h6 className="fw-bold text-uppercase text-primary mb-2">
                    <i className="fa-solid fa-location-dot me-2"></i> {selectedStore.name}
                </h6>
                <p className="small mb-2 opacity-75">
                    <i className="fa-solid fa-map me-2"></i> {selectedStore.address}
                </p>
                <p className="small mb-2">
                    <i className="fa-regular fa-clock me-2"></i> <b>Thời gian:</b> {selectedStore.time}
                </p>
                <p className="small mb-0">
                    <i className="fa-solid fa-phone me-2"></i> <b>Hotline:</b> {selectedStore.phone}
                </p>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: BẢN ĐỒ (Google Maps Embed) */}
        <div className="col-lg-8" style={{ height: '450px' }}>
            <div className="h-100 border shadow-sm overflow-hidden bg-white">
                <iframe 
                    key={selectedStore.id} // Để map load lại khi đổi cửa hàng
                    title="store-map"
                    // Link Map chuẩn
                    src={`https://maps.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&hl=vi&z=16&output=embed`}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StoreSystem;