import React from 'react';
import { MainLayout } from '../../shared/layout/MainLayout';

import '../../../scss/Cart.scss';
import { usePage } from '@inertiajs/inertia-react';
import { toast } from 'react-toastify';
import { Inertia } from '@inertiajs/inertia';

const Cart = () => {
    const { cart } = usePage().props;
    const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.price_usd) * item.quantity;
    }, 0);

    return <>
        <div className="container">
            <div className="row">
                <div className="col-12 cart__title">
                    <h1>Cart</h1>
                </div>
            </div>
        </div>
        <div className="container cartoptions">
            <div className="row">
                <div className="col-9 cartoptions__total">
                    <h3>Total: ${total.toFixed(2)}</h3>
                </div>
                <div className="col-3 cartoptions__buttons">
                    <button
                        className={cart.length === 0 ? 'disabled' : ''}
                        onClick={() => {
                            /// !!!!!!!!!!!!!!!!!!!!!!!!
                            if (cart.length > 0) {
                                Inertia.post('/cart/generate-order', {}, {
                                    onSuccess: () => {
                                        toast.success('Cart cleared', {
                                            className: 'woodsplitter-toast',
                                        });
                                    },
                                    onError: (e) => {
                                        Object.values(e).flat().forEach(msg => toast.error(msg, {
                                            className: 'woodsplitter-toast',
                                        }));
                                    }
                                });
                            }
                        }}
                    >Checkout</button>
                    <button
                        onClick={() => {
                            Inertia.delete('/cart/clear', {
                                onSuccess: () => {
                                    toast.success('Cart cleared', {
                                        className: 'woodsplitter-toast',
                                    });
                                },
                                onError: (e) => {
                                    Object.values(e).flat().forEach(msg => toast.error(msg, {
                                        className: 'woodsplitter-toast',
                                    }));
                                }
                            });
                        }}
                    >Clear Cart</button>
                </div>
            </div>
        </div>
        <div className="container cart">
            <div className="row">
                <div className="col-12">
                    <div className="cart__items">
                        { cart.length === 0 && <h3
                            style={{
                                textAlign: 'center',
                                marginTop: '40px',
                                marginBottom: '40px',
                            }}
                        >Cart is empty</h3> }
                        {cart.map((item, index) => (
                            <div className="cart__item" key={index}>
                                <div className="cart__item-image">
                                    <img src={JSON.parse(item.images)[0]} alt="Product" />
                            </div>
                            <div className="cart__item-info">
                                <a href={`/catalog/${item.product_id}`}  target="_blank">{item.title}</a>
                                <div className="cart__item-price">
                                    ${item.price_usd}
                                </div>
                            </div>
                            <div className="cart__item-remove">
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        Inertia.delete(`/cart/remove/${item.product_id}`, {
                                            onSuccess: () => {
                                                toast.success('Product removed from cart', {
                                                    className: 'woodsplitter-toast',
                                                });
                                            },
                                            onError: (e) => {
                                                Object.values(e).flat().forEach(msg => toast.error(msg, {
                                                    className: 'woodsplitter-toast',
                                                }));
                                            }
                                        });
                                    }}
                                >🗑️</a>
                            </div>
                            <div className="cart__item-quantity">
                                <button
                                    className="cart__item-quantity--minus"
                                    onClick={() => {
                                        Inertia.put('/cart/remove-one-from-product', {
                                            product_id: item.product_id,
                                        }, {
                                            onSuccess: () => {
                                                toast.success('Product removed from cart', {
                                                    className: 'woodsplitter-toast',
                                                });
                                            },
                                            onError: (e) => {
                                                Object.values(e).flat().forEach(msg => toast.error(msg, {
                                                    className: 'woodsplitter-toast',
                                                }));
                                            }
                                        });
                                    }}
                                >-</button>
                                <span>{item.quantity}</span>
                                <button
                                    className="cart__item-quantity--plus"
                                    onClick={() => {
                                        Inertia.put('/cart/add-one-to-product', {
                                            product_id: item.product_id,
                                        }, {
                                            onSuccess: () => {
                                                toast.success('Product added to cart', {
                                                    className: 'woodsplitter-toast',
                                                });
                                            },
                                            onError: (e) => {
                                                Object.values(e).flat().forEach(msg => toast.error(msg, {
                                                    className: 'woodsplitter-toast',
                                                }));
                                            }
                                        });
                                    }}
                                >+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>;
};

Cart.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default Cart;
