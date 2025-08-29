import type { DrawingOptions } from '#shared/types/DrawingOptions';
import { Stroke } from '#shared/classes/Stroke';
import type { Tool } from './tools/Tool';

export class DrawingEngine {
    private strokes: Map<string, Stroke> = new Map();
    private currentStroke: Stroke | null = null;
    private tool: Tool;

    constructor(tool: Tool) {
        this.tool = tool;
    }

    setTool(tool: Tool, opts?: DrawingOptions) {
        this.tool = tool;
        this.currentStroke = null;
        if (opts) {
            this.tool.setOptions(opts);
        }
    }

    updateOptions(opts: DrawingOptions) {
        this.tool.setOptions(opts);
    }

    startStroke(point: { x: number; y: number }) {
        const tempStrokeId = `temp_${Date.now()}`;
        this.currentStroke = this.tool.beginStroke(tempStrokeId, point);
        return this.currentStroke;
    }

    continueStroke(point: { x: number; y: number }): Stroke | null {
        if (!this.currentStroke) return null;

        this.currentStroke = this.tool.continueStroke(this.currentStroke, point);
        return this.currentStroke;
    }

    endStroke(): Stroke | null {
        if (!this.currentStroke) return null;

        const finalizedStroke = this.tool.endStroke(this.currentStroke);
        this.strokes.set(finalizedStroke.id, finalizedStroke);

        const strokeToReturn = finalizedStroke;
        this.currentStroke = null;
        return strokeToReturn;
    }

    getAllStrokes(): Stroke[] {
        const strokes = [...this.strokes.values()];
        if (this.currentStroke) {
            strokes.push(this.currentStroke);
        }
        return strokes;
    }

    replaceAllStrokes(view: Map<string, Stroke>) {
        this.strokes = view;
    }
}
