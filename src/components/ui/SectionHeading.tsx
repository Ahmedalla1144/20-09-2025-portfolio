import { cn } from "@/lib/utils";

export default function SectionHeading({
    title,
    kicker,
    description,
    align = "left",
    className,
}: {
    title: string;
    kicker?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}) {
    const isCenter = align === "center";
    return (
        <div
            className={cn(
                "mb-10",
                isCenter && "text-center max-w-2xl mx-auto",
                className
            )}
        >
            {kicker && (
                <div className="mb-2 text-sm font-medium tracking-wide text-muted uppercase">
                    {kicker}
                </div>
            )}
            <h2 className="h2">{title}</h2>
            {description && <p className="mt-3 text-muted">{description}</p>}
        </div>
    );
}
