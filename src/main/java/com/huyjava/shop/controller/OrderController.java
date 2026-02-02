package com.huyjava.shop.controller;

import com.huyjava.shop.entity.Order;
import com.huyjava.shop.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
// MỞ QUYỀN ĐỂ FRONTEND KHÔNG BỊ CHẶN
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.OPTIONS })
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Hàm Duyệt Đơn: Đổi trạng thái sang PAID
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return orderRepository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    return ResponseEntity.ok(orderRepository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Thêm hàm này vào file OrderController.java
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        // Khi xóa Order, nhờ có CascadeType.ALL nên OrderItem cũng bị xóa theo
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}