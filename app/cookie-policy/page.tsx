import { Container } from "@/components/layout/container";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Handl PDF",
    description: "Learn how we use cookies and local storage to improve your experience.",
};

export default function CookiePolicyPage() {
    return (
        <Container className="py-16 max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Introduction</h2>
                <p>
                    Handl ("we", "us", or "our") uses cookies and similar technologies to enhance your experience on our website.
                    This policy explains what cookies are, how we use them, and your choices regarding their use.
                </p>

                <h2>2. What are Cookies?</h2>
                <p>
                    Cookies are small text files that are stored on your device (computer or mobile) when you visit a website.
                    They verify your identity, remember your preferences, and help us analyze how our website is used.
                </p>

                <h2>3. How We Use Cookies</h2>
                <p>We use the following types of cookies:</p>
                <ul>
                    <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly. For example, we use local storage to temporarily hold your files while you process them.</li>
                    <li><strong>Functionality Cookies:</strong> These remember your preferences, such as your compression settings or language choice.</li>
                    <li><strong>Advertising Cookies:</strong> We use Google AdSense to serve ads. Google and its partners may place cookies on your device to serve personalized ads based on your visit to our site and other sites on the internet.</li>
                </ul>

                <h2>4. Data Privacy & Local Storage</h2>
                <p>
                    Uniquely to Handl, we rely heavily on <strong>Local Storage</strong> (a modern browser technology) rather than server-side cookies for file operations.
                    When you "upload" a PDF to merge or convert, the file data resides in your browser's local memory and is never transmitted to us via cookies.
                </p>

                <h2>5. Managing Cookies</h2>
                <p>
                    You can control and manage cookies in your browser settings. You can choose to block or delete cookies, but please note that some features of our website may not function correctly if you do so.
                    To opt-out of personalized advertising from Google, you can visit <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow">Google Ad Settings</a>.
                </p>

                <h2>6. Contact Us</h2>
                <p>If you have any questions about this Cookie Policy, please contact us at support@handlpdf.com.</p>
            </div>
        </Container>
    );
}
