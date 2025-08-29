import { EraserTool } from '@/classes/drawing/tools/EraserTool';
import { PenTool } from '@/classes/drawing/tools/PenTool';
import type { Tool } from '@/classes/drawing/tools/Tool';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Slider } from '@/components/ui/slider';
import { useDrawingStore } from '@/stores/drawingStore';
import { Eraser, Palette } from 'lucide-react';
import React from 'react';

interface DrawingTool {
    id: new () => Tool;
    icon: React.ReactNode;
    label: string;
}

export default function Toolbar() {
    const drawingStore = useDrawingStore();

    const colorOptions = [
        '#000000', '#ef4444', '#f97316', '#eab308',
        '#22c55e', '#3b82f6', '#6366f1', '#8b5cf6',
    ];

    const tools: DrawingTool[] = [
        { id: PenTool, icon: <Palette className="h-4 w-4" />, label: 'Pen' },
        { id: EraserTool, icon: <Eraser className="h-4 w-4" />, label: 'Eraser' },
    ];

    return (
        <div className="flex items-center gap-4 p-3 border-b">
            <div className="flex gap-1">
                {tools.map(tool => (
                    <Button
                        key={tool.id.toString()}
                        variant={drawingStore.currentTool === tool.id ? 'default' : 'outline'}
                        size="icon"
                        onClick={() => drawingStore.setCurrentTool(tool.id)}
                        title={tool.label}
                    >
                        {tool.icon}
                    </Button>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm">Width:</span>
                <Slider
                    className="w-24"
                    min={1}
                    max={20}
                    step={1}
                    value={[drawingStore.options.width]}
                    onValueChange={([value]) => drawingStore.setCurrentWidth(value)}
                />
                <span className="text-sm w-6">{drawingStore.options.width}</span>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-10 p-0"
                        style={{ backgroundColor: drawingStore.options.color }}
                    >
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="grid grid-cols-4 gap-2 p-2">
                        {colorOptions.map(color => (
                            <Button
                                key={color}
                                className="w-6 h-6 rounded-full p-0"
                                style={{ backgroundColor: color }}
                                onClick={() => drawingStore.setCurrentColor(color)}
                            />
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
