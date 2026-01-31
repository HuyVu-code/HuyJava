package com.huyjava.shop.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "import_price")
    private Double importPrice;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", columnDefinition = "LONGTEXT") 
    private String imageUrl;

    // --- 1. SỬA LẠI: ĐỔI TÊN BIẾN ĐỂ TRÁNH TRÙNG ---
    // Đổi tên thành categoryEntity (để không chiếm dụng cái tên "category")
    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore 
    private Category categoryEntity;

    // --- 2. QUAN TRỌNG: BIẾN STRING NÀY PHẢI TÊN LÀ "category" ---
    // Để khi Frontend gửi { "category": "..." } lên là nó khớp ngay lập tức!
    @Column(name = "category")
    private String category;

    public Product() {
    }

    // --- GETTER & SETTER ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getImportPrice() { return importPrice; }
    public void setImportPrice(Double importPrice) { this.importPrice = importPrice; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    // Getter & Setter cho Object (Đã đổi tên)
    public Category getCategoryEntity() { return categoryEntity; }
    public void setCategoryEntity(Category categoryEntity) { this.categoryEntity = categoryEntity; }

    // Getter & Setter cho String (QUAN TRỌNG: Get/Set phải tên là Category)
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}