"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ALL_TOOLS } from "@/config/tools";

interface FAQ {
    question: string;
    answer: string;
}

interface ToolSEOProps {
    toolName: string;
    faqs?: FAQ[];
    className?: string; // Additional classes
}

export function ToolSEO({ toolName, faqs, className }: ToolSEOProps) {
    // Default FAQs if none provided
    const defaultFaqs: FAQ[] = [
        {
            question: `Is ${toolName} free to use?`,
            answer: "Yes, this tool is 100% free and does not require any sign-up or subscription.",
        },
        {
            question: "Are my files safe?",
            answer: `Absolutely. We use local-first processing, which means your files are processed directly in your browser and are never uploaded to our servers. Your data stays on your device.`,
        },
        {
            question: `Can I use ${toolName} offline?`,
            answer: "Yes! Since the processing happens in your browser, once the page is loaded, you can use the tool even without an internet connection.",
        },
    ];

    const finalFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;
    const tool = ALL_TOOLS.find((t) => t.title === toolName);
    const hasCustomContent = !!tool?.content;

    return (
        <div className={cn("max-w-4xl mx-auto px-6 py-16 space-y-16", className)}>
            {hasCustomContent ? (
                /* Custom Rich SEO Content */
                <section
                    className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:mt-10 prose-h2:mb-4 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900"
                    dangerouslySetInnerHTML={{ __html: tool!.content! }}
                />
            ) : (
                /* Default Auto-Generated Content */
                <>
                    {/* Section 1: Guide */}
                    <section className="prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 not-prose mb-6">
                            How to {toolName} Offline
                        </h2>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <ol className="list-decimal list-inside space-y-4 marker:text-blue-600 marker:font-bold">
                                <li>
                                    <strong className="text-slate-900">Upload your file:</strong> Drag and drop your document into the box above or click to select it from your device.
                                </li>
                                <li>
                                    <strong className="text-slate-900">Process instantly:</strong> Our tool processes your file immediately in your browser memory.
                                </li>
                                <li>
                                    <strong className="text-slate-900">Download:</strong> Once finished, click the download button to save your {toolName.toLowerCase().includes("pdf") ? "new PDF" : "file"} directly to your device.
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Section 2: USP */}
                    <section className="prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 not-prose mb-4">
                            Why use Handl for {toolName}?
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            Most online tools upload your sensitive documents to a remote server for processing, which creates privacy risks and slows down the process.
                            <strong> Handl is different.</strong> We use advanced browser technologies (WebAssembly and modern JavaScript) to run the `{toolName}` logic
                            right on your computer. This guarantees that <strong>your files never leave your device</strong>, ensuring maximum privacy and lightning-fast speed.
                        </p>
                    </section>
                </>
            )}

            {/* Section 3: FAQ */}
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                    {finalFaqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium text-slate-900">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    );
}
