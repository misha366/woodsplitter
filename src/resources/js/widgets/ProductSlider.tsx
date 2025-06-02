import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../scss/ProductSlider.scss';

const ProductSlider = ({ products }: { products: any[] }) => {
    return (
        <div className="productslider">
            <Swiper
                modules={[Autoplay, Navigation]}
                loop={true}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={true}
                speed={400}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="productslider__item">
                            <img src={product.image} alt={product.title} className="productslider__item-image" />
                            <div className="productslider__item-overlay">
                                <span className="productslider__item-capture">{product.title}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductSlider;
