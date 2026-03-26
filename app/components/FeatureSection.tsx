"use client";

import Image from "next/image";
import FadeUp from "./FadeUp";
import { urlFor } from "@/sanity/lib/image";

interface FeatureItem {
  title?: string;
  description?: string;
  icon?: any;
}

interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
}

export default function FeatureSection({ title, subtitle, items = [] }: FeatureSectionProps) {
  return (
    <section id="services" className="py-16 md:py-40 px-6 md:px-10 max-w-[1400px] mx-auto">
      <FadeUp>
        {subtitle && (
           <p className="text-xs tracking-[0.3em] text-[#a27725] mb-6 uppercase md:text-left text-center">
             {subtitle}
           </p>
        )}
        <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light text-center md:text-left text-[#1a1a1a]">
          {title || "Our Features"}
        </h2>
      </FadeUp>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
        {(items || []).map((srv, idx) => (
          <FadeUp key={idx}>
            <div className="group cursor-pointer border-t border-black/10 pt-8 hover:border-[#a27725]/50 transition-colors duration-500">
              {srv.icon && (
                <div className="mb-6 w-12 h-12 relative opacity-70 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={urlFor(srv.icon).width(100).url()}
                    alt={srv.title || "Icon"}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              )}
              <h3 className="text-2xl md:text-3xl mb-4 font-light text-[#1a1a1a] group-hover:text-[#a27725] transition-colors">
                {srv.title || "Feature Title"}
              </h3>
              <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-lg">
                {srv.description || "Feature description goes here."}
              </p>
            </div>
          </FadeUp>
        ))}
        {(!items || items.length === 0) && (
          <p className="text-[#1a1a1a]/60 font-light">No content available at the moment.</p>
        )}
      </div>
    </section>
  );
}
