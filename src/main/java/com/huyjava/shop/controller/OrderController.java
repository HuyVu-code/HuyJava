package com.huyjava.shop.controller;

import com.huyjava.shop.entity.Order;
import com.huyjava.shop.entity.OrderItem;
import com.huyjava.shop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép React gọi API
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // Lấy danh sách đơn hàng (Sắp xếp mới nhất lên đầu)
    @GetMapping
    public List<Order> getAllOrders() {
        // Nếu ông muốn sắp xếp giảm dần theo ID (mới nhất lên trên)
        // return orderRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return orderRepository.findAll(); 
    }

    // Tạo đơn hàng mới
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // 1. Liên kết các món hàng (Items) với Đơn hàng (Order)
        // Vì trong Database quan hệ là Order 1 - n Items
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }

        // 2. Xử lý các trường trạng thái nếu Frontend chưa gửi (Set mặc định)
        // Nhưng code React của mình đã gửi đủ rồi, nên đoạn này chỉ để phòng hờ thôi
        if (order.getPaymentStatus() == null) {
            order.setPaymentStatus("Chưa thanh toán");
        }
        if (order.getDeliveryStatus() == null) {
            order.setDeliveryStatus("Đang xử lý");
        }

        // 3. Lưu xuống Database
        return orderRepository.save(order);
    }
}