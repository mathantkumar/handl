"use client";

import { useEffect, useState } from "react";
import { X, Download, Share2, CheckCircle, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl?: string | null;
    fileBlob?: Blob | null;
    fileName: string;
}

export function SuccessModal({
    isOpen,
    onClose,
    fileUrl,
    fileBlob,
    fileName
}: SuccessModalProps) {
    const [isSharing, setIsSharing] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // process locking
        }
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleDownload = () => {
        // Use provided URL or create one from blob
        let urlToUse = fileUrl;
        let shouldRevoke = false;

        if (!urlToUse && fileBlob) {
            urlToUse = URL.createObjectURL(fileBlob);
            shouldRevoke = true;
        }

        if (!urlToUse) return;

        const link = document.createElement("a");
        link.href = urlToUse;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (shouldRevoke) {
            URL.revokeObjectURL(urlToUse);
        }
    };

    const handleShare = async () => {
        if (!fileBlob) return;

        setIsSharing(true);
        try {
            if (navigator.share) {
                const file = new File([fileBlob], fileName, { type: fileBlob.type });
                await navigator.share({
                    title: "Here is your processed file",
                    text: `I've processed ${fileName} using Handl.`,
                    files: [file]
                });
            } else {
                // Fallback for browsers that don't support file sharing
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        } catch (err) {
            console.error("Error sharing:", err);
            // Handle cancellation or error silently or show toast
        } finally {
            setIsSharing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white/90 dark:bg-zinc-900/90 border border-white/20 shadow-2xl rounded-2xl backdrop-blur-md transform transition-all animate-in fade-in zoom-in-95 duration-200 p-6 space-y-6">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header / Icon */}
                <div className="flex flex-col items-center text-center pt-2">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Your File is Ready!</h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        Success! Your file has been processed and is ready for download.
                    </p>
                </div>

                {/* File Info Card */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200">
                        <Download className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{fileName}</p>
                        <p className="text-xs text-slate-500">
                            {fileBlob ? `${(fileBlob.size / 1024 / 1024).toFixed(2)} MB` : "Ready"}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <Button
                        onClick={handleDownload}
                        className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    >
                        <Download className="w-5 h-5 mr-2" />
                        Download Now
                    </Button>

                    <Button
                        onClick={handleShare}
                        variant="outline"
                        className="w-full h-12 text-base border-slate-200 text-slate-700 hover:bg-slate-50"
                        disabled={isSharing}
                    >
                        <Share2 className="w-5 h-5 mr-2" />
                        Share / Email
                    </Button>
                </div>

                {/* Toast Notification (Fallback) */}
                {showToast && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-2 px-4 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                        <Mail className="w-3 h-3" />
                        <span>Downloaded! Attach to email to share.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
