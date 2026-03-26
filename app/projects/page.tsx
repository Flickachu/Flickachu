import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  return (
    <main className="bg-[#f6f3ee] text-[#1a1a1a]">
      <ProjectsClient projects={projects} />
    </main>
  );
}
