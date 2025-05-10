import Hero from "../components/Hero";
import { useEffect, useRef, useState } from "react";

export default function HomePage() {
    const footerRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex flex-col gap-12">
                <Hero />
                <div className="text-center px-4 py-8">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Bienvenido a ConsHer
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Construcción de viviendas de calidad, al alcance de todos.
                    </p>
                </div>
            </div>

            <div
                ref={footerRef}
                className={`bg-orange-500 py-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <span className="text-3xl text-white font-bold tracking-tight">
                        ConsHer
                    </span>
                    <span className="text-white font-bold tracking-tight flex gap-4 mt-4 md:mt-0">
                        <span className="hover:underline cursor-pointer">Política de privacidad</span>
                        <span className="hover:underline cursor-pointer">Términos del servicio</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
