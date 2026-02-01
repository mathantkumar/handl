import { Reorder, useDragControls } from "framer-motion";
import { FileText, GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileCardProps {
    file: File;
    onRemove: (file: File) => void;
}

export const FileCard = ({ file, onRemove }: FileCardProps) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={file}
            dragListener={false}
            dragControls={controls}
            className="relative flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex items-center gap-3 overflow-hidden">
                {/* Drag Handle */}
                <div
                    onPointerDown={(e) => controls.start(e)}
                    className="cursor-grab touch-none p-1 text-muted-foreground hover:text-foreground active:cursor-grabbing"
                >
                    <GripVertical className="h-5 w-5" />
                </div>

                {/* File Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <FileText className="h-5 w-5" />
                </div>

                {/* File Info */}
                <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-sm font-medium text-foreground">
                        {file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                </div>
            </div>

            {/* Remove Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(file)}
                className="h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
            >
                <X className="h-4 w-4" />
            </Button>
        </Reorder.Item>
    );
};
