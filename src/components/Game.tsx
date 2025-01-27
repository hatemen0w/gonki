import Graph from "../modules/Graph/Graph";
import Car from "../modules/Car/Car";
import React, { useEffect, useRef } from "react";

const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    let graph: Graph;
    let myCar: Car;
    let enemyCars: Car[] = [];
    let lives = 5;
    let stopGame = false;

    const initGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        graph = new Graph(canvas.id, 800, 500);
        myCar = new Car("/images/myCar.png", 50, 400);
        enemyCars = [
            new Car("/images/enCar1.png", 50, -150),
            new Car("/images/enCar2.png", 250, -450),
        ];
        initControls();
        render();
    };

    const initControls = () => {
        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") myCar.moveLeft();
            if (event.key === "ArrowRight") myCar.moveRight();
            myCar.updatePosition();
            const currentY = myCar.getY(); 
        myCar.setY(currentY - 2);
            
        });

        window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") myCar.stopMoving();
        });
    };

    const drawBackground = () => {
        graph.clear();
        graph.drawRect("gray");
    };

    const drawLives = () => {
        graph.drawText(`Lives: ${lives}`, 235, 48);
    };

    const updateCars = () => {
        enemyCars.forEach((car) => {
            car.updatePosition();
            graph.drawImage(car.getImage(), car.getX(), car.getY());
            if (checkCollision(myCar, car)) {
                lives -= 1;
                car.resetPosition();
                if (lives <= 0) endGame();
            }
        });
    };

    const checkCollision = (car1: Car, car2: Car): boolean => {
        return (
            car1.getX() < car2.getX() + car2.getWidth() &&
            car1.getX() + car1.getWidth() > car2.getX() &&
            car1.getY() < car2.getY() + car2.getHeight() &&
            car1.getY() + car1.getHeight() > car2.getY()
        );
    };

    const endGame = () => {
        stopGame = true;
        graph.drawText("Game Over", 100, 250, "60px Arial", "red");
    };

    const render = () => {
        if (stopGame) return;

        drawBackground();
        drawLives();
        updateCars();
        graph.drawImage(myCar.getImage(), myCar.getX(), myCar.getY());

        requestAnimationFrame(() => render());
    };

    useEffect(() => {
        initGame();
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} id="gameCanvas" width={500} height={700}></canvas>
        </div>
    );
};

export default Game;