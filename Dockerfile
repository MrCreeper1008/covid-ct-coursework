FROM php:8.0.3-apache-buster
RUN docker-php-ext-install curl mysqli
COPY . /var/www/html/
