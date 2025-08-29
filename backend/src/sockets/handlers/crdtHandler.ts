import { getRoomData, getUserInfo } from '../helpers.ts';
import { SocketServer, UsedSocket } from '../socketServer.ts';
import { Op } from '../../../../shared/classes/Crdt.ts';

export function addCRDTHandlers(
    io: SocketServer,
    socket: UsedSocket,
) {
    const roomData = getRoomData(socket);
    const userInfo = getUserInfo(socket, roomData);
    const room = socket.data.roomId;

    socket.on('op', (op: Op) => {
        if (!userInfo.active) return;
        roomData.crdt.integrate(op);
        io.in(room).emit('op', op);
    });

    socket.on('undo', (opId: string) => {
        if (!userInfo.active) return;
        const crdt = roomData.crdt;
        const index = crdt.snapshot().findIndex(o => o.id === opId);
        if (index !== -1) {
            io.in(room).emit('remove', opId);
        }
    });
}
