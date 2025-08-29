import {
    type RouteConfig,
    index,
    prefix,
    route,
} from '@react-router/dev/routes';

export default [
    ...prefix('online-drawing', [
        index('routes/_index.tsx'),
    ]),
    route('/rooms', 'routes/Rooms.tsx'),
    route('/room/create', 'routes/RoomCreate.tsx'),
    route('/room/:url', 'routes/Room.tsx'),
    route('/offline', 'routes/Offline.tsx'),
    route('/error', 'routes/Error.tsx'),
] satisfies RouteConfig;
