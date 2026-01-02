import React from 'react';
import { motion } from 'framer-motion';

const GlassPanel = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            className={`glass-panel rounded-2xl p-6 ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default GlassPanel;
