"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeading from "@/components/ui/SectionHeading";
import "swiper/css";

const data = [
    {
        quote:
            "Delivered ahead of schedule with excellent communication throughout.",
        author: "Sarah K.",
        role: "Product Manager",
    },
    {
        quote: "Pixel-perfect implementation and great attention to performance.",
        author: "Ali M.",
        role: "Tech Lead",
    },
    {
        quote: "A pleasure to work with—clean code and thoughtful UX.",
        author: "Daniel R.",
        role: "Founder",
    },
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="section">
            <div className="wrapper">
                <SectionHeading kicker="What Clients Say" title="Testimonials" />
                <Swiper spaceBetween={24} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 } }}>
                    {data.map((t, i) => (
                        <SwiperSlide key={i}>
                            <div className="card h-full">
                                <p className="text-lg leading-relaxed">“{t.quote}”</p>
                                <p className="mt-4 font-medium">
                                    {t.author} · <span className="text-muted">{t.role}</span>
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
