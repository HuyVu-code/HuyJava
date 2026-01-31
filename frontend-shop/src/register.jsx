import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
    const [form, setForm] = useState({ 
        username: '', 
        password: '', 
        email: '', 
        phone: '', 
        fullName: '', 
        role: 'USER' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/api/auth/register', form);
            
            // 1. Lưu user vào máy để hệ thống nhận diện
            localStorage.setItem('user', JSON.stringify(res.data));
            
            // 2. PHÁT TÍN HIỆU ĐỒNG BỘ cho Header hiện Icon ngay
            window.dispatchEvent(new Event('userUpdated'));
            
            setIsLoading(false);

            Swal.fire({
                icon: 'success',
                title: 'ĐĂNG KÝ THÀNH CÔNG!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

            // 3. Phi thẳng về Home đúng ý Huy
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setIsLoading(false);
            console.error("Lỗi:", err);
            Swal.fire({
                icon: 'error',
                title: 'LỖI',
                text: typeof err.response?.data === 'string' ? err.response.data : 'Không thể đăng ký!',
                confirmButtonColor: '#000'
            });
        }
    };

    return (
        <div className="container-fluid vh-100 p-0 overflow-hidden" style={{fontFamily: "'Poppins', sans-serif"}}>
            {/* Hiệu ứng ĐANG XỬ LÝ xoay tròn */}
            {isLoading && (
                <div style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(255,255,255,0.85)', zIndex:9999, display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <div className="spinner-border text-dark mb-3"></div>
                    <p className="fw-bold small tracking-widest text-uppercase">Đang xử lý dữ liệu...</p>
                </div>
            )}

            <div className="row g-0 h-100">
                {/* ẢNH BÊN TRÁI NGUYÊN BẢN */}
                <div className="col-md-7 d-none d-md-block" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8')",
                    backgroundSize: 'cover', backgroundPosition: 'center'
                }}></div>

                <div className="col-md-5 d-flex align-items-center justify-content-center bg-white p-5">
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        <div className="text-center mb-5">
                            <h1 style={{fontFamily: "'Playfair Display', serif", letterSpacing: '4px'}} className="fw-bold">VELVET & SILK</h1>
                            <p className="text-muted small text-uppercase">Fashion Management System</p>
                        </div>
                        
                        <form onSubmit={handleRegister}>
                            {/* INPUT CHỈ CÓ GẠCH CHÂN ĐÚNG MẪU CŨ */}
                            <input type="text" placeholder="USERNAME" className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" required
                                onChange={e => setForm({...form, username: e.target.value})} />
                            
                            <input type="email" placeholder="EMAIL" className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" required
                                onChange={e => setForm({...form, email: e.target.value})} />
                            
                            <input type="tel" placeholder="PHONE NUMBER" className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" required
                                onChange={e => setForm({...form, phone: e.target.value})} />
                            
                            <input type="password" placeholder="PASSWORD" className="form-control mb-4 rounded-0 border-0 border-bottom py-3 shadow-none" required
                                onChange={e => setForm({...form, password: e.target.value})} />
                            
                            <button type="submit" className="btn btn-dark w-100 py-3 rounded-0 fw-bold tracking-widest mt-4">
                                ĐĂNG KÝ TÀI KHOẢN
                            </button>
                        </form>
                        
                        <div className="text-center mt-5">
                            <p className="small text-muted">
                                Đã có tài khoản? <Link to="/login" className="text-black fw-bold text-decoration-none">Đăng nhập ngay</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;