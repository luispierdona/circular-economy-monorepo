package com.example.demo;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "http://localhost:3000")
public class WasteController {

    private final WasteRepository repository;

    // Dependency Injection
    public WasteController(WasteRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<WasteMetric> getAllMetrics() {
        return repository.findAll();
    }

    @PostMapping
    public WasteMetric createMetric(@Valid @RequestBody WasteMetric newMetric) {
        return repository.save(newMetric);
    }
}