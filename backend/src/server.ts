import { server } from './app';
import config from './config/config';
import { initializeSocket } from './sockets/socketServer';

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});

initializeSocket(server);
