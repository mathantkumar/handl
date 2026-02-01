"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const FAQS = [
    {
        question: "Is this really free?",
        answer: "Yes, absolutely. Because the processing happens on your device, we don't not have expensive server costs to cover. We are supported by minimal, non-intrusive ads.",
    },
    {
        question: "Where are my files stored?",
        answer: "Nowhere. Your files stay in your browser's memory and are discarded as soon as you close the tab. We never see, touch, or store your documents.",
    },
    {
        question: "Can I use this on Mac/Windows?",
        answer: "Yes, Handl works on any modern browser (Chrome, Safari, Edge, Firefox) on any operating system, including Mac, Windows, Linux, Android, and iOS.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
                    <div className="divide-y divide-border rounded-xl border bg-card">
                        {FAQS.map((faq, index) => (
                            <div key={index} className="group">
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="flex w-full items-center justify-between p-6 text-left font-medium transition-colors hover:bg-muted/50"
                                >
                                    <span className="text-lg">{faq.question}</span>
                                    <ChevronDown
                                        className={cn(
                                            "h-5 w-5 text-muted-foreground transition-transform duration-200",
                                            openIndex === index && "rotate-180"
                                        )}
                                    />
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
