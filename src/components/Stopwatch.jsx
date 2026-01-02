import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { useLanguage } from '../hooks/useLanguage'; // Ensure correct import

const Stopwatch = () => {
    const { t } = useLanguage();
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const requestRef = useRef();
    const startTimeRef = useRef();

    const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp - time;
        const newTime = timestamp - startTimeRef.current;
        setTime(newTime);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
            startTimeRef.current = null;
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isRunning]);

    const toggleStopwatch = () => {
        setIsRunning(!isRunning);
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setTime(0);
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const centiseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <GlassPanel className="flex flex-col items-center gap-8 py-8 px-4 md:py-12 md:px-16 backdrop-blur-xl bg-black/20 dark:bg-black/40 border-white/10 text-white shadow-2xl w-full max-w-4xl mx-4">
                <div className="text-[13vw] md:text-9xl font-mono tabular-nums tracking-widest font-bold drop-shadow-2xl w-full text-center">
                    {formatTime(time)}
                </div>

                <div className="flex gap-6">
                    <button
                        onClick={toggleStopwatch}
                        className={`p-4 rounded-full transition-all ${isRunning
                            ? 'bg-red-500/20 text-red-500 border-2 border-red-500 hover:bg-red-500/30'
                            : 'bg-emerald-500/20 text-emerald-500 border-2 border-emerald-500 hover:bg-emerald-500/30'
                            }`}
                    >
                        {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                    </button>

                    <button
                        onClick={resetStopwatch}
                        className="p-4 rounded-full bg-gray-500/20 text-gray-500 border-2 border-gray-500 hover:bg-gray-500/30 transition-all"
                    >
                        <RefreshCw size={32} />
                    </button>
                </div>
            </GlassPanel>
        </div>
    );
};

export default Stopwatch;
