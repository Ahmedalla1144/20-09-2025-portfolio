import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function Hero() {
    return (
        <div className="wrapper grid items-center gap-10 md:grid-cols-2">
            <div className="order-2 md:order-1">
                <p className="mb-3 text-sm font-medium tracking-wide text-muted uppercase">
                    {siteConfig.role}
                </p>

                <h1 className="h1 animate-pulse">
                    Hi, I’m <span className="text-primary animate-none">{siteConfig.name}</span>
                    <span className="animate-pin">.</span>
                    <br />
                    {siteConfig.tagline}
                </h1>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button href="#portfolio" variant="primary">
                        <i className="fa-solid fa-briefcase" />
                        View Work
                    </Button>
                    <Button href="#contact" variant="ghost">
                        <i className="fa-solid fa-paper-plane" />
                        Contact Me
                    </Button>
                </div>

                <div className="mt-6 flex items-center gap-4 text-2xl">
                    <a
                        href={siteConfig.socials.github}
                        aria-label="GitHub"
                        className="hover:opacity-80"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-brands fa-github" />
                    </a>
                    <a
                        href={siteConfig.socials.linkedin}
                        aria-label="LinkedIn"
                        className="hover:opacity-80"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <i className="fa-brands fa-linkedin" />
                    </a>
                    <a
                        href={`mailto:${siteConfig.socials.email}`}
                        aria-label="Email"
                        className="hover:opacity-80"
                    >
                        <i className="fa-solid fa-envelope" />
                    </a>
                </div>
            </div>

            <div className="relative order-1 md:order-2 mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-border md:w-80 lg:w-96">
                <Image
                    src="https://new-portfolio1144.netlify.app/favicon.ico"
                    alt={`${siteConfig.name} avatar`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20rem, 16rem"
                    priority
                />
            </div>
        </div>
    );
}
