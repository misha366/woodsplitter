FROM php:8.2-fpm-alpine
ARG WITH_XDEBUG=false
WORKDIR /var/www/laravel
RUN apk add --no-cache icu-dev
RUN docker-php-ext-install pdo pdo_mysql intl

RUN apk --no-cache add g++ autoconf linux-headers make redis && \
    pecl install redis && \
    docker-php-ext-enable redis

RUN if [ "$WITH_XDEBUG" = "true" ]; then \ 
        apk --no-cache add nodejs npm && \
        pecl install xdebug; \
    else \
        echo "⛔ Xdebug disabled"; \
    fi

COPY xdebug/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini
