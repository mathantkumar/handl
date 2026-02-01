"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdUnitProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
    className?: string;
    style?: React.CSSProperties;
}

export function AdUnit({ slot, format = "auto", className = "", style }: AdUnitProps) {
    const [isMounted, setIsMounted] = useState(false);

    // --- CONFIGURATION ---
    // true  = Show Gray Box (Best for layout testing in Dev & Live)
    // false = Show Real Google Ads (Best for final launch)
    const SHOW_SAMPLE_AD = true;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className={cn("flex justify-center items-center my-6", className)} style={style}>
            {SHOW_SAMPLE_AD ? (
                /* --- SAMPLE TEST AD (Visible Everywhere) --- */
                <div
                    className={cn(
                        "mx-auto bg-zinc-100 dark:bg-zinc-800",
                        "border-2 border-dashed border-zinc-300 dark:border-zinc-700",
                        "flex flex-col items-center justify-center",
                        "rounded-lg text-zinc-400 font-bold text-xs uppercase tracking-widest p-4 cursor-help",
                        // Force specific dimensions based on format to prevent layout shift
                        format === "rectangle" && "h-[250px] w-[300px]",
                        format === "horizontal" && "h-[90px] w-full max-w-[728px]",
                        format === "vertical" && "h-[600px] w-[160px]"
                    )}
                    title={`Ad Slot ID: ${slot}`}
                >
                    <span>Ad Space ({format})</span>
                    <span className="text-[10px] opacity-60 mt-1 font-mono bg-zinc-200 dark:bg-zinc-700 px-1 rounded">
                        {slot}
                    </span>
                </div>
            ) : (
                /* --- REAL GOOGLE AD (Visible Everywhere) --- */
                <div className="w-full text-center">
                    <ins
                        className="adsbygoogle"
                        style={{ display: "block" }}
                        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your Real ID
                        data-ad-slot={slot}
                        data-ad-format={format}
                        data-full-width-responsive="true"
                    />
                </div>
            )}
        </div>
    );
}