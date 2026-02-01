"use client";

import { useEffect } from "react";
import { Reorder } from "framer-motion";
import { Download, Merge, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropZone } from "./drop-zone";
import { FileCard } from "./file-card";
import { ProcessingStatus } from "@/components/ui/processing-status";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { mergePDFs } from "@/lib/pdf-actions";
import Link from "next/link";

export function PdfMerger() {
    const {
        files,
        isLoading,
        error,
        progress,
        processedFileUrl,
        reorderFiles,
        removeFile,
        processFiles,
        reset,
        getRootProps,
        getInputProps,
        isDragActive
    } = usePdfProcessor();

    const handleMerge = () => {
        processFiles(mergePDFs);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Success State */}
            {processedFileUrl ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center animate-in fade-in zoom-in-95 duration-300">
                    <div className="rounded-full bg-green-100 p-4 text-green-600">
                        <Download className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-2">Files Merged Successfully!</h3>
                        <p className="text-muted-foreground">Your document is ready for download.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" onClick={reset}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Merge Another
                        </Button>
                        <a href={processedFileUrl} download="merged-document.pdf">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </Button>
                        </a>
                    </div>
                </div>
            ) : (
                <>
                    {/* Processing Status */}
                    <ProcessingStatus isLoading={isLoading} progress={progress} className="max-w-md mx-auto" />

                    {error && (
                        <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {!isLoading && (
                        <>
                            {/* Drop Zone (Inline) */}
                            {files.length === 0 ? (
                                <div
                                    {...getRootProps()}
                                    className="group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-12 text-center transition-all hover:border-blue-400 hover:bg-blue-50/50"
                                >
                                    <input {...getInputProps()} />
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-blue-100">
                                        <Merge className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-blue-600" />
                                    </div>
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                                        {isDragActive ? "Drop PDF files here" : "Click or Drag PDFs here"}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Select multiple files to merge them instantly.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Add more files area (Mini Dropzone) */}
                                    <div {...getRootProps()} className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input {...getInputProps()} />
                                        <p className="text-sm text-slate-500 font-medium">+ Add more files</p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">
                                            Files to Merge <span className="text-muted-foreground">({files.length})</span>
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={reset}
                                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Clear All
                                        </Button>
                                    </div>

                                    <Reorder.Group axis="y" values={files} onReorder={reorderFiles} className="space-y-2">
                                        {files.map((file) => (
                                            <FileCard key={`${file.name}-${file.lastModified}`} file={file} onRemove={removeFile} />
                                        ))}
                                    </Reorder.Group>

                                    {/* Action Bar */}
                                    <div className="flex justify-end pt-4 border-t">
                                        <Button
                                            onClick={handleMerge}
                                            size="lg"
                                            disabled={isLoading || files.length < 2}
                                        >
                                            <Merge className="mr-2 h-4 w-4" />
                                            {isLoading ? "Merging..." : "Merge PDFs"}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}
