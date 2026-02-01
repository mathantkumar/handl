"use client";

import { useState } from 'react';
import Script from 'next/script';
import { Sparkles, FileJson, Copy, Check, RefreshCw, Braces, Code2 } from 'lucide-react';
import { ToolShell } from '@/components/tool-shell';
import { usePdfProcessor } from '@/hooks/use-pdf-processor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BrandIcon } from '@/components/BrandIcon';

export default function PdfToJsonPage() {
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [copied, setCopied] = useState(false);

    // DEBUG: Check for API Key on mount
    useState(() => {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            console.error("API Key missing! Env var not loaded.");
            setError("Configuration Error: API Key not found. Please restart your server to load .env.local changes.");
        } else {
            console.log("API Key loaded:", key.substring(0, 5) + "...");
        }
    });

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
        if (result) {
            navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReset = () => {
        setResult(null);
        setError(null);
        resetFiles();
    };

    // 2. The Gemini API Call
    const generateGeminiJson = async (text: string) => {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) throw new Error('API Key is missing in .env.local');

        const prompt = `
      Extract the following fields from the document in strict JSON format: 
      - Invoice Number
      - Date
      - Total Amount
      - Vendor Name
      - Line Items (as an array of objects)

      Do not include markdown formatting (like \`\`\`json), do not include explanations. 
      Return ONLY the raw JSON string.
      
      Document text:
      ${text.substring(0, 15000)}
    `;

        // UPDATED: Using 'gemini-2.5-flash'
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error('Gemini API Error:', errData);
            throw new Error(errData.error?.message || 'Gemini API failed');
        }

        const data = await response.json();
        let textResult = data.candidates[0].content.parts[0].text;

        // Clean up markdown if Gemini adds it despite instructions
        textResult = textResult.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        // Validate JSON
        try {
            JSON.parse(textResult);
        } catch (e) {
            console.error("Invalid JSON content", e);
            throw new Error("AI generated invalid JSON. Please try again.");
        }

        return textResult;
    };

    const handleExtract = async () => {
        if (!files.length) return;
        if (!isScriptLoaded) {
            setError("PDF Engine is still loading. Please wait a moment.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pdfjsLib = (window as any).pdfjsLib;
            if (!pdfjsLib) throw new Error('PDF Engine not loaded');

            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            // Limit to first 3 pages usually enough for validation
            const maxPages = Math.min(pdf.numPages, 3);

            for (let i = 1; i <= maxPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + ' ';
            }

            if (!fullText.trim()) throw new Error("Could not extract text. PDF might be an image/scan.");

            const jsonResult = await generateGeminiJson(fullText);
            setResult(jsonResult);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ToolShell
            title="PDF to JSON"
            description="Extract invoice and document data into strict JSON format with Gemini."
            icon={FileJson}
        >
            {/* Script removed - loaded globally in layout */}

            <div className="space-y-8 p-6">
                {!result ? (
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
                                        {files.length > 0 ? <Check className="w-8 h-8 text-green-500" /> : <FileJson className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {files.length > 0 ? files[0].name : "Drop PDF here"}
                                    </h3>
                                    <p className="text-slate-500 text-sm">
                                        {files.length > 0 ? "Ready to extract" : "Up to 50MB"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center pt-2">
                            {files.length > 0 && (
                                <div className="flex gap-4">
                                    <Button
                                        onClick={handleExtract}
                                        disabled={isLoading || !isScriptLoaded}
                                        className="bg-slate-900 text-white hover:bg-slate-800 px-8 py-6 text-lg rounded-xl shadow-xl shadow-slate-900/10"
                                    >
                                        {isLoading ? (
                                            <>
                                                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                                                Extracting...
                                            </>
                                        ) : (
                                            <>
                                                <Braces className="w-5 h-5 mr-2" />
                                                Extract JSON
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
                    /* Result State */
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
                                <h3 className="text-lg font-mono font-bold flex items-center gap-2 text-zinc-100">
                                    <Code2 className="w-5 h-5 text-blue-400" />
                                    Extraction Result
                                </h3>
                                <button
                                    onClick={handleCopy}
                                    className={cn(
                                        "flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors",
                                        copied ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                    )}
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? "Copied" : "Copy JSON"}
                                </button>
                            </div>

                            <div className="p-6 overflow-x-auto">
                                <pre className="text-sm font-mono leading-relaxed text-blue-300">
                                    {result}
                                </pre>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Extract Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </ToolShell>
    );
}
