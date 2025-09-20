"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Dir = "up" | "down" | "left" | "right";

function offsetBy(direction: Dir, distance: number) {
    switch (direction) {
        case "up": return { y: distance };
        case "down": return { y: -distance };
        case "left": return { x: distance };
        case "right": return { x: -distance };
    }
}

type SectionRevealProps = {
    children: React.ReactNode;
    className?: string;
    direction?: Dir;
    distance?: number;
    amount?: number;
    once?: boolean;
};

export function SectionReveal({
    children,
    className,
    direction = "up",
    distance = 24,
    amount = 0.2,
    once = false,
}: SectionRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount, margin: "0px 0px -10% 0px" });
    const reduce = useReducedMotion();
    const offset = offsetBy(direction, distance);

    return (
        <motion.section
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : once ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, ...offset },
                visible: { opacity: 1, x: 0, y: 0 },
            }}
            transition={{ duration: reduce ? 0 : 0.6, ease: "easeOut" }}
        >
            {children}
        </motion.section>
    );
}

type RevealListProps = {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    delay?: number;
    amount?: number;
    once?: boolean;
};

export function RevealList({
    children,
    className,
    stagger = 0.08,
    delay = 0.05,
    amount = 0.15,
    once = false,
}: RevealListProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount, margin: "0px 0px -10% 0px" });
    const reduce = useReducedMotion();

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : once ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: {},
            }}
            transition={{
                staggerChildren: reduce ? 0 : stagger,
                delayChildren: reduce ? 0 : delay,
            }}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
