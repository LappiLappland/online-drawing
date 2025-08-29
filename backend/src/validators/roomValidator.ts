import z from 'zod';
import { ValidatorFn } from '../middlewares/validate.ts';

export interface CreateRoomDTO {
    roomName: string;
    isPublic: boolean;
}

export const createRoomSchema = z.object({
    roomName: z.string().min(1).trim(),
    isPublic: z.boolean(),
});

export const validateCreateRoom: ValidatorFn = (body: unknown) => {
    const result = createRoomSchema.safeParse(body);
    if (!result.success) {
        return result.error.issues.map((issue) => {
            return issue.message;
        });
    }
};
