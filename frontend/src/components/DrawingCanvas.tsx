import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { useDrawingEngine } from '@/hooks/useDrawingEngine';
import { useDrawingStore } from '@/stores/drawingStore';
import { getPointerPos } from '@/utils/getPointerPos';
import distance2D from '@/utils/distance2D';
import { Stroke } from '#shared/classes/Stroke';
import type { Point } from '#shared/types/Geometry';
import type { DrawingEngine } from '@/classes/drawing/DrawingEngine';

export interface DrawingCanvasProps {
    onPointerDown?: (stroke: Stroke, point: Point) => void;
    onPointerMove?: (stroke: Stroke, point: Point) => void;
    onEngineReady?: (engine: DrawingEngine) => void;
}

export default function DrawingCanvas({ onPointerDown, onPointerMove, onEngineReady }: DrawingCanvasProps) {
    const drawingStore = useDrawingStore();

    const usedTool = useMemo(() => {
        return new drawingStore.currentTool();
    }, [drawingStore.currentTool]);

    const { canvasRef, engine } = useDrawingEngine(usedTool, drawingStore.options);
    const [isDrawing, setIsDrawing] = useState(false);
    const prevPoint = useRef<null | { x: number; y: number }>(null);

    useEffect(() => {
        if (onEngineReady) onEngineReady(engine);
    }, [engine, onEngineReady]);

    function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
        if (!canvasRef.current) return;
        const point = getPointerPos(e, canvasRef.current);
        const stroke = engine.startStroke(point)!;
        setIsDrawing(true);
        if (onPointerDown) onPointerDown(stroke, point);
    }

    function handlePointerMove(e: PointerEvent<HTMLCanvasElement>) {
        if (!isDrawing) return;
        if (!canvasRef.current) return;
        const point = getPointerPos(e, canvasRef.current);

        if (prevPoint.current) {
            const dist = distance2D(point, prevPoint.current);
            if (dist < 2) return;
        }

        const stroke = engine.continueStroke(point)!;
        prevPoint.current = point;

        if (onPointerMove) onPointerMove(stroke, point);
    }

    function handlePointerUp() {
        if (!isDrawing) return;
        engine.endStroke()!;
        setIsDrawing(false);
    }

    return (
        <canvas
            className="grow w-full touch-none"
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            width={1000}
            height={580}
        >
        </canvas>
    );
}
