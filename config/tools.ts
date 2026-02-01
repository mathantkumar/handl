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
}

export const ALL_TOOLS: Tool[] = [
    {
        id: "merge-pdf",
        title: "Merge PDF",
        description: "Combine multiple PDFs into one document. 100% Offline.",
        icon: Files,
        path: "/tools/merge-pdf",
        category: "Edit",
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
    },
    {
        id: "unlock-pdf",
        title: "Unlock PDF",
        description: "Remove password security from a PDF file (if you know the password).",
        icon: Unlock,
        path: "/tools/unlock-pdf",
        category: "Security",
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
