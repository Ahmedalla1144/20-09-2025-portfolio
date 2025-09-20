"use client";
import { FormEvent, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SectionReveal } from "../motion/Reveals";

export default function Contact() {
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
        "idle"
    );

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form).entries());
        try {
            setStatus("sending");
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error("Failed");
            setStatus("sent");
            form.reset();
        } catch {
            setStatus("error");
        }
    }

    return (
        <SectionReveal direction="up" distance={100}>
            <section id="contact" className="section">
                <div className="wrapper">
                    <SectionHeading kicker="Get In Touch" title="Contact" />

                    <form onSubmit={onSubmit} className="card grid gap-4 sm:grid-cols-2 p-6">
                        <div className="sm:col-span-1">
                            <label className="mb-2 block text-sm text-muted">Name</label>
                            <input
                                name="name"
                                required
                                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="mb-2 block text-sm text-muted">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-2 block text-sm text-muted">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none"
                                placeholder="Tell me a bit about your project…"
                            />
                        </div>
                        <div className="sm:col-span-2 flex items-center gap-3">
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={status === "sending"}
                            >
                                <i className="fa-solid fa-paper-plane" />
                                {status === "sending" ? "Sending…" : "Send Message"}
                            </button>
                            {status === "sent" && (
                                <span className="text-sm text-green-600">Message sent!</span>
                            )}
                            {status === "error" && (
                                <span className="text-sm text-red-600">
                                    Something went wrong. Try again.
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </SectionReveal>
    );
}
