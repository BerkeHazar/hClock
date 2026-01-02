import React, { createContext, useContext, useState, useEffect } from 'react';

const BackgroundContext = createContext();

export const CURATED_IMAGES = [
    // Landscapes & Nature
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop', // Mountain Reflection
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop', // Forest Path
    'https://images.unsplash.com/photo-1501854140884-074bf86ee911?q=80&w=2070&auto=format&fit=crop', // Foggy Mountains
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop', // Starry Night
    'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?q=80&w=2072&auto=format&fit=crop', // Dark Forest
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop', // Misty Forest
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2074&auto=format&fit=crop', // Waterfall
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop', // Yosemite
    'https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=2080&auto=format&fit=crop', // Sunrise
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop', // Alpine Lake

    // Abstract & Minimalist
    'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop', // Liquid Gradient
    'https://images.unsplash.com/photo-1614850523296-63e309ccc84d?q=80&w=2080&auto=format&fit=crop', // Dark Abstract
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2032&auto=format&fit=crop', // White Abstract
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop', // Beach
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop', // Snowy Mountains
    'https://images.unsplash.com/photo-1534067783865-9a2bf5172520?q=80&w=2070&auto=format&fit=crop', // Autumn

    // iOS Style & Gradients
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop', // Colorful Gradient
    'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop', // Blue Purple Gradient
    'https://images.unsplash.com/photo-1621763327670-3848b598d197?q=80&w=2070&auto=format&fit=crop', // Pink Mesh
    'https://images.unsplash.com/photo-1502421946399-63a2cf246231?q=80&w=2070&auto=format&fit=crop', // Abstract Blue
    'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop', // Neon Abstract
    'https://images.unsplash.com/photo-1550684847-75bdda21cc95?q=80&w=2070&auto=format&fit=crop', // Fluid Dark
    'https://images.unsplash.com/photo-1585862095033-c90d8c919588?q=80&w=2070&auto=format&fit=crop', // Gold Fluid
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop', // Abstract Flow
    'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=2068&auto=format&fit=crop', // Dark Mesh
    'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070&auto=format&fit=crop', // Light Abstract
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
