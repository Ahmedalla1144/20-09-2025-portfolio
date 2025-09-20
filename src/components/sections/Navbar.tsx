"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ui/ThemeToggle";
import { SectionReveal } from "../motion/Reveals";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const ids = siteConfig.nav.map((n) => n.id);
    const active = useScrollSpy(ids, 80);

    return (
        <SectionReveal direction="down" distance={40} className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
            <div className="wrapper flex items-center justify-between py-3">
                <Link href="/" className="font-semibold tracking-tight">
                    {siteConfig.name}
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    {siteConfig.nav.map((n) => (
                        <a
                            key={n.id}
                            href={`#${n.id}`}
                            className={cn(
                                "text-sm hover:text-foreground transition",
                                active === n.id ? "text-foreground" : 'text-muted'
                            )}
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-3">
                    <ThemeToggle />
                    <a href="https://drive.google.com/u/0/uc?id=1bZQ_iL7feMC5Ldmw3ukWuMME4BOjTDls&export=download" className="btn-primary">
                        <i className="fa-solid fa-download" />
                        <span>Download CV</span>
                    </a>
                </div>

                <button
                    className="md:hidden inline-flex items-center justify-center rounded-xl border border-border p-2"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Toggle menu"
                >
                    <i className="fa-solid fa-bars" />
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-border">
                    <div className="wrapper py-3 flex flex-col gap-4">
                        {siteConfig.nav.map((n) => (
                            <a
                                key={n.id}
                                href={`#${n.id}`}
                                className={cn(
                                    "py-1 text-muted",
                                    active === n.id && "text-foreground"
                                )}
                                onClick={() => setOpen(false)}
                            >
                                {n.label}
                            </a>
                        ))}
                        <ThemeToggle />
                        <a
                            href="https://drive.google.com/u/0/uc?id=1bZQ_iL7feMC5Ldmw3ukWuMME4BOjTDls&export=download"
                            className="btn-primary w-full justify-center"
                            onClick={() => setOpen(false)}
                        >
                            <i className="fa-solid fa-download" />
                            <span>Download CV</span>
                        </a>
                    </div>
                </div>
            )}
        </SectionReveal>
    );
}
