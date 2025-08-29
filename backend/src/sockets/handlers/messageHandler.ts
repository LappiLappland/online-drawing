import { getRoomData, getUserInfo } from '../helpers.ts';
import { SocketServer, UsedSocket } from '../socketServer.ts';
import { ChatMessage } from '../../../../shared/types/ChatMessage.ts';

export function addMessageHandlers(
    io: SocketServer,
    socket: UsedSocket,
) {
    const roomData = getRoomData(socket);
    const userInfo = getUserInfo(socket, roomData);
    const room = socket.data.roomId;

    socket.on('message', (content) => {
        if (!userInfo.active) return;

        const newMsg: ChatMessage = {
            id: `${Date.now().toString()}_${userInfo.id}`,
            type: 'user',
            nickname: userInfo.nickname,
            content,
            timestamp: Date.now(),
        };
        roomData.messages.push(newMsg);
        io.in(room).emit('message', newMsg);
    });
}
