import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoreSystem from "./StoreSystem"; 

function Collection() {
  const [products, setProducts] = useState([]); // Dữ liệu gốc
  const [filteredProducts, setFilteredProducts] = useState([]); // Dữ liệu hiển thị
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL"); 

  // --- CẤU HÌNH PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); 

  useEffect(() => {
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

  // --- LOGIC LỌC BỘ SƯU TẬP (CHUẨN THEO ADMIN) ---
  const handleFilter = (collectionType) => {
    setActiveTab(collectionType);
    setCurrentPage(1); // Reset về trang 1

    let result = [];
    if (collectionType === "ALL") {
        result = products;
    } else {
        // Lọc chính xác theo cột 'category' hoặc 'categoryName'
        result = products.filter(p => {
            const cat = p.category || p.categoryName || "";
            // Chỉ cần tên danh mục trong DB có chứa từ khóa này là hiện ra
            // Ví dụ: DB lưu "Collection - Travelling" -> tìm "Travelling" là thấy
            return cat.toLowerCase().includes(collectionType.toLowerCase());
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
      {/* BANNER COLLECTION (Tông đen ngầu) */}
      <div className="position-relative text-center text-white d-flex align-items-center justify-content-center" 
           style={{ 
             height: "350px", 
             marginTop: "80px",
             backgroundColor: "#1a1a1a",
             backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070')" ,
             backgroundSize: "cover",
             backgroundPosition: "center",
             backgroundBlendMode: "overlay" 
           }}>
        <div>
          <h1 className="display-4 fw-bold text-uppercase ls-2">THE COLLECTIONS</h1>
          <p className="fs-5 opacity-75 mt-2">Khám phá những xu hướng thời trang mới nhất 2026</p>
          <div style={{ width: "60px", height: "4px", backgroundColor: "white", margin: "20px auto" }}></div>
        </div>
      </div>

      <div className="container my-5">
        
        {/* --- MENU BỘ SƯU TẬP (TAB BAR) --- */}
        <div className="d-flex justify-content-center flex-wrap gap-4 mb-5 border-bottom pb-3">
          <button 
            className={`btn rounded-0 fw-bold fs-5 text-uppercase border-0 px-3 ${activeTab === 'ALL' ? 'text-black border-bottom border-3 border-black' : 'text-secondary'}`}
            onClick={() => handleFilter("ALL")}
          >
            All Collections
          </button>
          
          {/* Các nút này có value khớp với từ khóa trong Admin */}
          <button 
            className={`btn rounded-0 fw-bold fs-5 text-uppercase border-0 px-3 ${activeTab === 'Travelling' ? 'text-black border-bottom border-3 border-black' : 'text-secondary'}`}
            onClick={() => handleFilter("Travelling")}
          >
            ✈️ Travelling
          </button>
          <button 
            className={`btn rounded-0 fw-bold fs-5 text-uppercase border-0 px-3 ${activeTab === 'Tết-Chan' ? 'text-black border-bottom border-3 border-black' : 'text-secondary'}`}
            onClick={() => handleFilter("Tết-Chan")}
          >
            🌸 Tết-Chan
          </button>
          <button 
            className={`btn rounded-0 fw-bold fs-5 text-uppercase border-0 px-3 ${activeTab === 'Office' ? 'text-black border-bottom border-3 border-black' : 'text-secondary'}`}
            onClick={() => handleFilter("Office")}
          >
            💼 Office Style
          </button>
          <button 
            className={`btn rounded-0 fw-bold fs-5 text-uppercase border-0 px-3 ${activeTab === 'Summer' ? 'text-black border-bottom border-3 border-black' : 'text-secondary'}`}
            onClick={() => handleFilter("Summer")}
          >
            🏖️ Summer Vibes
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
                        <div className="card card-custom h-100 border-0 shadow-sm bg-white">
                          <img 
                            src={p.imageUrl ? p.imageUrl : "https://placehold.co/400x500?text=No+Image"} 
                            className="card-img-top" 
                            style={{ height: "350px", objectFit: "cover" }} 
                            alt={p.name} 
                            onError={(e) => {e.target.onerror = null; e.target.src = "https://placehold.co/400x500?text=No+Image"}}
                          />
                          <div className="card-body text-center">
                            <h5 className="card-title text-uppercase fw-bold small text-muted mb-2">
                                {/* Hiển thị tên danh mục lấy từ DB cho chính xác */}
                                {p.category || p.categoryName || "COLLECTION"}
                            </h5>
                            <h5 className="card-title fw-bold small text-dark">{p.name}</h5>
                            <p className="text-black fw-bold mt-2">{p.price?.toLocaleString()} VNĐ</p>
                            <Link to={`/product/${p.id}`} className="btn btn-outline-dark w-100 rounded-0 py-2 fw-bold">XEM CHI TIẾT</Link>
                          </div>
                        </div>
                      </div>
                    ))
               ) : (
                  <div className="text-center w-100 py-5 text-muted">
                    <i className="fa-solid fa-layer-group fs-1 mb-3 opacity-25"></i>
                    <p>Chưa có sản phẩm nào trong bộ sưu tập này.</p>
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

export default Collection;