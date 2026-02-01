"use client";

import { Tool } from "@/config/tools";
import { Container } from "@/components/layout/container";
import { ToolCard } from "@/components/ToolCard";

interface ToolGridProps {
    tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
    return (
        <section className="pb-15 min-h-[400px]">
            <Container>
                {tools.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-15 text-center">
                        <p className="text-slate-500 text-lg">No tools found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {tools.map((tool) => (
                            <ToolCard
                                key={tool.id}
                                tool={tool}
                                isFeatured={tool.id === "summarize-pdf"}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </section>
    );
}
