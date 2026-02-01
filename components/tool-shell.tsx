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
        <div className={cn("min-h-screen bg-slate-50 dark:bg-black pb-20 flex flex-col", className)}>
            {/* Tool Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/80 dark:bg-zinc-900/80">
                <Container>
                    <div className="flex h-16 items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </Link>
                        <div className="h-6 w-px bg-slate-200 dark:bg-zinc-800" />
                        <div className="flex items-center gap-2">
                            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                <Icon className="h-4 w-4" />
                            </div>
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate">{title}</h1>
                        </div>
                    </div>
                </Container>
            </div>

            <main className="flex-grow">
                <Container className="pt-8 md:pt-12">

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* LEFT: Main Tool Workspace (75% Width) */}
                        <div className="w-full lg:w-3/4 space-y-8">
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 lg:p-10 min-h-[500px]">
                                {/* Inner Tool Header */}
                                <div className="mb-8 text-center lg:text-left">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
                                    <p className="text-slate-500 dark:text-zinc-400 text-lg">{description}</p>
                                </div>

                                {/* The Tool Itself */}
                                {children}
                            </div>

                            {/* SEO Content Component */}
                            <ToolSEO toolName={title} />

                            {/* MOBILE ONLY: Bottom Ad */}
                            <div className="block lg:hidden mt-8">
                                <AdUnit slot="tool-mobile-bottom" format="rectangle" />
                            </div>

                            <div className="lg:hidden">
                                {/* Mobile Sidebar Content */}
                                <MobileSidebar howToUse={howToUse} relatedTools={relatedTools} />
                            </div>
                        </div>

                        {/* RIGHT: Sidebar (25% Width - Desktop Only) */}
                        <aside className="hidden lg:block w-1/4 sticky top-24 space-y-6">
                            {/* 'How to' Helper Box */}
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
                                    <HelpCircle className="h-4 w-4 text-blue-500" />
                                    <h3>How to use</h3>
                                </div>
                                <div className="text-sm text-slate-600 dark:text-zinc-400 space-y-3 leading-relaxed">
                                    {howToUse || (
                                        <ul className="space-y-3">
                                            <li className="flex gap-2">
                                                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">1</span>
                                                <span className="mt-0.5">Upload your files</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">2</span>
                                                <span className="mt-0.5">Configure settings</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">3</span>
                                                <span className="mt-0.5">Download result</span>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar Ad (Rectangle) */}
                            <AdUnit slot="tool-sidebar" format="rectangle" className="w-full" />

                            {/* Related Tools */}
                            {relatedTools && relatedTools.length > 0 && (
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Related Tools</h3>
                                    <ul className="space-y-2">
                                        {relatedTools.map((tool) => (
                                            <li key={tool.href}>
                                                <Link href={tool.href} className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                                    <span>{tool.title}</span>
                                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </Container>
            </main>
        </div>
    );
}

function MobileSidebar({ howToUse, relatedTools }: { howToUse?: React.ReactNode, relatedTools?: { title: string, href: string }[] }) {
    return (
        <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-zinc-800">
            {/* How to Use */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-5">
                <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-bold">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                    <h3>How to use</h3>
                </div>
                <div className="text-sm text-slate-600 dark:text-zinc-400 space-y-3 leading-relaxed">
                    {howToUse || (
                        <ul className="space-y-3">
                            <li className="flex gap-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">1</span>
                                <span className="mt-0.5">Upload your files</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">2</span>
                                <span className="mt-0.5">Configure settings</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center text-xs font-bold">3</span>
                                <span className="mt-0.5">Download result</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            {/* Related Tools */}
            {relatedTools && relatedTools.length > 0 && (
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">Related Tools</h3>
                    <ul className="space-y-2">
                        {relatedTools.map((tool) => (
                            <li key={tool.href}>
                                <Link href={tool.href} className="group flex items-center justify-between text-sm text-slate-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
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
