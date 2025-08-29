import type { Tool } from './Tool';
import { Stroke } from '#shared/classes/Stroke';
import type { DrawingOptions } from '#shared/types/DrawingOptions';

export class PenTool implements Tool {
    private opts: DrawingOptions = { color: '#000', width: 3 };

    toString() {
        return 'pen';
    }

    setOptions(opts: DrawingOptions) {
        this.opts = opts;
    }

    beginStroke(id: string, point: { x: number; y: number }): Stroke {
        return new Stroke({
            id,
            points: [point],
            color: this.opts.color,
            width: this.opts.width,
        });
    }

    continueStroke(stroke: Stroke, point: { x: number; y: number }): Stroke {
        return stroke.addPoint(point);
    }

    endStroke(stroke: Stroke): Stroke {
        return stroke;
    }
}
