import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import HeroSlider from "../components/hero";
import { heroNext, homeService, about_data } from "../data/data";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import aboutImg from '../images/homeService/abouts.webp'
import Testimonial from "../components/testimonials";
import Blog from "../components/blog";
import Footer_Cta from "../components/footer_CTA";
import Subscribe from "../components/subscribe";
import Footer from "../components/footer";
import { buttonEffects, CardscrollLeft, cardscrollRight, scrollLeft, scrollRight, scrollUp } from "../animations/effects";
import Appointment from "../components/appointment";
import Doctors from "../components/doctors";
import ChooseUs from "../components/choose";
import Facilities from "../components/facilities";
import FAQs from "../components/faqs";


export default function Home(){
    useEffect(() =>{
        document.title = 'LifeCare | Home'
    }, []);
    return(
        <>
            <NavBar />
            <HeroSlider />
            <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grd-cols-3 lg:grid-cols-4 gap-5 p-10 bg-blue-500 overflow-hidden">
                {heroNext.map((data) =>(
                    <motion.div {...CardscrollLeft} className="flex flex-col items-center bg-white rounded-md p-5">
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
            <div className="bg-white py-5 md:px-10 lg:px-15 lg:flex lg:flex-row flex flex-col h-auto lg:h-120 justify-between overflow-hidden">
                <motion.div {...scrollUp} className="w-full lg:w-[50%] flex flex-col p-5">
                    <h3 className="font-semibold text-2xl md:text-3xl">
                        Excellence in Healthcare Since 2005
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
                    <motion.button {...buttonEffects} className="flex cursor-pointer p-3 border-1 w-40 text-xs font-semibold py-3 bg-blue-600 text-white rounded-sm mt-2">
                        Learn More About Us <FaArrowRight  className="w-2.5 h-2.5 mt-1 ml-1"/>
                    </motion.button>
                </motion.div>
                <motion.img {...scrollRight} src={aboutImg} className="w-full lg:w-[45%] h-70 md:h-100 lg:h-full p-5 object-cover" />
            </div>
            <div className="flex flex-col items-center bg-[#F9FAFB] px-0 md:px-5 lg:px-10 py-10 overflow-hidden">
                <motion.h3 {...scrollLeft} className="font-bold text-3xl mt-5">
                    Our Medical Services
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-xs md:text-sm text-center mt-2">
                    We provide comprehensive healthcare services across multiple specialities, 
                    ensuring you recieve the  best possible care for your specific needs.
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 w-full mt-5">
                    {homeService.map((data) =>(
                        <motion.div {...cardscrollRight} className="flex flex-col bg-white shadow-sm rounded-sm mb-5">
                            <img src={data.image} className="w-full h-50 object-cover rounded-t-md"/>
                            <div className="w-full flex flex-col p-3">
                                <h3 className="text-sm  font-semibold">
                                    {data.title}
                                </h3>
                                <p className="text-gray-500 text-xs my-2">
                                    {data.text}
                                </p>
                                <motion.button {...buttonEffects} className="flex items-center p-4 hover:bg-blue-600 hover:text-white  transition-all duration-300 cursor-pointer border-1 w-30 h-9 mt-2 text-xs rounded-md border-1 border-blue-600 font-semibold text-blue-600 mb-3">
                                    Learn More  <FaArrowRight  className="w-2.5 h-2.5 ml-1 mt-[-0.5]"/>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.button 
                    {...buttonEffects}
                className="flex items-center px-9 border-1 py-3 text-xs font-semibold rounded-sm cursor-pointer bg-blue-600 text-white">
                    View All Services <FaArrowRight  className="w-2.5 h-2.5 mt-0.5 ml-1"/>
                </motion.button>
            </div>
            {/* <Appointment /> */}
            <Doctors />
            <ChooseUs />
            <Testimonial />
            <Facilities />
            <Blog />
            <FAQs />
            <Footer_Cta 
            title = 'Ready to Experience Exceptional Healthcare?'
            text = 'Take the first step towards your health. Book an appointment with our specialists or explore our comprehensive medical services'
            btn_text_1 = 'Book Appointment'
            btn_text_2 = 'Explore Services'/>
            {/* <AppointmentModal /> */}
            <Subscribe />
            <Footer />
        </>
    )
}