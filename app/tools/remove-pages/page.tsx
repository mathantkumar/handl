"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Trash2, Download, Loader2 } from "lucide-react";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { usePdfActions } from "@/hooks/use-pdf-actions";
import { FilePreviewList } from "@/components/file-preview-list";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const PageGrid = dynamic(() => import("@/components/pdf/page-grid").then(mod => mod.PageGrid), {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse bg-slate-100 rounded-xl" />
});

export default function RemovePagesPage() {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [pageCount, setPageCount] = useState(0);

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

    const { removePages } = usePdfActions();

    // Load page count when file is selected
    useEffect(() => {
        if (files.length > 0) {
            const loadPdf = async () => {
                const buffer = await files[0].arrayBuffer();
                const pdf = await PDFDocument.load(buffer);
                setPageCount(pdf.getPageCount());
                setSelectedIndices([]); // Reset selection
            };
            loadPdf();
        } else {
            setPageCount(0);
            setSelectedIndices([]);
        }
    }, [files]);

    const handleRemove = async () => {
        if (selectedIndices.length === 0) return;

        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const fileBuffer = await file.arrayBuffer();
            return await removePages(fileBuffer, selectedIndices);
        });
    };

    const togglePageSelection = (index: number) => {
        setSelectedIndices(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleReset = () => {
        setPageCount(0);
        setSelectedIndices([]);
        reset();
    };

    return (
        <ToolShell
            title="Remove Pages"
            description="Delete unwanted pages from your PDF document."
            icon={Trash2}
        >
            <div className="space-y-8 p-6">
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <Trash2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Pages Removed Successfully!</h2>
                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download={`modified-${files[0]?.name}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </a>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Start Over
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {files.length === 0 ? (
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
                                    <Trash2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {isDragActive ? "Drop file here" : "Drop PDF to Remove Pages"}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                    Select pages to delete from your document.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <FilePreviewList files={files} onRemove={removeFile} />

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold">Select Pages to Remove</h3>
                                        <span className="text-sm text-slate-500">
                                            {selectedIndices.length} pages selected
                                        </span>
                                    </div>

                                    <PageGrid
                                        file={files[0]}
                                        pageCount={pageCount}
                                        selectedIndices={selectedIndices}
                                        onPageClick={togglePageSelection}
                                        className="max-h-[500px] overflow-y-auto p-2"
                                    />
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <button
                                        onClick={handleRemove}
                                        disabled={isProcessing || selectedIndices.length === 0}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Removing...
                                            </>
                                        ) : (
                                            <>
                                                Remove Pages
                                                <Trash2 className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}
                    </>
                )}
            </div>
        </ToolShell>
    );
}
