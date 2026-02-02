package com.huyjava.shop.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users") // Map với bảng users trong SQL
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String fullName; // Hibernate tự map thành full_name trong SQL

    private String email;

    private String phone;

    private String role; // Quan trọng: Lưu chữ "ADMIN" hoặc "USER"
}