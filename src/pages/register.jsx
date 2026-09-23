import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import registerImg from '../images/register.webp'
import logoImg from '../images/logo.png'
import { useAuth } from '../context/AuthContext'
import { motion } from "framer-motion";
import { buttonEffects } from "../animations/effects";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";

export default function RegisterPage(){
    const { register, setUser }  = useAuth();
    const navigate = useNavigate();
    const [googleRole, setGoogleRole] = useState('')
    const [googleError, setGoogleError] = useState(null) 

    const handleGoggleSuccess = async (credentialResponse) => {
        if(!googleRole){
            setGoogleError("Please select your role before signing in with Google.")
            return
        }
        try{
            const res = await api.post('/accounts/google/', {credential : credentialResponse.credential, role: googleRole})

            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)

            const me = await api.get('/accounts/me/')
            setUser(me.data)
            if(me.data.role === 'patient'){
                navigate('/patient/dashboard', {replace : true})
            }else if(me.data.role === 'doctor'){
                navigate('/doctor/dashboard', {replace : true})
            }
        } catch (err) {
            setGoogleError('Google sign-in failed. Please try again.')
        }


    }

    const [formData, setFormData] = useState({
        email : "",
        first_name : "",
        last_name : "",
        phone_number : "",
        role : "patient",
        password : "",
        confirm_password : "",
    })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [status, setStatus] = useState({message : "", type : ""})
    
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            await register(formData);
            navigate("/login", {state : { message : "Registration successful, Please login to continue", type : "success"}})
        } catch (err) {
            console.error('Registration error:', err);
            if(err.response) {
                const data = err.response.data
                console.error('Response data:', data);
                console.error('Status code:', err.response.status);
                if(typeof data === 'object') {
                    const messages = Object.entries(data)
                        .map(([field, msgs]) => `${Array.isArray(msgs) ? msgs.join(' ') : msgs}`)
                        .join('\n');
                    // setError(messages);
                    setTimeout(() => (setError(messages), 4000))
                } else {
                    setError("Something went wrong. Please try again later.");
                }
            } else if (err.request) {
                setError("Cannot reach the server. Check that Django is running on port 8000.");
                console.error('No response received — likely a CORS or network issue')
            } else{
                setError('Something went wrong. Please try again.')
            }
            

        } finally {
            setLoading(false);
        }
    }
    return(
        <>
            
            <NavBar />
            <PageHeads
            image = {registerImg}
            title = 'Register Accounts'
            text = 'Create your account to securely access your medical records, manage appointments, and stay connected with your healthcare team.' />
            
            <div className="w-full mt-5 md:p-5 flex flex-col justify-center items-center">
                
                
                <form onSubmit={handleSubmit} className="w-full w-[85%] lg:w-[55%] h-auto rounded-xl shadow-md flex flex-col items-center p-5 mb-5">
                    {error && (
                        <div className="w-[85%] py-2.5 flex items-center justify-center bg-[#fee2e2] rounded-lg rounded-lg text-[#b91c1c] font-medium">
                            {error}
                        </div>
                        )}
                    <img src={logoImg} className="w-15 h-15" />
                    <h3 className="mb-2 font-bold text-xl text-[#0481E0]">
                        Register Account
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-2">
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">First Name</label>
                            <input type="text" name="first_name" required onChange={handleChange} placeholder="Enter your first name" className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Last Name</label>
                            <input type="text" name="last_name" onChange={handleChange} placeholder="Enter your last name" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Email</label>
                            <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Phone Number</label>
                            <input type="text" name="phone_number" onChange={handleChange} placeholder="Enter your phone number" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Role</label>
                            <select name="role" onChange={handleChange} value={formData.role} required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition">
                                <option value="patient">I am a Patient</option>
                                <option value="doctor">I am a Doctor</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Password</label>
                            <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Confirm Password</label>
                            <input type="password" name="password2" onChange={handleChange} placeholder="Confirm password" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                    </div>
                    
                    <motion.button {...buttonEffects} type="submit" disabled={loading} className="border-1 w-full h-11 mt-5 text-sm font-semibold text-white cursor-pointer bg-blue-600 rounded-md">
                        {loading ? "Creating Account..." : "Create Account"}
                    </motion.button>
                    <p className="text-sm text-slate-400 mt-5">Already have an account? <button onClick={() => navigate('/login')} className="text-gray-800 hover:text-blue-600 font-semibold cursor-pointer transition-all">Sign in</button></p>
                    <div className="flex items-center space-x-3 my-2 w-full">
                        <div className="flex-1 h-px bg-slate-200" />
                        <span className="text-xs text-slate-400">or sign up with</span>
                        <div  className="flex-1 h-px bg-slate-200"/>
                    </div>
                    <div className="flex flex-col space-y-2 mb-3">
                        <p className="text-xs font-semibold text-slate-600">
                            Select your role before signing in with Google
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setGoogleRole('patient')}
                                className={`py-2.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer 
                                    ${googleRole === 'patient' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                                `}
                            >
                                I am a Patient
                            </button>
                            <button
                                type="button"
                                onClick={() => setGoogleRole('doctor')}
                                className={`py-2.5 text-sm font-medium rounded-lg border transition-colors cursor-pointer 
                                    ${googleRole === 'doctor' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                                `}
                            >
                                I am a Doctor
                            </button>
                        </div>
                    </div>
                    {googleError && (
                        <p className="text-xs text-red-500 mb-2">{googleError}</p>
                    )}
                    <div className={`flex justify-center w-full transition-opacity ${!googleRole ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                        <GoogleLogin 
                            onSuccess={handleGoggleSuccess}
                            onError={() => setGoogleError('Google sign-in failed.')}
                            useOneTap={false}
                            shape="rectangular"
                            size="large"
                            text="signup_with"
                            logo_alignment="left"
                        />
                    </div>
                    {!googleRole && (
                        <p className="text-[11px] text-slate-400 text-center mt-1">
                            Select a role above to enable Google sign-in
                        </p>
                    )}
                </form>
            </div>
            {/* <Subscribe /> */}
            <Footer />
        </>
    );
}