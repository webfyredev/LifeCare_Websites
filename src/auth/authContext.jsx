import {createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = async (email, password) => {
        try{
            const res = await api.post("/login_token/", {username :email, password});
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            const profile = await api.get("/patients-details/");
            setUser(profile.data);
            return true
        }catch(error){
            console.error("Login error", error.response?.data || error.message)
            setUser(null)
            return false
            // throw new Error("Invalid login credentials");
        }
    };
    const logout = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("access");
        if(token){
            api.get("/patients-details/")
            .then((res) => setUser(res.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
        } else{
            setLoading(false);
        }
    }, []);

    return(
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}