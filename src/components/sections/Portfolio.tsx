import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { fetchProjects } from "@/lib/projects";
import { RevealItem, RevealList } from "../motion/Reveals";

function getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try {
        return JSON.stringify(err);
    } catch {
        return "Failed to load projects.";
    }
}

export default async function Portfolio() {
    let projects: Awaited<ReturnType<typeof fetchProjects>> = [];
    let error: string | null = null;

    try {
        projects = await fetchProjects();
    } catch (err: unknown) {
        error = getErrorMessage(err);
    }

    return (
        <section id="portfolio" className="section">
            <div className="wrapper">
                <SectionHeading kicker="Selected Work" title="Portfolio" />

                {error && (
                    <div className="card border-red-200">
                        <p className="font-medium text-red-600">Couldn’t load projects.</p>
                        <p className="mt-1 text-sm text-muted">{error}</p>
                    </div>
                )}

                {!error && projects.length === 0 && (
                    <div className="card">
                        <p className="text-muted">No projects found.</p>
                    </div>
                )}

                {!error && projects.length > 0 && (
                    <RevealList className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((p) => (
                            <RevealItem key={p.id}>
                                <article className="card flex flex-col">
                                    <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-t-2xl shadow-lg">
                                        {p.image ? (
                                            <Image
                                                src={p.image}
                                                alt={p.title}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-foreground text-muted">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-semibold">{p.title}</h3>
                                    {p.description && (
                                        <p className="mt-2 text-muted">{p.description}</p>
                                    )}

                                    {p.tags?.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {p.tags.map((t) => (
                                                <span
                                                    key={`${p.id}-${t}`}
                                                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {(p.links.live || p.links.source) && (
                                        <div className="mt-4 flex gap-3">
                                            {p.links.live && (
                                                <a
                                                    href={p.links.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn-primary"
                                                >
                                                    <i className="fa-solid fa-up-right-from-square" />
                                                    Live
                                                </a>
                                            )}
                                            {p.links.source && (
                                                <a
                                                    href={p.links.source}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn-ghost"
                                                >
                                                    <i className="fa-brands fa-github" />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </article>
                            </RevealItem>
                        ))}
                    </RevealList>
                )}
            </div>
        </section>
    );
}
