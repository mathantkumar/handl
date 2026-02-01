"use client";

import { useState, useRef, useEffect } from "react";
import { PenLine, Loader2, Download, RotateCcw } from "lucide-react";
import { ToolShell } from "@/components/tool-shell";
import { usePdfProcessor } from "@/hooks/use-pdf-processor";
import { cn } from "@/lib/utils";
import { SuccessModal } from "@/components/SuccessModal";
import { PDFDocument } from "pdf-lib";
import { PDFCanvas, PDFCanvasHandle } from "@/components/PDFCanvas";
import { Button } from "@/components/ui/button";

export default function SignPdfPage() {
    const [pdfPageImage, setPdfPageImage] = useState<string | null>(null);
    const [resultBlob, setResultBlob] = useState<Blob | null>(null);
    const [resultFileName, setResultFileName] = useState("signed.pdf");
    const [showModal, setShowModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const canvasRef = useRef<PDFCanvasHandle>(null);

    // Configure PDF.js worker
    useEffect(() => {
        const loadPdfJs = async () => {
            if (typeof window !== "undefined") {
                const pdfjsLib = await import("pdfjs-dist");
                pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
            }
        };
        loadPdfJs();
    }, []);

    const {
        files,
        error,
        getRootProps,
        getInputProps,
        isDragActive,
        reset: resetProcessor
    } = usePdfProcessor({
        maxFiles: 1,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });

    // Auto-process file upload to get the first page image
    useEffect(() => {
        const loadFirstPage = async () => {
            if (files.length === 0) return;

            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            const pdfjsLib = await import("pdfjs-dist");
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const page = await pdf.getPage(1);

            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) return;

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // @ts-expect-error - PDF.js types mismatch
            await page.render({
                canvasContext: context,
                viewport: viewport,
            }).promise;

            const dataUrl = canvas.toDataURL("image/png");
            setPdfPageImage(dataUrl);
            setResultFileName(file.name.replace(".pdf", "-signed.pdf"));
        };

        loadFirstPage();
    }, [files]);

    const handleSave = async () => {
        if (!canvasRef.current || files.length === 0) return;
        setIsSaving(true);

        try {
            // 1. Get the signature/drawing as a transparent PNG
            const signatureDataUrl = await canvasRef.current.exportDrawing();

            // 2. Load the original PDF
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // 3. Embed the signature image
            const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const { width, height } = firstPage.getSize();

            // 4. Draw the signature image over the page
            // We need to match the canvas aspect ratio to the PDF page
            firstPage.drawImage(signatureImage, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });

            // 5. Save the PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });

            setResultBlob(blob);
            setShowModal(true);
        } catch (err) {
            console.error("Failed to sign PDF:", err);
            // Handle error (maybe show toast)
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = () => {
        setShowModal(false);
        setResultBlob(null);
        setPdfPageImage(null);
        resetProcessor();
    };

    return (
        <ToolShell
            title="Sign PDF"
            description="Draw your signature and annotate PDF documents."
            icon={PenLine}
            howToUse={
                <ul className="space-y-3">
                    <li className="flex gap-2">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">1</span>
                        <span className="mt-0.5">Upload a PDF document.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">2</span>
                        <span className="mt-0.5">Use the pen to sign or draw.</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">3</span>
                        <span className="mt-0.5">Click &quot;Download Signed PDF&quot;.</span>
                    </li>
                </ul>
            }
        >
            <div className="space-y-8 p-6">
                {!pdfPageImage ? (
                    /* Upload State */
                    <div
                        {...getRootProps()}
                        className={cn(
                            "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300",
                            isDragActive
                                ? "border-blue-500 bg-blue-50/50"
                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"
                        )}
                    >
                        <input {...getInputProps()} />
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-xl mb-4">
                            <PenLine className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {isDragActive ? "Drop PDF here" : "Sign PDF Document"}
                        </h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                            Upload a PDF to add your signature or notes.
                        </p>
                    </div>
                ) : (
                    /* Editor State */
                    <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500">
                        <PDFCanvas
                            ref={canvasRef}
                            pdfPageImage={pdfPageImage}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                className="w-full sm:w-auto"
                            >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Start Over
                            </Button>

                            <Button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Download Signed PDF
                                        <Download className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium text-center">
                        {error}
                    </div>
                )}
            </div>

            <SuccessModal
                isOpen={showModal}
                onClose={handleReset}
                fileBlob={resultBlob}
                fileName={resultFileName}
            />
        </ToolShell>
    );
}
