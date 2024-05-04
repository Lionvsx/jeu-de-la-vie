"use client"

import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

type SidebarProps = {
    gridSize: number;
    setGridSize: (size: number) => void;
    generationSpeed: number;
    setGenerationSpeed: (speed: number) => void;
    isRunning: boolean;
    resetGrid: () => void;
    setIsRunning: (isRunning: boolean) => void;
};

export default function Sidebar({
    gridSize,
    setGridSize,
    generationSpeed,
    setGenerationSpeed,
    isRunning,
    resetGrid,
    setIsRunning
}: SidebarProps) {
    return (
        <div className="absolute right-0 hidden md:flex flex-col items-start gap-8">
            <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">Simulation Settings</legend>
                    <div className="grid gap-3">
                        <Label htmlFor="grid-size">Grid Size</Label>
                        <Slider
                            id="grid-size"
                            defaultValue={[gridSize]}
                            max={50}
                            step={1}
                            onValueChange={(value) => setGridSize(value[0])}
                        />
                        {gridSize} x {gridSize}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="speed">Generation Speed (ms)</Label>
                        <Slider
                            id="speed"
                            defaultValue={[generationSpeed]}
                            max={1000}
                            step={50}
                            onValueChange={(value) => setGenerationSpeed(value[0])} />
                        <span>{generationSpeed}</span>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="initial-state">Initial State</Label>
                        <Select>
                            <SelectTrigger id="initial-state">
                                <SelectValue placeholder="Select initial state" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="allDead">All Cells Dead</SelectItem>
                                <SelectItem value="random">Random</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">Display Options</legend>
                    <div className="grid gap-3">
                        <Label htmlFor="cell-color">Cell Color</Label>
                        <Input id="cell-color" type="color" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="background-color">Background Color</Label>
                        <Input id="background-color" type="color" />
                    </div>
                </fieldset>
            </form>
            <div className="flex gap-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => isRunning ? setIsRunning(false) : setIsRunning(true)}
                >
                    {isRunning ? "Pause" : "Start"} Game
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={resetGrid}>
                    Reset Grid
                </button>
            </div>
        </div>
    );
}
