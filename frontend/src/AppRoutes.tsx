import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './Pages/HomePage';
import AdminDashboard from './Pages/AdminDashboard';
import LoginPage from './Pages/LoginPage';
import ProtectedRoute from './auth/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Layout principal con rutas hijas */}
            <Route element={<Layout showHero={true} />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            {/* Página de login (fuera del layout principal) */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;
