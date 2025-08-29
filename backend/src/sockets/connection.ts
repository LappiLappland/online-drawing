import { SocketServer, UsedSocket } from './socketServer.ts';
import { RoomUser } from '../../../shared/types/RoomUser.ts';
import { addUserHandlers } from './handlers/userHandlers.ts';
import { addMessageHandlers } from './handlers/messageHandler.ts';
import { addCRDTHandlers } from './handlers/crdtHandler.ts';
import { roomDataMap } from '../models/Room.ts';

export function handleConnection(io: SocketServer, socket: UsedSocket) {
    socket.on('error', (err) => {
        console.error('Socket error', err);
        socket.disconnect(true);
    });

    const room = socket.handshake.query.id;
    if (!room || Array.isArray(room)) {
        socket.emit('fatal', 'No room to join provided');
        socket.disconnect(true);
        return;
    };

    const roomData = roomDataMap.get(room);
    if (!roomData) {
        socket.emit('fatal', `Room with id "${room}" does not exist`);
        socket.disconnect(true);
        return;
    };

    socket.join(room);
    socket.data.id = `${socket.id}`;
    socket.data.roomId = room;

    const userInfo: RoomUser = {
        id: socket.data.id,
        nickname: socket.data.id,
        active: false,
    };

    roomData.users.set(userInfo.id, userInfo);

    socket.emit('init', roomDataMap.get(room)!.crdt.snapshot());
    socket.emit('initChat', roomData.messages, [...roomData.users.values()].filter(e => e.active), userInfo.id);

    addUserHandlers(io, socket);
    addMessageHandlers(io, socket);
    addCRDTHandlers(io, socket);
}
