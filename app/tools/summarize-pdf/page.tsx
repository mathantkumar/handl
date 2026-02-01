"use client";

import { useState } from 'react';
import { Sparkles, Bot, Copy, Check, RefreshCw, Download, FileText, Lightbulb, Target } from 'lucide-react';
import { ToolShell } from '@/components/tool-shell';
import { usePdfProcessor } from '@/hooks/use-pdf-processor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrandIcon } from '@/components/BrandIcon';
import { jsPDF } from 'jspdf';

interface SummaryStructure {
    title: string;
    core_message: string;
    key_points: string[];
    conclusion: string;
}

export default function SummarizePdfPage() {
    const [summary, setSummary] = useState<SummaryStructure | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // DEBUG check removed as we moved to server-side key

    const {
        files,
        getRootProps,
        getInputProps,
        isDragActive,
        removeFile,
        reset: resetFiles
    } = usePdfProcessor({
        maxFiles: 1,
        acceptedFileTypes: { "application/pdf": [".pdf"] }
    });


    const handleCopy = () => {
        if (summary) {
            const textToCopy = `
TITLE: ${summary.title}
\nCORE MESSAGE:
${summary.core_message}
\nKEY POINTS:
${summary.key_points.map(p => `• ${p}`).join('\n')}
\nCONCLUSION:
${summary.conclusion}
            `.trim();

            navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setSummary(null);
        setError(null);
        resetFiles();
    };

    const handleDownloadPDF = () => {
        if (!summary) return;
        const doc = new jsPDF();

        // Title
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text("Document Summary", 20, 20);

        // Core Message
        doc.setFontSize(14);
        doc.setTextColor(59, 130, 246); // Blue
        doc.text("Core Message", 20, 40);

        doc.setFontSize(11);
        doc.setTextColor(60);
        const coreLines = doc.splitTextToSize(summary.core_message, 170);
        doc.text(coreLines, 20, 50);

        // Key Points
        let yPos = 50 + (coreLines.length * 7) + 10;
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text("Key Insights", 20, yPos);

        yPos += 10;
        doc.setFontSize(11);
        doc.setTextColor(60);
        summary.key_points.forEach((point) => {
            const pointLines = doc.splitTextToSize(`• ${point}`, 170);
            doc.text(pointLines, 20, yPos);
            yPos += (pointLines.length * 7) + 3;
        });

        // Conclusion
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100);
        const concLines = doc.splitTextToSize(`Conclusion: ${summary.conclusion}`, 170);
        doc.text(concLines, 20, yPos);

        doc.save("summary-report.pdf");
    };

    // 2. The Internal API Call (Server-Side Logic)
    const generateSummary = async (text: string) => {
        // Call our OWN server
        const response = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Summary generation failed');
        }

        // The server already sends back clean JSON
        return await response.json();
    };

    const handleSummarize = async () => {
        if (!files.length) return;

        setIsLoading(true);
        setError(null);

        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            // Dynamic import for pdfjs to avoid server-side issues
            const pdfJS = await import('pdfjs-dist');
            pdfJS.GlobalWorkerOptions.workerSrc =
                `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfJS.version}/pdf.worker.min.js`;

            const pdf = await pdfJS.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            // Limit to first 10 pages to save token/bandwidth
            const maxPages = Math.min(pdf.numPages, 10);

            for (let i = 1; i <= maxPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + ' ';
            }

            if (!fullText.trim()) throw new Error("Could not extract text. PDF might be an image/scan.");

            // Call Server API
            const aiSummary = await generateSummary(fullText);
            setSummary(aiSummary);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolShell
            title="Summarize PDF"
            description="Use Google's Gemini 2.5 Flash to summarize documents instantly."
            icon={Sparkles}
        >
            <div className="space-y-8 p-6">
                {!summary ? (
                    <div className="space-y-8">
                        {/* File Upload Section */}
                        <div className="space-y-4">
                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 relative overflow-hidden group",
                                    isDragActive
                                        ? "border-purple-500 bg-purple-50/50"
                                        : "border-slate-200 hover:border-purple-300 hover:bg-slate-50/50"
                                )}
                            >
                                <input {...getInputProps()} />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-slate-400 rounded-xl mb-4 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                                        {files.length > 0 ? <Check className="w-8 h-8 text-green-500" /> : <Sparkles className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {files.length > 0 ? files[0].name : "Drop PDF here"}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        {files.length > 0 ? "Ready to summarize" : "Up to 50MB"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center pt-2">
                            {files.length > 0 && (
                                <div className="flex gap-4">
                                    <Button
                                        onClick={handleSummarize}
                                        disabled={isLoading}
                                        className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl shadow-xl shadow-slate-900/10"
                                    >
                                        {isLoading ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                                                Summarizing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5 mr-2" />
                                                Generate Summary
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => removeFile(files[0])}
                                        className="px-6 py-6 text-lg rounded-xl"
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center text-sm font-medium animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Dashboard Result State */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Download Header */}
                        <div className="flex justify-end">
                            <Button
                                onClick={handleDownloadPDF}
                                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-lg"
                            >
                                <Download className="w-4 h-4" />
                                Download Report
                            </Button>
                        </div>

                        {/* Title Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <FileText className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-1">{summary.title}</h2>
                                    <p className="text-slate-500 text-sm">AI Generated Summary • Gemini 2.5 Flash</p>
                                </div>
                            </div>
                        </div>

                        {/* Core Message */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold uppercase tracking-wider text-xs">
                                <Target className="w-4 h-4" />
                                Core Message
                            </div>
                            <p className="text-lg text-slate-800 leading-relaxed font-medium">
                                {summary.core_message}
                            </p>
                        </div>

                        {/* Key Points Grid */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {summary.key_points.map((point, i) => (
                                <div key={i} className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex gap-3">
                                        <div className="mt-1">
                                            <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">
                                                {i + 1}
                                            </div>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed text-sm">
                                            {point}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Conclusion */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-3 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                <Lightbulb className="w-4 h-4" />
                                Conclusion
                            </div>
                            <p className="text-slate-600 italic">
                                "{summary.conclusion}"
                            </p>
                        </div>

                        <div className="flex justify-center pt-8 border-t border-slate-100">
                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    onClick={handleCopy}
                                    className="gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied Text" : "Copy Text"}
                                </Button>
                                <Button

                                    onClick={handleReset}
                                    className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Summarize Another
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolShell>
    );
}
