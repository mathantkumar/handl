"use client";

import { useState } from "react";
import { ToolShell } from "@/components/tool-shell";
import { RotateCw, Download, ArrowRight, Loader2 } from "lucide-react";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { usePdfActions } from "@/hooks/use-pdf-actions";
import { FilePreviewList } from "@/components/file-preview-list";
import { cn } from "@/lib/utils";

export default function RotatePdfPage() {
    const [rotation, setRotation] = useState(0);

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

    const { rotatePages } = usePdfActions();

    const handleRotate = async () => {
        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const fileBuffer = await file.arrayBuffer();
            return await rotatePages(fileBuffer, [], rotation);
        });
    };

    const handleReset = () => {
        setRotation(0);
        reset();
    };

    return (
        <ToolShell
            title="Rotate PDF"
            description="Rotate specific pages or the entire document permanently."
            icon={RotateCw}
        >
            <div className="space-y-8 p-6">
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <RotateCw className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">PDF Rotated Successfully!</h2>
                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download={`rotated-${files[0]?.name}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Rotated PDF
                            </a>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Rotate Another
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
                                    <RotateCw className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {isDragActive ? "Drop file here" : "Drop PDF to Rotate"}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                    Rotate individual pages or the whole document.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <FilePreviewList files={files} onRemove={removeFile} />

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-center">
                                    <h3 className="font-semibold mb-4">Rotation Settings</h3>
                                    <div className="flex justify-center gap-4">
                                        {[90, 180, 270].map((deg) => (
                                            <button
                                                key={deg}
                                                onClick={() => setRotation(deg)}
                                                className={cn(
                                                    "px-4 py-2 rounded-lg border font-medium transition-all",
                                                    rotation === deg
                                                        ? "bg-blue-600 text-white border-blue-600"
                                                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                                                )}
                                            >
                                                {deg}°
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <button
                                        onClick={handleRotate}
                                        disabled={isProcessing || rotation === 0}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Rotating...
                                            </>
                                        ) : (
                                            <>
                                                Rotate PDF
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
