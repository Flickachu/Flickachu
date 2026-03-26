import HomeClient from "./components/HomeClient";
import { Suspense } from "react";

// Required for Next.js 16 instant client-side navigations (commented out to avoid Windows Turbopack panic)
// export const unstable_instant = { prefetch: 'static' };

import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";
import { SanityPost, SanityProject } from "@/sanity/lib/types";

type HomePost = {
  title: string;
  slug: string;
  excerpt: string;
};

type FeaturedProject = {
  title: string;
  slug: string;
  description: string;
  hero?: SanityProject["hero"];
};

async function getHomeData(): Promise<{
  posts: HomePost[];
  featuredProject?: FeaturedProject;
}> {
  const [{ data: posts }, { data: projects }] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: PROJECTS_QUERY }),
  ]);

  const homePosts = (posts as SanityPost[]).slice(0, 3).map((post) => ({
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt || "",
  }));

  const featured = (projects as SanityProject[])[0];

  return {
    posts: homePosts,
    featuredProject: featured
      ? {
          title: featured.title,
          slug: featured.slug.current,
          description: featured.description || "",
          hero: featured.hero,
        }
      : undefined,
  };
}

async function HomeDataFetcher() {
  const { posts, featuredProject } = await getHomeData();
  return <HomeClient posts={posts} featuredProject={featuredProject} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#c2a373] text-sm tracking-widest uppercase">Loading Laminate Gallery...</div>}>
      <HomeDataFetcher />
    </Suspense>
  );
}
