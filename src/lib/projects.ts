export interface ApiProject {
  id: number | string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[] | string;
  source?: string;
  visit?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export type Project = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  tags: string[];
  links: { live?: string; source?: string };
  createdAt?: string;
  updatedAt?: string;
};

const API_URL = "https://www.ahmed.alaa1144.apis.mrbotusa.com/api/projects";

function mapProject(p: ApiProject): Project {
  const tags =
    Array.isArray(p.tags)
      ? p.tags.map(String)
      : typeof p.tags === "string"
      ? p.tags.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return {
    id: String(p.id),
    title: p.title,
    description: p.description ?? "",
    image: p.image,
    tags,
    links: { live: p.visit || undefined, source: p.source || undefined },
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Projects API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const list: ApiProject[] = Array.isArray(json) ? json : json?.data ?? [];
  return list.map(mapProject);
}
