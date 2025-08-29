import { useState } from 'react';
import { useDrawingSocket } from '@/hooks/useDrawingSocket';
import { DrawingEngine } from '@/classes/drawing/DrawingEngine';
import DrawingCanvas from './DrawingCanvas';
import { Stroke } from '#shared/classes/Stroke';
import type { Point } from '#shared/types/Geometry';
import { JoinModal } from './modals/JoinModal';

export default function DrawingCanvasOnline() {
    const [engine, setEngine] = useState<DrawingEngine>();
    const [showModal, setShowModal] = useState(true);

    const { emit, emitWithAck, crdt } = useDrawingSocket(!engine
        ? undefined
        : (strokes) => {
                engine.replaceAllStrokes(strokes);
            });

    function handlePointerDown(stroke: Stroke, point: Point) {
        const op = crdt.add(stroke.id, [point]);
        op.options = {
            color: stroke.color,
            width: stroke.width,
        };
        emit('op', op);
    }

    function handlePointerMove(stroke: Stroke, point: Point) {
        const op = crdt.add(stroke.id, [point]);
        emit('op', op);
    }

    return (
        <>
            <DrawingCanvas
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onEngineReady={setEngine}
            />
            <JoinModal
                onRequest={nickname => emitWithAck('userJoin', nickname)}
                onSuccess={() => setShowModal(false)}
                open={showModal}
            />
        </>
    );
}
