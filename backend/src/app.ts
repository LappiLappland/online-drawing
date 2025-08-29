import express from 'express';
import cors from 'cors';
import { router } from './routes/drawRoutes.ts';
import { createServer } from 'node:http';

export const app = express();
export const server = createServer(app);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api', router);
