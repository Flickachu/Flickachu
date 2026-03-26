import { notFound } from "next/navigation";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) return notFound();

  const { data: project } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug }
  });

  if (!project) return notFound();

  return (
    <main className="bg-[#f5f3ef] text-[#1a1a1a]">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {project.hero && (
           <Image
            src={urlFor(project.hero).width(1920).url()}
            className="absolute inset-0 object-cover"
            alt={project.title}
            fill
            priority
          />
        )}

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-end px-6 md:px-20 pb-16 text-white">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.25em] opacity-70 mb-4 uppercase">
              FEATURED PROJECT
            </p>

            <h1 className="text-4xl md:text-6xl font-serif leading-tight font-light">
              {project.title.split(" ")[0]}{" "}
              <span className="italic">
                {project.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-6 text-white/80 max-w-md font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="px-6 md:px-20 py-24 border-t border-[#e5e2dc]">
        <div className="grid md:grid-cols-4 gap-10 text-sm tracking-wide">
          <div>
            <p className="text-gray-400 mb-1 uppercase text-[10px] tracking-widest font-semibold">Location</p>
            <p className="font-light">{project.location}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1 uppercase text-[10px] tracking-widest font-semibold">Scope</p>
            <p className="font-light">{project.scope}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1 uppercase text-[10px] tracking-widest font-semibold">Area</p>
            <p className="font-light">{project.area}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1 uppercase text-[10px] tracking-widest font-semibold">Timeline</p>
            <p className="font-light">{project.timeline}</p>
          </div>
        </div>
      </section>

      {/* ================= CHALLENGE ================= */}
      <section className="px-6 md:px-20 py-24 max-w-3xl">
        <h2 className="text-3xl font-serif font-light mb-8">The Challenge</h2>
        <p className="text-gray-600 leading-relaxed font-light text-lg">
          {project.challenge}
        </p>
      </section>

      {/* ================= APPROACH ================= */}
      <section className="px-6 md:px-20 py-24 max-w-3xl border-t border-black/5">
        <h2 className="text-3xl font-serif font-light mb-8">The Approach</h2>
        <p className="text-gray-600 leading-relaxed font-light text-lg">
          {project.solution}
        </p>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="px-6 md:px-20 py-28 bg-white/30">
        <div className="grid md:grid-cols-2 gap-8">
          {project.gallery?.map((img: { asset: { _ref: string } } | string, i: number) => (
            <div key={i} className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={urlFor(img).width(1200).url()}
                className="object-cover transition-transform duration-700 hover:scale-105"
                alt={`${project.title} Gallery ${i + 1}`}
                fill
              />
            </div>
          ))}
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="px-6 md:px-20 py-28 bg-[#ece9e4]">
        <h2 className="text-3xl font-serif font-light mb-20 text-center">
          Key Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-16 text-center">
          {project.highlights?.map((item: { title: string; text: string }, i: number) => (
            <div key={i} className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#a27725] font-semibold">{item.title}</p>
              <p className="text-gray-600 font-light leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-40 text-center bg-[#1a1a1a] text-white">
        <h2 className="text-5xl font-serif font-light mb-10">
          Start your <span className="italic">project</span> with us
        </h2>

        <Link href="/contact" className="px-10 py-4 border border-white rounded-full text-xs tracking-widest uppercase hover:bg-white hover:text-black transition duration-500 font-semibold">
          Contact Us
        </Link>
      </section>

    </main>
  );
}

// Generate static params for faster loads
export async function generateStaticParams() {
  const projects = await client.fetch(
    `*[_type == "project" && defined(slug.current)] { "slug": slug.current }`
  );
  
  return projects.map((p: { slug: string }) => ({
    slug: p.slug,
  }));
}