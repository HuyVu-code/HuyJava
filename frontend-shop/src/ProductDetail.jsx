import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"; 
import toast from 'react-hot-toast'; 
import { UseCart } from "./CartContext";
import "./Home.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = UseCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFlying, setIsFlying] = useState(false); 

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Đen");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then((res) => { setProduct(res.data); })
      .catch((err) => { console.error("Lỗi:", err); })
      .finally(() => { setLoading(false); });
  }, [id]);

  const handleAddToCartClick = () => {
    setIsFlying(true);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    });

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

    setTimeout(() => setIsFlying(false), 800);
  };

  if (loading) return <div className="vh-100 d-flex justify-content-center align-items-center"><div className="spinner-border"></div></div>;

  return (
    <div className="bg-white position-relative">
      
      {/* ĐÃ XÓA HEADER CỨNG Ở ĐÂY 
         (Vì App.jsx đã có Header chung rồi, để lại là bị trùng 2 cái)
      */}

      {/* NỘI DUNG SẢN PHẨM */}
      {/* Giữ nguyên padding-top 140px để nội dung không bị Header chung che khuất */}
      <div className="container" style={{ paddingTop: "140px", paddingBottom: "80px", minHeight: "80vh" }}>
        {product && (
          <div className="row g-5">
            <div className="col-md-6 position-relative">
              {/* ẢNH GỐC */}
              <div className="p-2 border shadow-sm bg-white">
                <img src={product.imageUrl} className="img-fluid w-100" style={{ maxHeight: "600px", objectFit: "cover" }} alt="product" />
              </div>

              {/* HIỆU ỨNG ẢNH BAY */}
              <AnimatePresence>
                {isFlying && (
                  <motion.img
                    src={product.imageUrl}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: window.innerWidth > 992 ? 400 : 100,
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
              
              {/* MÔ TẢ SẢN PHẨM */}
              <div className="mt-5 pt-4 border-top">
                  <h6 className="fw-bold text-uppercase mb-3">Mô tả sản phẩm</h6>
                  <p className="text-secondary small" style={{lineHeight: '1.8'}}>
                      {product.description || "Chưa có mô tả cho sản phẩm này."}
                  </p>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* ĐÃ XÓA FOOTER Ở ĐÂY (Footer App.jsx sẽ tự hiện) */}
    </div>
  );
}
export default ProductDetail;