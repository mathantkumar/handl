"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "@/config/tools";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface ToolGridProps {
    tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
    return (
        <section className="pb-32 min-h-[400px]">
            <Container>
                {tools.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-slate-500 text-lg">No tools found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {tools.map((tool) => {
                            const isFeatured = tool.id === "merge-pdf";
                            return (
                                <Link
                                    key={tool.id}
                                    href={tool.path}
                                    className={cn(
                                        "block h-full outline-none",
                                        tool.isComingSoon && "pointer-events-none",
                                        isFeatured && "md:col-span-2"
                                    )}
                                >
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.2 }}
                                        className={cn(
                                            "group relative flex flex-col h-full rounded-2xl p-6 transition-all duration-300 overflow-hidden",
                                            // Default State
                                            "bg-slate-50/50 border border-slate-200/60",
                                            // Hover State (Glass Effect)
                                            "hover:backdrop-blur-md hover:bg-white/60 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-900/5",
                                            tool.isComingSoon && "opacity-60 bg-slate-50 border-dashed"
                                        )}
                                    >
                                        <div className="relative z-10">
                                            <div className={cn(
                                                "mb-6 flex items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110 duration-300",
                                                isFeatured ? "h-16 w-16" : "h-14 w-14"
                                            )}>
                                                <tool.icon className={cn(isFeatured ? "h-8 w-8" : "h-7 w-7")} />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 flex items-center justify-between text-slate-900">
                                                {tool.title}
                                                {tool.isComingSoon && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">Soon</span>
                                                )}
                                            </h3>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-sm">
                                                {tool.description}
                                            </p>
                                        </div>

                                        {/* Abstract Illustration for Featured Card */}
                                        {isFeatured && (
                                            <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 md:opacity-100 hidden md:block pointer-events-none">
                                                <div className="relative h-32 w-32">
                                                    <div className="absolute top-0 right-0 p-3 bg-white border border-slate-100 rounded-lg shadow-sm transform rotate-6 translate-x-4 group-hover:translate-x-2 transition-transform duration-500">
                                                        <FileText className="text-blue-200 h-16 w-16" />
                                                    </div>
                                                    <div className="absolute top-4 right-8 p-3 bg-white border border-slate-100 rounded-lg shadow-md transform -rotate-6 group-hover:rotate-0 transition-transform duration-500">
                                                        <FileText className="text-blue-400 h-16 w-16" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Container>
        </section>
    );
}
