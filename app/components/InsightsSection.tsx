"use client";
import Link from "next/link";
import FadeUp from "./FadeUp";

export default function InsightsSection({ title, posts }: any) {
  return (
    <section id="insights" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
      <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light border-b border-black/10 pb-12">
        {(title || "Latest Insights").split(" ")[0]} <span className="italic serif text-[#a27725]">{(title || "Latest Insights").split(" ").slice(1).join(" ")}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
        {(posts || []).slice(0, 3).map((post: any, i: number) => (
          <FadeUp key={i}>
            <Link href={`/posts/${post.slug}`} className="group cursor-pointer block">
              <p className="text-xs text-[#a27725] mb-4 uppercase tracking-[0.2em]">Insight / Insight</p>
              <h3 className="text-2xl mb-6 font-light group-hover:text-[#a27725] transition-colors">{post.title}</h3>
              <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-lg line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-8 uppercase text-xs tracking-widest border-b border-black/20 pb-2 inline-block group-hover:border-[#a27725] transition-colors">Read More</div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
