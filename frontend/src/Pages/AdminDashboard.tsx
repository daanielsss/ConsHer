import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { user, logout } = useAuth0();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => navigate(path);

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Panel del Administrador</h1>

            <div className="bg-white shadow rounded-lg p-4 mb-6">
                <p><strong>Nombre:</strong> {user?.name}</p>
                <p><strong>Correo:</strong> {user?.email}</p>
                <button
                    className="mt-4 text-sm text-red-600 underline"
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    Cerrar sesión
                </button>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <button
                    className="p-4 bg-blue-600 text-white rounded-lg shadow"
                    onClick={() => handleNavigation("/admin/houses")}
                >
                    🏠 Gestionar Casas
                </button>
                <button
                    className="p-4 bg-green-600 text-white rounded-lg shadow"
                    onClick={() => handleNavigation("/admin/calculadora")}
                >
                    🧮 Calculadora de Materiales
                </button>
                <button
                    className="p-4 bg-purple-600 text-white rounded-lg shadow"
                    onClick={() => handleNavigation("/admin/gastos")}
                >
                    📊 Control de Gastos
                </button>
            </div>
        </div>
    );
}
