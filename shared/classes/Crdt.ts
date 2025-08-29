import { DrawingOptions } from "../types/DrawingOptions";
import { Stroke } from "./stroke";

export interface Op {
  id: string;
  strokeId: string;
  points: { x: number; y: number }[];
  userId: string;
  options?: Partial<DrawingOptions>
}

export type CrdtLog = Op[];

export class DrawingCRDT {
    private log: Op[] = [];
    private userId: string;

    redoStack: Op[] = [];

    constructor(userId: string) {
        this.userId = userId;
    }

    add(strokeId: string, points: { x: number; y: number }[]): Op {
        const op: Op = {
            id: `${this.userId}|${Date.now()}`,
            strokeId,
            points,
            userId: this.userId
        };
        this.integrate(op);
        return op;
    }

    integrate(op: Op) {
        if (this.log.some(o => o.id === op.id)) return;

        const idx = this.log.findIndex(o => o.id > op.id);
        if (idx === -1) this.log.push(op);
        else this.log.splice(idx, 0, op);
    }

    undo(): Op | null {
        for (let i = this.log.length - 1; i >= 0; i--) {
            if (this.log[i].userId === this.userId) {
                const removed = this.log.splice(i, 1)[0];
                return removed;
            }
        }
        return null;
    }

    redo(): Op | null {
        const op = this.redoStack.pop();
        if (op && op.userId === this.userId) {
            this.integrate(op);
            return op;
        }
        return null;
    }

    view(): Map<string, Stroke> {
        return buildStrokes(this.log);
    }

    snapshot(): Op[] {
        return [...this.log];
    }
}

function buildStrokes(log: Op[]): Map<string, Stroke> {
    const map = new Map<string, Stroke>();
    for (const op of log) {
        let stroke = map.get(op.strokeId);
        if (!stroke) {
            stroke = new Stroke({
                id: op.strokeId,
                color: op.options?.color ?? "#000",
                width: op.options?.width ?? 3,
                points: []
            });
            map.set(op.strokeId, stroke);
        }
        stroke.points.push(...op.points);
    }
    return map;
}