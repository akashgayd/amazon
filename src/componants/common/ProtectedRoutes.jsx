import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('token');
    
    if (!token) {
      // Redirect to login if no token exists
      return <Navigate to="/login" />;
    }
    
    return children;
  };
  export default ProtectedRoute