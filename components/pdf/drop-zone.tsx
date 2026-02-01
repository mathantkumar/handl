import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropZoneProps {
    onDrop: (files: File[]) => void;
}

export function DropZone({ onDrop }: DropZoneProps) {
    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: {
            "application/pdf": [".pdf"],
        },
        multiple: true,
    });

    return (
        <div
            {...getRootProps()}
            className={cn(
                "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border py-12 text-center transition-all hover:border-brand-400 hover:bg-brand-50/50",
                isDragActive && "border-brand-500 bg-brand-50 ring-4 ring-brand-100"
            )}
        >
            <input {...getInputProps()} />
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-brand-100">
                <UploadCloud className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-brand-600" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
                {isDragActive ? "Drop PDF files here" : "Click or Drag PDFs here"}
            </h3>
            <p className="text-sm text-muted-foreground">
                Select multiple files to merge them instantly.
            </p>
        </div>
    );
}
