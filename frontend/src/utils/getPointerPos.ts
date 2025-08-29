export function getPointerPos(
    e: React.PointerEvent,
    canvas: HTMLCanvasElement,
): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();

    const scale = canvas.width / rect.width;
    return {
        x: (e.clientX - rect.left) * scale,
        y: (e.clientY - rect.top) * scale,
    };
}
