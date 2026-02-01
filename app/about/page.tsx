import { ToolShell } from "@/components/tool-shell";
import { ShieldCheck, Zap, Lock, Globe } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-6 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">About Handl</h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                Handl was founded by developers who wanted a private, secure, and fast alternative to cloud-based PDF tools.
                We believe that simple file operations shouldn't require you to upload your sensitive data to someone else's server.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Privacy First</h3>
                    <p className="text-slate-600">
                        We built Handl with a "Local-First" architecture. Your files are processed entirely within your web browser
                        and never touch our servers.
                    </p>
                </div>
                <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
                    <p className="text-slate-600">
                        By removing the need to upload and download large files, our tools work instantly.
                        No waiting for server queues or slow internet connections.
                    </p>
                </div>
            </div>

            <div className="prose prose-slate max-w-none">
                <h2>Our Mission</h2>
                <p>
                    The web is becoming more powerful every day. Modern browsers can now handle complex tasks that used to require
                    desktop software or heavy cloud servers. Our mission is to harness this power to build tools that respect your
                    privacy and save you time.
                </p>
                <p>
                    Whether you are merging legal documents, compressing large reports, or protecting sensitive contracts,
                    Handl gives you the power to do it securely on your own device.
                </p>
            </div>
        </div>
    );
}
