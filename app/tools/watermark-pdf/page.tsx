"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { Stamp, Download, ArrowRight, Loader2 } from "lucide-react";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { usePdfActions } from "@/hooks/use-pdf-actions";
import { FilePreviewList } from "@/components/file-preview-list";
import { cn } from "@/lib/utils";

export default function WatermarkPdfPage() {
    const [text, setText] = useState("");
    const [color, setColor] = useState("#FF0000");
    const [opacity, setOpacity] = useState(0.3);

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

    const { watermarkPdf } = usePdfActions();

    const handleWatermark = async () => {
        if (!text) return;
        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const fileBuffer = await file.arrayBuffer();
            return await watermarkPdf(fileBuffer, text, color, opacity);
        });
    };

    const handleReset = () => {
        setText("");
        reset();
    };

    return (
        <ToolShell
            title="Watermark PDF"
            description="Stamp text or images over your PDF pages."
            icon={Stamp}
        >
            <div className="space-y-8 p-6">
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <Stamp className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Watermark Added!</h2>
                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download={`watermarked-${files[0]?.name}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download PDF
                            </a>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Watermark Another
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
                                    <Stamp className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {isDragActive ? "Drop file here" : "Drop PDF to Watermark"}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                    Add custom text watermarks to your documents.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <FilePreviewList files={files} onRemove={removeFile} />

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                                    <h3 className="font-semibold">Watermark Settings</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Text</label>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="e.g. CONFIDENTIAL"
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                                />
                                                <span className="text-sm text-slate-500">{color}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Opacity: {opacity}</label>
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="1"
                                                step="0.1"
                                                value={opacity}
                                                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <button
                                        onClick={handleWatermark}
                                        disabled={isProcessing || !text}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Add Watermark
                                                <ArrowRight className="w-5 h-5" />
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
