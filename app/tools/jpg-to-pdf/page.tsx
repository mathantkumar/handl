"use client";

import { useState } from "react";
import { PDFDocument, PageSizes } from "pdf-lib";
import { Image as ImageIcon, Download, ArrowRight, Loader2, Settings2 } from "lucide-react";

import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { AdUnit } from "@/components/google/AdUnit";
import { cn } from "@/lib/utils";

export default function ImageToPdfPage() {
    const [pageSize, setPageSize] = useState<"a4" | "fit">("fit");

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
        maxFiles: 50,
        acceptedFileTypes: {
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"]
        }
    });

    const handleConvert = async () => {
        await processFiles(async (uploadedFiles) => {
            const pdfDoc = await PDFDocument.create();

            for (const file of uploadedFiles) {
                const fileBuffer = await file.arrayBuffer();
                let image;

                // Embed based on type
                if (file.type === "image/jpeg") {
                    image = await pdfDoc.embedJpg(fileBuffer);
                } else {
                    image = await pdfDoc.embedPng(fileBuffer);
                }

                let page;
                const { width, height } = image.scale(1);

                if (pageSize === "a4") {
                    // A4 is [595.28, 841.89]
                    page = pdfDoc.addPage(PageSizes.A4);
                    const pageWidth = PageSizes.A4[0];
                    const pageHeight = PageSizes.A4[1];

                    // Fit image within margins
                    const margin = 20;
                    const availableWidth = pageWidth - (margin * 2);
                    const availableHeight = pageHeight - (margin * 2);

                    // Calculate scale to fit
                    const scale = Math.min(
                        availableWidth / width,
                        availableHeight / height
                    );

                    const scaledWidth = width * scale;
                    const scaledHeight = height * scale;

                    page.drawImage(image, {
                        x: (pageWidth - scaledWidth) / 2,
                        y: (pageHeight - scaledHeight) / 2,
                        width: scaledWidth,
                        height: scaledHeight,
                    });
                } else {
                    // Fit to Image
                    page = pdfDoc.addPage([width, height]);
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width,
                        height,
                    });
                }
            }

            const savedBytes = await pdfDoc.save();
            return savedBytes;
        });
    };

    return (
        <ToolShell
            title="JPG to PDF"
            description="Convert your images into a professional PDF document."
            icon={ImageIcon}
            howToUse={
                <ul className="list-disc pl-4 space-y-2">
                    <li>Upload JPG or PNG files.</li>
                    <li>Choose your page size settings (A4 or Fit).</li>
                    <li>Click <strong>Convert</strong> to process.</li>
                    <li>Download your document.</li>
                </ul>
            }
        >
            <div className="space-y-8 p-6">
                {/* Success State */}
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <Download className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Conversion Complete!</h2>
                        <p className="text-slate-600">We've converted {files.length} images into a PDF.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download="images-converted.pdf"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </a>
                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Convert More
                            </button>
                        </div>

                        {/* Victory Ad */}
                        <div className="max-w-xl mx-auto pt-8">
                            <AdUnit
                                slot="5555555555"
                                format="rectangle"
                                style={{ minHeight: "250px" }}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Dropzone */}
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
                                {isDragActive ? "Drop images here" : "Drop JPGs or PNGs"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                Convert images to PDF in seconds. Handles standard formats like JPG, PNG.
                            </p>
                        </div>

                        {/* File List */}
                        <FilePreviewList files={files} onRemove={removeFile} />

                        {/* Settings Toggle */}
                        {files.length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between border border-slate-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500">
                                        <Settings2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 text-sm">Page Size</h4>
                                        <p className="text-xs text-slate-500">Choose how images fit on the page</p>
                                    </div>
                                </div>
                                <div className="flex bg-white p-1 rounded-lg border border-slate-200">
                                    <button
                                        onClick={() => setPageSize("fit")}
                                        className={cn(
                                            "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                                            pageSize === "fit" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        Fit to Image
                                    </button>
                                    <button
                                        onClick={() => setPageSize("a4")}
                                        className={cn(
                                            "px-4 py-1.5 text-xs font-bold rounded-md transition-all",
                                            pageSize === "a4" ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:bg-slate-50"
                                        )}
                                    >
                                        A4 Size
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}

                        {/* Action Bar */}
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
                                            Converting...
                                        </>
                                    ) : (
                                        <>
                                            Convert to PDF
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
