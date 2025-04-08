import { Navigate } from 'react-router-dom';
import useAuth from '../Auth_component/useRAuth';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || (requiredRole && role !== requiredRole)) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default PrivateRoute;
