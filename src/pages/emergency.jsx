import { FaArrowRight, FaCheck, FaClock, FaApple, FaGooglePlay } from "react-icons/fa";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import emergImg from '../images/emerg.webp'
import { emergency911, emergencycontacts, emergencyData, emergencyDocs, emergencynotes, emergencysteps, medicalaid } from "../data/data";
import { buttonEffects, CardscrollLeft, cardscrollRight, scrollLeft, scrollRight, scrollUp } from "../animations/effects";
import { useLocation } from "react-router-dom";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}
export default function Emergency(){
    const {hash} = useLocation();
    useEffect(() =>{
        if(hash){
            const element = document.querySelector(hash)
            if(element){
                element.scrollIntoView({behavior : "smooth"})
            }
        }
    })
    useEffect(() =>{
        document.title = 'LifeCare | Emergency'
    })
    
    return(
        <>
            <NavBar />
            <PageHeads 
            image = {emergImg}
            title = 'Emergency Services'
            text = '24/7 emergency medical care with expert staff and advanced lif support capabilities.'/>
            <div className="w-full p-5 flex items-center justify-center bg-[#FEECE9]" id="emergencies">
                <motion.div {...scrollLeft} className="md:w-[85%] lg:w-[65%] p-5 rounded-md bg-white flex flex-col items-center">
                    <h3 className="text-sm font-semibold">
                        Current Emergency Department Wait Time
                    </h3>
                    <p className="text-red-500 font-bold text-lg mt-3">
                        15-20 minutes
                    </p>
                    <p className="text-[10px] lg:text-[12px]  w-90 md:w-100 lg:w-150 text-center mt-2">
                        Wait times are estimates and may very based on the severity of your condition. Life-threatening emergencies
                        are seen immediately.
                    </p>
                    <p className="flex mt-3 text-xs px-4 py-1.5 items-center space-x-2 bg-[#E9F8F1] text-[#22C55E] rounded-md font-semibold">
                        <FaClock /> <span>Last updated:</span> <LiveClock />
                    </p>
                </motion.div>
            </div>
            <div className="mt-5 p-5 w-full flex flex-col items-center">
                <motion.h3 {...scrollRight} className="font-bold text-xl md:text-2xl">
                    When to Seek Emergency Care
                </motion.h3>
                <div className="w-full lg:w-[85%] mt-5 py-5 lg:px-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
                    {emergencyData.map((data) =>(
                        <motion.div {...cardscrollRight} className={`p-5 flex flex-col ${data.card_bg} rounded-sm`}>
                            <div className="flex space-x-4 items-center">
                                <data.icon  className={`w-10 h-10 p-3 rounded-sm ${data.btn_bg} text-white`}/>
                                <p className={`text-md font-bold ${data.text_style}`}>
                                    {data.title}
                                </p>
                            </div>
                            <p className="text-xs text-gray-500 my-3">
                                {data.text}
                            </p>
                            <ul className="flex flex-col space-y-3">
                                {data.values.map((value) => (
                                    <li className="text-xs flex items-center">
                                        <FaArrowRight  className={`w-2 h-2 mr-1.5 ${data.text_style}`}/> {value}
                                    </li>
                                ))}
                            </ul>
                            <motion.button {...buttonEffects} className={`border-1 w-30 h-9 mt-5 rounded-md text-[11px] font-semibold ${data.btn_bg} text-white cursor-pointer`}>
                                {data.btn_text}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-5 p-5 flex items-center flex-col bg-[#F9FAFB]">
                <motion.h3 {...scrollRight} className="font-bold text-xl md:text-2xl text-center">
                    What to Bring to the Emergency Department
                </motion.h3>
                <motion.div {...scrollUp} className="w-full lg:w-[55%] p-5 mt-5 bg-white rounded-sm md:flex md:flex-row flex flex-col shadow-xs">
                    <div className="md:w-1/2 w-full py-3">
                        <h3 className="text-sm font-semibold">
                            Required Items:
                        </h3>
                        <ul className="flex flex-col space-y-2 mt-2">
                            {emergencyDocs.map((doc)=>(
                                 <li className="text-xs flex items-center"><FaCheck  className="w-2 h-2 mr-1 text-green-400 "/> {doc}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2 py-3">
                        <h3 className="text-sm font-semibold">
                            Important Notes
                        </h3>
                        <ul className="flex flex-col space-y-4 mt-2">
                            {emergencynotes.map((notes)=>(
                                <li className="text-xs flex flex-col"><span className="font-semibold">{notes.title}:</span> {notes.text}</li>
                            ))}
                        </ul>
                    </div>

                </motion.div>
            </div>
            <div className="w-full flex flex-col items-center lg:p-5 mt-5 bg-white" id="emergencyprep">
                <motion.h3 {...scrollRight} className="font-bold text-2xl">
                    Emergency Preparedness
                </motion.h3>
                <motion.p {...scrollUp} className="text-[10px] md:text-[13px] mt-2 w-90 md:w-150 text-gray-500 text-center">
                    Being prepared for emergencies can save lives. Learn how to recognize emergencies and what to do before help arrives.
                </motion.p>
                <div className="w-[90%] lg:p-5 lg:flex lg:flex-row flex flex-col space-x-10">
                    <div className="w-full lg:w-[45%] p-5 flex flex-col">
                            <h3 className="font-bold text-lg md:text-xl mb-3 lg:mb-0">
                                Recognizing a Medical Emergency
                            </h3>
                            <motion.div {...scrollUp} className="border-l-2 border-red-500 flex flex-col p-3 mt-2 bg-[#FEECE9]">
                                <p className="text-sm font-semibold text-red-600">
                                    Call 911 immediately if:
                                </p>
                                <ul className="flex flex-col space-y-2 mt-2">
                                    {emergency911.map((data)=>(
                                        <li className="text-xs text-red-600 flex items-center"><span className="mr-0.5 font-bold">-</span>{data}</li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div {...scrollUp} className="border-l-2 border-yellow-400 flex flex-col p-3 mt-5 bg-[#FFF7CC]">
                                <p className="text-sm font-semibold text-yellow-700">
                                    Call 911 immediately if:
                                </p>
                                <ul className="flex flex-col space-y-2 mt-2">
                                    {emergency911.map((data)=>(
                                        <li className="text-xs text-yellow-700 flex items-center"><span className="mr-0.5 font-bold">-</span>{data}</li>
                                    ))}
                                </ul>
                            </motion.div>
                    </div>
                    <div className="w-full lg:w-[45%] md:p-5">
                        <h3 className="font-bold text-xl ml-5 md:ml-0">
                            Emergency Action Steps
                        </h3>
                        <div className="flex flex-col space-y-2 mt-3">
                            {emergencysteps.map((steps) =>(
                                <motion.div {...scrollRight} className="flex p-2 space-x-2">
                                    <div className="w-6 h-6 md:w-8 md:h-8 text-[11px] mt-1 md:mt-0 md:text-xs flex items-center justify-center rounded-full bg-red-500 font-semibold text-white">
                                        {steps.id}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-sm font-semibold">
                                            {steps.title}
                                        </h3>
                                        <p className="text-[11px] mt-1">
                                            {steps.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div {...scrollRight} className="w-full mt-4 md:h-35 lg:h-30 h-auto rounded-sm bg-[#E8F1FF] p-5 flex flex-col">
                            <h3 className="text-sm font-semibold text-blue-800">
                                Emergency Kit Essentials
                            </h3>
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 mt-1 ml-3">
                                {medicalaid.map((aid) =>(
                                    <li className="text-[10px] text-blue-700">{aid}</li>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-5 p-5 bg-red-600 flex flex-col items-center">
                <h3 className="text-xl md:text-2xl font-bold text-white text-center">
                    Emergency Contacts Information
                </h3>
                <div className="mt-5 w-[95%] lg:w-[85%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {emergencycontacts.map((data)=>(
                        <motion.div {...CardscrollLeft} className="flex flex-col items-center p-5 bg-red-700 rounded-sm space-y-2">
                            <data.icon  className="w-10 h-10 p-2.5 text-white"/>
                            <h3 className="text-sm fontsemibold text-white">
                                {data.title}
                            </h3>
                            <a href={`tel:${data.phone}`} className="text-white font-bold cursor-pointer mb-3">
                                {data.phone}
                            </a>
                        </motion.div>
                    ))}
                    
                </div>
                <motion.div {...scrollUp} className="w-[95%] lg:w-[85%] mt-7 p-5 flex flex-col items-center bg-red-700 rounded-sm">
                    <h3 className="md:text-2xl font-bold text-white">
                        Download Our Emergency App
                    </h3>
                    <p className="hidden md:flex text-[11px] mt-2 w-150 text-center text-gray-100">
                        Get instant access to emergency information, hospital directions, and direct contacts wth our emergency departments.
                    </p>
                    <div className="md:flex md:flex-row flex flex-col items-center md:my-5 my-3 w-full md:w-110 md:space-x-5 space-y-3 md:space-y-0 overflow-hidden">
                        <motion.button {...buttonEffects} className="flex items-center justify-center w-[85%] md:w-auto md:px-9 py-2.5 text-[12px] cursor-pointer font-semibold bg-white text-red-700 rounded-sm">
                            <FaApple className="w-4 h-4 mr-0.5 mt-[-3px]" /> Download for iOS
                        </motion.button>
                        <motion.button {...buttonEffects} className="flex items-center justify-center w-[85%] md:w-auto md:px-9 py-2.5 text-[12px] cursor-pointer font-semibold bg-white text-red-700 rounded-sm">
                            <FaGooglePlay className="w-4 h-4 mr-0.5" /> Download for Android
                        </motion.button>
                    </div>
                </motion.div>
            </div>
            <Subscribe />
            <Footer />  
        </>
    );
}