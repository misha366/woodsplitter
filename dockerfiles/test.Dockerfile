FROM php:8.2-fpm-alpine
WORKDIR /var/www/laravel

RUN docker-php-ext-install pdo pdo_mysql

RUN apk --no-cache add g++ autoconf linux-headers make nodejs npm

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=coverage" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

    # А зачем мне мигрейт если лара сама сделает миграцию?
CMD php artisan test --parallel --coverage --min=80
