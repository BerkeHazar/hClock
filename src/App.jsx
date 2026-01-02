import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './hooks/useLanguage.jsx';
import { BackgroundProvider } from './contexts/BackgroundContext';
import Background from './components/Background';
import Navigation from './components/Navigation';
import Clock from './components/Clock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState('clock');

  return (
    <>
      <Background />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="relative z-10 w-full min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full flex justify-center"
          >
            {activeTab === 'clock' && <Clock />}
            {activeTab === 'stopwatch' && <Stopwatch />}
            {activeTab === 'timer' && <Timer />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* About Section Button (Desktop bottom right or similar, keeping it subtle) */}
      {/* We can incorporate About into Navigation or a small link */}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BackgroundProvider>
          <MainContent />
        </BackgroundProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
