import { useEffect } from "react";
import NavBar from "../components/navbar";
import HeroSlider from "../components/hero";
import { heroNext, homeService, about_data } from "../data/data";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import aboutImg from '../images/home_about.jpg'
import Testimonial from "../components/testimonials";
import Blog from "../components/blog";

export default function Home(){
    useEffect(() =>{
        document.title = 'LifeCare | Home'
    }, []);
    return(
        <>
            <NavBar />
            <HeroSlider />
            <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grd-cols-3 lg:grid-cols-4 gap-5 p-10 bg-blue-500">
                {heroNext.map((data) =>(
                    <motion.div whileHover={{scale : 1.05}} className="flex flex-col items-center bg-white rounded-md p-5">
                        <data.icon  className={`w-11 h-11 p-3.5 ${data.icon_style} rounded-full`}/>
                        <h3 className="text-sm mt-3 font-semibold">
                            {data.title}
                        </h3>
                        <p className="text-xs my-2">
                            {data.text}
                        </p>
                        <motion.button whileHover={{scale : 1.05}} whileTap={{scale : 0.95}} className={`${data.btn_style} cursor-pointer px-6 py-2 font-semibold text-xs mb-3 mt-2`}>
                            {data.btn_text}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
            <div className="flex flex-col items-center bg-[#F9FAFB] p-10">
                <h3 className="font-bold text-3xl mt-5">
                    Our Medical Services
                </h3>
                <p className="text-gray-500 w-150 text-sm text-center mt-2">
                    We provide comprehensive healthcare services across multiple specialities, 
                    ensuring you recieve the  best possible care for your specific needs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full mt-5">
                    {homeService.map((data) =>(
                        <div className="flex flex-col bg-white shadow-sm rounded-sm mb-5">
                            <img src={data.image} className="w-full h-50 object-cover rounded-t-md"/>
                            <div className="w-full flex flex-col p-3">
                                <h3 className="text-sm  font-semibold">
                                    {data.title}
                                </h3>
                                <p className="text-gray-500 text-xs my-2">
                                    {data.text}
                                </p>
                                <button className="flex items-center p-4 hover:bg-blue-600 hover:text-white  transition-all duration-300 cursor-pointer border-1 w-30 h-9 mt-2 text-xs rounded-md border-1 border-blue-600 font-semibold text-blue-600 mb-3">
                                    Learn More  <FaArrowRight  className="w-2.5 h-2.5 ml-1 mt-[-0.5]"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <motion.button 
                    whileHover={{scale : 1.05}}
                    whileTap={{scale : 0.95}}
                className="flex items-center px-9 border-1 py-3 text-xs font-semibold rounded-sm cursor-pointer bg-blue-600 text-white">
                    View All Services <FaArrowRight  className="w-2.5 h-2.5 mt-0.5 ml-1"/>
                </motion.button>
            </div>
            <div className="bg-white py-5 px-15 flex h-120 justify-between">
                <div className="w-[50%] flex flex-col p-5">
                    <h3 className="font-semibold text-3xl">
                        Excellence in Healthcare Since 1998
                    </h3>
                    <p className="text-[12px] text-justify text-gray-500 mt-3">
                        For over 15 years, LifeCare Hospital has been at the forefront of medical Innovation
                        , providing exceptional patient care with a commitment to healing, comfort, and hope. Our team of world-class physicians and healthcare professionals work together to deliver personalized
                        treatment plans tailored to each patients unique needs.
                    </p>
                    <p className="text-[12px] text-justify text-gray-500 mt-3">
                        Our team of world-class physicians and healthcare professionals work together to deliver personalized
                        treatment plans tailored to each patients unique needs.
                    </p>
                    <div className="w-[75%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5 py-5 mt-2">
                        {about_data.map((data) =>(
                            <div className="flex flex-col">
                                <h3 className="text-2xl font-bold text-blue-600">
                                    {data.counts}{data.value}
                                </h3>
                                <p className="text-[10px] font-semibold my-1 text-gray-500">
                                    {data.text}
                                </p>
                                
                            </div>
                        ))}
                        
                    </div>
                    <button className="flex cursor-pointer p-3 border-1 w-40 text-xs font-semibold py-3 bg-blue-600 text-white rounded-sm mt-2">
                        Learn More About Us <FaArrowRight  className="w-2.5 h-2.5 mt-1 ml-1"/>
                    </button>
                </div>
                <img src={aboutImg} className="w-[45%] p-5 rounded-xl object-cover" />
            </div>
            <Testimonial />
            <Blog />
        </>
    )
}