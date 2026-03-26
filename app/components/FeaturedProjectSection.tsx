"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export default function FeaturedProjectSection({ tag, project }: any) {
  const featuredTitle = project?.title || "Modern Elegance";
  const [featuredLeadWord, ...featuredTailWords] = featuredTitle.split(" ");
  const featuredTail = featuredTailWords.join(" ") || "Elegance";
  const featuredSlug = project?.slug?.current || project?.slug;
  const featuredHref = featuredSlug ? `/projects/${featuredSlug}` : "/projects";

  return (
    <section className="py-16 md:py-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 px-6 md:px-10 max-w-[1400px] mx-auto items-center">
      <div className="relative overflow-hidden rounded-2xl group w-full h-[400px] md:h-[700px]">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none"></div>
        {project?.hero ? (
          <Image
            src={urlFor(project.hero).width(1200).height(1200).url()}
            alt={featuredTitle}
            width={1200}
            height={1200}
            className="project-img w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-105"
          />
        ) : (
          <div className="project-img absolute inset-0 bg-neutral-200 transition-transform duration-[20s] group-hover:scale-105" />
        )}
      </div>
      <div>
        <p className="text-xs tracking-[0.2em] text-[#a27725] mb-6 uppercase">
          {tag || "Featured Project"}
        </p>
        <h2 className="text-4xl md:text-6xl font-light mb-8">
          {featuredLeadWord} <span className="italic serif text-[#a27725]">{featuredTail}</span>
        </h2>
        <p className="text-[#1a1a1a]/70 mt-6 text-lg font-light leading-relaxed">
          {project?.description || "This project explores contrast — warm wood textures paired with sculptural lighting and soft neutral fabrics."}
        </p>
        <Link href={featuredHref} className="inline-block mt-12 px-8 py-3 border border-black/20 rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500">
          View Project
        </Link>
      </div>
    </section>
  );
}
