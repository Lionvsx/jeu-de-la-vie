"use client";

import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";
import { useGameOfLife } from "./hooks/use-game-of-life";
import Matrix from "@/components/matrix";

export default function Home() {
  const {
    grid,
    isRunning,
    gridSize,
    generationSpeed,
    toggleCell,
    resetGrid,
    setGridSize,
    setGenerationSpeed,
    setIsRunning,
  } = useGameOfLife(10, 1000);

  return (
    <div className="flex justify-between items-center h-screen w-screen">
      <Matrix grid={grid} isRunning={isRunning} toggleCell={toggleCell} />
      <Sidebar
        gridSize={gridSize}
        setGridSize={setGridSize}
        generationSpeed={generationSpeed}
        setGenerationSpeed={setGenerationSpeed}
        isRunning={isRunning}
        resetGrid={resetGrid}
        setIsRunning={setIsRunning}
      />
    </div>
  );
}