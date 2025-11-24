import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import registerImg from '../images/register.webp'
import logoImg from '../images/logo.png'
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { buttonEffects } from "../animations/effects";

export default function RegisterPatients(){
    const navigate = useNavigate();
    const [status, setStatus] = useState({message : "", type : ""})
    const [form, setForm] = useState({first_name : "", last_name : "", email : "", password : "", confirm_password : "", phone : "", address : "", age : "", gender : ""});
    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
    };
    const formSubmission = async(e) => {
        e.preventDefault();
        if(form.password !== form.confirm_password){
            setStatus({message : "Password do not match", type : "error"})
            return;
        }
        // const payload = {...form, username:form.email}
        try{
            await api.post("/register-patients/", form);
            // alert("Account created successfully!");
            setStatus({message : `Account created successfully! ${form.first_name} ${form.last_name}`, type : "success"})
            setTimeout(() => {
                navigate('/patient-portal');
            }, 1500)
        }catch(err){
            setStatus({message : "Error creating account", type : "error"})
            // alert("Error creating account")
        }
    };
    return(
        <>
            {status.message && (
            <motion.div 
            initial = {{opacity : 0, y : -40}}
            animate = {{opacity : 1, y : 0}}
            transition={{duration:1}}
            exit={{opacity : 0, y : -40}}
            className={`fixed top-5 transform -translate-x-1/2 left-1/2 z-50 px-3 py-4 md:py-3.5 rounded-md shadow-sm text-white text-xs md:text-sm text-center w-[95%] h-12 font-semibold ${status.type === "success" ? 'bg-green-500' : 'bg-red-500'}`}>
                {status.message}
            </motion.div>
            )}
            <NavBar />
            <PageHeads
            image = {registerImg}
            title = 'Register Patients'
            text = 'Create your account to securely access your medical records, manage appointments, and stay connected with your healthcare team.' />
            <div className="w-full mt-5 md:p-5 flex justify-center items-center">
                <form onSubmit={formSubmission} className="w-full w-[85%] lg:w-[45%] h-auto rounded-md shadow-md flex flex-col items-center p-5">
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
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Age</label>
                        <input type="number" name="age" onChange={handleChange} placeholder="Enter your age" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Gender</label>
                        <select name="gender" onChange={handleChange} required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white">
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Address</label>
                        <textarea name="address" onChange={handleChange} id="" placeholder="Address" required className="p-2 text-xs border-1 w-full h-15 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white"></textarea>
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Password</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <div className="flex flex-col w-full mb-2.5">
                        <label htmlFor="" className="text-xs mb-1 font-semibold">Confirm Password</label>
                        <input type="password" name="confirm_password" onChange={handleChange} placeholder="Confirm your password" required className="px-2 text-xs border-1 w-full h-10 rounded-sm outline-blue-300 border-1 border-gray-400 bg-[#F9FAFB] hover:bg-white" />
                    </div>
                    <motion.button {...buttonEffects} type="submit" className="border-1 w-full h-11 mt-2 text-sm font-semibold text-white cursor-pointer bg-blue-600 rounded-md">
                        Create Account
                    </motion.button>
                </form>
            </div>
            {/* <Subscribe /> */}
            <Footer />
        </>
    );
}