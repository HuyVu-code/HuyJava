import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import StoreSystem from "./StoreSystem"; 

function Home() {
  const [allProducts, setAllProducts] = useState([]); // Dữ liệu gốc từ API
  const [displayList, setDisplayList] = useState([]); // Dữ liệu đã lọc (Search/Category) để hiển thị
  const [loading, setLoading] = useState(true);
  
  const [isHomeView, setIsHomeView] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("SẢN PHẨM NỔI BẬT");

  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000000);

  // --- CẤU HÌNH PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // Trang chủ nên hiện nhiều hơn (ví dụ 12 món)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/products");
        setAllProducts(res.data);
        setDisplayList(res.data); // Mặc định hiện hết
      } catch (err) {
        console.error("Lỗi tải hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- TÍNH TOÁN CẮT TRANG (Dựa trên displayList) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(displayList.length / itemsPerPage);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      // Cuộn nhẹ lên đầu danh sách sản phẩm
      const element = document.getElementById('product-list-anchor');
      if(element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // --- XỬ LÝ TÌM KIẾM ---
  const handleSearch = () => {
    setLoading(true);
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      p.price <= maxPrice
    );
    setDisplayList(filtered);
    setCurrentPage(1); // Reset về trang 1
    setLoading(false);
  };

  // --- XỬ LÝ MENU ---
  const handleMenuClick = (categoryName) => {
    setLoading(true);
    setCurrentPage(1); // Reset về trang 1

    if (categoryName === "ALL") {
      setIsHomeView(true);
      setDisplayList(allProducts);
      setCurrentTitle("SẢN PHẨM NỔI BẬT");
    } else {
      setIsHomeView(false); 
      setCurrentTitle(categoryName.toUpperCase()); 

      const filtered = allProducts.filter(p => {
        const dbCategory = p.categoryName || p.category || ""; 
        return dbCategory.trim().toLowerCase() === categoryName.trim().toLowerCase();
      });

      setDisplayList(filtered);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* PHẦN 1: CAROUSEL & TÌM KIẾM (Chỉ hiện khi ở Trang chủ) */}
      {isHomeView && (
        <>
          <div id="fashionCarousel" className="carousel slide" data-bs-ride="carousel" style={{ marginTop: "80px" }}>
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="0" className="active"></button>
              <button type="button" data-bs-target="#fashionCarousel" data-bs-slide-to="1"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070" className="d-block w-100" alt="Fashion 1" />
                <div className="carousel-caption d-none d-md-block text-white">
                  <h1 className="fw-bold">BỘ SƯU TẬP MÙA ĐÔNG</h1>
                  <a href="#shop-area" className="btn btn-light mt-3 fw-bold">MUA NGAY</a>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" className="d-block w-100" alt="Fashion 2" />
                <div className="carousel-caption d-none d-md-block text-white">
                  <h1 className="fw-bold">THỜI TRANG NAM 2026</h1>
                  <a href="#shop-area" className="btn btn-light mt-3 fw-bold">KHÁM PHÁ</a>
                </div>
              </div>
            </div>
          </div>

          <div id="shop-area" className="container mt-5">
            <div className="card p-4 shadow-sm bg-white border-0">
              <h5 className="mb-3 fw-bold"><i className="fa-solid fa-magnifying-glass me-2"></i> TÌM KIẾM SẢN PHẨM</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <input type="text" className="form-control rounded-0" placeholder="Nhập tên..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="col-md-4">
                  <select className="form-select rounded-0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
                    <option value="10000000">Tất cả mức giá</option>
                    <option value="500000">Dưới 500k</option>
                    <option value="300000">Dưới 300k</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-dark w-100 rounded-0" onClick={handleSearch}>Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* MENU ĐEN */}
      <div className={`bg-black py-3 mb-5 shadow-sm ${isHomeView ? 'mt-4' : 'mt-5 pt-5'}`} style={!isHomeView ? {marginTop: '80px'} : {}}>
        <div className="container">
          <ul className="nav justify-content-center gap-4 text-uppercase fw-bold text-white mb-0" style={{ fontSize: '0.9rem' }}>
            <li className="nav-item">
                <Link to="/new-products" className="nav-link text-white px-0">SẢN PHẨM MỚI</Link>
            </li>
            {/* Trong file Home.jsx */}

<li className="nav-item">
    {/* Đổi dòng này */}
    <Link to="/promotion" className="nav-link text-white px-0">
        KHUYẾN MÃI <i className="fa-solid fa-bolt text-warning ms-1"></i>
    </Link>
</li>
            <li className="nav-item">
    {/* Đổi dòng này */}
    <Link to="/collection" className="nav-link text-white px-0">
        COLLECTION <i className="fa-solid fa-chevron-down ms-1 small opacity-50"></i>
    </Link>
</li>
            <li className="nav-item"><span className="nav-link text-white px-0 pointer">ÁO NAM</span></li>
            <li className="nav-item"><span className="nav-link text-white px-0 pointer">QUẦN NAM</span></li>
            <li className="nav-item">
              <span className="nav-link text-white px-0 pointer" onClick={() => handleMenuClick("ALL")} style={{cursor: 'pointer', borderBottom: isHomeView ? '2px solid white' : 'none'}}>
                TRANG CHỦ
              </span>
            </li>
             <li className="nav-item">
    <Link to="/about" className="nav-link text-white text-uppercase fw-bold">GIỚI THIỆU</Link>
</li>
          </ul>
        </div>
      </div>

      {/* DANH SÁCH SẢN PHẨM */}
      <div className="container my-5" style={{ minHeight: '400px' }} id="product-list-anchor">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase">{currentTitle}</h2>
          <div style={{ width: "60px", height: "3px", backgroundColor: "black", margin: "10px auto" }}></div>
        </div>

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
                        <h5 className="card-title text-uppercase fw-bold small">{p.name}</h5>
                        <p className="text-danger fw-bold">{p.price?.toLocaleString()} VNĐ</p>
                        <Link to={`/product/${p.id}`} className="btn btn-dark w-100 rounded-0 py-2 fw-bold">XEM CHI TIẾT</Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 text-muted col-12">
                  <i className="fa-solid fa-box-open fs-1 mb-3 opacity-25"></i>
                  <h4>Chưa có sản phẩm nào!</h4>
                </div>
              )}
            </div>

            {/* --- PHÂN TRANG (PAGINATION) --- */}
            {totalPages > 1 && (
                <nav className="mt-5">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link rounded-0 text-dark border-0" onClick={() => paginate(currentPage - 1)}>
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        </li>
                        
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

                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link rounded-0 text-dark border-0" onClick={() => paginate(currentPage + 1)}>
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </li>
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

export default Home;