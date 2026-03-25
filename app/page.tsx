import HomeClient from "./components/HomeClient";
import { Suspense } from "react";

// Required for Next.js 16 instant client-side navigations (commented out to avoid Windows Turbopack panic)
// export const unstable_instant = { prefetch: 'static' };

async function getPosts() {
  // Mock data representing CMS fetch
  return [
    {
      title: "The Art of Material Harmony",
      slug: "material-harmony",
      excerpt: "Exploring how textures, tones, and finishes come together to create balanced interiors."
    },
    {
      title: "Designing for Emotional Impact",
      slug: "emotional-design",
      excerpt: "How thoughtful design decisions influence how a space feels, not just how it looks."
    },
    {
      title: "Timeless vs Trend-Driven Spaces",
      slug: "timeless-design",
      excerpt: "Understanding the balance between contemporary trends and enduring design principles."
    }
  ];
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c2a373] text-sm tracking-widest uppercase">Loading Laminate Gallery...</div>}>
      <HomeClient posts={posts} />
    </Suspense>
  );
}