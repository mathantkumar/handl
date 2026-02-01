"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessingStatusProps {
    isLoading: boolean;
    progress: number;
    label?: string;
    className?: string;
}

export function ProcessingStatus({
    isLoading,
    progress,
    label = "Processing your files...",
    className
}: ProcessingStatusProps) {
    if (!isLoading && progress === 0) return null;

    return (
        <div className={cn("w-full space-y-2 rounded-lg border bg-card p-4 shadow-sm", className)}>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin text-brand-600" />}
                    <span className="font-medium text-foreground">{label}</span>
                </div>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                    className="h-full bg-brand-600"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                />
            </div>
        </div>
    );
}
