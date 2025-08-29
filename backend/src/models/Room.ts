import { DrawingCRDT } from '../../../shared/classes/Crdt.ts';
import { ChatMessage } from '../../../shared/types/ChatMessage.ts';
import { RoomUser } from '../../../shared/types/RoomUser.ts';

export interface RoomData {
    roomName: string;
    isPublic: boolean;
    crdt: DrawingCRDT;
    messages: ChatMessage[];
    users: Map<string, RoomUser>;
}

export const roomDataMap = new Map<string, RoomData>();

// roomDataMap.set('someRoom', {
//     roomName: 'some room',
//     isPublic: true,
//     crdt: new DrawingCRDT('server'),
//     messages: [],
//     users: new Map(),
// })
