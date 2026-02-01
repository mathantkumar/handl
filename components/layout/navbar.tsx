"use client";

import Link from "next/link";
import { Github, ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ALL_TOOLS } from "@/config/tools";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define the rendering order for the columns
const COL_1_IDS = ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-jpg", "jpg-to-pdf"];
const COL_2_IDS = ["word-to-pdf", "protect-pdf", "unlock-pdf", "rotate-pdf", "remove-pages"];
const COL_3_IDS = ["organize-pdf", "add-page-numbers", "watermark-pdf", "sign-pdf"];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper to get tool config
    const getTool = (id: string) => ALL_TOOLS.find((t) => t.id === id);

    const renderToolItem = (id: string) => {
        const tool = getTool(id);
        if (!tool) return null;
        return (
            <Link
                key={tool.id}
                href={tool.path}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group/item"
            >
                <div className="flex-shrink-0 text-slate-400 group-hover/item:text-blue-500 transition-colors">
                    <tool.icon className="h-4 w-4" />
                </div>
                <span className="truncate">{tool.title}</span>
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-xl">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2.5 group">
                        <div className="text-blue-600 transition-colors group-hover:text-blue-700">
                            <Logo className="h-8 w-8" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900">
                            Handl
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Custom Dropdown */}
                        <div className="group relative inline-block text-left">
                            <button className="flex items-center space-x-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors py-4 outline-none">
                                <span>All Tools</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                            </button>

                            {/* Dropdown Content - Mega Menu Style */}
                            <div className="absolute top-full left-0 mt-2 w-[600px] origin-top-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                                <div className="rounded-xl border border-slate-200/60 bg-white/95 backdrop-blur-xl p-6 shadow-xl shadow-slate-200/50 ring-1 ring-black/5">
                                    <div className="grid grid-cols-3 gap-6">
                                        {/* Column 1 */}
                                        <div className="flex flex-col space-y-1">
                                            {COL_1_IDS.map(renderToolItem)}
                                        </div>
                                        {/* Column 2 */}
                                        <div className="flex flex-col space-y-1">
                                            {COL_2_IDS.map(renderToolItem)}
                                        </div>
                                        {/* Column 3 */}
                                        <div className="flex flex-col space-y-1">
                                            {COL_3_IDS.map(renderToolItem)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Blog
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Pricing
                        </Link>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-slate-500 hover:text-slate-900">
                            <Link href="https://github.com/mathantkumar/handl" target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-none">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-100 py-4 space-y-4 h-[calc(100vh-64px)] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                            {ALL_TOOLS.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={tool.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors text-center space-y-2 border border-slate-100"
                                >
                                    <tool.icon className="h-6 w-6 text-blue-500" />
                                    <span className="text-xs font-medium text-slate-700">{tool.title}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="space-y-2 pt-4 border-t border-slate-100">
                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                            >
                                Pricing
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </nav>
    );
}
