import React, {useEffect, useRef} from 'react';
import { MainLayout } from "../../shared/layout/MainLayout";

import '../../../scss/Catalog.scss';
import {Link, usePage} from "@inertiajs/inertia-react";
// @ts-ignore
import Masonry from 'masonry-layout';

const Catalog = () => {
    const { products, auth } = usePage().props;

    const rowRef = useRef(null);

    // @ts-ignore
    console.log(auth);

    useEffect(() => {
        if (rowRef.current) {
            new Masonry(rowRef.current, {
                itemSelector: '.catalog__item-wrapper',
                columnWidth: '.catalog__item-wrapper',
                gutter: 20,
                percentPosition: true
            });
        }
    }, []);

    return <>
        <div className="container catalogtitle">
            <div className="row">
                <div className="col-12">
                    <h1>Catalog</h1>
                </div>
            </div>
        </div>

        <div className="container catalog">
            {(products === null || products.length === 0) &&
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '60px'
                    }}
                >There are no products yet</h3>}

            <div className="row-masonry" ref={rowRef} >
                {!(products === null || products.length === 0) &&
                    products.map((item, index) => (
                    <div key={index} className="catalog__item-wrapper">
                        <Link href={'/catalog/' + item.id}>
                            <div className="catalog__item">
                                <div className="catalog__item-imagewrapper">
                                    <img src={ JSON.parse(item.images)[0] } alt={item.title} className="catalog__item-image"/>
                                </div>
                                <span className="catalog__item-price">
                                    $
                                    {item.price_usd}
                                </span>
                                <span className="catalog__item-title">{item.title}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </>;
};

Catalog.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Catalog;
