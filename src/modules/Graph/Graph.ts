export type TWIN = {
    LEFT: number;
    BOTTOM: number;
    SIDE: number;
};

class Graph {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(id: string, height: number, width: number) {
        const canvasElement = document.getElementById(id);
        if (!(canvasElement instanceof HTMLCanvasElement)) {
            throw new Error("Canvas element not found or invalid.");
        }
        
        this.canvas = canvasElement;
        this.canvas.height = height;
        this.canvas.width = width;
        
        const ctx = this.canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Failed to get 2D context.");
        }
        this.context = ctx;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(color: string): void {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage(image: HTMLImageElement, x: number, y: number): void {
        this.context.drawImage(image, x, y);
    }

    drawText(text: string, x: number, y: number, font = "30px Arial", color = "white"): void {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, x, y);
    }
}

export default Graph;