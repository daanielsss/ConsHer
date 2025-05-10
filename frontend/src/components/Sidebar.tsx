import {
    Home,
    LayoutDashboard,
    Ruler,
    BarChart2,
    LogOut,
    UserCircle,
    Building,
    PanelLeftClose,
    PanelLeftOpen// ← nuevo ícono
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromToken } from "@/lib/auth";
import { useSidebar } from "@/context/SidebarContext";

export default function Sidebar() {
    const user = getUserFromToken();
    const navigate = useNavigate();
    const location = useLocation();
    const { expanded, toggleSidebar } = useSidebar();

    const navItems = [
        { label: "Inicio", icon: <Home />, path: "/" },
        { label: "Panel", icon: <LayoutDashboard />, path: "/admin" },
        { label: "Propiedades", icon: <Building />, path: "/admin/houses" },
        { label: "Calculadora", icon: <Ruler />, path: "/admin/calculadora" },
        { label: "Gastos", icon: <BarChart2 />, path: "/admin/gastos" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!user) return null; // ← Asegura que solo el admin vea la sidebar

    return (
        <aside
            className={`h-screen fixed top-0 left-0 bg-[#1e2d2f] text-white flex flex-col transition-all duration-300 z-50
        ${expanded ? "w-56" : "w-16"}`}
        >
            <div className="flex flex-col h-full justify-between">
                {/* Header del sidebar */}
                <div>
                    <div className="flex items-center justify-between px-4 py-4 border-b border-[#2a3c3e]">
                        {expanded && <h1 className="text-lg font-bold text-orange-400">ConsHer</h1>}
                        <button onClick={toggleSidebar}>
                            {expanded ? <PanelLeftClose /> : <PanelLeftOpen />}
                        </button>



                    </div>

                    {/* Perfil */}
                    <div className="flex flex-col items-center mt-6 mb-4 px-2">
                        <UserCircle size={40} className="text-orange-400" />
                        {expanded && user && (
                            <div className="mt-2 text-center">
                                <p className="text-sm font-semibold">{user.name || "Admin"}</p>
                                <p className="text-xs text-gray-300">{user.email}</p>
                            </div>
                        )}
                    </div>

                    {/* Navegación */}
                    <div className="flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3 hover:bg-[#2a3c3e] transition text-sm font-medium
                  ${location.pathname === item.path ? "bg-orange-600" : ""}
                  ${!expanded ? "justify-center" : ""}`}
                            >
                                {expanded ? (
                                    <>
                                        <span>{item.label}</span>
                                        <span>{item.icon}</span>
                                    </>
                                ) : (
                                    <span>{item.icon}</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Logout */}
                <div className="px-4 py-4 border-t border-[#2a3c3e] mt-auto">
                    {expanded ? (
                        <button
                            onClick={handleLogout}
                            className="w-full text-red-400 hover:text-red-600 flex items-center justify-between"
                        >
                            <span>Cerrar sesión</span>
                            <LogOut size={18} />
                        </button>
                    ) : (
                        <button onClick={handleLogout} className="text-red-400 hover:text-red-600">
                            <LogOut />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
}
