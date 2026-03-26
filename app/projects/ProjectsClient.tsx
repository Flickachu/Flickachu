"use client";

import FadeUp from "../components/FadeUp";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { SanityProject } from "@/sanity/lib/types";

interface ProjectsClientProps {
  projects: SanityProject[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  // Featured project can be the first one
  const featured = projects[0];
  const gridProjects = projects.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#0f0f0f]">
        {featured?.hero && (
          <Image
            src={urlFor(featured.hero).width(1920).url()}
            alt="Project hero"
            fill
            priority
            className="object-cover opacity-70"
          />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-10 text-white">
          <FadeUp>
            <h1 className="text-7xl md:text-[90px] max-w-4xl leading-tight">
              Selected <br />
              <span className="italic serif">Projects</span>
            </h1>

            <p className="mt-6 text-white/70 max-w-xl">
              A curated collection of residential and commercial spaces designed
              with a focus on materiality, light, and emotional impact.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-32 text-center max-w-3xl mx-auto px-6">
        <FadeUp>
          <p className="text-3xl leading-relaxed font-light">
            Each project is a balance between{" "}
            <span className="italic serif">form and feeling</span>.
          </p>

          <p className="text-gray-600 mt-8 font-light">
            From modern residences to luxury villas, our work reflects a commitment
            to timeless aesthetics and thoughtful detailing.
          </p>
        </FadeUp>
      </section>

      {/* PROJECT GRID */}
      <section className="py-32 px-10 max-w-[1400px] mx-auto grid md:grid-cols-3 gap-16">
        {gridProjects.map((project, i) => (
          <FadeUp key={project._id} delay={i * 0.1}>
            <Link href={`/projects/${project.slug.current}`} className="group block">
              <div className="overflow-hidden rounded-2xl bg-black/5">
                {project.hero && (
                  <Image
                    src={urlFor(project.hero).width(800).height(600).url()}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="mt-4 text-sm text-gray-600 font-light tracking-wide uppercase">{project.title} — {project.location}</p>
            </Link>
          </FadeUp>
        ))}
      </section>

      {/* FEATURED PROJECT SECTION */}
      {featured && (
        <section className="py-40 grid md:grid-cols-2 gap-20 px-10 max-w-[1400px] mx-auto">
          <FadeUp>
            {featured.hero && (
              <Image
                src={urlFor(featured.hero).width(1000).height(800).url()}
                alt={featured.title}
                width={800}
                height={600}
                className="rounded-2xl h-[500px] w-full object-cover"
              />
            )}
          </FadeUp>

          <FadeUp delay={0.2}>
            <div>
              <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">
                FEATURED PROJECT
              </p>

              <h2 className="text-5xl font-light font-serif">
                {featured.title.split(" ")[0]}{" "}
                <span className="italic">
                  {featured.title.split(" ").slice(1).join(" ")}
                </span>
              </h2>

              <p className="text-gray-600 mt-6 font-light leading-relaxed text-lg">
                {featured.description}
              </p>

              <Link href={`/projects/${featured.slug.current}`} className="mt-10 px-10 py-4 border border-black rounded-full inline-block hover:bg-black hover:text-white transition duration-500 uppercase text-xs tracking-widest">
                View Case Study
              </Link>
            </div>
          </FadeUp>
        </section>
      )}

      {/* CTA */}
      <section className="py-40 bg-black text-white text-center">
        <FadeUp>
          <h2 className="text-5xl mb-6 font-light">
            Let’s Build Your <span className="italic serif">Next Space</span>
          </h2>

          <p className="text-white/70 max-w-xl mx-auto mb-12 font-light text-lg">
            Whether it’s a residence, workspace, or concept project, we bring
            precision and creativity to every detail.
          </p>

          <Link href="/get-quote" className="px-10 py-4 bg-white text-black rounded-full inline-block hover:bg-[#a27725] hover:text-white transition duration-500 uppercase text-xs tracking-widest font-semibold">
            Start Your Project
          </Link>
        </FadeUp>
      </section>
    </>
  );
}
