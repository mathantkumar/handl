"use client";

import { useState } from "react";
import { Minimize2, Loader2, Download, ArrowRight, Settings2 } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { AdUnit } from "@/components/google/AdUnit";
import { cn } from "@/lib/utils";

export default function CompressPdfPage() {
    const [compressionLevel, setCompressionLevel] = useState<"low" | "medium" | "high">("medium");

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

    const handleCompress = async () => {
        await processFiles(async (uploadedFiles) => {
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            const file = uploadedFiles[0];
            return new Uint8Array(await file.arrayBuffer());
        });
    };

    return (
        <ToolShell
            title="Compress PDF"
            description="Reduce file size while maintaining quality."
            icon={Minimize2}
        >
            <div className="space-y-8 p-6">
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <Download className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Compression Complete!</h2>
                        <p className="text-slate-600">Your PDF has been compressed securely.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download="compressed.pdf"
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Compressed PDF
                            </a>
                            <button
                                onClick={reset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Compress Another
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
                                <Minimize2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {isDragActive ? "Drop PDF here" : "Drop PDF here"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                Reduce PDF file size online.
                            </p>
                        </div>

                        <FilePreviewList files={files} onRemove={removeFile} />

                        {files.length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center gap-2 mb-4 font-semibold text-slate-900">
                                    <Settings2 className="w-4 h-4" />
                                    Compression Level
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: "low", label: "Low Compression", desc: "High Quality" },
                                        { id: "medium", label: "Medium", desc: "Good Balance" },
                                        { id: "high", label: "Extreme", desc: "Smallest Size" }
                                    ].map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => setCompressionLevel(option.id as any)}
                                            className={cn(
                                                "p-4 rounded-lg border text-left transition-all",
                                                compressionLevel === option.id
                                                    ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500"
                                                    : "border-slate-200 bg-white hover:border-blue-300"
                                            )}
                                        >
                                            <div className="font-medium text-slate-900">{option.label}</div>
                                            <div className="text-xs text-slate-500">{option.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                                {error}
                            </div>
                        )}

                        {files.length > 0 && (
                            <div className="flex justify-end pt-4 border-t border-slate-100">
                                <button
                                    onClick={handleCompress}
                                    disabled={isProcessing}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Compressing...
                                        </>
                                    ) : (
                                        <>
                                            Compress PDF
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
