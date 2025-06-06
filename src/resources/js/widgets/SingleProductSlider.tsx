import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Controller, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

import '../../scss/SingleProductSlider.scss';

export const SingleProductSlider = ({ urls }: { urls: string[] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isSliderHovered, setIsSliderHovered] = useState(false);
    const [mainSwiper, setMainSwiper] = useState(null);

    useEffect(() => {
        if (mainSwiper && thumbsSwiper) {
            mainSwiper.controller.control = thumbsSwiper;
            thumbsSwiper.controller.control = mainSwiper;
        }
    }, [mainSwiper, thumbsSwiper]);

    return <div className="singleslider__wrapper">
        <Swiper
            className="singleslider"
            onSwiper={setMainSwiper}
            modules={[Navigation, Controller, Zoom]}
            zoom={true}
            navigation={true}
        >
            {urls.map((url, _) => (
                <SwiperSlide
                    className="singleslider__item"
                    key={_}
                    onMouseEnter={() => setIsSliderHovered(true)}
                    onMouseLeave={() => setIsSliderHovered(false)}
                >
                    <div className="swiper-zoom-container">
                        <img src={url} alt="SingleProduct" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <span className={`singleslider__tip ${isSliderHovered ? 'singleslider__tip-active' : ''}`}>ℹ️ double click to zoom</span>
        <Swiper
            className="smallsingleslider"
            onSwiper={setThumbsSwiper}
            modules={[Controller]}
            freeMode={false}
            slidesPerView='auto'
            spaceBetween={40}
            centeredSlides={true}
            slideToClickedSlide={true}
            watchSlidesProgress={true}
        >
            {urls.map((url, _) => (
                <SwiperSlide
                    key={_}
                    className="smallsingleslider__item"
                >
                    <img src={url} alt="SingleProduct" />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>;
};

