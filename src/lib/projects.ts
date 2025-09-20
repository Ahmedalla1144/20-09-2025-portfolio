export interface ApiProject {
  id: number | string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[] | string;
  source?: string; // GitHub URL
  visit?: string; // Live demo URL
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
  createdAt?: string; // ISO
  updatedAt?: string; // ISO
};

const API_URL = "https://www.ahmed.alaa1144.apis.mrbotusa.com/api/projects";

const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const normalizeUrl = (u?: string) =>
  isNonEmptyString(u) ? u.trim() : undefined;

const toIso = (s?: string) =>
  isNonEmptyString(s) ? new Date(s).toISOString() : undefined;

function normalizeTags(t?: string[] | string): string[] {
  if (Array.isArray(t)) return t.map(String);
  if (typeof t === "string")
    return t
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

export function mapProject(p: ApiProject): Project {
  return {
    id: String(p.id),
    title: p.title,
    description: p.description ?? "",
    image: isNonEmptyString(p.image) ? p.image : undefined,
    tags: normalizeTags(p.tags),
    links: {
      live: normalizeUrl(p.visit),
      source: normalizeUrl(p.source),
    },
    createdAt: toIso(p.created_at),
    updatedAt: toIso(p.updated_at),
  };
}

function extractList(json: unknown): ApiProject[] {
  if (Array.isArray(json)) return json as ApiProject[];
  if (json && typeof json === "object") {
    const top = json as Record<string, unknown>;
    if (Array.isArray(top.data)) return top.data as ApiProject[];
    const nested = top.data;
    if (nested && typeof nested === "object") {
      const inner = nested as Record<string, unknown>;
      if (Array.isArray(inner.data)) return inner.data as ApiProject[];
    }
    if (Array.isArray(top.projects)) return top.projects as ApiProject[];
  }

  return [];
}

/** Fetch + normalize + sort */
export async function fetchProjects(
  opts: { includeDeleted?: boolean; signal?: AbortSignal } = {}
): Promise<Project[]> {
  const { includeDeleted = false, signal } = opts;

  const res = await fetch(API_URL, {
    next: { revalidate: 3600 },
    signal,
  });
  if (!res.ok) {
    throw new Error(`Projects API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  let list = extractList(json);

  if (!includeDeleted) {
    list = list.filter((p) => p.deleted_at == null);
  }

  const projects = list.map(mapProject);

  // Sort: updated desc, then created desc
  projects.sort((a, b) => {
    const ua = a.updatedAt ?? a.createdAt ?? "";
    const ub = b.updatedAt ?? b.createdAt ?? "";
    return ub.localeCompare(ua);
  });

  return projects;
}
