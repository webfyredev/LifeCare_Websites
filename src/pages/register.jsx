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

export default function RegisterPage(){
    const { register }  = useAuth();
    const navigate = useNavigate();
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
    const [status, setStatus] = useState({message : "", type : ""})
    
    
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
                        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(' ') : msgs}`)
                        .join('\n');
                    setError(messages);
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
            {error && (
                <div style={{
                    background: '#fee2e2',
                    border: '1px solid #ef4444',
                    borderRadius: '6px',
                    padding: '12px',
                    marginBottom: '16px',
                    color: '#b91c1c',
                    whiteSpace: 'pre-line'
                }}>
                    {error}
                </div>
                )}
            <div className="w-full mt-5 md:p-5 flex justify-center items-center">
                
                <form onSubmit={handleSubmit} className="w-full w-[85%] lg:w-[45%] h-auto rounded-md shadow-md flex flex-col items-center p-5">
                    
                    <img src={logoImg} className="w-15 h-15" />
                    <h3 className="my-2 font-bold text-xl">
                        Register Account
                    </h3>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">First Name</label>
                        <input type="text" name="first_name" required onChange={handleChange} placeholder="Enter your first name" className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Last Name</label>
                        <input type="text" name="last_name" onChange={handleChange} placeholder="Enter your last name" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Email</label>
                        <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Phone Number</label>
                        <input type="text" name="phone" onChange={handleChange} placeholder="Enter your phone number" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Role</label>
                        <select name="role" onChange={handleChange} value={formData.role} required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white">
                            <option value="patient">I am a Patient</option>
                            <option value="doctor">I am a Doctor</option>
                        </select>
                    </div>
                    
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Confirm Password</label>
                        <input type="password" name="password2" onChange={handleChange} placeholder="Confirm password" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <motion.button {...buttonEffects} type="submit" disabled={loading} className="border-1 w-full h-11 mt-2 text-sm font-semibold text-white cursor-pointer bg-blue-600 rounded-md">
                        {loading ? "Creating Account..." : "Create Account"}
                    </motion.button>
                </form>
            </div>
            {/* <Subscribe /> */}
            <Footer />
        </>
    );
}