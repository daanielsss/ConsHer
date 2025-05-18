import { useState } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

export default function AdminGastos() {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nombre: "",
        direccion: "",
        fechaInicio: "",
        presupuestoEstimado: "",
        gananciaEstimada: "",
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: proyectos, isLoading } = useQuery("proyectos", async () => {
        const res = await api.get("/proyectos");
        return res.data;
    });

    const crearProyecto = useMutation(
        async () => {
            await api.post("/proyectos", {
                ...form,
                estado: "En proceso",
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("proyectos");
                setForm({
                    nombre: "",
                    direccion: "",
                    fechaInicio: "",
                    presupuestoEstimado: "",
                    gananciaEstimada: "",
                });
                setShowForm(false);
            },
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Proyectos</h2>
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center gap-2"
                    onClick={() => setShowForm(!showForm)}
                >
                    <Plus size={18} />
                    Nuevo Proyecto
                </button>
            </div>

            {showForm && (
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-700 mb-4">Crear nuevo proyecto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border px-3 py-2 rounded" />
                        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="border px-3 py-2 rounded" />
                        <input name="fechaInicio" type="date" value={form.fechaInicio} onChange={handleChange} className="border px-3 py-2 rounded" />
                        <input name="presupuestoEstimado" type="number" placeholder="Presupuesto" value={form.presupuestoEstimado} onChange={handleChange} className="border px-3 py-2 rounded" />
                        <input name="gananciaEstimada" type="number" placeholder="Ganancia Esperada" value={form.gananciaEstimada} onChange={handleChange} className="border px-3 py-2 rounded" />
                    </div>
                    <button onClick={() => crearProyecto.mutate()} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Guardar Proyecto</button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                    <p>Cargando proyectos...</p>
                ) : (
                    proyectos?.map((proyecto: any) => (
                        <div key={proyecto._id} className="border p-4 rounded shadow bg-white">
                            <h4 className="text-lg font-semibold">{proyecto.nombre}</h4>
                            <p className="text-sm text-gray-600">📍 {proyecto.direccion}</p>
                            <p className="text-sm text-gray-600">📅 {new Date(proyecto.fechaInicio).toLocaleDateString()}</p>
                            <p className="text-sm font-medium">Estado: {proyecto.estado}</p>
                            <button
                                onClick={() => navigate(`/admin/gastos/${proyecto._id}`)}
                                className="text-blue-600 hover:underline flex items-center gap-1 mt-2"
                            >
                                <FolderOpen size={16} />
                                Ver Detalles
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
