"use client";

import { useState, useEffect } from "react";
import { ToolShell } from "@/components/tool-shell";
import { LayoutGrid } from "lucide-react";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { FilePreviewList } from "@/components/file-preview-list";
import { PDFDocument } from "pdf-lib";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const PageGrid = dynamic(() => import("@/components/pdf/page-grid").then(mod => mod.PageGrid), {
    ssr: false,
    loading: () => <div className="h-64 w-full animate-pulse bg-slate-100 rounded-xl" />
});


export default function OrganizePdfPage() {
    const [pageCount, setPageCount] = useState(0);
    // For now, "Organize" will just allow viewing. Full Drag & Drop reordering is complex.
    // We will implement a simpler version where you can view pages.
    // Future improvement: Add DnD.

    const {
        files,
        getRootProps,
        getInputProps,
        isDragActive,
        removeFile,
        reset
    } = usePdfProcessor({
        maxFiles: 1,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    // Load page count when file is selected
    useEffect(() => {
        if (files.length > 0) {
            const loadPdf = async () => {
                const buffer = await files[0].arrayBuffer();
                const pdf = await PDFDocument.load(buffer);
                setPageCount(pdf.getPageCount());
            };
            loadPdf();
        } else {
            setPageCount(0);
        }
    }, [files]);

    const handleReset = () => {
        setPageCount(0);
        reset();
    };

    return (
        <ToolShell
            title="Organize PDF"
            description="Sort, reorder, and organize pages in your PDF file."
            icon={LayoutGrid}
        >
            <div className="space-y-8 p-6">
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
                            <LayoutGrid className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {isDragActive ? "Drop file here" : "Drop PDF to Organize"}
                        </h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                            View and organize pages. (Reordering coming soon)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <FilePreviewList files={files} onRemove={removeFile} />

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold">Document Pages</h3>
                                <span className="text-sm text-slate-500">
                                    {pageCount} pages
                                </span>
                            </div>

                            <PageGrid
                                file={files[0]}
                                pageCount={pageCount}
                                className="max-h-[600px] overflow-y-auto p-2"
                            />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-slate-100">
                            <button
                                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-400 rounded-xl font-bold cursor-not-allowed"
                                disabled
                            >
                                Reordering Coming Soon
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolShell>
    );
}
