package com.huyjava.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "order_details")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double price;
    private Integer quantity;
    private Double totalPrice;

    // Thuộc đơn hàng nào?
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    // Là sản phẩm gì?
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}