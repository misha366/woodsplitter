['pending', 'processing', 'shipped', 'delivered', 'cancelled']

проект на
ларавел + реакт + инертиа + редакс

как запускать:
1. docker compose up nginx -d
2. docker compose up front.run

Дизайн - апл лайк с жёлтыми/зелёными пастельными цветами, минимализм.

Фишки - фон блюр + кружочек за мышкой + переходы как из барбы жс


!!! ВНИМАНИЕ я скачал фрамер моушн, swiper

### ОБЯЗАТЕЛЬНО ЗАЮЗАТь
https://motion.dev/docs/react-animation#svg-line-drawing


Чтобы нормально работал лоадер надо все роуты указывать в словаре MainLayout.tsx



СТОКИ

Pexels
Категория: woodworking, furniture, carpentry, wood workshop
Прямой поиск: https://www.pexels.com/search/videos/woodworking/

HD и 4K видео

Pixabay
Пример запроса: wood, furniture, woodwork, tools
Прямой поиск: https://pixabay.com/videos/search/woodworking/

Coverr
Меньше видео, но часто очень креативные
Пример поиска: "craft", "wood", "handmade"

Mixkit
Видео профессионального уровня
Запросы: carpentry, woodshop, interior

Videezy
Некоторые видео требуют атрибуции
Много 4K кадров


Структура главной
1. фуллскрин

2. преимущества - сетка 1х4 или 2х2
🪵 Только натуральные материалы
🛠 Ручная сборка
✨ Индивидуальный подход
🚚 Доставка по всей стране

3. наши работы - тут сделать бате доступ из админки, чтобы он мог кастомизировать этот слайдер.
Сделать тупо слайдером на 5 товаров.

4. Отзывы (Testimonials)
Блок с 3-4 отзывами клиентов, Apple часто использует:

крупные кавычки,
минимализм,
чёрно-белые фото,
жирный текст цитаты.

Пример:
«Лучший выбор для интерьера загородного дома. Всё точно по размерам.»
— Мария, Санкт-Петербур

6. Контакты
Карта (если локальная мастерская)
Телефон, WhatsApp, Telegram
Почта
Кнопка "Оставить заявку" или "Связаться"

------------------------------
## Models
### products - продукты
id
title
description
price_usd
images(json arr with paths)

### global cart
id
user_id - many-to-one - показывает чъего юзера этот пункт
product_id - many-to-one - показывает что за продукт
quantity

### basket item
id
basket_id - fk many to one - ссылается на корзину, которой принадлежит
product_id - fk many to one - ссылается на продукт, который есть в корзине
quantity - кол-во выбранного продукта

### order
id
user_id - many to one - какому юзеру принадлежит заказ



### upd user - инфа для заказов (необязательная)
Name
Surname
Number
Email

Если во время cartService->store() Auth::check() даёт тру = сохраняем в cartitems; если нет:
```php
session()->put('cart', [
    ['product_id' => N, 'quantity' => N],
]);
```
Абсолютно аналогичный механизм и для ретрива, если чек даёт фалс - ретрив с сессии, если тру - с cartitems
