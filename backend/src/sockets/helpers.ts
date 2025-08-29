import { RoomData, roomDataMap } from '../models/Room.ts';
import { UsedSocket } from './socketServer.ts';

export function getRoomData(socket: UsedSocket) {
    const roomData = roomDataMap.get(socket.data.roomId);
    if (!roomData) {
        throw new Error('Unknown room');
    }
    return roomData;
}

export function getUserInfo(socket: UsedSocket, roomData: RoomData) {
    const userInfo = roomData.users.get(socket.data.id);
    if (!userInfo) {
        throw new Error('Unknown user');
    }
    return userInfo;
}
