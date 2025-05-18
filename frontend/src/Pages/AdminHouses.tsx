import { useState } from "react";
import axios from "axios";

export default function AdminHouses() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        address: "",
        price: "",
        status: "disponible",
        bedrooms: "",
        bathrooms: "",
        area: "",
        landSize: "",
        constructionSize: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/houses", {
                ...form,
                price: Number(form.price),
                bedrooms: Number(form.bedrooms),
                bathrooms: Number(form.bathrooms),
                area: Number(form.area),
                landSize: Number(form.landSize),
                constructionSize: Number(form.constructionSize),
            });

            console.log("Casa guardada:", response.data);
            alert("Casa agregada exitosamente.");
            setForm({
                title: "",
                description: "",
                address: "",
                price: "",
                status: "disponible",
                bedrooms: "",
                bathrooms: "",
                area: "",
                landSize: "",
                constructionSize: "",
            });
        } catch (err) {
            console.error("Error al guardar casa:", err);
            alert("Error al guardar casa. Revisa consola.");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Agregar Nueva Casa</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Ubicación</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Precio</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Estado</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        >
                            <option value="disponible">Disponible</option>
                            <option value="vendida">Vendida</option>
                            <option value="preventa">Preventa</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Recámaras</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={form.bedrooms}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Baños</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={form.bathrooms}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Área construida (m²)</label>
                        <input
                            type="number"
                            name="area"
                            value={form.area}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Terreno (m²)</label>
                        <input
                            type="number"
                            name="landSize"
                            value={form.landSize}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>


                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 font-semibold"
                >
                    Guardar Casa
                </button>
            </form>
        </div>
    );
}
