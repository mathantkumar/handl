"use client";

import { cn } from "@/lib/utils";
import { PageThumbnail } from "./page-thumbnail";

interface PageGridProps {
    file: File | null;
    pageCount: number;
    selectedIndices?: number[];
    onPageClick?: (index: number) => void;
    className?: string;
}

export function PageGrid({
    file,
    pageCount,
    selectedIndices = [],
    onPageClick,
    className
}: PageGridProps) {
    if (!file || pageCount === 0) {
        return (
            <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                No pages to display
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4", className)}>
            {Array.from({ length: pageCount }).map((_, index) => (
                <PageThumbnail
                    key={index}
                    pageIndex={index}
                    file={file}
                    selected={selectedIndices.includes(index)}
                    onClick={() => onPageClick && onPageClick(index)}
                    className="w-full"
                    width={200} // This is just passed as a hint/max-width for internal scaling
                />
            ))}
        </div>
    );
}
