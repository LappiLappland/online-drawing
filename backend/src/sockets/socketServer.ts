// src/sockets/socketServer.ts

import { Server as IOServer, Socket } from 'socket.io';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '../../../shared/types/Sockets.ts';
import { handleConnection } from './connection.ts';
import { Server } from 'node:http';

export function initializeSocket(server: Server) {
    const io: SocketServer = new IOServer(
        server, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });

    io.on('connection', (socket) => {
        handleConnection(io, socket);
    });

    return io;
};

export type SocketServer = IOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;

export type UsedSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;
