import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StoreSystem from "./StoreSystem"; 

function NewProducts() {
  const [products, setProducts] = useState([]); // Danh sách gốc (đã sort mới nhất)
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sau khi tìm kiếm
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm

  // --- CẤU HÌNH PHÂN TRANG ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Số sản phẩm mỗi trang (Sửa số này nếu muốn hiện nhiều hơn)

  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((res) => {
        // Sắp xếp ID giảm dần (Mới nhất lên đầu)
        const sorted = res.data.sort((a, b) => b.id - a.id);
        setProducts(sorted);
        setFilteredProducts(sorted); // Ban đầu chưa tìm gì thì hiện hết
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // --- XỬ LÝ TÌM KIẾM TRONG TRANG NÀY ---
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    
    // Lọc từ danh sách gốc 'products'
    const result = products.filter(p => 
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    
    setFilteredProducts(result);
    setCurrentPage(1); // Tìm xong nhớ reset về trang 1
  };

  // --- TÍNH TOÁN CẮT TRANG ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); // Cuộn lên đầu khi chuyển trang
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "120px", minHeight: "600px" }}>
        
        {/* HEADER & TÌM KIẾM */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-uppercase display-5">SẢN PHẨM MỚI VỀ</h2>
          <p className="text-muted">Những mẫu thiết kế mới nhất vừa cập bến Velvet & Silk</p>
          <div style={{ width: "80px", height: "4px", backgroundColor: "black", margin: "20px auto" }}></div>
          
          {/* Ô TÌM KIẾM RIÊNG CHO TRANG NÀY */}
          <div className="d-flex justify-content-center mt-4">
            <div className="input-group shadow-sm" style={{ maxWidth: "500px" }}>
              <span className="input-group-text bg-white border-end-0"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0 py-2" 
                placeholder="Tìm trong sản phẩm mới..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-dark"></div></div>
        ) : (
          <>
            <div className="row">
               {currentItems.length > 0 ? (
                   currentItems.map((p) => (
                      <div className="col-md-3 mb-4" key={p.id}>
                        <div className="card card-custom h-100 border-0 shadow-sm bg-white position-relative">
                          <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 fw-bold shadow-sm" style={{zIndex: 2, fontSize: '0.8rem'}}>
                              NEW
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
                            <p className="text-danger fw-bold">{p.price?.toLocaleString()} VNĐ</p>
                            <Link to={`/product/${p.id}`} className="btn btn-dark w-100 rounded-0 py-2 fw-bold">XEM CHI TIẾT</Link>
                          </div>
                        </div>
                      </div>
                    ))
               ) : (
                  <div className="text-center w-100 py-5 text-muted">
                    <i className="fa-solid fa-box-open fs-1 mb-3 opacity-25"></i>
                    <p>Không tìm thấy sản phẩm nào khớp với từ khóa "{searchTerm}"</p>
                  </div>
               )}
            </div>

            {/* --- THANH PHÂN TRANG (PAGINATION) --- */}
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

export default NewProducts;