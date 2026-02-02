import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/auth/login', loginForm);
            
            // 1. Lưu user vào máy để hệ thống nhận diện
            localStorage.setItem('user', JSON.stringify(res.data));
            
            // 2. PHÁT TÍN HIỆU ĐỒNG BỘ: Giúp Header hiện Icon + Tên ngay lập tức
            window.dispatchEvent(new Event('userUpdated'));
            
            // 3. Thông báo Toast xịn sò ở góc màn hình
            Swal.fire({
                icon: 'success',
                title: 'ĐĂNG NHẬP THÀNH CÔNG',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            });

            // 4. Phân quyền chuyển hướng: Admin vào kho, User về trang chủ
            setTimeout(() => {
                navigate(res.data.role === 'ADMIN' ? '/admin' : '/');
            }, 1000);

        } catch (err) {
            console.error("Lỗi đăng nhập:", err); // Fix lỗi unused-vars
            Swal.fire({
                icon: 'error',
                title: 'THẤT BẠI',
                text: 'Sai tên đăng nhập hoặc mật khẩu!',
                confirmButtonColor: '#000'
            });
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 overflow-hidden" style={{fontFamily: "'Poppins', sans-serif"}}>
            <div className="row g-0 h-100">
                {/* ẢNH BÊN TRÁI NGUYÊN BẢN CỦA HUY */}
                <div className="col-md-7 d-none d-md-block" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')",
                    backgroundSize: 'cover', backgroundPosition: 'center'
                }}></div>
                
                <div className="col-md-5 d-flex align-items-center justify-content-center bg-white p-5">
                    <div style={{ maxWidth: '400px', width: '100%' }}>
                        <div className="text-center mb-5">
                            <h1 style={{fontFamily: "'Playfair Display', serif", letterSpacing: '4px'}} className="fw-bold">VELVET & SILK</h1>
                            <p className="text-muted small text-uppercase" style={{letterSpacing: '1px'}}>Fashion Management System</p>
                        </div>
                        <form onSubmit={handleLogin}>
                            {/* INPUT CHỈ CÓ GẠCH CHÂN - KHÔNG KHUNG ĐÚNG Ý HUY */}
                            <input 
                                type="text" 
                                placeholder="USERNAME" 
                                className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" 
                                required
                                onChange={e => setLoginForm({...loginForm, username: e.target.value})} 
                            />
                            
                            <input 
                                type="password" 
                                placeholder="PASSWORD" 
                                className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" 
                                required
                                onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                            />
                            
                            <div className="d-flex justify-content-between mb-4 small text-muted">
                                <div><input type="checkbox" id="remember" className="me-1"/> <label htmlFor="remember">Ghi nhớ</label></div>
                                <a href="#" className="text-decoration-none text-muted">Quên mật khẩu?</a>
                            </div>

                            <button className="btn btn-dark w-100 py-3 rounded-0 fw-bold tracking-widest text-uppercase">Đăng Nhập</button>
                        </form>
                        <p className="text-center mt-5 small text-muted">
                            Chưa có tài khoản? <Link to="/register" className="text-dark fw-bold text-decoration-none">Đăng ký ngay</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;