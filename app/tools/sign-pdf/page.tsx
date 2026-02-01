"use client";

import { ToolShell } from "@/components/tool-shell";
import { PenLine } from "lucide-react";

export default function SignPdfPage() {
    return (
        <ToolShell
            title="Sign PDF"
            description="Add your signature to PDF documents securely."
            icon={PenLine}
        >
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <p className="text-slate-500 mb-4">Coming soon...</p>
            </div>
        </ToolShell>
    );
}
