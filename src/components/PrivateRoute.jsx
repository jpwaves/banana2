import { useSelector } from 'react-redux';
import { Navigate, Route, useLocation } from 'react-router-dom';
import Login from './login/Login';

function PrivateRoute ({ children })  {

  const { isAuthenticated, loading } = useSelector(state => state.auth);

  if (loading) {
    return <p>Checking authenticaton..</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;