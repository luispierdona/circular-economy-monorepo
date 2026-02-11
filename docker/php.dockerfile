# Cambiamos 8.2 por 8.4
FROM php:8.4-fpm

# El resto se queda exactamente igual
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

EXPOSE 8000

CMD ["sh", "-c", "composer install && php artisan serve --host=0.0.0.0 --port=8000"]