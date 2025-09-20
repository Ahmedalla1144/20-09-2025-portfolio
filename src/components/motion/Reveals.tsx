"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Dir = "up" | "down" | "left" | "right";
const offsetBy = (d: Dir, dist: number) =>
    d === "up" ? { y: dist } :
        d === "down" ? { y: -dist } :
            d === "left" ? { x: dist } :
                { x: -dist };

type SectionRevealProps = {
    children: React.ReactNode;
    className?: string;
    direction?: Dir;
    distance?: number;
    amount?: number;
    once?: boolean;
    /** px width at/below which we use smallMargin (default 768) */
    breakpointPx?: number;
    /** margin when <= breakpoint (default "0px 0px 200px 0px") */
    smallMargin?: string;
    /** margin when > breakpoint (default "0px 0px -1px 0px") */
    largeMargin?: string;
};

export function SectionReveal({
    children,
    className,
    direction = "up",
    distance = 24,
    amount = 0.08,
    once = false,
    breakpointPx = 768,
    smallMargin = "0px 0px 200px 0px",
    largeMargin = "0px 0px -1px 0px",
}: SectionRevealProps) {
    const reduce = useReducedMotion();
    const offset = offsetBy(direction, distance);

    const [viewportMargin, setViewportMargin] = useState<string>(largeMargin);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
        const update = () => setViewportMargin(mq.matches ? smallMargin : largeMargin);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [breakpointPx, smallMargin, largeMargin]);

    return (
        <motion.section
            className={className}
            initial={{ opacity: 0, ...offset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ amount, once, margin: viewportMargin }}
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
    breakpointPx?: number;
    smallMargin?: string;
    largeMargin?: string;
};

export function RevealList({
    children,
    className,
    stagger = 0.08,
    delay = 0.05,
    amount = 0.08,
    once = false,
    breakpointPx = 768,
    smallMargin = "0px 0px 500px 0px",
    largeMargin = "0px 0px -1px 0px",
}: RevealListProps) {
    const [viewportMargin, setViewportMargin] = useState<string>(largeMargin);
    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
        const update = () => setViewportMargin(mq.matches ? smallMargin : largeMargin);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [breakpointPx, smallMargin, largeMargin]);

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount, once, margin: viewportMargin }}
            transition={{ staggerChildren: stagger, delayChildren: delay }}
        >
            {children}
        </motion.div>
    );
}

export function RevealItem({ children }: { children: React.ReactNode }) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
