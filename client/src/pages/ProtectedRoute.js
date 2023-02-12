import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ children }) => {
	const { user } = useAppContext();
	return !user ? <Navigate to="/landing" /> : children;
};
export default ProtectedRoute;
