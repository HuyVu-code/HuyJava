import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoreSystem from "./StoreSystem"; 

function Promotion() {
  const [products, setProducts] = useState([]); // Dữ liệu gốc
  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu hiển thị
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL"); // Tab đang chọn

  // --- CẤU HÌNH PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  useEffect(() => {
    // Lấy dữ liệu sản phẩm về
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data); // Mặc định hiện tất cả
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải hàng:", err);
        setLoading(false);
      });
  }, []);

  // --- HÀM LỌC CHUẨN THEO ADMIN ---
  const handleFilter = (type) => {
    setActiveTab(type);
    setCurrentPage(1); // Reset về trang 1

    let result = [];
    if (type === "ALL") {
        result = products;
    } else {
        // Lọc chính xác theo cột 'category' hoặc 'categoryName' từ DB
        result = products.filter(p => {
            const cat = p.category || p.categoryName || "";
            // Chỉ cần tên danh mục chứa từ khóa (VD: "Khuyến mãi - Sale 50%" chứa "Sale 50%")
            return cat.toLowerCase().includes(type.toLowerCase());
        });
    }
    setFilteredProducts(result);
  };

  // --- PHÂN TRANG ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginate = (pageNumber) => { 
      setCurrentPage(pageNumber); 
      window.scrollTo(0, 0); 
  };

  return (
    <div>
      {/* BANNER KHUYẾN MÃI */}
      <div className="position-relative text-center text-white d-flex align-items-center justify-content-center" 
           style={{ 
             height: "300px", 
             marginTop: "80px",
             backgroundColor: "#8B0000", // Màu đỏ đô sang trọng
             backgroundImage: "linear-gradient(45deg, #000000 0%, #8B0000 100%)"
           }}>
        <div>
          <h1 className="display-3 fw-bold text-uppercase">SIÊU SALE ĐÓN TẾT</h1>
          <p className="fs-5 opacity-75">Săn deal hời - Đón năm mới rạng ngời</p>
        </div>
      </div>

      <div className="container my-5">
        
        {/* --- DANH MỤC KHUYẾN MÃI (TAB BAR) --- */}
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">
          <button 
            className={`btn rounded-0 px-4 py-2 fw-bold ${activeTab === 'ALL' ? 'btn-dark' : 'btn-outline-dark'}`}
            onClick={() => handleFilter("ALL")}
          >
            TẤT CẢ ƯU ĐÃI
          </button>
          
          {/* Các nút này có value khớp với từ khóa trong Admin */}
          <button 
            className={`btn rounded-0 px-4 py-2 fw-bold ${activeTab === 'Sale 50%' ? 'btn-danger text-white' : 'btn-outline-danger'}`}
            onClick={() => handleFilter("Sale 50%")}
          >
            ⚡ XẢ KHO 50%
          </button>
          <button 
            className={`btn rounded-0 px-4 py-2 fw-bold ${activeTab === 'Đồng giá 199k' ? 'btn-warning text-dark' : 'btn-outline-dark'}`}
            onClick={() => handleFilter("Đồng giá 199k")}
          >
            🔥 ĐỒNG GIÁ 199K
          </button>
          <button 
            className={`btn rounded-0 px-4 py-2 fw-bold ${activeTab === 'Mua 1 Tặng 1' ? 'btn-success text-white' : 'btn-outline-success'}`}
            onClick={() => handleFilter("Mua 1 Tặng 1")}
          >
            🎁 MUA 1 TẶNG 1
          </button>
        </div>

        {/* --- DANH SÁCH SẢN PHẨM --- */}
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-dark"></div></div>
        ) : (
          <>
            <div className="row">
               {currentItems.length > 0 ? (
                   currentItems.map((p) => (
                      <div className="col-md-3 mb-4" key={p.id}>
                        <div className="card card-custom h-100 border-0 shadow-sm bg-white position-relative">
                          {/* Badge Sale tùy theo Tab */}
                          <div className="position-absolute top-0 end-0 bg-warning text-dark px-3 py-1 fw-bold shadow-sm" style={{zIndex: 2, fontSize: '0.8rem'}}>
                              {p.category && p.category.includes('Sale 50%') ? '-50%' : 'HOT'}
                          </div>
                          
                          <img 
                            src={p.imageUrl ? p.imageUrl : "https://placehold.co/400x500?text=No+Image"} 
                            className="card-img-top" 
                            style={{ height: "350px", objectFit: "cover" }} 
                            alt={p.name} 
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://placehold.co/400x500?text=No+Image"}}
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title text-uppercase fw-bold small">{p.name}</h5>
                            
                            {/* Hiển thị giá cũ gạch ngang nếu là hàng Sale 50% */}
                            {(p.category && p.category.includes('Sale 50%')) && (
                                <p className="text-muted text-decoration-line-through small mb-1">
                                    {(p.price * 2).toLocaleString()} VNĐ
                                </p>
                            )}
                            
                            <p className="text-danger fw-bold fs-5">{p.price?.toLocaleString()} VNĐ</p>
                            <Link to={`/product/${p.id}`} className="btn btn-dark w-100 rounded-0 py-2 fw-bold">SĂN NGAY</Link>
                          </div>
                        </div>
                      </div>
                    ))
               ) : (
                  <div className="text-center w-100 py-5 text-muted">
                    <i className="fa-solid fa-tag fs-1 mb-3 opacity-25"></i>
                    <p>Tạm thời hết hàng trong chương trình này.</p>
                  </div>
               )}
            </div>

            {/* --- PHÂN TRANG --- */}
            {totalPages > 1 && (
                <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i + 1} className="page-item">
                                <button 
                                    onClick={() => paginate(i + 1)} 
                                    className={`page-link rounded-0 mx-1 border-0 fw-bold ${currentPage === i + 1 ? 'bg-black text-white' : 'text-dark bg-light'}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
          </>
        )}
      </div>
      <StoreSystem />
    </div>
  );
}

export default Promotion;