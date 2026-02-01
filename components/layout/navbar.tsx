"use client";

import Link from "next/link";
import { Github, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ALL_TOOLS } from "@/config/tools";

export function Navbar() {
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

                            {/* Dropdown Content */}
                            <div className="absolute top-full left-0 mt-2 w-64 origin-top-right opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
                                <div className="rounded-xl border border-slate-200/60 bg-white/90 backdrop-blur-xl p-1.5 shadow-xl shadow-slate-200/50 ring-1 ring-black/5">
                                    <div className="grid gap-0.5">
                                        {ALL_TOOLS.map((tool) => (
                                            <Link
                                                key={tool.id}
                                                href={tool.path}
                                                className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            >
                                                <div className="flex-shrink-0 text-slate-400 group-hover/item:text-blue-500 transition-colors">
                                                    <tool.icon className="h-4 w-4" />
                                                </div>
                                                <span className="truncate">{tool.title}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                            Pricing
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex text-slate-500 hover:text-slate-900">
                            <Link href="https://github.com" target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                        <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 shadow-none">
                            Get Started
                        </Button>
                    </div>
                </div>
            </Container>
        </nav>
    );
}
