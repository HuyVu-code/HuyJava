import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UseCart } from "./CartContext"; // Hiện số lượng giỏ hàng

function Header() {
    const navigate = useNavigate();
    const { cartCount } = UseCart();

    // Khởi tạo user từ localStorage để lấy tên và quyền (role)
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const sync = () => {
            const saved = localStorage.getItem('user');
            setUser(saved ? JSON.parse(saved) : null);
        };
        window.addEventListener('userUpdated', sync);
        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener('userUpdated', sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('userUpdated'));
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top py-3 shadow-sm">
            <div className="container">
                {/* Logo Velvet & Silk bấm về Home */}
                <Link className="navbar-brand fw-bold fs-3 text-decoration-none" to="/">
                    VELVET & SILK
                </Link>

                <div className="ms-auto d-flex align-items-center">
                    {/* GIỎ HÀNG CÓ SỐ LƯỢNG MÀU ĐỎ */}
                    <Link to="/cart" className="text-white text-decoration-none position-relative fw-bold small me-4">
                        <i className="fa-solid fa-cart-shopping me-2"></i> GIỎ HÀNG
                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        /* ĐÃ ĐĂNG NHẬP: Hiện đúng Tên và Avatar */
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-white dropdown-toggle d-flex align-items-center text-decoration-none shadow-none p-0"
                                data-bs-toggle="dropdown"
                                type="button"
                            >
                                {/* HIỆN TÊN TỪ DATABASE: Ví dụ là Huy */}
                                <span className="me-2 small fw-bold text-uppercase">
                                    {user.username}
                                </span>
                                <img
                                    src={user.avatar || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"}
                                    className="rounded-circle border border-white"
                                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                    alt="user"
                                />
                            </button>

                            {/* DROPDOWN 2 MỤC: Thông tin cá nhân & Trang quản trị AD */}
                            <ul className="dropdown-menu dropdown-menu-end rounded-0 shadow mt-2 border-0">
                                <li>
                                    <Link className="dropdown-item py-2 fw-bold" to="/profile">
                                        <i className="fa-regular fa-id-card me-2"></i> Thông tin cá nhân
                                    </Link>
                                </li>


                                {/* CHỈ ADMIN MỚI THẤY DÒNG NÀY */}
                                {user.role === 'ADMIN' && (
                                    <li>
                                        <Link className="dropdown-item py-2 text-danger fw-bold border-top" to="/admin">
                                            <i className="fa-solid fa-user-shield me-2"></i> Trang quản trị AD
                                        </Link>
                                    </li>
                                )}

                                <li>
                                    <Link className="dropdown-item py-2 fw-bold" to="/purchase-history">
                                        <i className="fa-solid fa-clock-rotate-left me-2"></i> LỊCH SỬ ĐƠN HÀNG
                                    </Link>
                                </li>

                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button onClick={handleLogout} className="dropdown-item py-2 text-dark opacity-75">
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        /* CHƯA ĐĂNG NHẬP: Hiện nút Đăng nhập trắng tinh khôi */
                        <Link to="/login" className="btn btn-light btn-sm rounded-0 fw-bold px-4 py-2">
                            ĐĂNG NHẬP
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;