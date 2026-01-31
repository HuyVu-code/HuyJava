package com.huyjava.shop.controller;

import com.huyjava.shop.dto.LoginRequest;
import com.huyjava.shop.entity.User;
import com.huyjava.shop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS }, allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // --- LOGIC ĐĂNG NHẬP (GIỮ NGUYÊN CỦA HUY) ---
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 1. Tìm user trong database
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        // 2. Nếu không thấy user
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Tài khoản không tồn tại!");
        }

        User user = userOptional.get();

        // 3. So sánh password thô
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.badRequest().body("Mật khẩu không đúng!");
        }

        // 4. Trả về thông tin user đầy đủ (fullName, role, phone...)
        return ResponseEntity.ok(user);
    }

    // --- LOGIC ĐĂNG KÝ (THÊM MỚI THEO ENTITY CỦA HUY) ---
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // 1. Kiểm tra username trùng
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Tên đăng nhập đã tồn tại!");
        }

        // 2. Gán role mặc định cho member đăng ký từ web
        if (user.getRole() == null) {
            user.setRole("USER");
        }

        // 3. Lưu (fullName và phone sẽ để trống/null nếu không nhập từ form)
        userRepository.save(user);
        return ResponseEntity.ok("Thành công");
    }
}