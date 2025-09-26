import { urlFor } from "@/components/LocationPreview";
import { client } from "@/sanity/lib/client";
import { Project } from "@/sanity/sanity.types";
import { Metadata } from "next";
import { defineQuery, PortableText } from "next-sanity";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const PROJECT_QUERY = defineQuery(`
*[_type == "location" && slug.current == $slug][0]{
  title,
  slug,
  image,
  content,
  _createdAt,
}`);

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await client.fetch<Project | null>(PROJECT_QUERY, {
    slug: params.slug,
  });
  return {
    title: project?.title ?? "Project",
    description: project?.ellipsis ?? "Project details",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  const project = await client.fetch<Project | null>(PROJECT_QUERY, { slug });

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-heading">{project.title}</h1>
      {project.image && (
        <img
          src={urlFor(project.image).url()}
          alt={project.title ?? ""}
          width={800}
          height={450}
          className="rounded-md"
        />
      )}

      {project.content?.map((block, index) => (
        <PortableText key={index} value={block} />
      ))}
      <p className="text-sm text-muted">
        Created at: {new Date(project._createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
