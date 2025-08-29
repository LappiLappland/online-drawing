import type { Stroke } from '#shared/classes/Stroke';

export class CanvasRenderer {
    static renderStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
        if (stroke.points.length < 1) return;

        const { points, color, width } = stroke;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        // Quadratic curves allow for smoother lines
        for (let i = 1; i < points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }

        if (points.length > 1) {
            ctx.quadraticCurveTo(
                points[points.length - 2].x,
                points[points.length - 2].y,
                points[points.length - 1].x,
                points[points.length - 1].y,
            );
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    }

    static renderAll(ctx: CanvasRenderingContext2D, strokes: Stroke[]) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        strokes.forEach(stroke => this.renderStroke(ctx, stroke));
    }
}
