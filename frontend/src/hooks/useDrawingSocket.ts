import { Stroke } from '#shared/classes/Stroke';
import { SocketContext, type SocketType } from '@/contexts/SocketsProvider';
import { useContext, useEffect, useRef } from 'react';
import { DrawingCRDT, type Op } from '#shared/classes/crdt';

export function useDrawingSocket(onRender?: (strokes: Map<string, Stroke>) => void) {
    const socket = useContext(SocketContext);
    const crdt = useRef(new DrawingCRDT(crypto.randomUUID()));

    const render = useRef(() => {});

    useEffect(() => {
        if (!onRender) return;
        render.current = () => {
            onRender(crdt.current.view());
        };
    }, [onRender]);

    useEffect(() => {
        if (!socket) return;

        const initFn = (ops: Op[]) => {
            ops.forEach(op => crdt.current.integrate(op));
            render.current();
        };
        const opFn = (op: Op) => {
            crdt.current.integrate(op);
            render.current();
        };
        const removeFn = (id: string) => {
            // remove from local log
            crdt.current.snapshot().findIndex(o => o.id === id);
            render.current();
        };

        socket.on('init', initFn);
        socket.on('op', opFn);
        socket.on('remove', removeFn);

        socket.connect();

        return () => {
            socket.off('init', initFn);
            socket.off('op', opFn);
            socket.off('remove', removeFn);

            socket.disconnect();
        };
    }, [socket]);

    let emit: SocketType['emit'] | (() => void) = () => {};
    let emitWithAck: ReturnType<SocketType['timeout']>['emitWithAck'] | (() => void) = () => {};
    if (socket) {
        emit = (ev, ...args) => {
            return socket.emit(ev, ...args);
        };
        emitWithAck = (ev, ...args) => {
            return socket.timeout(5000).emitWithAck(ev, ...args);
        };
    }

    return {
        crdt: crdt.current,
        emit,
        emitWithAck,
    };
}
