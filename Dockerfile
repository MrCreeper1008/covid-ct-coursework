FROM php:8.0.3-apache-buster
RUN apt-get update && apt-get install libcurl4-openssl-dev
RUN docker-php-ext-install curl mysqli
COPY . /var/www/html/
