import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [editForm, setEditForm] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        avatar: user?.avatar || ''
    });

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    // HÀM XỬ LÝ CHỌN FILE TỪ MÁY TÍNH
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Biến ảnh thành chuỗi để lưu vào máy
                setEditForm({ ...editForm, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        const updatedUser = { ...user, ...editForm }; 
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Báo cho Header cập nhật ảnh mới ngay lập tức
        window.dispatchEvent(new Event('userUpdated'));

        Swal.fire({
            icon: 'success',
            title: 'THÀNH CÔNG',
            text: 'Đã cập nhật ảnh đại diện từ máy tính!',
            confirmButtonColor: '#000'
        });
    };

    if (!user) return null;

    return (
        <div className="container-fluid bg-light" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '50px', fontFamily: "'Poppins', sans-serif" }}>
            <div className="row justify-content-center g-0">
                <div className="col-md-5 col-lg-4">
                    <div className="card border-0 shadow-sm rounded-0 bg-white p-4 text-center">
                        <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="fw-bold text-uppercase mb-5">Hồ Sơ Của Tôi</h2>

                        {/* PHẦN BẤM VÀO THAY ĐỔI ẢNH */}
                        <div className="position-relative d-inline-block mb-4">
                            <img 
                                src={editForm.avatar || "https://cdn-icons-png.flaticon.com/512/1144/1144760.png"} 
                                className="rounded-circle border p-1" 
                                style={{ width: '130px', height: '130px', objectFit: 'cover', cursor: 'pointer' }} 
                                alt="avatar"
                                onClick={() => document.getElementById('fileInput').click()} // Bấm vào ảnh là chọn file
                            />
                            <button 
                                className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 p-2"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <i className="fa-solid fa-camera"></i>
                            </button>
                            {/* Input chọn file bị ẩn đi cho đẹp */}
                            <input 
                                type="file" 
                                id="fileInput" 
                                hidden 
                                accept="image/*" 
                                onChange={handleFileChange} 
                            />
                        </div>

                        <h4 className="fw-bold text-uppercase">{user.username}</h4>
                        <span className="badge bg-dark rounded-0 px-3 py-2 mb-4">{user.role}</span>

                        <div className="text-start border-top pt-4">
                            <div className="mb-3">
                                <label className="small fw-bold text-muted">HỌ VÀ TÊN</label>
                                <input type="text" className="form-control rounded-0 border-0 border-bottom shadow-none"
                                    value={editForm.fullName} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="small fw-bold text-muted">SỐ ĐIỆN THOẠI</label>
                                <input type="text" className="form-control rounded-0 border-0 border-bottom shadow-none"
                                    value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} />
                            </div>
                        </div>

                        <div className="mt-5 d-grid gap-2">
                            <button className="btn btn-dark rounded-0 py-3 fw-bold text-uppercase" onClick={handleSaveProfile}>LƯU THAY ĐỔI</button>
                            <button className="btn btn-outline-dark rounded-0 py-3 fw-bold text-uppercase" onClick={() => navigate('/')}>VỀ TRANG CHỦ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;