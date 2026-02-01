"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileStack, Download, ArrowRight, Loader2, Merge } from "lucide-react";

import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { AdUnit } from "@/components/google/AdUnit";
import { cn } from "@/lib/utils";

export default function MergePdfPage() {
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
        maxFiles: 20,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    const handleMerge = async () => {
        await processFiles(async (uploadedFiles) => {
            const mergedPdf = await PDFDocument.create();

            for (const file of uploadedFiles) {
                const fileBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(fileBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const savedBytes = await mergedPdf.save();
            return savedBytes;
        });
    };

    return (
        <ToolShell
            title="Merge PDF"
            description="Combine multiple PDF files into one single document in seconds."
            icon={Merge}
            howToUse={
                <ul className="list-disc pl-4 space-y-2">
                    <li>Upload the PDF files you want to merge.</li>
                    <li>Drag and drop to reorder them (coming soon).</li>
                    <li>Click <strong>Merge Files</strong> to process.</li>
                    <li>Download your new single PDF.</li>
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
                        <h2 className="text-2xl font-bold text-slate-900">Your PDF is ready!</h2>
                        <p className="text-slate-600">We've successfully merged {files.length} files for you.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download="merged-document.pdf"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Merged PDF
                            </a>
                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Merge More
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
                    /* Search/Upload State */
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
                                <FileStack className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {isDragActive ? "Drop files here" : "Drop PDFs here"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                or click to browse files from your computer. Up to 20 files supported.
                            </p>
                        </div>

                        {/* File List */}
                        <FilePreviewList files={files} onRemove={removeFile} />

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
                                    onClick={handleMerge}
                                    disabled={isProcessing}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Merging...
                                        </>
                                    ) : (
                                        <>
                                            Merge Files
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
