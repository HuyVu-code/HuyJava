import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fix lỗi icon mặc định
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// TỌA ĐỘ CỬA HÀNG (VD: Chợ Bến Thành)
const STORE_LOCATION = [10.7721, 106.6983]; 

// Component phụ: Giúp Map tự bay đến tọa độ mới
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 2 }); // Bay mượt mà trong 2s
    }
  }, [center, map]);
  return null;
}

function LocationPicker({ addressQuery, onDistanceChange }) {
  const [userPos, setUserPos] = useState(null);
  const [distance, setDistance] = useState(0);
  const [fee, setFee] = useState(0);

  // 1. TỰ ĐỘNG TÌM KHI NHẬP ĐỊA CHỈ (Debounce 1.5s)
  useEffect(() => {
    if (!addressQuery || addressQuery.length < 5) return; // Nhập ít quá thì không tìm

    const delaySearch = setTimeout(async () => {
      try {
        // Gọi API miễn phí của OpenStreetMap
        const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${addressQuery}`);
        
        if (res.data && res.data.length > 0) {
          const { lat, lon } = res.data[0];
          const newPos = [parseFloat(lat), parseFloat(lon)];
          
          setUserPos(newPos); // Cắm cờ
          calculateAndSetFee(newPos); // Tính tiền
        }
      } catch (err) {
        console.error("Lỗi tìm địa chỉ:", err);
      }
    }, 1500); // Đợi 1.5 giây sau khi ngừng gõ mới tìm (để đỡ lag)

    return () => clearTimeout(delaySearch);
  }, [addressQuery]);

  // Hàm tính tiền & khoảng cách chung
  const calculateAndSetFee = (pos) => {
    const km = calculateDistance(STORE_LOCATION[0], STORE_LOCATION[1], pos[0], pos[1]);
    const shippingFee = Math.round(km * 10000); 
    setDistance(km.toFixed(2));
    setFee(shippingFee);
    onDistanceChange(shippingFee);
  };

  // Công thức tính khoảng cách
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Cho phép click tay thủ công nếu muốn
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newPos = [lat, lng];
        setUserPos(newPos);
        calculateAndSetFee(newPos);
      },
    });
    return null;
  }

  return (
    <div className="mt-3">
      <label className="small fw-bold mb-2 text-danger">
        <i className="fa-solid fa-map-pin me-1"></i> 
        BẢN ĐỒ SHIP (TỰ ĐỘNG TÌM HOẶC BẤM CHỌN)
      </label>
      
      <div className="border shadow-sm p-1 bg-white" style={{ height: "350px" }}>
        <MapContainer center={STORE_LOCATION} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* Component giúp Map tự bay */}
          <MapUpdater center={userPos || STORE_LOCATION} />

          <Marker position={STORE_LOCATION}>
            <Popup>🏠 KHO HÀNG</Popup>
          </Marker>

          {userPos && (
            <>
              <Marker position={userPos}>
                <Popup>📍 Giao tới đây</Popup>
              </Marker>
              <Polyline positions={[STORE_LOCATION, userPos]} color="red" />
            </>
          )}
          
          <MapClickHandler />
        </MapContainer>
      </div>

      {userPos && (
        <div className="alert alert-info mt-2 mb-0 d-flex justify-content-between align-items-center rounded-0">
          <span><i className="fa-solid fa-route"></i> Khoảng cách: <b>{distance} km</b></span>
          <span className="fs-5 text-danger fw-bold">Ship: {fee.toLocaleString()} đ</span>
        </div>
      )}
    </div>
  );
}

export default LocationPicker;