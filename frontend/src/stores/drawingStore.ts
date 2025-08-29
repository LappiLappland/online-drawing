import { create } from 'zustand';
import type { DrawingOptions } from '#shared/types/DrawingOptions';
import { immer } from 'zustand/middleware/immer';
import type { Tool } from '@/classes/drawing/tools/Tool';
import { PenTool } from '@/classes/drawing/tools/PenTool';

interface DrawingState {
    currentTool: new () => Tool;
    options: DrawingOptions;
    setCurrentTool: (tool: new () => Tool) => void;
    setCurrentColor: (hex: string) => void;
    setCurrentWidth: (width: number) => void;
}

export const useDrawingStore = create<DrawingState>()(immer(set => ({

    currentTool: PenTool,

    options: {
        color: '#000000',
        width: 3,
    },

    setCurrentTool: (tool: new () => Tool) => set((state) => {
        state.currentTool = tool;
    }),

    setCurrentColor: hex => set((state) => {
        state.options.color = hex;
    }),

    setCurrentWidth: width => set((state) => {
        state.options.width = width;
    }),
})));
