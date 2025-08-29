import { DrawingOptions } from "../types/DrawingOptions";
import { Stroke } from "./stroke";

// crdt.ts
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

  constructor(userId: string) {
    this.userId = userId;
  }

  // 1. Add a new local operation
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

  // 2. Integrate a remote operation (idempotent)
  integrate(op: Op) {
    // skip duplicates
    if (this.log.some(o => o.id === op.id)) return;

    // keep list strictly-ordered by id (lexicographic)
    const idx = this.log.findIndex(o => o.id > op.id);
    if (idx === -1) this.log.push(op);
    else this.log.splice(idx, 0, op);
  }

  // 3. Undo last *own* op
  undo(): Op | null {
    for (let i = this.log.length - 1; i >= 0; i--) {
      if (this.log[i].userId === this.userId) {
        const removed = this.log.splice(i, 1)[0];
        return removed;
      }
    }
    return null;
  }

  // 4. Redo last *own* op that was undone
  redoStack: Op[] = [];
  redo(): Op | null {
    const op = this.redoStack.pop();
    if (op && op.userId === this.userId) {
      this.integrate(op);
      return op;
    }
    return null;
  }

  // 5. view
  view(): Map<string, Stroke> {
    return buildStrokes(this.log);
  }

  // 6. for debugging
  snapshot(): Op[] {
    return [...this.log];
  }
}

// helper
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