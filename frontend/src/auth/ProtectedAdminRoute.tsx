import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export default function ProtectedAdminRoute() {
    const { isAuthenticated, user, isLoading } = useAuth0();

    if (isLoading) return <div>Cargando...</div>;

    if (!isAuthenticated || user?.email !== ADMIN_EMAIL) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
