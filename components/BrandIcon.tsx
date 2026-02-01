import React from "react";
// Importing SOLID icons for that 'Logo' feel
import {
    ArrowsPointingInIcon,
    ScissorsIcon,
    DocumentTextIcon,
    PhotoIcon,
    LockClosedIcon,
    LockOpenIcon,
    PencilSquareIcon,
    ArrowPathIcon,
    TrashIcon,
    Square2StackIcon,
    SparklesIcon,
    QueueListIcon,
    CommandLineIcon
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

interface BrandIconProps {
    type: string;
    className?: string;
}

export function BrandIcon({ type, className = "w-12 h-12" }: BrandIconProps) {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const themes: Record<string, { bg: string; icon: any }> = {
        // --- PDF RED (Standard Red-500) ---
        "merge-pdf": {
            bg: "bg-[#eb5353]",
            icon: Square2StackIcon
        },
        "split-pdf": {
            bg: "bg-[#eb5353]",
            icon: ScissorsIcon
        },
        "remove-pages": {
            bg: "bg-[#eb5353]",
            icon: TrashIcon
        },
        "organize-pdf": {
            bg: "bg-[#eb5353]",
            icon: QueueListIcon
        },
        "rotate-pdf": {
            bg: "bg-[#eb5353]",
            icon: ArrowPathIcon
        },
        "add-page-numbers": {
            bg: "bg-[#eb5353]",
            icon: PencilSquareIcon
        },
        "watermark-pdf": {
            bg: "bg-[#eb5353]",
            icon: DocumentTextIcon
        },

        // --- COMPRESS GREEN (Vibrant Green-500) ---
        "compress-pdf": {
            bg: "bg-[#259b62]",
            icon: ArrowsPointingInIcon
        },

        // --- CONVERT BLUE (Blue-500) ---
        "word-to-pdf": {
            bg: "bg-[#3270c4]",
            icon: DocumentTextIcon
        },
        "pdf-to-word": {
            bg: "bg-[#3270c4]",
            icon: DocumentTextIcon
        },
        "excel-to-pdf": {
            bg: "bg-[#259b62]", // Green-600 (Excel-ish but lighter)
            icon: DocumentTextIcon
        },

        // --- IMAGE YELLOW (Amber-500) ---
        "pdf-to-jpg": {
            bg: "bg-[#f1d76d]",
            icon: PhotoIcon
        },
        "jpg-to-pdf": {
            bg: "bg-[#f1d76d]",
            icon: PhotoIcon
        },

        // --- SECURITY PURPLE (Violet-500) ---
        "protect-pdf": {
            bg: "bg-[#865ed6]",
            icon: LockClosedIcon
        },
        "unlock-pdf": {
            bg: "bg-[#865ed6]",
            icon: LockOpenIcon
        },
        "sign-pdf": {
            bg: "bg-[#865ed6]",
            icon: PencilSquareIcon
        },

        // --- AI (lighter gradient) ---
        "summarize-pdf": {
            bg: "bg-[#865ed6]",
            icon: SparklesIcon
        },

        "pdf-to-json": {
            bg: "bg-zinc-800",
            icon: CommandLineIcon
        },

        // Fallback
        "default": { bg: "bg-gray-400", icon: DocumentTextIcon }
    };

    const theme = themes[type] || themes["default"];
    const Icon = theme.icon;

    return (
        <div className={cn("flex items-center justify-center rounded-xl shadow-md text-white shrink-0", theme.bg, className)}>
            {/* Increased size to 60% for bolder look */}
            <Icon className="w-[60%] h-[60%]" />
        </div>
    );
}
