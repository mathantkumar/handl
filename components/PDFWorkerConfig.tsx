'use client';
import { useEffect } from 'react';
// import { GlobalWorkerOptions } from 'pdfjs-dist'; // Not using import, accessing window

export default function PDFWorkerConfig() {
    useEffect(() => {
        // Force the worker to match the stable version we use
        // This fixes the 'Version 5.4.530' 404 error
        if (typeof window !== 'undefined' && !(window as any).pdfWorkerConfigured) {
            const version = '3.11.174';
            const workerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

            // Set global worker directly on the window object for CDN scripts
            if ((window as any).pdfjsLib) {
                (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
            }

            (window as any).pdfWorkerConfigured = true;
        }
    }, []);
    return null; // This component renders nothing
}
