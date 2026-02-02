package com.huyjava.shop.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "orders") // Đổi tên table thành 'orders' để tránh trùng từ khóa SQL
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private Double totalPrice;
    private String status; // PAID hoặc UNPAID

    // Liên kết 1 đơn hàng có nhiều món hàng
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<OrderItem> items;
}