"use client";

import Link from "next/link";
import { BrandIcon } from "@/components/BrandIcon";
import { Tool } from "@/config/tools";
import { cn } from "@/lib/utils";

interface ToolCardProps {
    tool: Tool;
    isFeatured?: boolean;
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <Link href={tool.path} className="group relative block h-full">
            <div className="h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 dark:hover:border-blue-900/50">

                {/* 1. The Big Brand Icon */}
                <div className="mb-6">
                    <BrandIcon type={tool.id} className="w-12 h-12 rounded-2xl shadow-md" />
                </div>

                {/* 2. Text Content */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {tool.description}
                </p>

                {/* 3. Badges (New/Beta) */}
                {tool.isNew && (
                    <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        New
                    </span>
                )}
                {tool.isComingSoon && (
                    <span className="absolute top-4 right-4 bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Soon
                    </span>
                )}
            </div>
        </Link>
    );
}
