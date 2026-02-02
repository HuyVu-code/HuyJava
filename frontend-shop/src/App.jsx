import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "./CartContext";
import Cart from "./Cart";
import { Toaster } from "react-hot-toast"; // Thêm cái này để hiện thông báo đẹp
import Checkout from "./Checkout"; // Xóa chữ /pages/ đi là xong
import PurchaseHistory from "./PurchaseHistory"; // Bỏ /pages/ nếu file ở ngoài

// 1. Sửa lại LayoutWrapper để hiện Header ở các trang bán hàng
function LayoutWrapper({ children }) {
  const location = useLocation();

  // Ẩn Header ở trang Admin, còn lại trang Home, ProductDetail, Cart... đều hiện
  const hideHeaderOn = ["/admin"];
  const shouldShowHeader = !hideHeaderOn.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    // BỌC CartProvider NGOÀI CÙNG ĐỂ GIỎ HÀNG CHẠY ĐƯỢC MỌI NƠI
    <CartProvider>
      <Router>
        {/* Hiện thông báo Toast ở góc phải màn hình */}
        <Toaster position="top-right" reverseOrder={false} />

        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;