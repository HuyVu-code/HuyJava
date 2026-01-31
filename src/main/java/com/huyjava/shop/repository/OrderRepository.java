package com.huyjava.shop.repository;

import com.huyjava.shop.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Để trống ở đây cũng được, Spring Boot tự hiểu các hàm findAll, save, findById rồi
}