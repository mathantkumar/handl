"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, Check, Download, Loader2 } from "lucide-react";

export function HeroVisual() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        // Total cycle: ~8s
        if (step === 0) {
            // Step 1: Drop/Scan (2s)
            timeout = setTimeout(() => setStep(1), 2000);
        } else if (step === 1) {
            // Step 2: Encrypt/Shield (3s)
            timeout = setTimeout(() => setStep(2), 3000);
        } else if (step === 2) {
            // Step 3: Success (2s)
            timeout = setTimeout(() => setStep(3), 2000);
        } else if (step === 3) {
            // Step 4: Reset (1s)
            timeout = setTimeout(() => setStep(0), 1000);
        }

        return () => clearTimeout(timeout);
    }, [step]);

    return (
        <div className="relative w-full max-w-[320px] aspect-[4/3] mx-auto perspective-[1000px]">
            {/* Decorative Glow Orb behind widget */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/30 blur-[80px] rounded-full -z-10" />

            {/* Main Glass Card */}
            <motion.div
                animate={{
                    rotate: 0,
                    y: [0, -8, 0]
                }}
                transition={{
                    rotate: { duration: 0 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-full h-full bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl flex flex-col items-center justify-center relative overflow-hidden ring-1 ring-white/40"
            >
                {/* Glass Sheen Animation */}
                <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4.5, // 1.5s duration + 4.5s delay = 6s cycle
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none z-10"
                />
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="scan"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center text-slate-500"
                        >
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                className="bg-white p-3 rounded-xl shadow-md border border-slate-100 mb-3 relative"
                            >
                                <FileText className="h-10 w-10 text-blue-500" />
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-0.5 bg-blue-400/50 shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                                />
                            </motion.div>
                            <p className="text-sm font-medium animate-pulse">Scanning local file...</p>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="encrypt"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center w-full px-8"
                        >
                            <div className="relative mb-4">
                                <Shield className="h-14 w-14 text-green-500" />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                </motion.div>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                            <p className="text-xs font-semibold text-green-600">Encrypting locally...</p>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="bg-green-100 p-3 rounded-full mb-3 text-green-600 shadow-sm"
                            >
                                <Check className="h-8 w-8" />
                            </motion.div>
                            <p className="text-sm font-bold text-slate-900">Ready for Download</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Offline badge always visible */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200/50 border border-slate-300/50 backdrop-blur-sm text-[10px] font-mono font-medium text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Safe and Secure
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
