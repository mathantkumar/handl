"use client";

import { useState } from "react";
// @ts-ignore
import { encryptPDF } from "@pdfsmaller/pdf-encrypt-lite";
import { Lock, Download, ArrowRight, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";

import { ToolShell } from "@/components/tool-shell";
import { FilePreviewList } from "@/components/file-preview-list";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { cn } from "@/lib/utils";

export default function ProtectPdfPage() {
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
        maxFiles: 1, // Usually protect one by one for specific passwords
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    const handleProtect = async () => {
        if (!password) return;

        await processFiles(async (uploadedFiles) => {
            const file = uploadedFiles[0];
            const fileBuffer = await file.arrayBuffer();

            // Encrypt the PDF using @pdfsmaller/pdf-encrypt-lite
            const encryptedPdfBytes = await encryptPDF(
                new Uint8Array(fileBuffer),
                password,
                password // Owner password same as user password for now
            );

            return encryptedPdfBytes;
        });
    };

    const handleReset = () => {
        setPassword("");
        reset();
    };

    return (
        <ToolShell
            title="Protect PDF"
            description="Encrypt your PDF with a password and restrict permissions."
            icon={Lock}
            howToUse={
                <ul className="list-disc pl-4 space-y-2">
                    <li>Upload the PDF you want to protect.</li>
                    <li>Enter a strong password.</li>
                    <li>Click <strong>Encrypt PDF</strong>.</li>
                    <li>Download your secured document.</li>
                </ul>
            }
        >
            <div className="space-y-8 p-6">
                {/* Success State */}
                {processedUrl ? (
                    <div className="text-center py-12 space-y-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-4">
                            <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">PDF Protected Successfully!</h2>
                        <p className="text-slate-600">Your document is now encrypted and ready for download.</p>

                        <div className="flex justify-center gap-4 pt-4">
                            <a
                                href={processedUrl}
                                download={`protected-${files[0]?.name}`}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                <Download className="w-5 h-5" />
                                Download Protected PDF
                            </a>
                            <button
                                onClick={handleReset}
                                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                Protect Another
                            </button>
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
                                <Lock className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                                {isDragActive ? "Drop file here" : "Drop PDF to Protect"}
                            </h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">
                                Encrypt your PDF securely in the browser. No file upload to server.
                            </p>
                        </div>

                        {/* File List */}
                        <FilePreviewList files={files} onRemove={removeFile} />

                        {/* Password Input */}
                        {files.length > 0 && (
                            <div className="max-w-sm mx-auto">
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Set Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter a strong password"
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
                                <p className="text-xs text-slate-500 mt-2 text-center">
                                    Make sure to remember this password. It cannot be recovered.
                                </p>
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
                                    onClick={handleProtect}
                                    disabled={isProcessing || !password}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Encrypting...
                                        </>
                                    ) : (
                                        <>
                                            Encrypt PDF
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
