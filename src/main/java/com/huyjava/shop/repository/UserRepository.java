package com.huyjava.shop.repository;

import com.huyjava.shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Hàm này Spring Data JPA tự hiểu: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);
}