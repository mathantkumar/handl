"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";

export function Hero() {

    return (
        <section className="relative overflow-hidden pt-6 pb-10 md:pt-10 md:pb-10 bg-background">
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h2 className="max-w-4xl font-display text-5xl font-bold tracking-tighter text-slate-900 sm:text-6xl lg:text-5xl mb-6">
                                <span className="text-blue-600">Handl </span> your documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">safely.</span>
                            </h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-8 max-w-xl text-lg text-slate-600 sm:text-xl leading-relaxed md:leading-loose"
                        >
                            Process files 100% offline in your browser. No servers, no limits.
                        </motion.p>


                    </div>


                </div>
            </Container>
        </section>
    );
}
