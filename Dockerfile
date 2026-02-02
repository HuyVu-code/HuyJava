# Giai đoạn 1: Build ứng dụng bằng Maven
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Lệnh này sẽ đóng gói code thành file .jar và bỏ qua test (để build cho nhanh)
RUN mvn clean package -DskipTests

# Giai đoạn 2: Chạy ứng dụng bằng JDK rút gọn (nhẹ hơn)
FROM openjdk:17-jdk-slim
WORKDIR /app
# Copy file .jar từ giai đoạn 1 sang giai đoạn 2
COPY --from=build /app/target/*.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Lệnh chạy app
ENTRYPOINT ["java", "-jar", "app.jar"]