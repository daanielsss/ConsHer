import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './Pages/HomePage';
import AuthCallBackPage from './Pages/AuthCallBackPage';
import ProtectedAdminRoute from './auth/ProtectedAdminRoute';
import AdminDashboard from './Pages/AdminDashboard';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Layout showHero={true}>
                    <HomePage />
                </Layout>
            } />

            <Route path='/auth-callback' element={<AuthCallBackPage />} />

            {/* Rutas protegidas para el administrador */}
            <Route element={<ProtectedAdminRoute />}>

                <Route path='/admin' element={<AdminDashboard />} />
                {/* Aquí agregaremos: Panel admin, calculadora, control de gastos */}
                {/* Ejemplo futuro: <Route path='/admin' element={<AdminDashboard />} /> */}
            </Route>

            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AppRoutes;
