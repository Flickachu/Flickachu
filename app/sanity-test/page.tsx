import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default async function SanityTestPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <main className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Sanity Content Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: { _id: string; title: string, mainImage?: { asset: { _ref: string } }, author?: { name: string, image?: { asset: { _ref: string } } }, publishedAt?: string }) => (
          <div key={post._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {post.mainImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <div className="flex items-center gap-2 mb-4">
                {post.author?.image && (
                  <Image
                    src={urlFor(post.author.image).width(40).height(40).url()}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-gray-600">{post.author?.name}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center text-blue-800">
          <p className="text-lg font-medium mb-4">No posts found in Sanity!</p>
          <p className="mb-6">
            Go to <Link href="/studio" className="underline font-bold">Sanity Studio</Link> to create and publish your first post.
          </p>
          <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md font-semibold">
            <Link href="/studio">Open Studio</Link>
          </div>
        </div>
      )}
    </main>
  );
}
