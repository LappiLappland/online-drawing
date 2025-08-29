import { Router } from 'express';
import { validateBody } from '../middlewares/validate.ts';
import { validateCreateRoom } from '../validators/roomValidator.ts';
import RoomController from '../controllers/RoomController.ts';

export const router = Router();

router.get('/rooms', new RoomController().getAll);
router.post('/room', validateBody(validateCreateRoom), new RoomController().create);
