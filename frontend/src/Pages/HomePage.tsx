import Hero from "../components/Hero";

export default function HomePage() {
    return (
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
    );
}
