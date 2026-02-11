# Circular Economy Impact Tracker

A polyglot monorepo designed to monitor recycling metrics and environmental impact.

## 🏗️ Architecture
This project demonstrates a microservices-oriented approach using:
- **Spring Boot (Java 21):** Handles core operational metrics and CO2 calculations.
- **Laravel 12 (PHP):** Manages business logic and sustainability goals.
- **Next.js 15 (TypeScript):** Unified dashboard using **shadcn/ui** and React Compiler.
- **PostgreSQL:** Shared database for seamless service interoperability.
- **Docker:** Full containerization for consistent development environments.

## 🚀 Getting Started
1. Clone the repository.
2. Ensure you have Docker and Docker Compose installed.
3. Run the following command:
   ```bash
   cd docker && docker compose up -d --build
4. Run the Laravel seeder to initialize global goals:
    ```bash
    docker exec -it laravel-app php artisan db:seed --class=GoalSeeder
5. Access the Dashboard at http://localhost:3000.

## 🛠️ Tech Stack
Frontend: Next.js (App Router), Tailwind CSS, shadcn/ui.
Backends: Spring Data JPA, Laravel Eloquent.
Infrastructure: Docker Compose, PostgreSQL 15.