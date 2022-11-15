import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({ children }) {
    const user = useSelector((state) => state.auth.login.currentUser);
    const token = localStorage.getItem('social-token');

    return <>{user === null && token ? <Navigate to="/login" /> : children}</>;
}
export default RequireAuth;
