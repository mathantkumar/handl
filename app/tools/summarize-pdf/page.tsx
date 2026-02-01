"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { Sparkles, Bot, Copy, Check, RefreshCw } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { cn } from "@/lib/utils";
import { AIProgressModal } from "@/components/AIProgressModal";

export default function SummarizePdfPage() {
    const [summary, setSummary] = useState<string | null>(null);
    const [loadingState, setLoadingState] = useState<{ isOpen: boolean; progress: number; status: string; error?: string }>({
        isOpen: false,
        progress: 0,
        status: "loading"
    });

    // Script load state
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    // Use useRef for worker as requested for stability
    const workerRef = useRef<Worker | null>(null);
    const [copied, setCopied] = useState(false);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const {
        files,
        getRootProps,
        getInputProps,
        isDragActive,
        removeFile,
        reset: resetFiles
    } = usePdfProcessor({
        maxFiles: 1,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    const handleReset = () => {
        setSummary(null);
        setLoadingState({ isOpen: false, progress: 0, status: "loading" });
        resetFiles();
    };

    const handleCopy = () => {
        if (summary) {
            navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleSummarize = async () => {
        if (!files.length) return;

        if (!isScriptLoaded) {
            setLoadingState({ isOpen: true, progress: 0, status: "error", error: "PDF Engine is still loading. Please wait a moment." });
            return;
        }

        setLoadingState({ isOpen: true, progress: 0, status: "loading" });

        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            // 1. Access Library from Window (Bypasses Bundler)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pdfjsLib = (window as any).pdfjsLib;
            if (!pdfjsLib) throw new Error("PDF Engine failed to load");

            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            let fullText = "";
            const maxPages = Math.min(pdf.numPages, 10); // Limit keys

            // 5. Extract Text
            for (let i = 1; i <= maxPages; i++) {
                // Update progress based on page extraction (0-30%)
                const extractionProgress = 30 * (i / maxPages);
                setLoadingState(prev => ({ ...prev, progress: extractionProgress }));

                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const pageText = textContent.items.map((item: any) => item.str).join(" ");
                fullText += pageText + " ";
            }

            setLoadingState(prev => ({ ...prev, progress: 30 })); // Extraction done

            // 6. Initialize AI Worker (if not already)
            if (!workerRef.current) {
                workerRef.current = new Worker(new URL("../../workers/ai.worker.js", import.meta.url));

                workerRef.current.onmessage = (event) => {
                    const { status, output, progress: aiProgress, message, error } = event.data;

                    if (status === "progress") {
                        // Map worker progress (0-100) to UI progress (30-100)
                        // If aiProgress is undefined (e.g. initial message), default to 0
                        const currentProgress = aiProgress || 0;
                        const uiProgress = 30 + (currentProgress * 0.7);

                        setLoadingState(prev => ({
                            ...prev,
                            isOpen: true,
                            status: "loading",
                            progress: uiProgress
                        }));
                    } else if (status === "complete") {
                        setSummary(output);
                        setLoadingState(prev => ({ ...prev, isOpen: false, status: "complete", progress: 100 }));
                    } else if (status === "error") {
                        console.error("AI Error:", error);
                        let friendlyError = error;
                        if (typeof error === "string" && (error.includes("WebGPU") || error.includes("shader"))) {
                            friendlyError = "Your browser does not support the required WebGPU features. Please try Chrome or Edge.";
                        }
                        setLoadingState(prev => ({ ...prev, isOpen: true, status: "error", error: friendlyError }));
                    }
                };
            }

            // 7. Send to Worker
            workerRef.current.postMessage({ text: fullText });

        } catch (err: any) {
            console.error("Error:", err);
            setLoadingState(prev => ({ ...prev, isOpen: true, status: "error", error: "Failed to read PDF file. " + err.message }));
        }
    };

    return (
        <ToolShell
            title="Summarize PDF"
            description="Use private AI to summarize your document."
            icon={Sparkles}
        >
            {/* LOAD PDF.JS FROM CDN */}
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log("PDF Engine Loaded");
                    // Set Worker Source
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
                        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
                    setIsScriptLoaded(true);
                }}
            />

            <div className="space-y-8 p-6">
                {!summary ? (
                    <>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group",
                                isDragActive
                                    ? "border-purple-500 bg-purple-50/50"
                                    : "border-slate-200 hover:border-purple-300 hover:bg-slate-50/50"
                            )}
                        >
                            <input {...getInputProps()} />

                            {/* Decorative Background Blur */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-50 text-purple-600 rounded-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    <Sparkles className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {files.length > 0 ? files[0].name : "Drop PDF to Summarize"}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                                    {files.length > 0
                                        ? "Ready to analyze. Click 'Summarize Now' below."
                                        : "Experience the power of local AI. Your document is processed entirely on your device."}
                                </p>
                            </div>
                        </div>

                        {files.length > 0 && (
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={handleSummarize}
                                    disabled={!isScriptLoaded}
                                    className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isScriptLoaded ? (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Summarize Now
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw className="w-5 h-5 animate-spin" />
                                            Loading Engine...
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => removeFile(files[0])}
                                    className="ml-4 px-6 py-4 text-slate-500 font-medium hover:text-red-500 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    /* Result State */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 overflow-hidden">
                            {/* Header */}
                            <div className="bg-slate-50/50 border-b border-slate-100 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Executive Summary</h2>
                                        <p className="text-xs text-slate-500">Generated by Handl AI</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-white rounded-lg"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied!" : "Copy"}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                <div className="prose prose-slate max-w-none prose-p:leading-loose prose-p:text-slate-700">
                                    <p>{summary}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Summarize Another
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* AI Progress Modal */}
            <AIProgressModal
                isOpen={loadingState.isOpen}
                progress={loadingState.progress}
                status={loadingState.status}
                error={loadingState.error}
            />
        </ToolShell>
    );
}
