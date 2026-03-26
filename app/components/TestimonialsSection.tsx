"use client";

export default function TestimonialsSection({ title, testimonials }: any) {
  const defaultTestimonials = [
    { quote: "The team transformed our space into something beyond what we imagined. Every detail feels intentional and refined.", author: "Ananya Sharma" },
    { quote: "Working with Laminate Gallery was effortless. Their understanding of materials and lighting is exceptional.", author: "Rahul Mehta" }
  ];
  const reviews = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 md:py-48 text-center px-6 md:px-10 bg-white border-y border-black/5">
      <h2 className="text-4xl md:text-6xl mb-16 md:mb-24 font-light">
        {(title || "Client Experiences").split(" ")[0]} <span className="italic serif text-[#a27725]">{(title || "Client Experiences").split(" ").slice(1).join(" ")}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[1200px] mx-auto">
        {reviews.map((t: any, i: number) => (
          <div key={i} className="bg-[#fcfbf9] border border-black/5 p-12 md:p-16 rounded-3xl text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-8xl text-black/5 font-serif leading-none rotate-180">&quot;</div>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#1a1a1a]/90 relative z-10">
              &quot;{t.quote}&quot;
            </p>
            <p className="mt-10 text-sm tracking-widest text-[#a27725] uppercase">{t.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
