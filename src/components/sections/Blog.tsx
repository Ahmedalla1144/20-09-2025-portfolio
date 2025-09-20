import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { posts } from "@/content/posts";

function formatDate(iso: string) {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(d);
}

export default function Blog() {
    if (!posts.length) return null;

    return (
        <section id="blog" className="section">
            <div className="wrapper">
                <SectionHeading kicker="Notes" title="Blog" />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map((p) => (
                        <article key={p.id} className="card flex flex-col">
                            <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
                                {p.image ? (
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-black/5 dark:bg-white/5 text-muted">
                                        No image
                                    </div>
                                )}
                            </div>

                            <div className="text-sm text-muted">{formatDate(p.date)}</div>
                            <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                            <p className="mt-2 text-muted">{p.excerpt}</p>

                            {p.tags?.length ? (
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
                            ) : null}

                            <div className="mt-4">
                                <Button
                                    href={p.href || "#contact"}
                                    variant={p.href ? "ghost" : "primary"}
                                    size="sm"
                                >
                                    {p.href ? "Read" : "Get in touch"}
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
