import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBackground } from '../contexts/BackgroundContext';

const GRADIENTS = [
    'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
    'linear-gradient(135deg, #134e4a 0%, #2dd4bf 100%)',
];

const Background = () => {
    const { bgImage, loadError } = useBackground();

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden">
            <AnimatePresence mode="wait">
                {bgImage ? (
                    <motion.div
                        key={bgImage} // Key change triggers animation
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                ) : loadError ? (
                    <motion.div
                        key="gradient"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0"
                        style={{ background: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)] }}
                    />
                ) : null}
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[2px]" />
        </div>
    );
};

export default Background;
