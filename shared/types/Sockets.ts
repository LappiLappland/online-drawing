import { Op } from "../classes/Crdt";
import { ChatMessage } from "./ChatMessage";
import { RoomUser } from "./RoomUser";

export interface ServerToClientEvents {
    remove: (opId: string) => void;
    op: (op: Op) => void;
    init: (ops: Op[]) => void;

    fatal: (message: string) => void;

    initChat: (messages: ChatMessage[], users: RoomUser[], userId: string) => void;
    userLeave: (user: RoomUser) => void;
    userJoin: (user: RoomUser) => void;

    message: (msg: ChatMessage) => void;
}

export interface ClientToServerEvents {
    op: (op: Op) => void;
    undo: (opId: string) => void;
    
    userJoin: (nickname: string, callback: (nickname: string) => void) => void;

    message: (content: string) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
    id: string;
    roomId: string;
}
