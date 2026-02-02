# Giai đoạn 1: Build ứng dụng bằng Maven (Dùng bản mới Eclipse Temurin)
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# Lệnh đóng gói file .jar (Bỏ qua test cho nhanh)
RUN mvn clean package -DskipTests

# Giai đoạn 2: Chạy ứng dụng (Dùng bản Eclipse Temurin nhẹ và ổn định)
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
# Copy file .jar từ giai đoạn 1 sang
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Chạy app
ENTRYPOINT ["java", "-jar", "app.jar"]