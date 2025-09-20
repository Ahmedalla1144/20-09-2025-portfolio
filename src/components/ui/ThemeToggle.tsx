"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const resolved = theme === "system" ? systemTheme : theme;
    const isDark = resolved === "dark";

    return (
        <Button
            variant="ghost"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            title={mounted ? (isDark ? "Switch to Light" : "Switch to Dark") : "Toggle theme"}
        >
            <i className={mounted ? (isDark ? "fa-solid fa-sun" : "fa-solid fa-moon") : "fa-regular fa-circle-half-stroke"} />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
