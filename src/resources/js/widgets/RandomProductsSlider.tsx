import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from '@inertiajs/inertia-react';


import 'swiper/css';

import '../../scss/RandomProductsSlider.scss';

export const RandomProductsSlider = ({ products }: { products: any[] }) => {
    return <>
        <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            loop={true}
            grabCursor={true}
            spaceBetween={30}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            className="randomproduct__slider"
        >
            {products.map((product) => (
                <SwiperSlide key={product.id} className="randomproduct">
                    <Link href={`/catalog/${product.id}`} className="randomproduct__wrapper">
                        <div className="randomproduct__image">
                            <img src={JSON.parse(product.images)[0]} alt={product.title} />
                        </div>
                        <div className="randomproduct__price">${product.price_usd}</div>
                        <div className="randomproduct__title">{product.title}</div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </>;
};

