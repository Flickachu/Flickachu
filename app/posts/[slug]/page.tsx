import { Suspense } from 'react';

export const unstable_instant = { prefetch: 'static' };

export default async function PostPage(props: any) {
  return (
    <Suspense fallback={<div className="p-10 font-sans tracking-widest text-[#c2a373] bg-[#0a0a0a] min-h-screen flex items-center justify-center uppercase text-sm">Loading Post...</div>}>
      <PostContent params={props.params} />
    </Suspense>
  );
}

async function getPost(slug: string) {
  const res = await fetch("http://flickachu.local/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
        query GetPost($uri: String!) {
          postBy(uri: $uri) {
            title
            content
          }
        }
      `,
      variables: {
        uri: "/" + slug, // correct for your setup
      },
    }),
  });

  const json = await res.json();
  if (json.errors) return null;

  return json.data?.postBy;
}

async function PostContent({ params }: { params: any }) {
  const p = await params;
  const slug = p?.slug;

  if (!slug) {
    return <p className="p-10 bg-[#0a0a0a] text-white">Slug missing</p>;
  }

  const post = await getPost(slug);

  if (!post) {
    return <p className="p-10 bg-[#0a0a0a] text-white">Post not found</p>;
  }

  return (
    <main className="p-10 md:p-20 bg-[#0a0a0a] text-[#f4f0ec] min-h-screen">
      <div className="max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-6xl font-light mb-10 font-serif text-[#c2a373]">{post.title}</h1>
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }} 
          className="font-light text-lg leading-relaxed opacity-80"
        />
      </div>
    </main>
  );
}