import React from 'react';
import { useTime } from '../hooks/useTime';
import { format } from 'date-fns';
import { tr, enUS, fr, de } from 'date-fns/locale';
import { useLanguage } from '../hooks/useLanguage';
import GlassPanel from './GlassPanel';

const locales = { tr, en: enUS, fr, de };

const Clock = () => {
    const { time } = useTime();
    const { language } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center p-4 w-full h-full">
            <GlassPanel className="flex flex-col items-center justify-center gap-0 backdrop-blur-xl bg-transparent border-none shadow-none text-white drop-shadow-2xl">

                {/* Time Row - Single Line strictly */}
                <div className="flex items-baseline justify-center leading-none">
                    <h1 className="text-[20vw] md:text-[14rem] font-bold tracking-tighter tabular-nums leading-none">
                        {format(time, 'HH:mm')}
                    </h1>
                </div>

                {/* Date Row - Single Line below */}
                <div className="flex items-center gap-4 mt-4 opacity-80">
                    <h2 className="text-[4vw] md:text-[2.5rem] font-medium tracking-widest uppercase text-white/90 leading-none">
                        {format(time, 'd MMMM EEEE', { locale: locales[language] })}
                    </h2>
                </div>

            </GlassPanel>
        </div>
    );
};

export default Clock;
