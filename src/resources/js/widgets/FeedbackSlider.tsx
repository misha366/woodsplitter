import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import '../../scss/FeedbackSlider.scss';

const FeedbackSlider = ({ feedbacks }: { feedbacks: any[] }) => {
    return (<div>
        <Swiper
            modules={[Autoplay]}
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={40}
            loop={true}
            speed={8000}
            // autoplay={{
            //     delay: 0,
            //     disableOnInteraction: false,
            //     pauseOnMouseEnter: true,
            // }}
            grabCursor={true}
            allowTouchMove={true}
        >
            {feedbacks.map((feedback) => (
                <SwiperSlide key={feedback.id}>
                    <div className="feedback__item">
                        <div className="feedback__item-feedback">{feedback.feedback}</div>
                        <div className="feedback__item-bottom">
                            <img className="feedback__item-photo" src={feedback.photo} alt={feedback.name} />
                            <div className="feedback__item-name">{feedback.name}</div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>);
};

export default FeedbackSlider;
