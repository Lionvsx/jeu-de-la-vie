// components/Matrix.js
import { useState } from "react";

function Cell({ isAlive, onMouseDown, onMouseEnter }: { isAlive: boolean, onMouseDown: () => void, onMouseEnter: () => void }) {
    const cellStyle = isAlive ? 'bg-black' : 'bg-white';
    return (
        <div
            className={`w-6 h-6 ${cellStyle} border border-gray-200 hover:bg-gray-200 cursor-pointer`}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
        ></div>
    );
}

function Matrix({ grid, isRunning, toggleCell }: { grid: boolean[][], isRunning: boolean, toggleCell: (row: number, col: number) => void }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const numCols = grid[0].length;

    const handleMouseDown = (row: number, col: number) => {
        if (!isRunning) {
            setIsDrawing(true);
            toggleCell(row, col);
        }
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!isRunning && isDrawing) {
            toggleCell(row, col);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center overflow-auto"
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
        >
            <div
                className={`grid gap-1 ${isRunning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
            >
                {grid.map((row, rowIndex) => (
                    row.map((isAlive, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            isAlive={isAlive}
                            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                        />
                    ))
                ))}
            </div>
        </div>
    );
}

export default Matrix;
