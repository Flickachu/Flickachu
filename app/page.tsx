import HomeClient from "./components/HomeClient";
import { Suspense } from "react";

// Required for Next.js 16 instant client-side navigations (commented out to avoid Windows Turbopack panic)
// export const unstable_instant = { prefetch: 'static' };

async function getPosts() {
  try {
    const res = await fetch("http://flickachu.local/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        query: `
          query GetLatestPosts {
            posts(first: 3) {
              edges {
                node {
                  title
                  slug
                  excerpt
                }
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    if (json.errors) return [];

    return json.data?.posts?.edges.map(({ node }: any) => ({
      title: node.title,
      slug: node.slug,
      excerpt: node.excerpt || "",
    })) || [
      { title: "Sculpted Minimalism", slug: "sculpted-minimalism", excerpt: "A refined living space defined by clean lines, soft lighting, and carefully selected materials." },
      { title: "The Art of Material Harmony", slug: "material-harmony", excerpt: "Exploring how textures, tones, and finishes come together to create balanced interiors." },
      { title: "Timeless vs Trend-Driven Spaces", slug: "timeless-design", excerpt: "Understanding the balance between contemporary trends and enduring design principles." }
    ];
  } catch (error) {
    return [
      { title: "Sculpted Minimalism", slug: "sculpted-minimalism", excerpt: "A refined living space defined by clean lines, soft lighting, and carefully selected materials." },
      { title: "The Art of Material Harmony", slug: "material-harmony", excerpt: "Exploring how textures, tones, and finishes come together to create balanced interiors." },
      { title: "Timeless vs Trend-Driven Spaces", slug: "timeless-design", excerpt: "Understanding the balance between contemporary trends and enduring design principles." }
    ];
  }
}

async function HomeDataFetcher() {
  const posts = await getPosts();
  return <HomeClient posts={posts} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c2a373] text-sm tracking-widest uppercase">Loading Laminate Gallery...</div>}>
      <HomeDataFetcher />
    </Suspense>
  );
}