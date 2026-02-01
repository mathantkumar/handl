"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Loader2, Download, ArrowRight } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import { SuccessModal } from "@/components/SuccessModal";

export default function PdfToJpgPage() {
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [resultFileName, setResultFileName] = useState("converted-images.zip");
    const [showModal, setShowModal] = useState(false);

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
            const blobs: Blob[] = [];

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

                blobs.push(blob);
            }

            // Determine Output Logic
            let finalBlob: Blob;
            let finalName: string;

            if (totalPages === 1) {
                // Single Page -> Return JPEG directly
                finalBlob = blobs[0];
                finalName = file.name.replace(/\.pdf$/i, ".jpg");
            } else {
                // Multiple Pages -> Return ZIP
                blobs.forEach((blob, i) => {
                    const fileName = `page-${i + 1}.jpg`;
                    zip.file(fileName, blob);
                });
                finalBlob = await zip.generateAsync({ type: "blob" });
                finalName = "converted-images.zip";
            }

            // Set state for modal
            setResultBlob(finalBlob);
            setResultFileName(finalName);
            setShowModal(true);

            return finalBlob;
        });
    };

    const handleReset = () => {
        setShowModal(false);
        setResultBlob(null);
        reset();
    };

    return (
        <ToolShell
            title="PDF to JPG"
            description="Convert PDF pages to high-quality JPG images."
            icon={ImageIcon}
        >
            <div className="space-y-8 p-6">
                {/* Upload Area */}
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
            </div>

            <SuccessModal
                isOpen={showModal}
                onClose={handleReset}
                fileUrl={processedUrl}
                fileBlob={resultBlob}
                fileName={resultFileName}
            />
        </ToolShell>
    );
}
