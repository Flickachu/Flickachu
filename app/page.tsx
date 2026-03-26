import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, PAGE_QUERY } from "@/sanity/lib/queries";
import Hero from "./components/Hero";
import FeatureSection from "./components/FeatureSection";
import ProductGrid from "./components/ProductGrid";
import Editorial from "./components/Editorial";
import AboutSection from "./components/AboutSection";
import StatsSection from "./components/StatsSection";
import HighlightSection from "./components/HighlightSection";
import FeaturedProjectSection from "./components/FeaturedProjectSection";
import ProcessSection from "./components/ProcessSection";
import MaterialsSection from "./components/MaterialsSection";
import MarqueeSection from "./components/MarqueeSection";
import InsightsSection from "./components/InsightsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import SectionNav from "./components/SectionNav";

async function HomeDataFetcher() {
  const [data, posts] = await Promise.all([
    client.fetch(PAGE_QUERY),
    client.fetch(POSTS_QUERY)
  ]);

  const homePosts = (posts || []).slice(0, 3).map((post: { title: string; slug?: { current: string }; excerpt?: string }) => ({
    title: post.title,
    slug: post.slug?.current,
    excerpt: post.excerpt || "",
  }));

  return (
    <>
      <SectionNav />
      <main className="bg-[#f6f3ee] text-[#1a1a1a] selection:bg-[#a27725] selection:text-white overflow-hidden">
        {data?.sections?.map((section: { _type: string } & Record<string, unknown>, index: number) => {
          switch (section._type) {
            case "hero": return <Hero key={index} {...section} />;
            case "editorialSection": return <Editorial key={index} {...section} />;
            case "aboutSection": return <AboutSection key={index} {...section} />;
            case "statsSection": return <StatsSection key={index} {...section} />;
            case "highlightSection": return <HighlightSection key={index} {...section} />;
            case "featureSection": return <FeatureSection key={index} {...section} />;
            case "productGrid": return <ProductGrid key={index} {...section} />;
            case "featuredProjectSection": return <FeaturedProjectSection key={index} {...section} />;
            case "processSection": return <ProcessSection key={index} {...section} />;
            case "materialsSection": return <MaterialsSection key={index} {...section} />;
            case "marqueeSection": return <MarqueeSection key={index} {...section} />;
            case "insightsSection": return <InsightsSection key={index} {...section} posts={homePosts} />;
            case "testimonialsSection": return <TestimonialsSection key={index} {...section} />;
            case "ctaSection": return <CtaSection key={index} {...section} />;
            default: return null;
          }
        })}
      </main>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c2a373] text-sm tracking-widest uppercase">Loading Laminate Gallery...</div>}>
      <HomeDataFetcher />
    </Suspense>
  );
}

