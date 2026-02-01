"use client";

import React, { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { Undo, Eraser, Pen, Trash2 } from "lucide-react";

interface PDFCanvasProps {
    pdfPageImage: string; // Data URL of the PDF page background
}

export interface PDFCanvasHandle {
    exportDrawing: () => Promise<string>;
}

export const PDFCanvas = forwardRef<PDFCanvasHandle, PDFCanvasProps>(({ pdfPageImage }, ref) => {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeColor, setStrokeColor] = useState("#000000");

    // Expose export method to parent
    useImperativeHandle(ref, () => ({
        exportDrawing: async () => {
            if (!canvasRef.current) return "";
            return await canvasRef.current.exportImage("png");
        }
    }));

    const handlePenClick = (color: string) => {
        setEraseMode(false);
        setStrokeColor(color);
        canvasRef.current?.eraseMode(false);
    };

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    const handleUndo = () => {
        canvasRef.current?.undo();
    };

    const handleClear = () => {
        canvasRef.current?.clearCanvas();
    };

    return (
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-700">
                <Button
                    variant={!eraseMode && strokeColor === "#000000" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => handlePenClick("#000000")}
                    title="Black Pen"
                    className="rounded-lg"
                >
                    <div className="w-4 h-4 rounded-full bg-black border border-slate-300" />
                </Button>
                <Button
                    variant={!eraseMode && strokeColor === "#2563EB" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => handlePenClick("#2563EB")}
                    title="Blue Pen"
                    className="rounded-lg"
                >
                    <div className="w-4 h-4 rounded-full bg-blue-600" />
                </Button>
                <Button
                    variant={!eraseMode && strokeColor === "#DC2626" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => handlePenClick("#DC2626")}
                    title="Red Pen"
                    className="rounded-lg"
                >
                    <div className="w-4 h-4 rounded-full bg-red-600" />
                </Button>

                <div className="w-px h-6 bg-slate-200 dark:bg-zinc-700 mx-1" />

                <Button
                    variant={eraseMode ? "secondary" : "ghost"}
                    size="icon"
                    onClick={handleEraserClick}
                    title="Eraser"
                    className="rounded-lg"
                >
                    <Eraser className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                </Button>

                <div className="w-px h-6 bg-slate-200 dark:bg-zinc-700 mx-1" />

                <Button variant="ghost" size="icon" onClick={handleUndo} title="Undo" className="rounded-lg">
                    <Undo className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleClear} title="Clear All" className="rounded-lg hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Canvas Container */}
            <div className="relative w-full aspect-[1/1.414] shadow-2xl rounded-sm overflow-hidden border border-slate-200 dark:border-zinc-700 bg-white">
                {/* Background Image */}
                <img
                    src={pdfPageImage}
                    alt="PDF Page"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0"
                />

                {/* Drawing Layer */}
                <ReactSketchCanvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full"
                    strokeWidth={4}
                    strokeColor={strokeColor}
                    canvasColor="transparent"
                    style={{ border: "none" }}
                />
            </div>

            <p className="text-xs text-slate-400">
                Visual Editor • Page 1
            </p>
        </div>
    );
});

PDFCanvas.displayName = "PDFCanvas";
