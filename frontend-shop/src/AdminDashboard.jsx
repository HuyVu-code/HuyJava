import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Admin.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    importPrice: "",
    imageUrl: "",
    description: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const loadProducts = () => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  const loadOrders = () => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    } else {
      loadProducts();
      loadOrders();
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = {
        ...form,
        price: Number(form.price),
        importPrice: Number(form.importPrice),
      };
      if (editingId) {
        await axios.put(
          `http://localhost:8080/api/products/${editingId}`,
          dataToSave,
        );
      } else {
        await axios.post("http://localhost:8080/api/products", dataToSave);
      }
      loadProducts();
      document.querySelector(".btn-close").click();
      Swal.fire("THÀNH CÔNG", "Đã cập nhật kho hàng!", "success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    const res = await Swal.fire({
      title: "XÓA SẢN PHẨM?",
      icon: "warning",
      showCancelButton: true,
    });
    if (res.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);
        loadProducts();
        Swal.fire("ĐÃ XÓA", "", "success");
      } catch (err) {
        console.error(err);
      }
    }
  };

  // HÀM DÒNG 100: ĐÃ ĐƯỢC GẮN VÀO NÚT BÊN DƯỚI ĐỂ HẾT LỖI
  const exportToCSV = () => {
    let csvContent = "\uFEFFMã Đơn,Khách Hàng,Tổng Tiền\n";
    orders.forEach((o) => {
      csvContent += `${o.id},${o.customerName},${o.totalPrice}\n`;
    });
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Bao_Cao_HuyJava.csv";
    link.click();
  };

  const chartData = products.map((p) => ({
    name: p.name.substring(0, 10),
    "Giá Vốn": Number(p.importPrice) || 0,
    "Giá Bán": Number(p.price) || 0,
  }));

  return (
    <div
      className="admin-container"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <nav className="navbar navbar-dark bg-black fixed-top py-3 shadow-sm">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            VELVET & SILK | ADMIN
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="btn btn-outline-light btn-sm rounded-0"
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </nav>

      <div className="d-flex" style={{ paddingTop: "80px" }}>
        {/* SIDEBAR GỐC */}
        <div
          className="bg-dark text-white shadow"
          style={{
            width: "280px",
            minHeight: "calc(100vh - 80px)",
            position: "fixed",
          }}
        >
          <ul className="nav flex-column mt-4">
            <li>
              <button
                className={`nav-link w-100 text-start border-0 py-3 px-4 ${activeTab === "products" ? "bg-white text-dark fw-bold" : "text-white-50 bg-transparent"}`}
                onClick={() => setActiveTab("products")}
              >
                SẢN PHẨM
              </button>
            </li>
            <li>
              <button
                className={`nav-link w-100 text-start border-0 py-3 px-4 ${activeTab === "finance" ? "bg-white text-dark fw-bold" : "text-white-50 bg-transparent"}`}
                onClick={() => setActiveTab("finance")}
              >
                TÀI CHÍNH
              </button>
            </li>
            <li>
              <button
                className={`nav-link w-100 text-start border-0 py-3 px-4 ${activeTab === "orders" ? "bg-white text-dark fw-bold" : "text-white-50 bg-transparent"}`}
                onClick={() => setActiveTab("orders")}
              >
                ĐƠN HÀNG
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-grow-1 p-5" style={{ marginLeft: "280px" }}>
          {activeTab === "finance" && (
            <div className="fade-in">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-uppercase">Báo Cáo Tài Chính</h2>
                {/* GẮN HÀM exportToCSV VÀO ĐÂY ĐỂ HẾT LỖI DÒNG 100 */}
                <button
                  className="btn btn-success rounded-0 fw-bold shadow-sm"
                  onClick={exportToCSV}
                >
                  XUẤT FILE BÁO CÁO
                </button>
              </div>
              <div
                className="card p-4 border-0 shadow-sm"
                style={{ height: "400px" }}
              >
                <ResponsiveContainer>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Giá Vốn" fill="#dee2e6" />
                    <Bar dataKey="Giá Bán" fill="#000" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="fade-in">
              <div className="d-flex justify-content-between mb-4">
                <h2 className="fw-bold text-uppercase">Danh Sách Kho</h2>
                <button
                  className="btn btn-dark rounded-0 px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#pModal"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      name: "",
                      price: "",
                      importPrice: "",
                      imageUrl: "",
                      description: "",
                    });
                  }}
                >
                  NHẬP HÀNG MỚI
                </button>
              </div>
              <table className="table table-hover text-center align-middle bg-white shadow-sm">
                <thead className="bg-light">
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá bán</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="text-start ps-4 fw-bold">
                        <img
                          src={p.imageUrl}
                          width="40"
                          height="50"
                          className="me-3"
                        />
                        {p.name}
                      </td>
                      <td className="text-primary fw-bold">
                        {Number(p.price).toLocaleString()} đ
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-dark me-2 rounded-0"
                          data-bs-toggle="modal"
                          data-bs-target="#pModal"
                          onClick={() => {
                            setEditingId(p.id);
                            setForm(p);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-sm btn-danger rounded-0"
                          onClick={() => handleDeleteProduct(p.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="fade-in">
              <h2 className="fw-bold mb-4 text-uppercase">Quản Lý Đơn Hàng</h2>
              <table className="table table-hover text-center align-middle bg-white shadow-sm">
                <thead>
                  <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td className="fw-bold">{order.customerName}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-dark rounded-0"
                          data-bs-toggle="modal"
                          data-bs-target="#orderDetailModal"
                          onClick={() => setSelectedOrder(order)}
                        >
                          CHI TIẾT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL CHI TIẾT ĐƠN HÀNG */}
      <div className="modal fade" id="orderDetailModal" tabIndex="-1">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-0 border-0 shadow-lg">
            <div className="modal-header bg-black text-white rounded-0">
              <h5 className="modal-title fw-bold">ĐƠN #{selectedOrder?.id}</h5>
              <button
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body p-4">
              {selectedOrder?.items?.length > 0 ? (
                <table className="table border text-center">
                  <thead>
                    <tr>
                      <th>Sản phẩm</th>
                      <th>SL</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.productName}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toLocaleString()} đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-danger fw-bold">
                  ⚠️ Đơn hàng rỗng!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL CẬP NHẬT SẢN PHẨM */}
      <div className="modal fade" id="pModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0 shadow-lg">
            <div className="modal-header bg-black text-white rounded-0">
              <h5 className="modal-title fw-bold">CẬP NHẬT KHO</h5>
              <button
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="small fw-bold">TÊN HÀNG</label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="small fw-bold">GIÁ BÁN</label>
                    <input
                      type="number"
                      className="form-control rounded-0"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">GIÁ VỐN</label>
                    <input
                      type="number"
                      className="form-control rounded-0"
                      value={form.importPrice}
                      onChange={(e) =>
                        setForm({ ...form, importPrice: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small fw-bold">MÔ TẢ</label>
                  <textarea
                    className="form-control rounded-0"
                    rows="3"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <button
                  className="btn btn-dark w-100 py-3 rounded-0 fw-bold shadow-none"
                  type="submit"
                >
                  LƯU DỮ LIỆU
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminDashboard;
