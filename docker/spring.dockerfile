# Usamos una imagen de Maven para compilar y JDK 17 para correr
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copiamos los archivos de configuración de Maven
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Descargamos las dependencias (esto ayuda a que las builds futuras sean rápidas)
RUN ./mvnw dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Exponemos el puerto de Spring Boot
EXPOSE 8080

# Comando para arrancar en modo desarrollo
CMD ["./mvnw", "spring-boot:run"]