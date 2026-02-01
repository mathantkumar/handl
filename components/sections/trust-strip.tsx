import { Container } from "@/components/layout/container";
import { Building2, Globe, Command, Box } from "lucide-react";

export function TrustStrip() {
    return (
        <section className="w-full border-y border-slate-200/60 bg-slate-50 py-12 mt-16 mb-15">
            <Container>
                <p className="text-center text-sm font-medium text-slate-500 mb-8">
                    Trusted by privacy-conscious users at companies like
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
                    {/* Generic Logos simulating companies */}
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Building2 className="h-5 w-5" />
                        <span>Acme Corp</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Globe className="h-5 w-5" />
                        <span>GlobalBank</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Command className="h-5 w-5" />
                        <span>TechFlow</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Box className="h-5 w-5" />
                        <span>CubeSystems</span>
                    </div>
                </div>
            </Container>
        </section>
    );
}
