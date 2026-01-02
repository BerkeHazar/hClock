import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import GlassPanel from './GlassPanel';
import { useLanguage } from '../hooks/useLanguage';

const PRESETS = [5, 10, 15, 30];

const Timer = () => {
    const { t } = useLanguage();
    const [timeLeft, setTimeLeft] = useState(0);
    const [initialTime, setInitialTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [customVal, setCustomVal] = useState('');

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const setPreset = (minutes) => {
        const seconds = minutes * 60;
        setInitialTime(seconds);
        setTimeLeft(seconds);
        setIsRunning(true);
    };

    const handleCustomStart = (e) => {
        e.preventDefault();
        const val = parseInt(customVal);
        if (val > 0) setPreset(val);
        setCustomVal('');
    };

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0 || initialTime >= 3600) {
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <GlassPanel className="flex flex-col items-center gap-12 py-16 px-12 w-full max-w-4xl backdrop-blur-xl bg-black/20 dark:bg-black/40 border-white/10 text-white shadow-2xl rounded-3xl">
                {timeLeft > 0 || initialTime > 0 ? (
                    /* Active Timer View - Similar to Stopwatch */
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="text-[15vw] md:text-[12rem] font-bold tabular-nums tracking-tighter leading-none drop-shadow-2xl mb-8 font-mono">
                            {formatTime(timeLeft)}
                        </div>

                        <div className="flex items-center gap-8">
                            <button
                                onClick={toggleTimer}
                                className={`p-6 rounded-full transition-all duration-300 ${isRunning
                                    ? 'bg-red-500/80 hover:bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                                    : 'bg-emerald-500/80 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]'
                                    }`}
                            >
                                {isRunning ? <Pause size={48} fill="currentColor" /> : <Play size={48} fill="currentColor" />}
                            </button>

                            <button
                                onClick={resetTimer}
                                className="p-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80"
                            >
                                <RotateCcw size={40} />
                            </button>
                        </div>

                        <button onClick={() => { setTimeLeft(0); setInitialTime(0); setIsRunning(false); }} className="mt-8 text-white/50 hover:text-white underline decoration-white/30 underline-offset-4 transition-colors">
                            {t('settings')}
                        </button>
                    </div>
                ) : (
                    /* Setup View */
                    <div className="flex flex-col w-full gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                        {/* Presets */}
                        <div className="grid grid-cols-4 gap-4 w-full">
                            {PRESETS.map((min) => (
                                <button
                                    key={min}
                                    onClick={() => setPreset(min)}
                                    className="aspect-square flex flex-col items-center justify-center rounded-2xl bg-white/5 hover:bg-white/20 transition-all border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 group text-white"
                                >
                                    <span className="text-3xl md:text-4xl font-bold group-hover:text-blue-300 transition-colors">{min}</span>
                                    <span className="text-xs uppercase tracking-widest opacity-50 font-medium">min</span>
                                </button>
                            ))}
                        </div>

                        <div className="w-full flex items-center gap-4 text-white/30">
                            <div className="h-px bg-current flex-1" />
                            <span className="uppercase tracking-widest text-sm font-semibold">Manuel Giriş</span>
                            <div className="h-px bg-current flex-1" />
                        </div>

                        {/* Custom Input - Stopwatch Style */}
                        <form onSubmit={handleCustomStart} className="w-full relative group">
                            <div className="relative flex items-center justify-center bg-transparent transition-all p-2 gap-4">
                                <input
                                    type="number"
                                    value={customVal}
                                    onChange={(e) => setCustomVal(e.target.value)}
                                    placeholder="0"
                                    min="1"
                                    className="bg-transparent text-center text-8xl font-bold text-white placeholder-white/10 focus:outline-none w-full font-mono py-4 border-b-2 border-white/10 focus:border-white/50 transition-all appearance-none"
                                    autoFocus
                                />
                                <span className="text-3xl uppercase tracking-widest opacity-50 font-medium whitespace-nowrap pt-8">dk</span>

                                {customVal && (
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-400 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/20 transition-all animate-in fade-in zoom-in"
                                    >
                                        <Play size={32} fill="currentColor" />
                                    </button>
                                )}
                            </div>
                            <p className="text-center text-white/30 text-sm mt-4">Süreyi girip enter'a basın</p>
                        </form>
                    </div>
                )}
            </GlassPanel>
        </div>
    );
};

export default Timer;
