"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Unlock, Download, ArrowRight, Loader2, LockOpen, Eye, EyeOff } from "lucide-react";

import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { cn } from "@/lib/utils";
import { AdUnit } from "@/components/google/AdUnit"; // Reusing AdUnit for consistency

export default function UnlockPdfPage() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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

    const handleUnlock = async () => {
        if (!password) return;

        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const fileBuffer = await file.arrayBuffer();

            // Core Logic: Load WITH password, Save WITHOUT password
            // This effectively removes the encryption
            const pdfDoc = await PDFDocument.load(fileBuffer, {
                password: password,
                ignoreEncryption: false
            } as any);

            const savedBytes = await pdfDoc.save();
            return savedBytes;
        });
    };

    const handleReset = () => {
        setPassword("");
        reset();
    };

    return (
        <ToolShell
            title="Unlock PDF"
            description="Remove passwords and restrictions from your PDF documents."
            icon={Unlock}
            howToUse={
                <ul className="list-disc pl-4 space-y-2">
                    <li>Upload the locked PDF file.</li>
                    <li>Enter the correct owner/user password.</li>
                    <li>Click <strong>Unlock PDF</strong>.</li>
                    <li>Download the unprotected version.</li>
                </ul>
            }
        >
            <div className="space-y-8 p-6">
                {/* Success State */}
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <LockOpen className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">PDF Unlocked!</h2>
                        <p className="text-slate-600">The password has been successfully removed.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download={`unlocked-${files[0]?.name}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Unlocked PDF
                            </a>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Unlock Another
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
                                <Unlock className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {isDragActive ? "Drop file here" : "Drop Encrypted PDF"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                Ensure you know the password to remove it securely in the browser.
                            </p>
                        </div>

                        {/* File List */}
                        <FilePreviewList files={files} onRemove={removeFile} />

                        {/* Password Input */}
                        {files.length > 0 && (
                            <div className="max-w-sm mx-auto">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Document Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter the password"
                                        className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
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
                                    onClick={handleUnlock}
                                    disabled={isProcessing || !password}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Decrypting...
                                        </>
                                    ) : (
                                        <>
                                            Unlock PDF
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
