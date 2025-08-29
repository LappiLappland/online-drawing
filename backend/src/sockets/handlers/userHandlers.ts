import { getRoomData, getUserInfo } from '../helpers.ts';
import { SocketServer, UsedSocket } from '../socketServer.ts';
import { ChatMessage } from '../../../../shared/types/ChatMessage.ts';
import { roomDataMap } from '../../models/Room.ts';

export function addUserHandlers(
    io: SocketServer,
    socket: UsedSocket,
) {
    const roomData = getRoomData(socket);
    const userInfo = getUserInfo(socket, roomData);
    const room = socket.data.roomId;

    socket.on('userJoin', (nickname, callback) => {
        if (userInfo.active) return;
        let i = 1;
        let usedNickname = nickname;
        while (roomData.users.has(usedNickname)) {
            usedNickname = nickname + ` (${i})`;
            i++;
        }

        userInfo.nickname = usedNickname;
        userInfo.active = true;

        const newMsg: ChatMessage = {
            id: `${Date.now().toString()}_${userInfo.id}`,
            type: 'system',
            timestamp: Date.now(),
            content: `User ${userInfo.nickname} joined`,
        };
        roomData.messages.push(newMsg);
        io.in(room).emit('message', newMsg);
        io.in(room).emit('userJoin', userInfo);

        callback(usedNickname);
    });

    socket.on('disconnect', () => {
        roomData.users.delete(userInfo.id);

        if (roomData.users.size === 0) {
            roomDataMap.delete(room);
            return;
        }

        if (!userInfo.active) return;
        socket.broadcast.in(room).emit('userLeave', userInfo);

        const newMsg: ChatMessage = {
            id: `${Date.now().toString()}_${userInfo.id}`,
            type: 'system',
            timestamp: Date.now(),
            content: `User ${userInfo.nickname} left`,
        };
        roomData.messages.push(newMsg);
        io.in(room).emit('message', newMsg);
    });
}
