import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import { find_doctors } from "../data/data";
import {FaGraduationCap, FaClock, FaMapMarkerAlt, FaStar} from 'react-icons/fa';
import { motion } from "framer-motion";
import { buttonEffects, cardscrollRight, scrollUp } from "../animations/effects";
import doctorPage from '../images/f_doctors.webp'
import { useEffect } from "react";

export default function Find_Doctors(){
    useEffect(() =>{
        document.title = 'LifeCare | Doctors'
    })
    return(
        <>
            <NavBar />
            <PageHeads
            image = {doctorPage} 
            title = 'Find a Doctor'
            text = 'Connect with our expert medical professionals who are dedicated to proving exceptional healthcare.'/>
            <div className="w-full p-5 bg-[#F9FAFB] flex flex-col items-center">
                <motion.form {...scrollUp} action="" className="w-[65%] p-5 rounded-sm shadow-xs">
                    <input type="text" placeholder="Search by doctor name or speciality" className="w-full h-10 text-[12px] rounded-sm bg-white outline-blue-200 px-4 border-1 border-gray-200 mb-3" />
                    <div className="w-full flex h-auto space-x-5">
                        <div className="w-1/2 h-auto">
                            <label htmlFor="" className="text-xs mb-3 text-gray-600">Speciality</label>
                            <input type="text" className="w-full h-10 text-[12px] rounded-sm bg-white outline-blue-200 px-4 border-1 border-gray-200" />
                        </div>
                        <div className="w-1/2 h-auto">
                            <label htmlFor="" className="text-xs mb-3">Location</label>
                            <input type="text" className="w-full h-10 text-[12px] rounded-sm bg-white outline-blue-200 px-4 border-1 border-gray-200" />
                        </div>
                    </div>
                </motion.form>

            </div>
            <div className="w-full py-5 px-10 mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-white">
                {find_doctors.map((doctors) =>(
                    <motion.div {...cardscrollRight} className="rounded-md mb-3 shadow-xs">
                        <img src={doctors.image} alt="" className="w-full h-55 rounded-t-md object-cover"/>
                        <div className="flex flex-col p-3 rounded-b-md bg-[#F9FAFB] shadow-xs">
                            <h3 className="text-sm font-semibold">
                                {doctors.name}
                            </h3>
                            <p className="text-[12px] text-blue-600 font-semibold mt-1.5">
                                {doctors.title}
                            </p>
                            <p className="text-[11px] mt-1.5">
                                {doctors.department}
                            </p>
                            <div className="flex items-center mt-1.5">
                                <FaGraduationCap  className="text-gray-400 w-2.5 h-2.5 mr-1"/> <p className="text-[9px]">{doctors.education}</p>
                            </div>
                            <div className="flex items-center mt-1.5">
                                <FaClock  className="text-gray-400 w-2.5 h-2.5 mr-1"/> <p className="text-[9px]">{doctors.experience}</p>
                            </div>
                            <div className="flex items-center mt-1.5">
                                <FaMapMarkerAlt  className="text-gray-400 w-2.5 h-2.5 mr-1"/> <p className="text-[9px]">{doctors.location}</p>
                            </div>
                            <div className="flex items-center mt-1.5">
                                <FaStar  className="text-yellow-400 w-2.5 h-2.5 mr-1"/> <p className="text-[9px]">{doctors.rating} rating</p>
                            </div>
                            <div className="flex flex-col space-y-1.5 mt-2">
                                <p className="text-[9px] font-semibold">
                                    Languages:
                                </p>
                                <div className="flex space-x-2">
                                    {doctors.languages.map((languages) =>(
                                        <div className="flex items-center text-[9px] px-3 h-5 cursor-pointer bg-white rounded-xs hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xs">
                                            {languages}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-5 mt-5 mb-3">
                                    <motion.button {...buttonEffects} className="text-[12px] font-semibold px-6 py-1.5 bg-blue-600 text-white rounded-sm cursor-pointer">View Profile</motion.button>
                                    <motion.button {...buttonEffects} className="text-[12px] font-semibold px-6 py-1.5 border-1 border-blue-600 text-blue-600 rounded-sm cursor-pointer">Book Appointment</motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            <Subscribe />
            <Footer/>
        </>
    );
}