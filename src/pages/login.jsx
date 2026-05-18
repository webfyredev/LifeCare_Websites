import { useContext, useEffect, useState } from "react";
import { buttonEffects, scrollRight } from "../animations/effects";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import { portalinfo } from "../data/data";
import portalImg from '../images/portal.webp'
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage(){
    const  { login }  = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const message = location.state?.message
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
        }, [error])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
            navigate(location.pathname, { replace: true, state: {} })
            }, 5000)
            return () => clearTimeout(timer)
        }
        }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const user = await login(email, password);
            if(user.role === "patient"){
                navigate("/patient/dashboard", { replace: true })
            } else if(user.role === "doctor"){
                navigate("/doctor/dashboard", { replace: true })
            } else {
                navigate("/login", { replace: true })
            }
        } catch(err) {
            console.error('Login failed:', err);
            const data = err.response?.data;
            if (data?.email) setError(data.email)
            else if (data?.password) setError(data.password)
            else if (data?.detail) setError(data.detail)
            else if (err.request && !err.response) setError("Cannot reach the server. Check that Django is running on port 8000.")
            else setError("Invalid email or password. Please try again.")
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() =>{
        document.title = 'LifeCare | Portal'
    })
    return(
        <>
            
            <NavBar />
            <PageHeads 

            image = {portalImg}
            title = 'LifeCare Portal'
            text = 'Access your patient information, communicate with your care team, and manage your healthcare online.'/>
            <div className="lg:flex lg:flex-row flex flex-col md:px-5 lg:px-10 py-10 bg-[#F9FAFB] mt-10 space-x-10 overflow-hidden">
                <div className="w-full lg:w-[45%] h-auto lg:h-135 shadow-xs p-5 bg-white rounded-md overflow-hidden flex flex-col" >
                    {message && (
                        <div className="bg-[#dcfce7] border-1 border-[#16a34a] rounded-sm padding-[12px] text-[#15803d] p-3 mb-5 text-center text-sm font-semibold">
                            {message}
                        </div>
                        )}

                        {error && (
                            <div className="bg-[#fee2e2] border-1 border-[#ef4444] rounded-sm padding-[12px] text-[#b91c1c] p-3 mb-5 text-center text-sm font-semibold">
                                {error}
                            </div>
                    )}
                    <form onSubmit={handleSubmit} className="w-full h-full flex flex-col space-y-2">
                        <h3 className="font-semibold text-xl mb-5">
                            Portal login
                        </h3>
                        <div className="flex flex-col w-full h-auto mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1.5">Email *</label>
                            <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} required className="w-full h-10 text-[11px] px-3 outline-blue-200 rounded-sm bg-gray-50 border-1 border-gray-200" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col w-full h-auto mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1.5">Password *</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-10 text-[11px] px-3 outline-blue-200 rounded-sm bg-gray-50 border-1 border-gray-200" placeholder="Enter your password" />
                        </div>
                        <div className="flex flex-row justify-between w-full h-auto mb-3">
                            <p className="flex items-center text-xs"><input type="checkbox" required className="mr-1 mt-0.5 bg-white text-blue-600 cursor-pointer"/> Remember me</p>
                            <a href="" className="text-xs font-semibold text-blue-600">Forgot Password?</a>
                        </div>
                        <motion.button {...buttonEffects} type="submit" disabled={loading} className="mt-3 h-11 text-xs font-semibold bg-blue-600 text-white rounded-sm cursor-pointer">
                            {loading ? 'Signing in...' : 'Sign in'}
                        </motion.button>
                        <hr  className="border-1 my-3 text-gray-100"/>
                        <p className="font-semibold text-sm">
                            New to the Patient Portal?
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                            If you're a new patient or haven't registered for the portal yet, you can create an account
                        </p>
                        
                    </form>
                    <motion.button {...buttonEffects} className="my-3 h-12 text-xs font-semibold border-1 border-blue-600 text-blue-600 rounded-sm cursor-pointer">
                        <Link to="/register">
                            Create New Account
                        </Link>
                    </motion.button>
                </div>
                <div className="rounded-md w-full lg:w-[45%] p-5 flex flex-col bg-white shadow-xs mt-5 lg:mt-0 overflow-hidden">
                    <h3 className="text-xl font-semibold">
                        What You Can Do
                    </h3>
                    <ul className="flex flex-col space-y-5 mt-5">
                        {portalinfo.map((info) =>(
                            <motion.div {...scrollRight} className="flex items-center p-5 bg-[#F9FAFB] rounded-sm space-x-3">
                                <info.icon  className="w-9 h-9 p-2.5 border-1 bg-blue-600 text-white rounded-sm"/>
                                <div className="flex flex-col space-y-1">
                                    <h3 className="font-semibold text-sm mt-2">
                                        {info.title}
                                    </h3>
                                    <p className="text-[10px] md:text-xs mb-3">
                                        {info.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </ul>
                </div>
            </div>
            <Subscribe />
            <Footer />
        </>
    );
}