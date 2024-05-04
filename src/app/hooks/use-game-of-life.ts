// hooks/useGameOfLife.ts
import { useState, useCallback, useMemo, useEffect, useRef } from "react";

type GameOfLifeHook = {
  grid: boolean[][];
  isRunning: boolean;
  gridSize: number;
  generationSpeed: number;
  toggleCell: (row: number, col: number) => void;
  resetGrid: () => void;
  setGridSize: (size: number) => void;
  setGenerationSpeed: (speed: number) => void;
  setIsRunning: (isRunning: boolean) => void;
};

export function useGameOfLife(
  initialGridSize: number,
  initialGenerationSpeed: number
): GameOfLifeHook {
  const [isRunning, setIsRunning] = useState(false);
  const [gridSize, setGridSize] = useState(initialGridSize);
  const [generationSpeed, setGenerationSpeed] = useState(
    initialGenerationSpeed
  );

  const [grid, setGrid] = useState(() => createGrid(gridSize));
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setGrid(createGrid(gridSize));
  }, [gridSize]);

  function createGrid(size: number): boolean[][] {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));
  }

  const toggleCell = useCallback(
    (row: number, col: number) => {
      if (!isRunning) {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((rowArray, rowIndex) =>
            rowArray.map((cellValue, colIndex) =>
              rowIndex === row && colIndex === col ? !cellValue : cellValue
            )
          );
          return newGrid;
        });
      }
    },
    [isRunning]
  );

  const resetGrid = useCallback(() => {
    setGrid(createGrid(gridSize));
    setIsRunning(false);
  }, [gridSize]);

  useEffect(() => {
    if (isRunning) {
      const runGame = () => {
        setGrid((prevGrid) => {
          const newGrid = generateNextGeneration(prevGrid);
          return newGrid;
        });

        timeoutRef.current = setTimeout(runGame, generationSpeed);
      };

      runGame();
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isRunning, generationSpeed]);

  function generateNextGeneration(grid: boolean[][]): boolean[][] {
    const newGrid = grid.map((row) => [...row]);

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const isAlive = grid[row][col];
        const numNeighbors = countNeighbors(grid, row, col);

        if (isAlive) {
          if (numNeighbors < 2 || numNeighbors > 3) {
            newGrid[row][col] = false;
          }
        } else {
          if (numNeighbors === 3) {
            newGrid[row][col] = true;
          }
        }
      }
    }

    return newGrid;
  }

  function countNeighbors(grid: boolean[][], row: number, col: number): number {
    let count = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;

        const newRow = row + i;
        const newCol = col + j;

        if (
          newRow >= 0 &&
          newRow < gridSize &&
          newCol >= 0 &&
          newCol < gridSize &&
          grid[newRow][newCol]
        ) {
          count++;
        }
      }
    }

    return count;
  }

  return {
    grid,
    isRunning,
    gridSize,
    generationSpeed,
    toggleCell,
    resetGrid,
    setGridSize,
    setGenerationSpeed,
    setIsRunning,
  };
}
