import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Timer, Hourglass, Settings, Info, Grip, Moon, Sun, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useBackground } from '../contexts/BackgroundContext';
import GlassPanel from './GlassPanel';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
    { id: 'clock', icon: Clock },
    { id: 'stopwatch', icon: Timer },
    { id: 'timer', icon: Hourglass },
];

const Navigation = ({ activeTab, setActiveTab }) => {
    const { t, language, setLanguage, languages } = useLanguage();
    const { refreshBackground } = useBackground();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [isRotating, setIsRotating] = useState(false);

    const cycleLanguage = () => {
        const currentIndex = languages.indexOf(language);
        const nextIndex = (currentIndex + 1) % languages.length;
        setLanguage(languages[nextIndex]);
    };

    const handleRefreshBg = () => {
        setIsRotating(true);
        refreshBackground();
        setTimeout(() => setIsRotating(false), 1000);
    };

    return (
        <>
            {/* Desktop Bubble Menu (Top Left) */}
            <motion.div
                className="hidden md:flex fixed top-6 left-6 z-50 flex-col items-start"
                initial={false}
                animate={isMenuOpen ? "open" : "closed"}
            >
                <GlassPanel
                    className={`
            !p-0 overflow-hidden bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${isMenuOpen ? '!rounded-3xl' : '!rounded-full hover:bg-white/30'}
          `}
                    // Animate width and height for smooth expansion
                    layout
                    style={{
                        width: isMenuOpen ? 300 : 64,
                        height: isMenuOpen ? 'auto' : 64
                    }}
                >
                    <div className="flex flex-col w-full relative">
                        {/* Toggle Button Container - Centered */}
                        {/* Force height 64px to match container, absolute to stay in place during expansion */}
                        <div
                            className="absolute top-0 left-0 z-20 flex items-center justify-center"
                            style={{ width: 64, height: 64 }}
                        >
                            <button
                                className="w-full h-full flex items-center justify-center text-white cursor-pointer hover:rotate-90 transition-transform duration-300 outline-none"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <div className="text-2xl font-light">✕</div> : <Grip size={28} />}
                            </button>
                        </div>

                        {/* Spacer / Content Container */}
                        <AnimatePresence>
                            {isMenuOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col gap-2 p-4 pt-16 w-full"
                                >
                                    {NAV_ITEMS.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
                                            className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all text-white/90 ${activeTab === item.id ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'
                                                }`}
                                        >
                                            <item.icon size={22} />
                                            <span className="font-medium text-lg tracking-wide">{t(item.id)}</span>
                                        </button>
                                    ))}

                                    <div className="h-px bg-white/10 my-2" />

                                    {/* Wallpaper Toggle */}
                                    <button
                                        onClick={handleRefreshBg}
                                        className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-white/10 text-white/90 group"
                                    >
                                        <RefreshCcw size={22} className={`transition-transform duration-700 ${isRotating ? 'rotate-180' : ''}`} />
                                        <span className="font-medium tracking-wide">{t('wallpaper')}</span>
                                    </button>

                                    {/* Theme Toggle Row */}
                                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-white/90">
                                        <span className="font-medium">{t('theme')}</span>
                                        <ThemeToggle />
                                    </div>

                                    {/* Language Row */}
                                    <button onClick={cycleLanguage} className="flex items-center justify-between w-full p-3 rounded-xl hover:bg-white/10 text-white/90">
                                        <span className="font-medium">{t('language')}</span>
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold uppercase border border-white/10">
                                            {language}
                                        </div>
                                    </button>

                                    {/* About Row */}
                                    <button onClick={() => { setShowAbout(true); setIsMenuOpen(false); }} className="flex items-center gap-4 w-full p-3 rounded-xl hover:bg-white/10 text-white/90">
                                        <Info size={22} />
                                        <span className="font-medium">{t('about')}</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </GlassPanel>
            </motion.div>

            {/* Mobile Bottom Navigation - Unchanged */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
                <GlassPanel className="!rounded-full px-6 py-4 flex justify-between items-center shadow-2xl bg-white/10 backdrop-blur-md">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${activeTab === item.id ? 'text-blue-500 -translate-y-1' : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                            {activeTab === item.id && (
                                <motion.div
                                    layoutId="active-dot"
                                    className="absolute -bottom-2 w-1 h-1 bg-current rounded-full"
                                />
                            )}
                        </button>
                    ))}
                    <div className="w-px h-8 bg-black/10 dark:bg-white/10 mx-1" />

                    <ThemeToggle />

                    {/* Mobile Wallpaper Refresh */}
                    <button onClick={handleRefreshBg} className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
                        <RefreshCcw size={24} className={`transition-transform duration-700 ${isRotating ? 'rotate-180' : ''}`} />
                    </button>
                </GlassPanel>
            </div>

            {/* About Modal */}
            <AnimatePresence>
                {showAbout && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setShowAbout(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg"
                        >
                            <GlassPanel className="!bg-black/40 backdrop-blur-xl border-white/20 text-white shadow-2xl p-8 rounded-3xl">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-3xl font-bold tracking-tight">{t('about')}</h2>
                                    <button onClick={() => setShowAbout(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white">✕</button>
                                </div>
                                <div className="prose prose-invert">
                                    <p className="font-semibold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">hClock v1.0</p>
                                    <p className="opacity-80 mt-4 leading-relaxed text-lg">
                                        {language === 'tr'
                                            ? "hClock, estetik ve performansa odaklanarak tasarlanmış, React tabanlı basit ve hızlı bir saat uygulamasıdır."
                                            : "hClock is a simple, fast, and elegant clock application designed with a focus on aesthetics and performance."}
                                    </p>
                                    <div className="my-8 h-px bg-white/10" />
                                    <div className="text-sm opacity-60 space-y-2">
                                        <p className="font-medium uppercase tracking-wider">Tech Stack</p>
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1 rounded-full bg-white/10">React 19</span>
                                            <span className="px-3 py-1 rounded-full bg-white/10">Vite</span>
                                            <span className="px-3 py-1 rounded-full bg-white/10">Tailwind v4</span>
                                            <span className="px-3 py-1 rounded-full bg-white/10">Framer Motion</span>
                                        </div>
                                    </div>
                                    <a href="https://github.com/berkehazar/hClock" target="_blank" className="block mt-8 text-center py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-medium text-white">
                                        GitHub
                                    </a>
                                </div>
                            </GlassPanel>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
