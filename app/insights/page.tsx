import FadeUp from "../components/FadeUp";
import { sanityFetch } from "@/sanity/lib/live";
import { ALL_INSIGHTS_QUERY } from "@/sanity/lib/queries";
import { SanityPost, SanityProject } from "@/sanity/lib/types";
import InsightsClient from "./InsightsClient";

export default async function InsightsPage() {
  const { data } = await sanityFetch({ query: ALL_INSIGHTS_QUERY });
  
  const posts = data.posts.map((p: SanityPost) => ({
    _id: p._id,
    slug: p.slug.current,
    title: p.title,
    excerpt: p.excerpt || "",
    mainImage: p.mainImage,
    category: p.category,
    publishedAt: p.publishedAt,
    readTime: p.readTime
  }));

  const projects = data.projects.map((p: SanityProject) => ({
    _id: p._id,
    slug: p.slug.current,
    title: p.title,
    excerpt: p.excerpt || "",
    mainImage: p.mainImage,
    category: "Case Study",
    publishedAt: p.publishedAt
  }));

  const initialItems = [...posts, ...projects].sort((a, b) => {
    return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
  });

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">
      {/* HERO */}
      <section className="pt-48 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.3em] uppercase text-[#a27725] mb-6">Journal</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
              Thoughts & <span className="italic serif text-[#a27725]">Insights</span>
            </h1>
            <p className="text-[#1a1a1a]/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Curated articles, in-depth case studies, and practical guides on interior architecture, materiality, and the emotional resonance of space design.
            </p>
          </div>
        </FadeUp>
      </section>

      <InsightsClient initialItems={initialItems} />
    </main>
  );
}
