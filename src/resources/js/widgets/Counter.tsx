import React, { useEffect, useState } from 'react';
import { useMotionValue, motion, useTransform, animate } from 'framer-motion';


const Counter = ({ from = 0, to = 100, duration = 2 }) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (value) => Math.round(value));
    const [display, setDisplay] = useState(from);
    

    useEffect(() => {
        const controls = animate(count, to, { duration });
        const unsubscribe = rounded.on('change', (value) => setDisplay(value));

        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [count, to, duration]);
    
    return <motion.span>{display}</motion.span>;
};


export default Counter;

