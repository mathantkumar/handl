import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB', // Brand Blue
                }}
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Primary Bar */}
                    <rect x="6" y="4" width="6" height="24" rx="2" fill="#2563EB" />
                    {/* Secondary Bar (Opacity handled by color or opacity prop if supported, let's use slightly lighter blue or opacity) */}
                    <rect x="20" y="4" width="6" height="24" rx="2" fill="#2563EB" fillOpacity="0.5" />
                    {/* Crossbar */}
                    <path d="M6 16H26" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
