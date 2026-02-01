import { useEffect, useState } from "react";
import { Lock, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIProgressModalProps {
    isOpen: boolean;
    progress: number; // 0-100
    status: string;   // 'loading', 'complete', 'error'
    error?: string;
    onClose?: () => void;
}

export function AIProgressModal({ isOpen, progress, status, error, onClose }: AIProgressModalProps) {
    const [message, setMessage] = useState("Initializing...");

    // Dynamic messages based on progress
    useEffect(() => {
        if (status === "loading") {
            if (progress < 20) setMessage("Allocating browser memory...");
            else if (progress < 80) setMessage("Downloading AI Model...");
            else if (progress < 99) setMessage("Loading neural network...");
            else setMessage("Almost ready!");
        } else if (status === "complete") {
            setMessage("Analysis Complete!");
        }
    }, [progress, status]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            {status === "error" ? (
                // Error state UI
                <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 text-center border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Process Failed</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{error || "Something went wrong."}</p>

                    {onClose ? (
                        <button
                            onClick={onClose}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                            Close
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.reload()}
                            className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white underline"
                        >
                            Reload Page
                        </button>
                    )}
                </div>
            ) : (
                // Loading / Success state UI
                <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200 p-8 flex flex-col items-center text-center">

                    {/* Icon: Large animated Sparkles in circle */}
                    <div className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-500",
                        status === "complete"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    )}>
                        {status === "complete" ? (
                            <CheckCircle className="w-10 h-10" strokeWidth={1.5} />
                        ) : (
                            <Sparkles className="w-10 h-10 animate-pulse" strokeWidth={1.5} />
                        )}
                    </div>

                    {/* Header: Centered */}
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {status === "complete" ? "Analysis Complete!" : "Powering up Local AI"}
                    </h2>

                    {/* Badge: 100% Private */}
                    <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-sm mb-8 font-medium">
                        <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                        <span>100% Private & Secure</span>
                    </div>

                    {/* Status Text (Dynamic) */}
                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider px-1">
                            <span>{status === "complete" ? "Ready" : "Loading Model"}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>

                        {/* Progress Bar: Thinner, Glow effect */}
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden w-full relative">
                            {/* Glow effect on the bar itself */}
                            <div
                                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                                style={{ width: `${Math.max(5, progress)}%` }}
                            />
                        </div>

                        <p className="text-zinc-400 text-xs h-4">
                            {message}
                        </p>
                    </div>

                    {/* Footer Text */}
                    <p className="text-zinc-400 dark:text-zinc-500 text-[10px] mt-8">
                        {status === "complete"
                            ? "Your summary is ready to view."
                            : "This happens once. Future runs will be instant."}
                    </p>
                </div>
            )}
        </div>
    );
}
