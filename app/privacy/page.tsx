export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-6 py-16 max-w-4xl prose prose-slate">
            <h1>Privacy Policy</h1>
            <p className="lead">
                Your privacy is our core feature. This policy describes how Handl ("we", "us", or "our") handles your information
                when you use our website.
            </p>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100 not-prose my-8">
                <h3 className="text-lg font-bold text-green-800 mb-2">The Short Version</h3>
                <p className="text-green-700">
                    <strong>We do not see, store, or upload your files.</strong> All file processing happens locally in your browser's memory.
                    We have no access to the content of your documents.
                </p>
            </div>

            <h2>1. File Processing</h2>
            <p>
                Unlike other online PDF tools, Handl does not upload your files to a server for processing. We utilize
                WebAssembly and HTML5 technologies to execute all operations (merging, compressing, encrypting, etc.)
                directly on your device. Your files strictly remain on your computer or mobile device.
            </p>

            <h2>2. Data Collection</h2>
            <p>
                We do not collect personal data such as names, email addresses, or document contents.
                We use third-party services for basic analytics and advertising:
            </p>
            <ul>
                <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to understand website traffic patterns
                    (e.g., how many users visited the site). This data is anonymized.
                </li>
                <li>
                    <strong>Google AdSense:</strong> We display ads to support the free operation of this tool.
                    Google may use cookies to serve ads based on your prior visits to this website or other websites.
                </li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
                We use cookies solely for the purpose of analytics and advertising partners mentioned above.
                You can disable cookies in your browser settings at any time.
            </p>

            <h2>4. Changes to This Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page.
            </p>

            <p className="text-sm text-slate-500 mt-12">
                Last updated: February 1, 2026
            </p>
        </div>
    );
}
