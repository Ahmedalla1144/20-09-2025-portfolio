type Props = {
    text: string;
    className?: string;
    step?: number;
    startDelay?: number;
};

export default function AnimatedText({ text, className = "", step = 0.06, startDelay = 0 }: Props) {
    const chars = Array.from(text);
    return (
        <span className={className} aria-label={text}>
            {chars.map((ch, i) => (
                <span
                    key={i}
                    className="letter-fx"
                    style={{ animationDelay: `${startDelay + i * step}s` }}
                >
                    {ch === " " ? "\u00A0" : ch}
                </span>
            ))}
        </span>
    );
}
