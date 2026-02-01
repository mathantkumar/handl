"use client";

import Script from "next/script";

interface AdSenseScriptProps {
    client: string;
}

export function AdSenseScript({ client }: AdSenseScriptProps) {
    return (
        <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
