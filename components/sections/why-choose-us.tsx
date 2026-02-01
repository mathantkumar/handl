import { Shield, Zap, Infinity as InfinityIcon } from "lucide-react";
import { Container } from "@/components/layout/container";

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-muted/30 border-t">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight">Why Choose Handl?</h2>
                </div>
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 rounded-full bg-brand-100 p-4 text-brand-600">
                            <Shield className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Bank-Grade Privacy</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Your files never leave your device. Since we don&apos;t have servers, we can&apos;t steal your data even if we wanted to.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 rounded-full bg-brand-100 p-4 text-brand-600">
                            <Zap className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Zero upload time. Zero download time. Everything happens instantly using your own processor.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-6 rounded-full bg-brand-100 p-4 text-brand-600">
                            <InfinityIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Free Forever</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            No daily limits. No paywalls. Process 1GB files or 100 documents at once.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
