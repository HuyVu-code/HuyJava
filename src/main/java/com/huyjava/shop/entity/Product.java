package com.huyjava.shop.entity; // Sửa package theo log lỗi của ông

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // Import cái này để tránh lỗi vòng lặp

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private Double importPrice;
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    // 👇👇👇 PHẦN QUAN TRỌNG VỪA THÊM VÀO 👇👇👇
    @ManyToOne
    @JoinColumn(name = "category_id") // Liên kết với cột category_id trong database
    @JsonIgnore // Dòng này cực quan trọng: Giúp chặn lỗi vòng lặp vô tận khi tải dữ liệu
    private Category category;
    // 👆👆👆 HẾT PHẦN THÊM 👆👆👆

    public Product() {
    }

    // Getter & Setter cũ
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // 👇 Getter & Setter mới cho Category
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Double getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(Double importPrice) {
        this.importPrice = importPrice;
    }
}
