// hooks/useDrawingEngine.ts
import { useEffect, useRef } from 'react';
import { CanvasRenderer } from '../classes/drawing/CanvasRenderer';
import { DrawingEngine } from '../classes/drawing/DrawingEngine';
import { PenTool } from '../classes/drawing/tools/PenTool';
import type { DrawingOptions } from '#shared/types/DrawingOptions';
import type { Tool } from '@/classes/drawing/tools/Tool';

export function useDrawingEngine(tool: Tool, options: DrawingOptions) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<DrawingEngine>(new DrawingEngine(new PenTool()));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const engine = engineRef.current;

        const loop = () => {
            requestAnimationFrame(() => {
                if (!ctx) return;
                CanvasRenderer.renderAll(ctx, engine.getAllStrokes());

                loop();
            });
        };
        loop();
    }, []);

    useEffect(() => {
        engineRef.current.setTool(tool, options);
    }, [options, tool]);

    return { canvasRef, engine: engineRef.current };
}
