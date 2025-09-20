import { cn } from "@/lib/utils";

type CardBaseProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: "outline" | "elevated" | "ghost";
};

export function Card({ className, variant = "outline", ...props }: CardBaseProps) {
    return (
        <div
            className={cn(
                "rounded-2xl",
                variant === "ghost" && "bg-transparent",
                variant === "outline" && "card",
                variant === "elevated" && "bg-white dark:bg-slate-900 border border-border shadow-card",
                className
            )}
            {...props}
        />
    );
}

export function CardHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function CardTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn("text-lg font-semibold leading-tight", className)} {...props} />
    );
}

export function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn("text-muted mt-1", className)} {...props} />;
}

export function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pt-2", className)} {...props} />;
}

export function CardFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-6 pt-0 flex items-center gap-3", className)} {...props} />
    );
}
