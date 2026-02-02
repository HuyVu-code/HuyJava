package com.huyjava.shop.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Một danh mục có nhiều sản phẩm -> Quan hệ OneToMany (Không bắt buộc map ngược lại nhưng để đây cho tiện)
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}