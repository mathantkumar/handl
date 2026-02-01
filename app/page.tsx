"use client";

import { useState } from "react";
import { ALL_TOOLS } from "@/config/tools";
import { Hero } from "@/components/sections/hero";
import { ToolGrid } from "@/components/sections/tool-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FAQSection } from "@/components/sections/faq";
import { TrustStrip } from "@/components/sections/trust-strip";
import { AdUnit } from "@/components/google/AdUnit";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const query = searchQuery.toLowerCase();
    return (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col bg-background font-sans text-foreground">
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TrustStrip />
      <ToolGrid tools={filteredTools} />

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
