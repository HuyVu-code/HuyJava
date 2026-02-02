package com.huyjava.shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HuyJavaShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(HuyJavaShopApplication.class, args);
        System.out.println("---------------------------------------------");
        System.out.println("   HUY JAVA SHOP - BACKEND IS RUNNING...     ");
        System.out.println("   Port: 8080                                ");
        System.out.println("---------------------------------------------");
    }
}