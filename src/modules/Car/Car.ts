class Car {
    private image: HTMLImageElement;
    private x: number;
    private y: number;
    private speed: number = 0;
    private width: number = 65;
    private height: number = 100;
    private isLoaded: boolean = false;

    constructor(imageSrc: string, x: number, y: number) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.isLoaded = true;
        };
        this.image.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`);
        };
        this.x = x;
        this.y = y;
    }

    moveLeft(): void {
        this.speed = -15;
    }

    moveRight(): void {
        this.speed = 15;
    }

    stopMoving(): void {
        this.speed = 0;
    }

    updatePosition(): void {
        this.y += 2; //скорость движения вниз
        this.x += this.speed;

        //если машина вышла за экран, сбрасываем ее позицию
        if (this.y > 700) {
            this.resetPosition();
        }
    }

    resetPosition(): void {
        this.y = -100;
        this.x = Math.random() * (500 - this.width);
    }

    getImage(): HTMLImageElement {
        return this.image;
    }

    isImageLoaded(): boolean {
        return this.isLoaded;
    }

    getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(value: number): void {
        this.y = value;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }
}

export default Car;
