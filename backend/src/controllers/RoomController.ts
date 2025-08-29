import { Request, Response } from 'express';
import { CreateRoomDTO } from '../validators/roomValidator.ts';
import { RoomData, roomDataMap } from '../models/Room.ts';
import { DrawingCRDT } from '../../../shared/classes/Crdt.ts';

export default class RoomController {
    create(req: Request<unknown, unknown, CreateRoomDTO>, res: Response) {
        const newRoomData: RoomData = {
            roomName: req.body.roomName,
            isPublic: req.body.isPublic,
            crdt: new DrawingCRDT('server'),
            messages: [],
            users: new Map(),
        };

        let id: string | null = null;
        while (!id) {
            id = generateRoomId();
            if (roomDataMap.has(id)) {
                id = null;
            }
        }
        roomDataMap.set(id, newRoomData);

        res.json({
            roomUrl: id,
        });
    }

    getAll(req: Request, res: Response) {
        const rooms = [...roomDataMap.entries()].filter(([, room]) => room.isPublic).map(([url, room]) => {
            return {
                url,
                name: room.roomName,
                count: room.users.size,
            };
        });

        res.json({
            rooms,
        });
    }
}

function generateRoomId(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let id = '';
    for (let i = 0; i < length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        id += char;
    }

    return id;
}
