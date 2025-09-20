"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: readonly string[], offset = 80) {
    const [active, setActive] = useState<string>(ids[0] ?? "");

    useEffect(() => {
        if (ids.length === 0) return;

        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el);

        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const scrollPos = window.scrollY + offset + 1;
                let current = ids[0] ?? "";

                for (const el of elements) {
                    const top = el.getBoundingClientRect().top + window.scrollY;
                    if (top <= scrollPos) current = el.id;
                }

                setActive(current);
                ticking = false;
            });
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [ids, offset]);

    return active;
}
