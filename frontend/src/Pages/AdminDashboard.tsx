// AdminDashboard.tsx
import { useNavigate } from "react-router-dom";
import { getUserFromToken } from "../lib/auth";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const user = getUserFromToken();

    const handleNavigation = (path: string) => navigate(path);

    return (
        <div className="p-6 md:p-10 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Panel del Administrador</h1>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                <button
                    onClick={() => handleNavigation("/admin/houses")}
                    className="p-6 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
                >
                    🏠 Gestionar Casas
                </button>

                <button
                    onClick={() => handleNavigation("/admin/calculadora")}
                    className="p-6 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
                >
                    🧮 Calculadora de Materiales
                </button>

                <button
                    onClick={() => handleNavigation("/admin/gastos")}
                    className="p-6 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition"
                >
                    📊 Control de Gastos
                </button>
            </div>
        </div>
    );
}
