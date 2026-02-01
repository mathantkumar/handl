import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Check, X, Shield, Zap, Database, Lock, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata = {
    title: "Pricing - Handl (Forever Free PDF Tools)",
    description: "Simple pricing: $0.00 forever. Unlimited PDF merging, splitting, and editing. No credit card, no sign-up, 100% privacy.",
};

export default function PricingPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <section className="pt-24 pb-12 md:pt-32 md:pb-20 text-center px-4">
                <Container>
                    <div className="inline-flex items-center justify-center p-2 mb-8 rounded-full bg-blue-100/50 border border-blue-200">
                        <span className="px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider bg-white rounded-full shadow-sm">
                            Officially Free
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 mb-6 tracking-tight">
                        Simple Pricing: <span className="text-blue-600">$0.00</span> Forever.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        No credit card. No sign-up. No daily limits. We literally don't have a database to store your payment info.
                    </p>

                    {/* The $0 Badge */}
                    <div className="relative inline-block transform hover:scale-105 transition-transform duration-300">
                        <div className="absolute -top-6 -right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12 z-20 border border-yellow-500/20">
                            BEST VALUE
                        </div>
                        <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl shadow-blue-600/30 border-4 border-white ring-4 ring-blue-50">
                            <span className="text-4xl md:text-5xl font-bold">$0</span>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Pricing Card */}
            <section className="pb-20 px-4">
                <Container>
                    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-300 relative">
                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />

                        <div className="p-8 md:p-10 space-y-8">
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900">The Unlimited Privacy Plan</h2>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className="text-sm text-slate-400 font-medium line-through decoration-slate-400/50">$9.99/mo</span>
                                    <span className="text-5xl font-extrabold text-slate-900">Free</span>
                                </div>
                                <p className="text-sm text-slate-500">Forever. Seriously.</p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    { text: "Unlimited PDF Merging & Splitting", icon: Check },
                                    { text: "Process 1GB+ Files (Browser-based)", icon: Database },
                                    { text: "No Daily Limits (Unlike the other guys)", icon: Zap },
                                    { text: "100% Privacy (Files stay on your device)", icon: Shield },
                                    { text: "No Watermarks on exports", icon: Check },
                                    { text: "Works Offline (Airplane Mode friendly)", icon: Lock },
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-700">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                            <feature.icon className="w-3.5 h-3.5" />
                                        </div>
                                        <span className="font-medium">{feature.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button asChild size="lg" className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-xl">
                                <Link href="/">
                                    Start Using for Free
                                </Link>
                            </Button>

                            <p className="text-xs text-center text-slate-400">
                                No credit card required. Because we don't have a billing system.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Comparison Table */}
            <section className="py-20 bg-white border-t border-slate-100">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Handl is better than Cloud Tools</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Most "free" PDF tools upload your data to their servers. We process everything locally.
                        </p>
                    </div>

                    <div className="overflow-x-auto max-w-4xl mx-auto rounded-2xl border border-slate-200 shadow-sm bg-slate-50/50">
                        <table className="w-full text-left text-sm md:text-base">
                            <thead>
                                <tr className="border-b border-slate-200 bg-slate-50">
                                    <th className="p-6 font-semibold text-slate-900 w-1/3">Feature</th>
                                    <th className="p-6 font-bold text-blue-600 bg-blue-50/50 w-1/3 text-center border-l border-r border-blue-100">Handl (Us)</th>
                                    <th className="p-6 font-semibold text-slate-500 text-center w-1/3">"The Big Guys"</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[
                                    { feature: "Cost", us: "Free Forever", them: "$6-$12/month", highlight: true },
                                    { feature: "Privacy", us: "Local-First (Safe)", them: "Uploads to Server (Risky)", highlight: true },
                                    { feature: "File Limits", us: "Unlimited", them: "2 Files / Day", highlight: true },
                                    { feature: "Speed", us: "Instant (Zero Latency)", them: "Wait for Upload/Download", highlight: true },
                                    { feature: "Security", us: "Bank-Grade (No data transfer)", them: "You hope they delete it", highlight: true },
                                ].map((row, idx) => (
                                    <tr key={idx} className="group hover:bg-white transition-colors">
                                        <td className="p-6 font-medium text-slate-700">{row.feature}</td>
                                        <td className={cn(
                                            "p-6 text-center font-bold border-l border-r border-blue-100 bg-blue-50/30 group-hover:bg-blue-50/50 transition-colors",
                                            row.highlight ? "text-blue-700" : "text-slate-700"
                                        )}>
                                            {row.us}
                                        </td>
                                        <td className="p-6 text-center text-slate-500">{row.them}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </section>

            {/* Hidden Cost Section */}
            <section className="py-20 px-4">
                <Container>
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 text-pink-500 rounded-full mb-2">
                            <Heart className="w-6 h-6 fill-current" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900">Okay, there is one hidden cost...</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            To keep this tool alive, we ask for one thing: <strong>Tell a friend.</strong> If you save 5 hours of work using Handl, tweet about us or send the link to your coworker. That is how we pay the bills (emotionally).
                        </p>
                        <div className="pt-4 flex justify-center gap-4">
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href="https://twitter.com/intent/tweet?text=I%20found%20this%20amazing%20free%20PDF%20tool%20that%20processes%20files%20locally%21%20Check%20out%20Handl%3A&url=https%3A%2F%2Fyourpdf.com" target="_blank">
                                    <Share2 className="w-4 h-4" />
                                    Share on X
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-12 text-sm text-slate-400 flex flex-wrap justify-center gap-3">
                            <span>Free PDF Combiner</span> &bull;
                            <span>Secure Offline PDF Tool</span> &bull;
                            <span>Alternative to iLovePDF</span> &bull;
                            <span>Merge PDF without upload</span>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
