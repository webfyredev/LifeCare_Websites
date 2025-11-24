import { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate } from 'react-router-dom'


const ProtectRoute = ({children}) => {
    // const auth = useContext(AuthContext);
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <div className="text-center mt-20">Loading...</div>;
    }
    if(!user) {
        return <Navigate to="/patient-portal/" replace />;
    }

    return children;
}

export default ProtectRoute;