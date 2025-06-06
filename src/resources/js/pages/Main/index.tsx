import React, { useRef, useEffect } from "react";
import { MainLayout } from "../../shared/layout/MainLayout";
import Counter from '../../widgets/Counter';
import ProductSlider from '../../widgets/ProductSlider';
import FeedbackSlider from '../../widgets/FeedbackSlider';


import '../../../scss/MainPage.scss';

// @ts-ignore
import firstfullscreenBackground from './assets/firstfullscreenBackground.mp4';
import { Link } from "@inertiajs/inertia-react";

import feedbacks from "./assets/feedbacks";

function Main(props) {
  return <>
      <div className="firstfullscreen">
        <div className="firstfullscreen__overlay"></div>
        <video src={firstfullscreenBackground} muted autoPlay playsInline loop
          className="w-full h-auto firstfullscreen__video"/>
        <div className="firstfullscreen__container container">
          <div className="row">
            <div className="col-12">
              <h1 className="firstfullscreen__title">Woodsplitter</h1>
              <p className="firstfullscreen__subtitle">Wooden Furniture Workshop</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3 firstfullscreen__counter">
                <span className="firstfullscreen__counter-number">
                    <Counter from={0} to={500} duration={2.5} />+
                </span>
                <span className="firstfullscreen__counter-text">
                    orders completed
                </span>
            </div>
            <div className="col-12 col-md-6 col-lg-3 firstfullscreen__counter">
                <span className="firstfullscreen__counter-number">
                    <Counter from={0} to={200} duration={2.5} />+
                </span>
                <span className="firstfullscreen__counter-text">
                    happy customers
                </span>
            </div>
            <div className="col-12 col-md-6 col-lg-3 firstfullscreen__counter">
                <span className="firstfullscreen__counter-number">
                    <Counter from={0} to={10} duration={2.5} />+
                </span>
                <span className="firstfullscreen__counter-text">
                    years of experience
                </span>
            </div>
            <div className="col-12 col-md-6 col-lg-3 firstfullscreen__counter">
                <span className="firstfullscreen__counter-number">
                    <Counter from={0} to={100} duration={2.5} />%
                </span>
                <span className="firstfullscreen__counter-text">
                    quality
                </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 firstfullscreen__catalog">
              <Link href="/catalog" className="firstfullscreen__catalog-link">Catalog</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="advantages container">
        <div className="row">
          <div className="col-12">
            <h2 className="advantages__title">Advantages</h2>
          </div>
          <div className="col-12 col-md-6 advantages__item">
            <div className="advantages__item-icon">
              ✨
            </div>
            <div className="advantages__item-title">
              Индивидуальный подход
            </div>
            <div className="advantages__item-description">
              Мы предлагаем индивидуальный подход к каждому клиенту, учитывая все пожелания и предпочтения.
            </div>
          </div>
          <div className="col-12 col-md-6 advantages__item">
            <div className="advantages__item-icon">
              ✨
            </div>
            <div className="advantages__item-title">
              Индивидуальный подход
            </div>
            <div className="advantages__item-description">
              Мы предлагаем индивидуальный подход к каждому клиенту, учитывая все пожелания и предпочтения.
            </div>
          </div>
          <div className="col-12 col-md-6 advantages__item">
            <div className="advantages__item-icon">
              ✨
            </div>
            <div className="advantages__item-title">
              Индивидуальный подход
            </div>
            <div className="advantages__item-description">
              Мы предлагаем индивидуальный подход к каждому клиенту, учитывая все пожелания и предпочтения.
            </div>
          </div>
          <div className="col-12 col-md-6 advantages__item">
            <div className="advantages__item-icon">
              ✨
            </div>
            <div className="advantages__item-title">
              Индивидуальный подход
            </div>
            <div className="advantages__item-description">
              Мы предлагаем индивидуальный подход к каждому клиенту, учитывая все пожелания и предпочтения.
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        <div className="container">
            <div className="row">
              <div className="col-12">
              <h2 className="products__title">Products</h2>
            </div>
          </div>
        </div>
        <ProductSlider products={[
          {id: 1, title: 'Дубовая кровать', image: '/assets/slide1.jpg'},
          {id: 2, title: 'Тубма из клёна', image: '/assets/slide2.jpg'},
          {id: 3, title: 'Шкаф из дуба', image: '/assets/slide3.jpg'},
          {id: 4, title: 'Стул из берёзы', image: '/assets/slide4.jpg'},
        ]} />
      </div>

      <div className="container contact">
        <div className="row">
          <div className="col-12">
            <h2 className="contact__title">Contact Us</h2>
          </div>
          <div className="col-12 col-md-6">
            <form className="contact__form">
              <input className="contact__field contact__field-name" type="text" placeholder="What should we call you? (example: Mikolay Kuznetsov)" />
              <input className="contact__field contact__field-social" type="text"
                placeholder="How we can contact you? (example: tg: @mikolay_kuznetsov, email: mikolay.kuznetsov@gmail.com)" />
              <textarea className="contact__field contact__field-message" placeholder="Describe your thoughts"></textarea>
              <button className="contact__button" type="submit">Send!</button>
            </form>
            <div className="contact__form-directly">
              Or directly contact us via email: <a href="mailto:woodsplitter@gmail.com">woodsplitter@gmail.com</a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="contact__map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2251.8394362818576!2d33.25548546920398!3d52.0132860016987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1748839017381!5m2!1sru!2sua" width="100%" height="295" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="feedback">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="feedback__title">Feedback</h2>
            </div>
          </div>
        </div>
        <FeedbackSlider feedbacks={feedbacks} />
      </div>
    </>;
}

Main.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Main;
