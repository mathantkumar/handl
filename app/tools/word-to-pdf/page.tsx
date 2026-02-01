"use client";

import { FileText, ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";
import { ToolShell } from "@/components/tool-shell";

export default function WordToPdfPage() {
    return (
        <ToolShell
            title="Word to PDF"
            description="Convert DOC and DOCX files to PDF."
            icon={FileText}
        >
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center animate-pulse">
                    <Construction className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Coming Soon</h2>
                <p className="text-slate-600 max-w-lg text-lg leading-relaxed">
                    We are building a privacy-first Word conversion engine that runs entirely in your browser.
                    No uploads, no servers, just pure client-side magic.
                </p>
                <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium">
                    Expected Launch: Next Week
                </div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors pt-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Homepage
                </Link>
            </div>
        </ToolShell>
    );
}
