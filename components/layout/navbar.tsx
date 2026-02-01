"use client";

import Link from "next/link";
import { Github, ChevronDown, Menu, X, Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ALL_TOOLS } from "@/config/tools";
import { useState } from "react";
import { cn } from "@/lib/utils";

import { BrandIcon } from "@/components/BrandIcon";

// Define the rendering order for the columns
const COL_1_IDS = ["merge-pdf", "split-pdf", "organize-pdf", "remove-pages", "rotate-pdf", "add-page-numbers", "watermark-pdf"];
const COL_2_IDS = ["pdf-to-jpg", "jpg-to-pdf", "word-to-pdf"];
const COL_3_IDS = ["summarize-pdf", "protect-pdf", "unlock-pdf", "sign-pdf"];

export function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const filteredTools = searchQuery
        ? ALL_TOOLS.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    // Helper to get tool config
    const getTool = (id: string) => ALL_TOOLS.find((t) => t.id === id);

    const renderToolItem = (id: string) => {
        const tool = getTool(id);
        if (!tool) return null;
        return (
            <Link
                key={tool.id}
                href={tool.path}
                className="flex items-center space-x-3 rounded-lg p-2.5 -mx-2.5 text-sm font-medium text-slate-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors group/item"
            >
                <BrandIcon type={tool.id} className="w-8 h-8 rounded-lg shrink-0" />
                <div className="flex items-center gap-2">
                    <span className="truncate">{tool.title.replace(" (Beta)", "")}</span>
                    {tool.id === "summarize-pdf" && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                </div>
            </Link>
        );
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-md dark:bg-black/70 dark:border-zinc-800/50 supports-[backdrop-filter]:bg-white/70">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2.5 group">
                        <div className="text-blue-600 transition-colors group-hover:text-blue-700">
                            <Logo className="h-8 w-8" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                            Handl
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Custom Dropdown */}
                        <div className="group relative inline-block text-left">
                            <button className="flex items-center space-x-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors py-4 outline-none">
                                <span>All Tools</span>
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                            </button>

                            {/* Dropdown Content - Mega Menu Style */}
                            <div className="absolute top-full left-1/2 mt-2 w-[640px] -translate-x-1/2 origin-top opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform z-50">
                                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden ring-1 ring-black/5 p-6">
                                    <div className="grid grid-cols-3 gap-8">
                                        {/* Column 1 */}
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="text-xs font-semibold text-zinc-500 mb-2 tracking-wider">EDIT</h3>
                                            {COL_1_IDS.map(renderToolItem)}
                                        </div>
                                        {/* Column 2 */}
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="text-xs font-semibold text-zinc-500 mb-2 tracking-wider">CONVERT</h3>
                                            {COL_2_IDS.map(renderToolItem)}
                                        </div>
                                        {/* Column 3 */}
                                        <div className="flex flex-col space-y-2">
                                            <h3 className="text-xs font-semibold text-zinc-500 mb-2 tracking-wider">SECURITY & AI</h3>
                                            {COL_3_IDS.map(renderToolItem)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            Blog
                        </Link>
                        <Link href="/pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
                            Pricing
                        </Link>

                        {/* Search Bar */}
                        <div className="relative hidden lg:block w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className="h-10 w-full rounded-full bg-slate-100 dark:bg-zinc-800 border-none pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />

                            {/* Search Results Dropdown */}
                            {isSearchFocused && searchQuery && (
                                <div className="absolute top-full text-left left-0 mt-2 w-full bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                                    {filteredTools.length > 0 ? (
                                        <div className="py-2">
                                            {filteredTools.map((tool) => (
                                                <Link
                                                    key={tool.id}
                                                    href={tool.path}
                                                    onClick={() => setSearchQuery("")}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                                                >
                                                    <BrandIcon type={tool.id} className="w-8 h-8 rounded-lg shrink-0" />
                                                    <div className="flex flex-col overflow-hidden">
                                                        <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{tool.title}</span>
                                                        <span className="text-xs text-slate-500 dark:text-zinc-400 truncate">{tool.description}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                            No tools found for "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white">
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
                        className="md:hidden p-2 text-slate-600 dark:text-zinc-400"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 py-4 space-y-4 h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-black">
                        <div className="grid grid-cols-2 gap-2">
                            {ALL_TOOLS.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={tool.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors text-center space-y-2 border border-slate-100 dark:border-zinc-800"
                                >
                                    <BrandIcon type={tool.id} className="w-8 h-8 rounded-lg mb-1" />
                                    <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">{tool.title}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <Link
                                href="/blog"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-900 rounded-lg"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/pricing"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-900 rounded-lg"
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
