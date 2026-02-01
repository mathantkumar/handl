import { SVGProps } from "react";

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <rect x="6" y="4" width="6" height="24" rx="2" fill="currentColor" />
            <rect x="20" y="4" width="6" height="24" rx="2" fill="currentColor" fillOpacity="0.5" />
            <path d="M6 16H26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
    );
}
