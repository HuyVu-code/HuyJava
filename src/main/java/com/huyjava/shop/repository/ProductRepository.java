package com.huyjava.shop.repository;

import com.huyjava.shop.entity.Product; // Đảm bảo đúng đường dẫn tới file Product
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Hàm tìm kiếm: Tên chứa từ khóa (không phân biệt hoa thường) VÀ giá nhỏ hơn
    // hoặc bằng mức chọn
    List<Product> findByNameContainingIgnoreCaseAndPriceLessThanEqual(String name, Double price);
}