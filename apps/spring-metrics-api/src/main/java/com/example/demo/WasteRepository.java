package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WasteRepository extends JpaRepository<WasteMetric, Long> {
    // Aquí no hace falta escribir código. 
    // Al extender JpaRepository, Spring ya te regala los métodos:
    // save(), findAll(), findById(), delete(), etc.
}