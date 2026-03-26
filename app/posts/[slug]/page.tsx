import { Suspense } from 'react';
import Link from 'next/link';
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';

export const unstable_instant = false;

// Generate static params for faster loads
export async function generateStaticParams() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)] { "slug": slug.current }`
  );
  
  return posts.map((p: any) => ({
    slug: p.slug,
  }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="p-10 font-sans tracking-widest text-[#a27725] bg-[#f6f3ee] min-h-screen flex items-center justify-center uppercase text-sm">Loading Post...</div>}>
      <PostContent params={props.params} />
    </Suspense>
  );
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const slug = p?.slug;

  if (!slug) {
    return <p className="p-10 bg-[#f6f3ee] text-[#1a1a1a]">Slug missing</p>;
  }

  const { data: post } = await sanityFetch({ 
    query: POST_QUERY,
    params: { slug }
  });

  if (!post) {
    return (
      <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Post not found</h1>
          <Link href="/insights" className="text-[#a27725] underline">← Back to Insights</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a] min-h-screen">

      <article className="pt-32 pb-32">
        {/* HEADER */}
        <header className="px-6 md:px-10 max-w-3xl mx-auto mb-16 pt-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[#a27725] mb-8">Design Insight</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8 font-serif text-[#1a1a1a]">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-neutral-400 font-light border-b border-black/10 pb-8">
            <span>{post.author?.name || 'Laminate Gallery'}</span>
            <span>•</span>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}</span>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        </header>

        {/* CONTENT */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto">
          <div className="
              prose-lg
              font-light leading-relaxed text-[#1a1a1a]/80

              [&>p]:mb-6 [&>p]:text-lg [&>p]:leading-relaxed

              [&>h2]:text-3xl [&>h2]:text-[#1a1a1a] [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:font-light [&>h2]:font-serif

              [&>img]:w-full [&>img]:rounded-2xl [&>img]:my-12 [&>img]:shadow-sm

              [&>blockquote]:border-l-2 [&>blockquote]:border-[#a27725] [&>blockquote]:pl-8 [&>blockquote]:my-12 [&>blockquote]:text-2xl [&>blockquote]:italic [&>blockquote]:text-[#1a1a1a]/70 [&>blockquote]:font-serif [&>blockquote]:leading-relaxed
            ">
            <PortableText 
              value={post.body} 
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="my-12">
                      <Image
                        src={urlFor(value).width(1200).url()}
                        alt={value.alt || 'Content image'}
                        width={1200}
                        height={800}
                        className="w-full rounded-2xl shadow-sm"
                      />
                      {value.caption && <p className="text-center text-sm text-neutral-400 mt-4">{value.caption}</p>}
                    </div>
                  )
                }
              }}
            />
          </div>
        </section>

        {/* AUTHOR */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto mt-20 pt-12 border-t border-black/10">
          <div className="flex items-center gap-5">
            {post.author?.image ? (
               <Image
                src={urlFor(post.author.image).width(100).height(100).url()}
                alt={post.author.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white font-serif italic text-xl shrink-0">L</div>
            )}
            <div>
              <p className="text-sm uppercase tracking-widest text-black font-medium">{post.author?.name || 'Laminate Gallery'}</p>
              <p className="text-sm text-neutral-500 font-light mt-1">
                {post.author?.bio ? <PortableText value={post.author.bio} /> : 'Luxury Interiors & Furniture Studio — Pune, India'}
              </p>
            </div>
          </div>
        </section>

        {/* MORE INSIGHTS CTA */}
        <section className="px-6 md:px-10 max-w-3xl mx-auto mt-16 pt-12 border-t border-black/10 text-center">
          <p className="text-sm tracking-widest uppercase text-neutral-400 mb-4">Continue exploring</p>
          <Link href="/insights" className="inline-block px-10 py-4 border border-black/20 rounded-full text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-500">
            All Insights
          </Link>
        </section>
      </article>
    </main>
  );
}