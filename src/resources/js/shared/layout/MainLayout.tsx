import React from "react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { AnimatePresence, motion } from "framer-motion";
// @ts-ignore
import preloader1 from './assets/1.gif';
// @ts-ignore
import preloader2 from './assets/2.gif';
// @ts-ignore
import preloader3 from './assets/3.gif';
// @ts-ignore
import preloader4 from './assets/4.gif';

import '../../../scss/MainLayout.scss';
import {ToastContainer} from "react-toastify";
import LiquidLogo from "../../widgets/LiquidLogo";

const routeTitlesMap: { pattern: RegExp; title: string }[] = [
    { pattern: /^\/$/, title: 'Main' },
    { pattern: /^\/cart$/, title: 'Cart' },
    { pattern: /^\/catalog$/, title: 'Catalog' },
    { pattern: /^\/catalog\/[^/]+$/, title: 'Product' }, // одноуровневые продукты
    { pattern: /^\/cart\/remove\/[^/]+$/, title: 'Removing...' },
    { pattern: /^\/cart\/remove-one-from-product$/, title: 'Removing...' },
    { pattern: /^\/cart\/add-one-to-product$/, title: 'Adding...' },
    { pattern: /^\/checkout$/, title: 'Checkout' },
    { pattern: /^\/login$/, title: 'Login' },
    { pattern: /^\/register$/, title: 'Register' },
    { pattern: /^\/profile$/, title: 'Profile' },
    { pattern: /^\/user\/profile\-information$/, title: 'Updating...' },
    { pattern: /^\/logout$/, title: 'Logout' },
    { pattern: /^\/cart\/clear$/, title: 'Clearing...' },
    { pattern: /^\/cart\/store$/, title: 'Adding...' },
];

const getTitleByUrl = (url: string): string => {
    const found = routeTitlesMap.find(({ pattern }) => pattern.test(url));
    return found ? found.title : null;
};

// @ts-ignore
const preloaders: string[] = [preloader1, preloader2, preloader3, preloader4];

export const MainLayout = ({ children, hideHeaderFooter = false }: { children: React.ReactNode }) => {

    const { auth, cart } = usePage().props;


    const { url } = usePage();
    const [startTransition, setStartTransition] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(getTitleByUrl(url));
    const [hidePreloaderTitle, setHidePreloaderTitle] = useState<boolean>(false);
    const [currentPreloader, setCurrentPreloader] = useState<string>(preloaders[Math.floor(Math.random() * preloaders.length)]);

    useEffect(() => {
        // for transition
        const startunsubscribe = Inertia.on('start', (e: any) => {
            setTitle(getTitleByUrl(e.detail.visit.url.pathname as string));
            setHidePreloaderTitle(false);
            setStartTransition(true);
            setCurrentPreloader(preloaders[Math.floor(Math.random() * preloaders.length)]);
        });
        const finishunsubscribe = Inertia.on('finish', () => {
            // весь смысл в том чтобы поменять изменив стейт сделать ререндер, при котором проиграется анимация
            // сокрытия текста и картинки, и только потом скрыть сам прелоадер.
            // такого эффекта я добиваюсь из-за того что пушу изменение стейта в очередь с делаем 300 сек (каст анимации)
            setHidePreloaderTitle(true);
            setTimeout(() => {
                setStartTransition(false);
            }, 300); // 300ms - время анимации
        });

        return () => {
            startunsubscribe();
            finishunsubscribe();
        };
    }, []);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                draggable
                pauseOnHover
                closeOnClick
            />
            {!hideHeaderFooter && <header className="header">
                <div className={`header__container`}>
                    <motion.div
                        className="header__nav"
                    >
                        <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/" className="header__nav-link">Main</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>
                        <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/catalog" className="header__nav-link">Catalog</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>

                        <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/cart" className="header__nav-link header__nav-cart">
                                Cart
                                {/* Не рендерить если нет товаров в корзине */}
                                {cart.length > 0 &&
                                    <span className="header__nav-cart--itemscount">
                                        {cart.length}
                                    </span>}
                            </Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>

                        {auth.user === null && <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/login" className="header__nav-link">Sign In</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>}

                        
                        {auth.user === null && <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/register" className="header__nav-link">Sign Up</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>}


                        {auth.user !== null && <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link href="/profile" className="header__nav-link">Profile</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>}

                        {auth.user !== null && <motion.div
                            className="header__nav-linkwrapper"
                            whileHover="hover"
                            initial="rest"
                            animate="rest">
                            <Link
                                href="/"
                                className="header__nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    Inertia.post('/logout');
                                }}
                            >Logout</Link>
                            <motion.div className="header__nav-underline" variants={{
                                rest: {scaleX: 0},
                                hover: {scaleX: 1}
                            }}
                            transition={{duration: 0.4, ease: [0.4, 0, 0.2, 1]}}></motion.div>
                        </motion.div>}
                    </motion.div>
                    <LiquidLogo />
                </div>
            </header>}

            <AnimatePresence>
                {startTransition && <motion.div
                    className="transitionContainer"
                    initial={{ x: '100%' }}
                    animate={{ x: '0' }}
                    exit={{ x: '-100%' }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                    <motion.h3
                        className="transitionContainer__title"
                        initial={{ transform: 'translateY(100%)', opacity: 0 }}
                        animate={ !hidePreloaderTitle
                            ? { transform: 'translateY(0)', opacity: 1 }
                            : { transform: 'translateY(-100%)', opacity: 0 }}
                        transition={{ ease: "easeIn", delay: 0.25, duration: 0.2 }}
                    >
                        <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ easeIn: [0.4, 0, 0.2, 1], delay: 1, duration: 1, repeat: Infinity, repeatType: "loop" }}
                        >{title}</motion.span>
                    </motion.h3>
                    <motion.img
                        src={currentPreloader} alt="Loading..."
                        className="transitionContainer__image"
                        initial={{ opacity: 0 }}
                        animate={ !hidePreloaderTitle ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ ease: "easeIn", delay: 0.25, duration: 0.5 }}
                    />
                </motion.div>}
            </AnimatePresence>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px'
                }}>
                <Link href="/checkout">checkout</Link>
                <Link href="/checkout">order</Link>
            </div>

            <div className="page-content">
                {children}
            </div>

            {!hideHeaderFooter && <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <h2 className="footer__title">Woodsplitter Workshop</h2>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="footer__info">
                                <span
                                    className="footer__info-item">2025 Woodsplitter Workshop, All rights reserved</span>
                                <span className="footer__info-item">+380 987 77 6767</span>
                                <span className="footer__info-item">We are always happy to hear from you - feel free to reach out by phone or email! 😉</span>
                                <a href="mailto:info@woodsplitterworkshop.com"
                                   className="footer__info-item">info@woodsplitterworkshop.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>}
        </>
    );
};
