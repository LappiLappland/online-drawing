/* eslint-disable react-refresh/only-export-components */
import { createContext, type ReactNode } from 'react';
import { type ClientToServerEvents, type ServerToClientEvents } from '#shared/types/Sockets';
import { io, type Socket } from 'socket.io-client';
import { createSearchParams, useNavigate } from 'react-router';

interface SocketsProviderProps {
    children?: ReactNode;
    id: string;
}

export type SocketType = Socket<
    ServerToClientEvents,
    ClientToServerEvents
>;

export const SocketContext = createContext<SocketType | null>(null);

export default function SocketsProvider({ children, id }: SocketsProviderProps) {
    const navigate = useNavigate();

    const socket: SocketType = io('http://localhost:3000', {
        autoConnect: false,
        query: {
            id,
        },
    });

    socket.on('fatal', (message) => {
        navigate({
            pathname: '/error',
            search: createSearchParams({
                text: message,
                code: 'Error',
            }).toString(),
        });
    });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
