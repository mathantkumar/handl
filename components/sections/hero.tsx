"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HeroVisual } from "@/components/hero-visual";

interface HeroProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
}

export function Hero({ searchQuery, onSearchChange }: HeroProps) {
    const [placeholder, setPlaceholder] = useState("Search for tools...");

    useEffect(() => {
        const placeholders = ["Search for tools...", "Try 'Merge PDF'...", "Try 'Compress'...", "Try 'Unlock'..."];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % placeholders.length;
            setPlaceholder(placeholders[index]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-24 bg-background">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

            {/* Aurora Glow (Adjusted for split layout - positioned more centrally/right to act as backdrop) */}
            <motion.div
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 blur-[120px] rounded-full -z-10 translate-x-1/3 -translate-y-1/4"
            />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text & Search */}
                    <div className="text-left flex flex-col items-start">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                        >
                            v1.0 • 100% Local Privacy
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tighter text-slate-900 sm:text-6xl lg:text-5xl mb-6">
                                <span className="text-blue-600">Handl</span> your documents <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">safely.</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8 max-w-xl text-lg text-slate-600 sm:text-xl leading-relaxed md:leading-loose"
                        >
                            Process files 100% offline in your browser. No uploads, no servers, no limits.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="w-full max-w-lg relative"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                                <Search className="absolute left-5 top-4 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={placeholder}
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="w-full h-14 pl-14 pr-16 rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm shadow-lg shadow-slate-200/50 ring-0 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 text-lg transition-all"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                                    <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 font-mono text-[10px] font-medium text-slate-500 opacity-100">
                                        <span className="text-xs">⌘</span>K
                                    </kbd>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex items-center justify-center relative"
                    >
                        <HeroVisual />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
