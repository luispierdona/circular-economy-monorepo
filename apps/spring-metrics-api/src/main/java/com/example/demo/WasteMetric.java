package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "waste_metrics")
public class WasteMetric {

    @Id // <--- ESTA ES LA LÍNEA CRÍTICA
    @GeneratedValue(strategy = GenerationType.IDENTITY) // <--- ESTA TAMBIÉN
    private Long id;

    @NotNull
    @Column(nullable = false)
    private String type;
    
    @NotNull
    @Column(nullable = false)
    private Double weight;
    
    @NotNull
    @Column(nullable = false)
    private Double co2Saved;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // El constructor vacío es vital para Hibernate
    public WasteMetric() {}

    // ... los getters y setters abajo ...
    public Long getId() { return id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public Double getCo2Saved() { return co2Saved; }
    public void setCo2Saved(Double co2Saved) { this.co2Saved = co2Saved; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}