export default async function PostPage(props: any) {
  const params = await props.params; // ✅ THIS IS THE FIX
  const slug = params?.slug;

  if (!slug) {
    return <p>Slug missing</p>;
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
    console.log("POST DEBUG:", json);

    if (json.errors) return null;

    return json.data.postBy;
  }

  const post = await getPost(slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}