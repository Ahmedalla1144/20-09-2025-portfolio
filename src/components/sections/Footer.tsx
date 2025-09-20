import { siteConfig } from "@/config/site";

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="wrapper py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                    © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                </p>
                <div className="flex items-center gap-4 text-xl">
                    <a
                        href={siteConfig.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="hover:opacity-80"
                    >
                        <i className="fa-brands fa-github" />
                    </a>
                    <a
                        href={siteConfig.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="hover:opacity-80"
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
        </footer>
    );
}
