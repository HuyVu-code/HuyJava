// src/main.jsx
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./CartContext"; //

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      {" "}
      {/* Bọc ở đây là hết lỗi image_6bbc3d.png */}
      <App />
    </CartProvider>
  </React.StrictMode>,
);
