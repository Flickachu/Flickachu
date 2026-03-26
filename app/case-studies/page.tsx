import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { SanityProject } from "@/sanity/lib/types";
import FadeUp from "../components/FadeUp";

export default async function CaseStudiesPage() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });
  const caseStudies = projects as SanityProject[];

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="pt-48 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto border-b border-white/10">
        <FadeUp>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-8">
              Selected <span className="italic serif text-[#c2a373]">Case Studies</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Published project stories from Sanity, focused on space, material, and the lived experience of each interior.
            </p>
          </div>
        </FadeUp>
      </section>

      <section className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto space-y-32">
        {caseStudies.map((study, index) => (
          <FadeUp key={study._id}>
            <Link href={`/projects/${study.slug.current}`} className="group block">
              <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
                <div className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#c2a373] mb-6">
                    {study.category}
                    {study.location ? ` / ${study.location}` : ""}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8 group-hover:text-[#c2a373] transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-white/60 font-light text-lg leading-relaxed max-w-md mb-10">
                    {study.description || "A detailed look at how the space was shaped from brief to finished experience."}
                  </p>
                  <div className="inline-flex items-center gap-4 text-sm uppercase tracking-widest border-b border-white/20 pb-2 group-hover:border-white transition-colors">
                    View Complete Case Study <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">-&gt;</span>
                  </div>
                </div>

                <div className={`overflow-hidden rounded-2xl order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  {study.hero ? (
                    <Image
                      src={urlFor(study.hero).width(1200).height(900).url()}
                      alt={study.title}
                      width={1200}
                      height={900}
                      className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-[15s] group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src="/images/featured.jpg"
                      alt={study.title}
                      width={1000}
                      height={800}
                      className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-[15s] group-hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}

        {caseStudies.length === 0 && (
          <FadeUp>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center">
              <p className="text-white/60 text-lg">
                Publish project entries in Sanity to populate this section.
              </p>
            </div>
          </FadeUp>
        )}
      </section>
    </main>
  );
}
