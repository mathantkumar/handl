"use client";

import { useEffect, useRef, useState } from "react";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Set worker source
if (typeof window !== "undefined" && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PageThumbnailProps {
    pageIndex: number; // 0-based index
    file: File | ArrayBuffer;
    width?: number;
    className?: string;
    onClick?: () => void;
    selected?: boolean;
}

export function PageThumbnail({
    pageIndex,
    file,
    width = 200,
    className,
    onClick,
    selected
}: PageThumbnailProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const renderPage = async () => {
            setLoading(true);
            setError(null);

            try {
                let arrayBuffer: ArrayBuffer;
                if (file instanceof File) {
                    arrayBuffer = await file.arrayBuffer();
                } else {
                    arrayBuffer = file;
                }

                const loadingTask = pdfjsLib.getDocument(arrayBuffer);
                const pdf = await loadingTask.promise;

                // PDF pages are 1-based
                const page = await pdf.getPage(pageIndex + 1);

                const canvas = canvasRef.current;
                if (!canvas) return;

                const context = canvas.getContext('2d');
                if (!context) return; // Should not happen

                // Calculate scale to match requested width
                const viewport = page.getViewport({ scale: 1.0 });
                const scale = width / viewport.width;
                const scaledViewport = page.getViewport({ scale });

                canvas.height = scaledViewport.height;
                canvas.width = scaledViewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport
                };

                await page.render(renderContext).promise;
            } catch (err) {
                if (isMounted) {
                    console.error("Error rendering thumbnail:", err);
                    setError("Failed to load page");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        renderPage();

        return () => { isMounted = false; };
    }, [file, pageIndex, width]);

    return (
        <div
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer transition-all border-2",
                selected ? "border-blue-500 ring-2 ring-blue-500/20" : "border-slate-200 hover:border-blue-300",
                className
            )}
            style={{ width: width }}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
                    <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
                </div>
            )}

            {error ? (
                <div className="flex items-center justify-center p-4 text-xs text-red-500 text-center h-[200px]">
                    {error}
                </div>
            ) : (
                <canvas ref={canvasRef} className="block max-w-full" />
            )}

            <div className="w-full py-2 bg-slate-50 text-center text-xs font-medium text-slate-500 border-t border-slate-100">
                Page {pageIndex + 1}
            </div>
        </div>
    );
}
