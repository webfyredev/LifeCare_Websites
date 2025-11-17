import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import aboutImage from '../images/aboutUs.webp'
import { about_core_values, aboutCards, awards, difference, number1, number2 } from "../data/data";
import { FaCheck } from "react-icons/fa";
import coreImg from '../images/about_core.webp'
import Team from "../components/team";
import diffImg from '../images/about_diff.webp'
import Footer_Cta from "../components/footer_CTA";
import Subscribe from "../components/subscribe";
import ChooseUs from "../components/choose";
import { motion } from "framer-motion";
import { buttonEffects, CardscrollLeft, cardscrollRight, scrollLeft, scrollRight, scrollUp } from "../animations/effects";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function About(){
    useEffect(() =>{
        document.title = 'LifeCare | About-Us'
    })
    // const  = parseInt(new Date().getFullYear());
    const founder_year = 2005
    const hospital_year = new Date().getFullYear() - founder_year
    const {hash} = useLocation();
    useEffect(() => {
        if(hash){
            const element = document.querySelector(hash);
            if(element){
                element.scrollIntoView({behavior : 'smooth'})
            }
    }
    });
    return(
        <>
            <NavBar />
            <PageHeads 
            title = 'About LifeCare Hospital'
            image = {aboutImage}
            text = {`Dedicated to excellence in healthcare for over ${hospital_year} years, serving our community with compassion, innovation, and unwavering commitment to patient care.`} />
            <div className="w-full flex flex-col mt-5 px-5 lg:px-10 py-5 overflow-hidden">
                <motion.h3 {...scrollRight} className="text-2xl mt-5 font-bold px-5">
                    Our Mission & Vission
                </motion.h3>
                <motion.div {...scrollLeft} className="w-full mt-5 lg:flex lg:flex-row flex flex-col">
                    <div className="w-full lg:w-[45%] h-auto lg:p-5">
                        <p className="text-blue-600 font-semibold mb-4">
                            Mission Statement
                        </p>
                        <p className="text-[13px] text-gray-600 text-justify mb-5">
                            To provide exceptional, compassionate healthcare services that improve the  health and well-being
                            of your community. We are committed to delivering patient-centered care through clinical excellence, innovative
                            treatments, and a dedication to healing that extends beyond medical treatment to encompass the whole person.
                        </p>
                        <p className="text-blue-600 font-semibold mb-4">
                            Our Vission
                        </p>
                        <p className="text-[13px] text-gray-600 text-justify mb-5">
                            To be the leading healthcare provider in our region, recognized for our clinical excellence, 
                            innovative care delivery, and commitmentto improving community health outcomes. We envision a future where every patient
                            recieves personalized, world-class medical care in a compassionate and healthy environments.
                        </p>
                        <p className="text-blue-600 font-semibold mb-4">
                            Core Values
                        </p>
                        <div className="flex flex-col space-y-6">
                            {about_core_values.map((values) =>(
                                <p className="md:flex md:flex-row flex flex-col items-left md:items-center text-xs text-gray-600"><FaCheck  className="hidden md:flex w-2 h-2 text-green-400 mr-2"/> <span className="font-semibold mr-1">{values.title}:</span> {values.text}</p>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-[45%] lg:ml-15 md:p-5 mt-10 md:mt-5 lg:mt-0 ">
                        <img src={coreImg} className="w-full h-70 md:h-100 lg:h-full object-cover rounded-md"/>
                    </div>
                </motion.div>
            </div>
            <ChooseUs />
            <Team />
            <div className="w-full p-5 flex flex-col items-center bg-white mt-5 overflow-hidden">
                <motion.h3 {...scrollLeft} className="text-2xl md:text-3xl font-bold mt-5">
                    Awards &amp; Recognition
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-sm mt-2 text-center">
                    Our commitment to excellence has been recognized by leading healthcare organizations and accreditation bodies
                </motion.p>
                <div className="w-full lg:w-[90%] mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 px-5 lg:px-10 overflow-hidden">
                    {awards.map((award) =>(
                        <motion.div {...CardscrollLeft} className="w-[95%] lg:w-full flex flex-col items-center rounded-sm mb-3 p-5 bg-[#F9FAFB] shadow-sm">
                            <award.icon  className={`w-13 h-13 p-3.5 rounded-full ${award.icon_style}`}/>
                            <h3 className="my-2 font-semibold text-sm">
                                {award.title}
                            </h3>
                            <p className="text-xs text-center mb-2 text-gray-600">
                                {award.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#F9FAFB] py-5 mt-5 overflow-hidden">
                <motion.h3 {...scrollLeft} className="text-2xl md:text-3xl font-bold mt-5">
                    Community Impact
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-sm mt-2 text-center">
                    Beyond providing excellent medical care. We're committed to improving the health and well-being of our entire community
                </motion.p>
                <div className="lg:flex lg:flex-row flex flex-col justify-around shadow-xs p-5 mt-5 w-[95%] lg:w-[90%] h-auto lg:h-100 bg-white rounded-md overflow-hidden">
                    <motion.div {...scrollUp} className="w-full lg:w-[45%] lg:h-full h-auto flex flex-col md:p-5">
                        <h3 className="text-2xl font-semibold mb-3">
                            Making a Difference
                        </h3>
                        <p className="text-xs text-justify text-gray-600">
                            Our commitment to community health extends far beyond our hospital  walls. 
                            Through partnerships, outreach programs and charitable care, we work to address health 
                            disparities and improve access to quality healthcare for all members of our community.
                        </p>
                        <div className="p-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-5">
                            {difference.map((data)=>(
                                <div className="bg-[#F9FAFB] rounded-sm p-2 flex flex-col items-center">
                                    <h3 className="text-md font-bold text-blue-600">
                                        {data.value}
                                    </h3>
                                    <p className="text-[10px] text-gray-600 font-semibold">
                                        {data.text}
                                    </p>
                                </div>

                            ))}
                        </div>
                        <motion.button {...buttonEffects} className="border-1 w-45 h-10 rounded-sm font-semibold text-white bg-blue-600 cursor-pointer text-xs mt-2">
                            Learn About Our Programs
                        </motion.button>
                    </motion.div>
                    <motion.div {...scrollRight} className="w-full lg:w-[50%] h-70 md:h-100 lg:h-full md:p-5 mt-5 md:mt-0">
                        <img src={diffImg} className="rounded-md w-full h-full object-cover" />
                    </motion.div>
                </div>
                <div className="flex p-5 mt-5 w-[95%] lg:w-[90%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {aboutCards.map((card) =>(
                        <motion.div {...cardscrollRight} className={`flex flex-col items-left p-5 ${card.card_bg} space-y-3 rounded-sm`}>
                            <card.icon className={`w-10 h-10 p-2.5 rounded-sm text-white ${card.icon_style}`} />
                            <h3 className="text-sm font-semibold">
                                {card.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-3">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full p-5 bg-white my-5 flex flex-col items-center overflow-hidden">
                <motion.h3 {...scrollLeft} className="text-2xl md:text-3xl font-bold mt-5">
                    By the Numbers
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-sm mt-2 text-center">
                    Our commitment to excellence is reflected in the scope and quality of care we provide to our community
                </motion.p> 
                <div className="w-[95%] lg:w-[90%] p-2 mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 p-5 overflow-hidden">
                    {number1.map((data)=>(
                        <motion.div {...scrollUp} className="flex flex-col items-center">
                            <h3 className="font-bold text-blue-600 text-lg">
                                {data.count}{data.value}
                            </h3>
                            <p className="text-xs text-gray-600">
                                {data.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="w-[95%] lg:w-[85%] p-5 grid sm:grid-cols-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {number2.map((data)=>(
                        <motion.div {...cardscrollRight} className={`flex flex-col items-center p-5 ${data.card_bg} rounded-md space-y-2`}>
                            <data.icon className={`w-11 h-11 p-3 border-1 rounded-full text-white ${data.icon_style}`}/>
                            <p className="text-sm font-semibold">
                                {data.counts}{data.value}
                            </p>
                            <p className="text-[12px]">
                                {data.title}
                            </p>
                            <p className="text-[10px] text-gray-60 mb-3">
                                {data.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer_Cta 
            title = 'Join our Mission of Healing'
            text = 'Whether you are seeking exceptional healthcare, looking to join our team, or want to support our community programs, we invite you to be part of our healing mission'
            btn_text_1 = 'Explore-Careers'
            btn_text_2 = 'Contact Us'/>
            <Subscribe />
            <Footer />
        </>
    )
}