import type { Metadata } from "next";
import { Host_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AdSenseScript } from "@/components/google/AdSenseScript";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handl - Handle your documents safely",
  description: "Secure, offline PDF tools. Merge, split, and convert PDFs directly in your browser.",
};

import Script from 'next/script';
import PDFWorkerConfig from '@/components/PDFWorkerConfig';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 1. Load the Main Library */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
          strategy="beforeInteractive"
        />

        {/* 2. Configure the Worker */}
        <PDFWorkerConfig />

        <div className={`${hostGrotesk.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}>
          <AdSenseScript client="ca-pub-0000000000000000" />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
