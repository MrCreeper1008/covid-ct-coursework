FROM php:8.0.3-apache-buster
RUN docker-php-ext-install mysqli
COPY . /var/www/html/
