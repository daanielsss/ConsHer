import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import api from "@/lib/axios";

export function FormGasto({ projectId }: { projectId: string }) {
    const [form, setForm] = useState({ descripcion: "", monto: "", fecha: "" });
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async () => {
            await api.post(`/proyectos/${projectId}/gastos`, form);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["proyecto", projectId]);
                setForm({ descripcion: "", monto: "", fecha: "" });
            },
        }
    );

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold mb-1">Agregar Gasto</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                <input
                    placeholder="Descripción"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="number"
                    placeholder="Monto"
                    name="monto"
                    value={form.monto}
                    onChange={(e) => setForm({ ...form, monto: e.target.value })}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                    className="border px-2 py-1 rounded"
                />
            </div>
            <button onClick={() => mutation.mutate()} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                Guardar Gasto
            </button>
        </div>
    );
}

export function FormNomina({ projectId }: { projectId: string }) {
    const [form, setForm] = useState({
        semana: "",
        trabajador: "",
        sueldo: "",
        pago: "",
        observaciones: "",
    });
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async () => {
            await api.post(`/proyectos/${projectId}/nomina`, form);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["proyecto", projectId]);
                setForm({ semana: "", trabajador: "", sueldo: "", pago: "", observaciones: "" });
            },
        }
    );

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold mb-1">Agregar Nómina</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                <input placeholder="Semana" value={form.semana} onChange={(e) => setForm({ ...form, semana: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Trabajador" value={form.trabajador} onChange={(e) => setForm({ ...form, trabajador: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Sueldo" type="number" value={form.sueldo} onChange={(e) => setForm({ ...form, sueldo: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Pago" type="number" value={form.pago} onChange={(e) => setForm({ ...form, pago: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Observaciones" value={form.observaciones} onChange={(e) => setForm({ ...form, observaciones: e.target.value })} className="border px-2 py-1 rounded" />
            </div>
            <button onClick={() => mutation.mutate()} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                Guardar Nómina
            </button>
        </div>
    );
}

export function FormMaterial({ projectId }: { projectId: string }) {
    const [form, setForm] = useState({
        material: "",
        cantidad: "",
        precio: "",
        unidad: "",
        detalles: "",
    });
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async () => {
            await api.post(`/proyectos/${projectId}/materiales`, form);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["proyecto", projectId]);
                setForm({ material: "", cantidad: "", precio: "", unidad: "", detalles: "" });
            },
        }
    );

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold mb-1">Agregar Material</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
                <input placeholder="Material" value={form.material} onChange={(e) => setForm({ ...form, material: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Cantidad" type="number" value={form.cantidad} onChange={(e) => setForm({ ...form, cantidad: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Precio" type="number" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Unidad" value={form.unidad} onChange={(e) => setForm({ ...form, unidad: e.target.value })} className="border px-2 py-1 rounded" />
                <input placeholder="Detalles" value={form.detalles} onChange={(e) => setForm({ ...form, detalles: e.target.value })} className="border px-2 py-1 rounded" />
            </div>
            <button onClick={() => mutation.mutate()} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                Guardar Material
            </button>
        </div>
    );
}
