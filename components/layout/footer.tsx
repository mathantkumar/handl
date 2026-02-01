import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ShieldCheck } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <Container>
                <div className="grid gap-8 py-12 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="font-bold text-lg text-foreground">
                                Handl
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                            Handle your documents safely. All processing happens directly in your browser.
                            Your files never leave your device. Secure, fast, and free.
                        </p>
                    </div>
                    {/* Links */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/tools/merge-pdf" className="hover:text-brand-600">Merge PDF</Link></li>
                            <li><Link href="/tools/compress-pdf" className="hover:text-brand-600">Compress PDF</Link></li>
                            <li><Link href="/tools/pdf-to-jpg" className="hover:text-brand-600">PDF to JPG</Link></li>
                            <li><Link href="/about" className="hover:text-brand-600">About Us</Link></li>
                            <li><Link href="/pricing" className="hover:text-brand-600">Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/privacy" className="hover:text-brand-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-brand-600">Terms of Service</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-brand-600">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t py-6 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Handl. All rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
