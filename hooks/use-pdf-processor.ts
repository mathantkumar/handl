import { useState, useCallback } from "react";
import { useDropzone, DropzoneOptions, DropzoneState } from "react-dropzone";

interface UsePdfProcessorOptions {
    maxFiles?: number;
    maxSize?: number; // In bytes
    acceptedFileTypes?: Record<string, string[]>;
}

interface UsePdfProcessorReturn extends DropzoneState {
    files: File[];
    isProcessing: boolean;
    isLoading: boolean; // Alias
    processedUrl: string | null;
    processedFileUrl: string | null; // Alias
    error: string | null;
    progress: number;
    removeFile: (fileToRemove: File) => void;
    reorderFiles: (newOrder: File[]) => void;
    processFiles: (processFn: (files: File[]) => Promise<Blob | Uint8Array>) => Promise<void>;
    reset: () => void;
}

export function usePdfProcessor(options: UsePdfProcessorOptions = {}): UsePdfProcessorReturn {
    const {
        maxFiles = 100,
        maxSize = 50 * 1024 * 1024, // 50MB default
        acceptedFileTypes = { "application/pdf": [".pdf"] }
    } = options;

    const [files, setFiles] = useState<File[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [processedUrl, setProcessedUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
        setError(null);
        setProcessedUrl(null);

        if (fileRejections.length > 0) {
            const firstError = fileRejections[0]?.errors[0];
            if (firstError?.code === "file-too-large") {
                setError(`File is too large. Max size is ${Math.round(maxSize / 1024 / 1024)}MB.`);
            } else if (firstError?.code === "file-invalid-type") {
                setError("Invalid file type. Please upload a supported format.");
            } else {
                setError(firstError?.message || "Some files were rejected.");
            }
        }

        setFiles(prev => {
            const combined = [...prev, ...acceptedFiles];
            return combined.slice(0, maxFiles);
        });
    }, [maxFiles, maxSize]);

    const dropzoneState = useDropzone({
        onDrop,
        maxFiles,
        maxSize,
        accept: acceptedFileTypes,
        multiple: maxFiles > 1
    });

    const removeFile = useCallback((fileToRemove: File) => {
        setFiles(prev => prev.filter(f => f !== fileToRemove));
    }, []);

    const reorderFiles = useCallback((newOrder: File[]) => {
        setFiles(newOrder);
    }, []);

    const processFiles = useCallback(async (processFn: (files: File[]) => Promise<Blob | Uint8Array>) => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setError(null);
        setProgress(0);
        setProcessedUrl(null);

        // Fake progress for UX
        const interval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90));
        }, 300);

        try {
            const result = await processFn(files);

            let blob: Blob;
            if (result instanceof Uint8Array) {
                // Explicitly cast to unknown then BlobPart to avoid TS issues with specific ArrayBuffer views
                blob = new Blob([result as unknown as BlobPart], { type: "application/pdf" });
            } else {
                blob = result;
            }

            const url = URL.createObjectURL(blob);
            setProcessedUrl(url);
            setProgress(100);
        } catch (err) {
            console.error("Processing Job Failed:", err);
            setError(err instanceof Error ? err.message : "An unexpected error occurred processing your files.");
            setProgress(0);
        } finally {
            clearInterval(interval);
            setIsProcessing(false);
        }
    }, [files]);

    const reset = useCallback(() => {
        setFiles([]);
        setError(null);
        setProcessedUrl(null);
        setIsProcessing(false);
        setProgress(0);
    }, []);

    return {
        ...dropzoneState,
        files,
        isProcessing, // Alias for local loading state
        isLoading: isProcessing, // Backward compatibility if needed, but keeping isProcessing as primary
        error,
        processedUrl,
        processedFileUrl: processedUrl, // Alias
        progress,
        removeFile,
        reorderFiles,
        processFiles,
        reset
    };
}
