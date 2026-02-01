"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AdUnitProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
    responsive?: boolean;
    className?: string; // For wrapper styling
    style?: React.CSSProperties; // For custom inline styles on the ins tag
}

export function AdUnit({
    slot,
    format = "auto",
    responsive = true,
    className,
    style
}: AdUnitProps) {
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent double initialization in strict mode
        if (initialized.current) return;

        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            initialized.current = true;
        } catch (err) {
            console.error("AdSense Error:", err);
        }
    }, []);

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center my-8 overflow-hidden min-h-[100px]",
                className
            )}
            style={{ minWidth: "250px" }} // Ensure non-zero width for ad calculation
            aria-hidden={false}
        >
            <span className="text-[10px] uppercase tracking-widest text-slate-300 mb-2">Advertisement</span>
            <div className="w-full flex justify-center">
                <ins
                    className="adsbygoogle"
                    style={{ display: "block", minWidth: "250px", ...style }}
                    data-ad-client="ca-pub-0000000000000000" // Test ID
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive}
                />
            </div>
        </div>
    );
}
