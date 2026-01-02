import { useState, useEffect } from 'react';
import axios from 'axios';
import { addMilliseconds } from 'date-fns';

const SYNC_INTERVAL = 60000 * 10; // Sync every 10 minutes

export const useTime = () => {
    const [time, setTime] = useState(new Date());
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const syncTime = async () => {
            try {
                const start = Date.now();
                const response = await axios.get('http://worldtimeapi.org/api/ip');
                const end = Date.now();
                const latency = (end - start) / 2;

                const serverTime = new Date(response.data.datetime);
                const serverTimeMs = serverTime.getTime();
                const localTimeMs = end;

                // Offset = Server - Local
                // Real Time = Local + Offset
                const newOffset = serverTimeMs - localTimeMs + latency;
                setOffset(newOffset);
            } catch (error) {
                console.warn('Time sync failed, using local time', error);
            } finally {
                setLoading(false);
            }
        };

        syncTime();
        const syncId = setInterval(syncTime, SYNC_INTERVAL);
        return () => clearInterval(syncId);
    }, []);

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date(Date.now() + offset));
        }, 100); // Update every 100ms for smooth seconds

        return () => clearInterval(timerId);
    }, [offset]);

    return { time, loading };
};
