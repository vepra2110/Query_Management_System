import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { auth, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!auth?.token) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;