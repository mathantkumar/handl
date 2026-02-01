import {
    FileText,
    Files,
    Scissors,
    Minimize2,
    Image as ImageIcon,
    FileType,
    Lock,
    Unlock,
    RotateCw,
    Trash2,
    LayoutGrid,
    Hash,
    Stamp,
    PenLine
} from "lucide-react";

export interface Tool {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    path: string;
    category: "Edit" | "Convert" | "Security";
    isComingSoon?: boolean;
    content?: string; // HTML content for SEO
}

export const ALL_TOOLS: Tool[] = [
    {
        id: "merge-pdf",
        title: "Merge PDF",
        description: "Combine multiple PDFs into one document. 100% Offline.",
        icon: Files,
        path: "/tools/merge-pdf",
        category: "Edit",
        content: `
            <h2>The Ultimate Guide to Merging PDF Files</h2>
            <p>Combining multiple PDF documents into a single, organized file is a fundamental task for legal professionals, students, and businesses. Handl provides a secure, client-side solution to merge PDFs without ever uploading them to a server.</p>

            <h3>Why Merge PDFs?</h3>
            <ul>
                <li><strong>Consolidation:</strong> Combine monthly reports into a yearly summary.</li>
                <li><strong>Organization:</strong> Keep related documents, such as receipts and invoices, in one place.</li>
                <li><strong>Sharing:</strong> Send a single attachment instead of a dozen separate files.</li>
            </ul>

            <h3>How to Merge PDFs on Mac and Windows</h3>
            <p>Whether you're using macOS or Windows, the process with Handl is identical effectively removing cross-platform compatibility headaches.</p>
            <ol>
                <li><strong>Select your files:</strong> Click "Choose Files" or drag and drop your PDFs into the merge area.</li>
                <li><strong>Reorder files:</strong> Arrange the documents in the exact order you want them to appear in the final file.</li>
                <li><strong>Merge:</strong> Click the "Merge PDF" button.</li>
                <li><strong>Download:</strong> Instantly save the combined document to your device.</li>
            </ol>
            
            <h3>Troubleshooting Common Merge Errors</h3>
            <p>Sometimes, PDFs can be stubborn. Here are common issues and fixes:</p>
            <ul>
                <li><strong>Password Protection:</strong> If one of your files is encrypted, you must unlock it first. Use our <a href="/tools/unlock-pdf" class="text-blue-600 hover:underline">Unlock PDF tool</a>.</li>
                <li><strong>Corrupted Files:</strong> If a file fails to merge, try opening it in a browser and "Printing to PDF" to create a fresh copy.</li>
                <li><strong>Size Limits:</strong> Since Handl processes files locally, the only limit is your computer's RAM. You can merge gigabytes of data without hitting server caps.</li>
            </ul>

            <h3>Safety First: The Client-Side Advantage</h3>
            <p>Safety is paramount. When you use online mergers that require uploads, you risk:</p>
            <ul>
                <li><strong>Data Breaches:</strong> Server-side storage vulnerabilities.</li>
                <li><strong>Compliance Violations:</strong> GDPR issues when data crosses borders.</li>
            </ul>
            <p>Handl eliminates these risks. Your files are processed 100% within your browser. <strong>Your data never leaves your computer.</strong></p>
        `
    },
    {
        id: "split-pdf",
        title: "Split PDF",
        description: "Extract pages from your PDF or save each page as a separate PDF.",
        icon: Scissors,
        path: "/tools/split-pdf",
        category: "Edit",
        isComingSoon: true,
    },
    {
        id: "compress-pdf",
        title: "Compress PDF",
        description: "Reduce file size while optimizing for maximal PDF quality.",
        icon: Minimize2,
        path: "/tools/compress-pdf",
        category: "Edit",
        isComingSoon: true,
    },
    {
        id: "pdf-to-jpg",
        title: "PDF to JPG",
        description: "Convert each PDF page into a JPG or extract all images.",
        icon: ImageIcon,
        path: "/tools/pdf-to-jpg",
        category: "Convert",
        content: `
            <h2>High-Resolution PDF to JPG Conversion</h2>
            <p>Extracting images from a PDF or converting entire pages into image formats is essential for presentations, social media, and web compatibility. Handl offers a powerful, local engine to convert PDF to JPG with high fidelity.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>High Resolution:</strong> Maintain 300 DPI for print-quality images.</li>
                <li><strong>Batch Processing:</strong> Convert hundreds of pages at once.</li>
                <li><strong>Secure Extraction:</strong> Extract embedded images without losing quality.</li>
            </ul>

            <h3>When to Convert PDF to JPG?</h3>
            <p>PDFs are great for documents, but sometimes you need an image:</p>
            <ul>
                <li><strong>Social Media:</strong> Instagram and Facebook don't support PDF uploads. Convert your flyer to JPG to share it.</li>
                <li><strong>Presentations:</strong> Embed a specific page into PowerPoint or Keynote as an image.</li>
                <li><strong>Web Archives:</strong> Create thumbnails for your document library.</li>
            </ul>

            <h3>Handling Zip Files</h3>
            <p>When converting a large PDF with many pages, downloading dozens of individual images can be messy. Handl automatically bundles your converted images into a single ZIP file for easy one-click downloading.</p>

            <h3>Privacy Protection</h3>
            <p>Just like our other tools, the conversion happens in your browser. If you're converting sensitive architectural plans or financial charts, you can rest assured that no third party is peeking at your pixels.</p>
        `
    },
    {
        id: "jpg-to-pdf",
        title: "JPG to PDF",
        description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
        icon: FileType,
        path: "/tools/jpg-to-pdf",
        category: "Convert",
    },
    {
        id: "word-to-pdf",
        title: "Word to PDF",
        description: "Make DOC and DOCX files easy to read by converting them to PDF.",
        icon: FileText,
        path: "/tools/word-to-pdf",
        category: "Convert",
        isComingSoon: true,
    },
    {
        id: "protect-pdf",
        title: "Protect PDF",
        description: "Encrypt your PDF with a password to prevent unauthorized access.",
        icon: Lock,
        path: "/tools/protect-pdf",
        category: "Security",
        content: `
            <h2>Secure Your Documents with AES Encryption</h2>
            <p>In an age of digital espionage, protecting your sensitive documents is non-negotiable. Handl's Protect PDF tool applies industrial-strength encryption directly in your browser.</p>

            <h3>Understanding PDF Encryption</h3>
            <p>We use standard PDF encryption methods compatible with Adobe Acrobat and all major readers. This ensures that only someone with the correct password can open the file.</p>
            
            <h3>Why You Should Never Upload Password-Protected Files</h3>
            <p>It's a paradox: you password-protect a file because it's sensitive, yet to process it on most sites, you have to upload it to a stranger's server. Handl solves this:</p>
            <ul>
                <li><strong>Local Processing:</strong> The encryption keys are generated and applied on your device.</li>
                <li><strong>Zero Transmission:</strong> The unencrypted file is never sent over the internet.</li>
            </ul>

            <h3>Best Practices for Passwords</h3>
            <ul>
                <li><strong>Length:</strong> Use at least 12 characters.</li>
                <li><strong>Complexity:</strong> Mix uppercase, lowercase, numbers, and symbols.</li>
                <li><strong>Uniqueness:</strong> Never reuse passwords across important documents.</li>
            </ul>
        `
    },
    {
        id: "unlock-pdf",
        title: "Unlock PDF",
        description: "Remove password security from a PDF file (if you know the password).",
        icon: Unlock,
        path: "/tools/unlock-pdf",
        category: "Security",
        content: `
            <h2>Unlock PDF: Regain Access to Your Files</h2>
            <p>Forgotten passwords or legacy permissions can lock you out of your own data. Our Unlock PDF tool helps you remove security restrictions instantly—provided you have the right credentials.</p>

            <h3>How it Works</h3>
            <p>This tool removes the "Owner Password" (permissions like printing/editing limits) and the "User Password" (open password). <em>Note: You must know the password to remove it. We do not support brute-force cracking for ethical and legal reasons.</em></p>

            <h3>Remove Restrictions</h3>
            <p>Sometimes you can open a file but can't print or copy text. This is because of "Owner" restrictions. Handl strips these limitations so you can fully utilize your document.</p>

            <h3>Security Warning</h3>
            <p>Never type your PDF passwords into a website that processes files server-side. A malicious site could log your file and your password, granting them full access. With Handl, the password input stays in your browser memory and is wiped as soon as you close the tab.</p>
        `
    },
    {
        id: "rotate-pdf",
        title: "Rotate PDF",
        description: "Rotate specific pages or the entire document permanently.",
        icon: RotateCw,
        path: "/tools/rotate-pdf",
        category: "Edit",
    },
    {
        id: "remove-pages",
        title: "Remove Pages",
        description: "Delete unwanted pages from your PDF document.",
        icon: Trash2,
        path: "/tools/remove-pages",
        category: "Edit",
    },
    {
        id: "organize-pdf",
        title: "Organize PDF",
        description: "Sort, reorder, and organize pages in your PDF file.",
        icon: LayoutGrid,
        path: "/tools/organize-pdf",
        category: "Edit",
    },
    {
        id: "add-page-numbers",
        title: "Page Numbers",
        description: "Add page numbers to your PDF with custom positioning.",
        icon: Hash,
        path: "/tools/add-page-numbers",
        category: "Edit",
    },
    {
        id: "watermark-pdf",
        title: "Watermark PDF",
        description: "Stamp text or images over your PDF pages.",
        icon: Stamp,
        path: "/tools/watermark-pdf",
        category: "Security",
    },
    {
        id: "sign-pdf",
        title: "Sign PDF",
        description: "Add your signature to PDF documents securely.",
        icon: PenLine,
        path: "/tools/sign-pdf",
        category: "Security",
    },
];
