import { useLocation } from "react-router-dom";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { buttonEffects } from "../animations/effects";
import appointImg from '../images/appointment.webp'

export default function Appointments(){
    useEffect(() => {
        document.title = 'LifeCare | Appointments'
    })
    const {hash} = useLocation();
    useEffect(() =>{
        if(hash){
            const element = document.querySelector(hash)
            if(element){
                element.scrollIntoView({behavior : "smooth"})
            }
        }
    })
    return(
        <>
            <NavBar />
            <PageHeads 
            title = 'Appointments'
            image = {appointImg}
            text = 'Book appointments quickly and securely for any service or specialist.'
            />
            <div className="w-full p-5 flex flex-col items-center bg-[#F9FAFB]" id="appointments">
                <form className="w-full md:w-[90%] lg:w-[65%] h-auto lg:px-10 py-5 flex flex-col items-center bg-white rounded-md">
                    <h3 className="font-semibold text-xl mb-3 text-blue-600">
                        Book an Appointment
                    </h3>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Full Name</label>
                        <input type="text" required placeholder="Enter your full name" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Email</label>
                        <input type="email" required placeholder="Enter your email" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Phone Number</label>
                        <input type="text" required  placeholder="+234 800 000 0000" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Select Services</label>
                        <select type="text"  required placeholder="+234 800 000 0000" className=" h-11 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"> 
                            <option value="" disabled>-- Choose Services --</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Oncology">Oncology</option>

                        </select>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Preffered Date</label>
                        <input type="date" required className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Message (Optional)</label>
                        <textarea placeholder="Describe your concern" className=" h-20 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-blue-200 transition-all"></textarea>
                        <input  />
                    </div>
                    <motion.button {...buttonEffects} className="border-1 w-full h-11 text-sm font-semibold bg-blue-600 text-white rounded-sm cursor-pointer">
                        Book Appointment
                    </motion.button>
                </form>
            </div>
            <Footer />
        </>
    );
}