import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [showTransition, setShowTransition] = useState(false);
    const page = usePage();

    useEffect(() => {
        const startunsubscribe = Inertia.on('start', () => {
            setShowTransition(true);
        });
        const finishunsubscribe = Inertia.on('finish', () => {
            setShowTransition(false);
        });

        return () => {
            startunsubscribe();
            finishunsubscribe();
        };
    }, []);

    return <div className="container">
        <nav>
            <Link href="/" className="mr-4">Home</Link>
            <Link href="/about">About</Link>
        </nav>
        
        <AnimatePresence mode="wait">
            <motion.div
                key={page.url}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>

        {showTransition && (
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#222',
                    zIndex: 1000,
                }}
            />
        )}
    </div>;
};
