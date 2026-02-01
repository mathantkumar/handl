"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Image as ImageIcon } from "lucide-react";

interface FilePreviewListProps {
    files: File[];
    onRemove: (file: File) => void;
}

export function FilePreviewList({ files, onRemove }: FilePreviewListProps) {
    if (files.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
            <AnimatePresence>
                {files.map((file, index) => (
                    <motion.div
                        key={`${file.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm group relative"
                    >
                        {/* File Icon */}
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                            {file.type.startsWith("image/") ? (
                                <ImageIcon className="w-5 h-5" />
                            ) : (
                                <FileText className="w-5 h-5" />
                            )}
                        </div>

                        {/* Meta */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate pr-6">{file.name}</p>
                            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        {/* Remove Action */}
                        <button
                            onClick={() => onRemove(file)}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            title="Remove file"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
