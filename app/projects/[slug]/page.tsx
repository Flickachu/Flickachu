import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="bg-[#f5f3ef] text-[#1a1a1a]">

      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={project.hero}
          className="absolute inset-0 w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-end px-6 md:px-20 pb-16 text-white">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.25em] opacity-70 mb-4">
              FEATURED PROJECT
            </p>

            <h1 className="text-4xl md:text-6xl font-serif leading-tight">
              {project.title.split(" ")[0]}{" "}
              <span className="italic">
                {project.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-6 text-white/80 max-w-md">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="px-6 md:px-20 py-24 border-t border-[#e5e2dc]">
        <div className="grid md:grid-cols-4 gap-10 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Location</p>
            <p className="font-medium">{project.location}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Scope</p>
            <p className="font-medium">{project.scope}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Area</p>
            <p className="font-medium">{project.area}</p>
          </div>

          <div>
            <p className="text-gray-400 mb-1">Timeline</p>
            <p className="font-medium">{project.timeline}</p>
          </div>
        </div>
      </section>

      {/* ================= CHALLENGE ================= */}
      <section className="px-6 md:px-20 py-24 max-w-3xl">
        <h2 className="text-2xl font-serif mb-6">The Challenge</h2>
        <p className="text-gray-600 leading-relaxed">
          {project.challenge}
        </p>
      </section>

      {/* ================= APPROACH ================= */}
      <section className="px-6 md:px-20 py-24 max-w-3xl">
        <h2 className="text-2xl font-serif mb-6">The Approach</h2>
        <p className="text-gray-600 leading-relaxed">
          {project.solution}
        </p>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="px-6 md:px-20 py-28">
        <div className="grid md:grid-cols-2 gap-8">
          {project.gallery.map((img, i) => (
            <img
              key={i}
              src={img}
              className="h-[420px] w-full object-cover rounded-xl"
              alt=""
            />
          ))}
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="px-6 md:px-20 py-28 bg-[#ece9e4]">
        <h2 className="text-2xl font-serif mb-12 text-center">
          Key Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center text-sm">
          {project.highlights.map((item, i) => (
            <div key={i}>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center bg-[#1a1a1a] text-white">
        <h2 className="text-3xl font-serif">
          Start your project with us
        </h2>

        <button className="mt-8 border border-white px-6 py-3 text-sm hover:bg-white hover:text-black transition">
          Contact Us
        </button>
      </section>

    </main>
  );
}

/* ================= STATIC PARAMS (CRITICAL) ================= */

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}