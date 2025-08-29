import type { DrawingOptions } from '#shared/types/DrawingOptions';
import type { Stroke } from '#shared/classes/Stroke';

export interface Tool {
    setOptions(options: DrawingOptions): void;
    beginStroke(id: string, startPoint: { x: number; y: number }): Stroke;
    continueStroke(stroke: Stroke, point: { x: number; y: number }): Stroke;
    endStroke(stroke: Stroke): Stroke;
}
