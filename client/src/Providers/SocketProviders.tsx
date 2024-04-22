import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

export type TSocketContext = {
    handleSearchVideo: (text: string) => any;
    title: Object[],
    loading?: boolean
};

const SocketProvider = createContext<TSocketContext | null>(null);
const SocketProviders = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<Object[]>([]);
    const socket = io('http://localhost:8500/')


    const handleSearchVideo = (value: string) => {
        setLoading(true);
        socket.emit('search:video', value);
    };

    const handleSetVideoTitle = (videoTitles: any) => {
        setTitle(videoTitles)
        setLoading(false);
    }

    useEffect(() => {
        socket.on('response:video-title', handleSetVideoTitle)

        // return () => {
        //     socket.off('response:video-title', handleSetVideoTitle)
        // }
    }, [socket])

    return (
        <SocketProvider.Provider value={{ handleSearchVideo, title, loading }}>
            {children}
        </SocketProvider.Provider>
    );
};

export const useSocket = (): TSocketContext | null => {
    const socket = useContext(SocketProvider);
    if (!socket) { console.error('Socket used outside context'); return null }
    return socket;
};

export default SocketProviders;
