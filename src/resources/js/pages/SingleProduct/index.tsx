import React from 'react';

import { MainLayout } from '../../shared/layout/MainLayout';
import { Link, usePage } from '@inertiajs/inertia-react';

import '../../../scss/SingleProduct.scss';
import { SingleProductSlider } from '../../widgets/SingleProductSlider';
import { RandomProductsSlider } from '../../widgets/RandomProductsSlider';

const SingleProduct = () => {
    const { product, random } = usePage().props;

    return <>
        <div className="container">
            <div className="row">
                <div className="col-12 single__title-wrapper">
                    <h1 className="single__title">{product.title}</h1>
                    <Link className="single__back" href="/catalog">
                        <span className="single__back-arrow">&#60;-</span> Back to catalog
                    </Link>
                </div>
            </div>
        </div>
        <div className="container single">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <SingleProductSlider urls={JSON.parse(product.images)} />
                    {/* <SingleProductSlider urls={[
                        '/assets/slide1.jpg',
                        '/assets/slide2.jpg',
                        '/assets/slide3.jpg',
                        '/assets/slide4.jpg',
                        '/assets/slide2.jpg',
                        '/assets/slide3.jpg',
                    ]} /> */}
                    <div className="single__addtocart">
                        <button className="single__addtocart-button">Add to cart</button>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="single__info">
                        <h2 className="single__info-title">${product.price_usd}</h2>
                        <p className="single__info-description">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="container randomproducts">
            <h2 className="randomproducts__title">Other products</h2>
            <div className="row">
                <div className="col-12">
                    <RandomProductsSlider products={random} />
                </div>
            </div>
        </div>
    </>;
};

SingleProduct.layout = (page: any) => <MainLayout children={page} />;

export default SingleProduct;
