"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Loader2, Download, ArrowRight } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { AdUnit } from "@/components/google/AdUnit";
import { cn } from "@/lib/utils";
import JSZip from "jszip";

export default function PdfToJpgPage() {
    // Configure PDF.js worker
    useEffect(() => {
        const loadPdfJs = async () => {
            if (typeof window !== "undefined") {
                const pdfjsLib = await import("pdfjs-dist");
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            }
        };
        loadPdfJs();
    }, []);

    const {
        files,
        isProcessing,
        processedUrl,
        error,
        getRootProps,
        getInputProps,
        isDragActive,
        removeFile,
        processFiles,
        reset
    } = usePdfProcessor({
        maxFiles: 1,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    const handleConvert = async () => {
        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const arrayBuffer = await file.arrayBuffer();

            // Load PDF dynamically
            const pdfjsLib = await import("pdfjs-dist");
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const zip = new JSZip();
            const totalPages = pdf.numPages;

            // Loop through pages
            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);

                // High quality scale
                const viewport = page.getViewport({ scale: 2.0 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                if (!context) throw new Error("Canvas context not available");

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // @ts-expect-error - Types are outdated (v2) vs implementation (v5)
                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                // Convert to Blob
                const blob = await new Promise<Blob>((resolve, reject) => {
                    canvas.toBlob(
                        (b) => (b ? resolve(b) : reject(new Error("Image generation failed"))),
                        "image/jpeg",
                        0.85
                    );
                });

                // Add to zip
                const fileName = `page-${i}.jpg`;
                zip.file(fileName, blob);
            }

            // Generate Zip
            const zipContent = await zip.generateAsync({ type: "blob" });

            // Return with correct type for the hook to handle URL creation
            // The hook expects Blob | Uint8Array. We return Blob.
            // note: We override the type hint in hook usage implicitly by passing a Zip blob.
            return zipContent;
        });
    };

    return (
        <ToolShell
            title="PDF to JPG"
            description="Convert PDF pages to high-quality JPG images."
            icon={ImageIcon}
        >
            <div className="space-y-8 p-6">
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <Download className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Conversion Complete!</h2>
                        <p className="text-slate-600">Your images have been extracted successfully.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download="converted-images.zip"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download ZIP
                            </a>
                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Convert Another
                            </button>
                        </div>

                        {/* Victory Ad */}
                        <div className="max-w-xl mx-auto pt-8">
                            <AdUnit
                                slot="1234567890"
                                format="rectangle"
                                style={{ minHeight: "250px" }}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300",
                                isDragActive
                                    ? "border-blue-500 bg-blue-50/50"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
                            )}
                        >
                            <input {...getInputProps()} />
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-xl mb-4">
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {isDragActive ? "Drop PDF here" : "Drop PDF here"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                Convert PDF pages to JPG images in seconds.
                            </p>
                        </div>

                        <FilePreviewList files={files} onRemove={removeFile} />

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}

                        {files.length > 0 && (
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleConvert}
                                    disabled={isProcessing}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Convert to JPG
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </ToolShell>
    );
}
