import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./Header";
import Collection from "./Collection";
import Promotion from "./Promotion";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import AdminDashboard from "./AdminDashboard";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "./CartContext";
import Cart from "./Cart";
import { Toaster } from "react-hot-toast";
import Checkout from "./Checkout";
import PurchaseHistory from "./PurchaseHistory";
import NewProducts from "./NewProducts";
import Footer from "./Footer"; // Đã import Footer
import ContactButton from "./ContactButton";
import About from "./About";

// 1. Sửa lại LayoutWrapper để quản lý cả Header và Footer
function LayoutWrapper({ children }) {
  const location = useLocation();

  // Ẩn cả Header và Footer ở trang Admin
  const hideNavOn = ["/admin"];
  const shouldShowNav = !hideNavOn.includes(location.pathname);

  return (
    // Thêm class này để Footer luôn nằm dưới đáy (Sticky Footer)
    <div className="d-flex flex-column min-vh-100">
      
      {/* Chỉ hiện Header nếu không phải trang Admin */}
      {shouldShowNav && <Header />}
      
      {/* Phần nội dung chính (flex-grow-1 giúp đẩy Footer xuống đáy) */}
      <div className="flex-grow-1">
        {children}
      </div>

      {/* Chỉ hiện Footer nếu không phải trang Admin */}
      {shouldShowNav && <Footer />}

      <ContactButton />
      
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Hiện thông báo Toast ở góc phải màn hình */}
        <Toaster position="top-right" reverseOrder={false} />

        <LayoutWrapper>
          <Routes>
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/purchase-history" element={<PurchaseHistory />} />
            <Route path="/new-products" element={<NewProducts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
}

export default App;