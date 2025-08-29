export class Stroke {
    readonly id: string;
    readonly points: Array<{ x: number; y: number }>;
    readonly color: string;
    readonly width: number;
    readonly createdAt: number;

    constructor({
        id,
        points = [],
        color = "#000",
        width = 3,
    }: {
        id: string;
        points?: Array<{ x: number; y: number }>;
        color?: string;
        width?: number;
    }) {
        this.id = id;
        this.points = [...points];
        this.color = color;
        this.width = width;
        this.createdAt = Date.now();
    }

    addPoint(point: { x: number; y: number }): Stroke {
        return new Stroke({
            id: this.id,
            points: [...this.points, point],
            color: this.color,
            width: this.width,
        });
    }
}