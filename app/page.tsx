"use client";

import { ALL_TOOLS } from "@/config/tools";
import { Hero } from "@/components/sections/hero";
import { ToolGrid } from "@/components/sections/tool-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FAQSection } from "@/components/sections/faq";
import { AdUnit } from "@/components/google/AdUnit";

export default function Home() {
  return (
    <div className="flex flex-col bg-background font-sans text-foreground">
      <Hero />
      <div id="all-tools">
        <ToolGrid tools={ALL_TOOLS} />
      </div>

      {/* Mid-Roll Ad */}
      <div className="container mx-auto max-w-5xl px-6">
        <AdUnit
          slot="1234567890"
          format="horizontal"
          style={{ minHeight: "280px" }}
        />
      </div>

      <WhyChooseUs />
      <FAQSection />
    </div>
  );
}
