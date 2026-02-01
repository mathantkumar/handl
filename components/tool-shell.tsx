"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { AdUnit } from "@/components/google/AdUnit";
import { ToolSEO } from "@/components/ToolSEO";

interface ToolShellProps {
    title: string;
    description: string;
    icon: React.ElementType;
    className?: string;
    children: React.ReactNode;

    // Sidebar Content
    howToUse?: React.ReactNode;
    relatedTools?: { title: string; href: string }[];
}

export function ToolShell({
    title,
    description,
    icon: Icon,
    className,
    children,
    howToUse,
    relatedTools
}: ToolShellProps) {
    return (
        <div className={cn("min-h-screen bg-slate-50 pb-20", className)}>
            {/* Tool Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80">
                <Container>
                    <div className="flex h-16 items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                        <div className="h-6 w-px bg-slate-200" />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 text-blue-600">
                                <Icon className="h-4 w-4" />
                            </div>
                            <h1 className="text-lg font-bold text-slate-900">{title}</h1>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="pt-8 md:pt-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Main Workspace (75%) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1">
                            {children}
                        </div>

                        {/* SEO Content Component */}
                        <ToolSEO toolName={title} />

                        <div className="lg:hidden">
                            {/* Mobile Sidebar Content */}
                            <MobileSidebar howToUse={howToUse} relatedTools={relatedTools} />
                        </div>
                    </div>

                    {/* Sidebar (25%) */}
                    <div className="hidden lg:col-span-1 lg:block space-y-6">
                        {/* How to Use */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                                <HelpCircle className="h-4 w-4 text-blue-500" />
                                <h3>How to use</h3>
                            </div>
                            <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                                {howToUse || (
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Upload your files</li>
                                        <li>Configure settings</li>
                                        <li>Download result</li>
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Sidebar Skyscraper Ad */}
                        <div className="sticky top-24">
                            <AdUnit
                                slot="9876543210"
                                format="vertical"
                                className="my-0 bg-slate-50 border border-slate-100 rounded-xl"
                                style={{ minHeight: "600px" }}
                            />
                        </div>

                        {/* Related Tools */}
                        {relatedTools && relatedTools.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                                <h3 className="font-bold text-slate-900 mb-3 text-sm">Related Tools</h3>
                                <ul className="space-y-2">
                                    {relatedTools.map((tool) => (
                                        <li key={tool.href}>
                                            <Link href={tool.href} className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                                <span>{tool.title}</span>
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
}

function MobileSidebar({ howToUse, relatedTools }: { howToUse?: React.ReactNode, relatedTools?: { title: string, href: string }[] }) {
    return (
        <div className="space-y-6 pt-8 border-t border-slate-200">
            {/* How to Use */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                    <h3>How to use</h3>
                </div>
                <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                    {howToUse}
                </div>
            </div>
            {/* Related Tools */}
            {relatedTools && relatedTools.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900 mb-3 text-sm">Related Tools</h3>
                    <ul className="space-y-2">
                        {relatedTools.map((tool) => (
                            <li key={tool.href}>
                                <Link href={tool.href} className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 transition-colors">
                                    <span>{tool.title}</span>
                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
