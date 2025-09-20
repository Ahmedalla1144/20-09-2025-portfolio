"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
    variant?: "primary" | "ghost" | "outline" | "soft" | "link";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    isLoading?: boolean;
    className?: string;
    children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
        href?: never;
    };

type ButtonAsLink = BaseProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
        href: string;
    };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(p: ButtonProps): p is ButtonAsLink {
    return typeof (p as ButtonAsLink).href === "string";
}

function classesByVariant(variant: NonNullable<BaseProps["variant"]>) {
    switch (variant) {
        case "primary":
            return "bg-primary text-on-primary hover:opacity-90 border-transparent";
        case "ghost":
            return "border border-border hover:bg-black/5 dark:hover:bg-white/5";
        case "outline":
            return "border border-border bg-transparent hover:bg-black/5 dark:hover:bg-white/5";
        case "soft":
            return "bg-primary/10 text-primary hover:bg-primary/15 border border-transparent";
        case "link":
            return "bg-transparent text-primary hover:underline p-0 h-auto";
    }
}

function classesBySize(size: NonNullable<BaseProps["size"]>) {
    switch (size) {
        case "sm":
            return "h-9 px-3.5 text-sm";
        case "md":
            return "h-11 px-5 text-sm";
        case "lg":
            return "h-12 px-6 text-base";
    }
}

export default function Button(props: ButtonProps) {
    if (isLinkProps(props)) {
        const {
            variant = "primary",
            size = "md",
            fullWidth,
            isLoading,
            className,
            children,
            href,
            ...anchorProps
        } = props;

        const cls = cn(
            "inline-flex items-center justify-center gap-2 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
            classesByVariant(variant),
            variant === "link" ? "" : classesBySize(size),
            fullWidth && "w-full",
            className
        );

        return (
            <Link href={href} className={cls} {...anchorProps}>
                {isLoading && (
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" className="opacity-75" fill="none" />
                    </svg>
                )}
                <span>{children}</span>
            </Link>
        );
    }

    const {
        variant = "primary",
        size = "md",
        fullWidth,
        isLoading,
        className,
        children,
        ...buttonProps
    } = props;

    const cls = cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        classesByVariant(variant),
        variant === "link" ? "" : classesBySize(size),
        fullWidth && "w-full",
        className
    );

    return (
        <button className={cls} {...buttonProps}>
            {isLoading && (
                <svg className="size-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                    <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" className="opacity-75" fill="none" />
                </svg>
            )}
            <span>{children}</span>
        </button>
    );
}
