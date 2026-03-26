"use client";
import Image from "next/image";

export default function MarqueeSection({ tag, logos }: any) {
  const defaultLogos = [
    "https://placehold.co/500x120/transparent/1a1a1a/?text=ARCHITECTURAL+DIGEST&font=playfair-display",
    "https://placehold.co/300x120/transparent/1a1a1a/?text=VOGUE&font=playfair-display",
    "https://placehold.co/300x120/transparent/1a1a1a/?text=ELLE+DECOR&font=playfair-display",
    "https://placehold.co/300x120/transparent/1a1a1a/?text=GQ&font=playfair-display",
    "https://placehold.co/400x120/transparent/1a1a1a/?text=HARPER'S+BAZAAR&font=playfair-display"
  ];
  const displayLogos = logos && logos.length > 0 ? logos : defaultLogos;

  return (
    <section className="py-20 md:py-32 overflow-hidden bg-white">
      <p className="text-xs tracking-[0.3em] text-[#a27725] mb-16 text-center uppercase">
        {tag || "Selected Collaborations & Explorations"}
      </p>
      <div className="relative flex overflow-x-hidden w-full">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex flex-nowrap items-center gap-20 md:gap-40 pr-20 md:pr-40">
              {displayLogos.map((src: string, i: number) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Partner Logo ${i}`}
                  width={300}
                  height={120}
                  unoptimized 
                  className="h-8 md:h-12 w-auto opacity-40 hover:opacity-100 transition duration-500 object-contain min-w-[120px] max-w-[240px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
