import React, { createContext, useContext, useState, useEffect } from 'react';

const BackgroundContext = createContext();

export const CURATED_IMAGES = [
    'https://images.unsplash.com/photo-1663970206579-c157cba7edda?q=80&w=1528&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1659469377768-4f42f2f091c5?q=80&w=687&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1707091568384-66f5fb173763?q=80&w=880&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2032&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1766839236852-2269734af68f?q=80&w=1487&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1766338796939-52e90070d198?q=80&w=1476&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1765476608471-c30c09564def?q=80&w=1469&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1763411711221-40166c5e20cd?q=80&w=1493&auto=format&fit=crop',
];

export const BackgroundProvider = ({ children }) => {
    const [bgImage, setBgImage] = useState(null);
    const [loadError, setLoadError] = useState(false);

    const refreshBackground = () => {
        // Optimistic update or just fetch logic
        // We pick a random one that is DIFFERENT from current if possible
        let randomImage;
        do {
            randomImage = CURATED_IMAGES[Math.floor(Math.random() * CURATED_IMAGES.length)];
        } while (randomImage === bgImage && CURATED_IMAGES.length > 1);

        const img = new Image();
        img.src = randomImage;

        // Only set state when loaded to prevent flickering
        img.onload = () => {
            setBgImage(randomImage);
            setLoadError(false);
        };
        img.onerror = () => setLoadError(true);
    };

    // Initial load
    useEffect(() => {
        refreshBackground();
    }, []);

    return (
        <BackgroundContext.Provider value={{ bgImage, loadError, refreshBackground }}>
            {children}
        </BackgroundContext.Provider>
    );
};

export const useBackground = () => useContext(BackgroundContext);
