import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import { edgeCards, edges, packages, services } from "../data/data";
import serviceImg from '../images/slider/slides5.webp'
import { FaCheck } from "react-icons/fa";
import edgeImg from '../images/edge.webp'
import { motion } from "framer-motion";
import { buttonEffects, CardscrollLeft, cardscrollRight, scrollLeft, scrollRight, scrollUp } from "../animations/effects";
import { useEffect } from "react";

export default function Services(){
    useEffect(() =>{
        document.title = 'LifeCare | Services'
    })
    const buttonServices = ['All Services', 'Emergency Care', 'Surgery', 'Cardiology', 'Pediatrics', 'Medical Imaging', 'Sepciality Care']
    return(
        <>
            <NavBar />
            <PageHeads 
            image = {serviceImg}
            title = 'Medical Services & Departments'
            text = 'Comprehensive healthcare services delivered by expert medical professionals using advanced technology and compassionate care.'
            />
            <div className="bg-[#F9FAFB] w-full flex flex-col p-5 mt-5 items-center overflow-hidden">
                <motion.div {...scrollRight} className="hidden lg:flex items-center space-x-5">
                    {buttonServices.map((buts) => (
                        <button className="border-1 border-gray-200 text-gray-600 px-4.5 py-2 text-[10px] font-semibold rounded-md cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300">{buts}</button>
                    ))}
                </motion.div>
                <div className="w-full mt-5 lg:px-10 py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {services.map((service)=>(
                        <motion.div {...cardscrollRight} className="rounded-md bg-white mb-3">
                            <img src={service.image} className="w-full h-55 object-cover rounded-t-md overflow-hidden"/>
                            <div className="flex flex-col p-4 rounded-b-md bg-white shadow-xs">
                                <h3 className="text-sm font-semibold">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 text-[12px] my-2">
                                    {service.text}
                                </p>
                                {service.values.map((value) =>(
                                    <p className="text-[11px] mb-2 flex items-center text-gray-600"><FaCheck className="w-2 h-2 mt-1 mr-1 text-[#22C55E]" />{value}</p>
                                ))}
                                <div className="flex space-x-4 my-3">
                                    <motion.button {...buttonEffects} className="px-7 rounded-sm cursor-pointer bg-blue-600 text-white py-2 text-xs font-semibold">Learn More</motion.button>
                                    <motion.button {...buttonEffects} className="border-1 border-blue-600 px-7 rounded-sm cursor-pointer text-blue-600 py-2 text-xs font-semibold">Book Appointment</motion.button>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center space-y-3 bg-red-500 py-12 overflow-hidden">
                <h3 className="text-2xl font-bold text-white">
                    Medical Emergency
                </h3>
                <p className="text-sm text-gray-200 w-90 md:w-150 text-center">
                    Our emergency department is open 24/7 with expertmedical staff ready to help.
                </p>
                <div className="flex space-x-4">
                    <motion.button {...buttonEffects} className="px-8 py-2.5 bg-white text-xs font-semibold rounded-sm text-red-500 cursor-pointer">
                        Emergency Services
                    </motion.button>
                    <motion.button {...buttonEffects} className="px-8 py-2.5 border-1 border-white text-xs font-semibold rounded-sm text-white cursor-pointer">
                        Call 911
                    </motion.button>
                </div>
            </div>
            <div className="w-full flex flex-col items-center p-5 mt-5 overflow-hidden">
                <motion.h3 {...scrollRight} className="text-2xl font-bold mt-5">
                    Comprehensive Care Packages
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-[14px] mt-2 text-center">
                    Specially designedcare packages that combine multiple services for comprehensive treatment and better outcomes.
                </motion.p>
                <div className="flex w-full mt-5 lg:px-10 py-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {packages.map((data) => (
                        <motion.div {...cardscrollRight} key={data.id} className={`flex flex-col items-left space-y-3 p-4 rounded-sm ${data.card_bg}`}>
                            <data.icon  className={`w-10 h-10 border-1 p-2.5 rounded-full text-white ${data.icon_style}`}/>
                            <h3 className="text-sm font-semibold">
                                {data.title}
                            </h3>
                            <p className="text-[13px]">
                                {data.text}
                            </p>
                            {data.activities.map((data)=>(
                                <p className="text-xs flex items-center"><FaCheck  className="w-2 h-2 mt-1 mr-1 text-[#22C55E]"/>{data}</p>
                            ))}
                            <h3 className={`font-bold ${data.price_style} mt-2`}>
                                ${data.price}
                            </h3>
                            <motion.button {...buttonEffects} className={`text-sm font-semibold h-10 rounded-sm cursor-pointer ${data.icon_style} text-white`}>
                                Learn More
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full p-5 lg:flex lg:flex-row lg:justify-center lg:items-center mt-5 oveflow-hidden">
                    <div className="w-full lg:flex lg:flex-row lg:justify-around flex flex-col h-auto lg:h-120">
                        <motion.div {...scrollLeft} className="w-full lg:w-[45%] flex flex-col items-left lg:p-5">
                            <h2 className="text-xl font-bold">
                                Cutting Edge Equipments
                            </h2>
                            <p className="mt-3 text-[13px] text-gray-600">
                                Our investment in the latest medical technology ensures that our patients
                                recieve the most accurate diagnoses and effective treatments available. From robotic surgery to advanced imaging, we bring tomorrow's medicine to todays's patient
                            </p>
                            <div className="flex flex-col space-y-3  mt-2">
                                {edges.map((edge) =>(
                                    <div className="flex items-center p-1">
                                        <edge.icon  className={`w-10 h-10 p-3 rounded-sm ${edge.icon_style}`}/>
                                        <div className="flex flex-col ml-3">
                                            <h3 className="text-sm font-semibold mt-1">
                                                {edge.title}
                                            </h3>
                                            <p className="text-[11px] mt-1">
                                                {edge.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div {...scrollRight} className="lg:w-[45%] w-full md:h-100 h-70 lg:h-full p-1 lg:p-5 mt-5 lg:mt-0 overflow-hidden">
                            <img src={edgeImg} className="w-full h-full rounded-sm object-cover"/>
                        </motion.div>
                    </div>
                
            </div>
            <div className="px-5 md:px-10 py-5 mt-5 bg-[#F9FAFB] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-hidden">
                {edgeCards.map((card) =>(
                    <motion.div {...CardscrollLeft} key={card.id} className="flex flex-col items-center p-5 bg-white shadow-sm space-y-2.5 rounded-sm hover:shadow-md">
                        <card.icon  className={`w-10 h-10 p-2.5 rounded-full ${card.icon_style}`}/>
                        <h3 className="text-sm font-semibold">
                            {card.title}
                        </h3>
                        <p className="text-xs text-center mb-5 md:mb-3">
                            {card.text}
                        </p>
                    </motion.div>
                ))}
            </div>
            <Subscribe />
            <Footer />
        </>
    );
}