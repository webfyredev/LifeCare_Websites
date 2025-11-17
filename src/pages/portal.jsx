import { useEffect } from "react";
import { buttonEffects, scrollRight } from "../animations/effects";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import Subscribe from "../components/subscribe";
import { portalinfo } from "../data/data";
import portalImg from '../images/portal.webp'
import { motion } from "framer-motion";

export default function Patient_Portal(){
    useEffect(() =>{
        document.title = 'LifeCare | Patient-Portal'
    })
    return(
        <>
            <NavBar />
            <PageHeads 

            image = {portalImg}
            title = 'Patient Portal'
            text = 'Access your patient information, communicate with your care team, and manage your healthcare online.'/>
            <div className="lg:flex lg:flex-row flex flex-col md:px-5 lg:px-10 py-10 bg-[#F9FAFB] mt-10 space-x-10 overflow-hidden">
                <div className="w-full lg:w-[45%] h-auto lg:h-120 shadow-xs p-5 bg-white rounded-md overflow-hidden">
                    <form action="" className="w-full h-full flex flex-col space-y-2">
                        <h3 className="font-semibold text-xl mb-5">
                            Patient Portal login
                        </h3>
                        <div className="flex flex-col w-full h-auto mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1.5">Email *</label>
                            <input type="email" className="w-full h-10 text-[11px] px-3 outline-blue-200 rounded-sm bg-gray-50 border-1 border-gray-200" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col w-full h-auto mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1.5">Password *</label>
                            <input type="password" className="w-full h-10 text-[11px] px-3 outline-blue-200 rounded-sm bg-gray-50 border-1 border-gray-200" placeholder="Enter your password" />
                        </div>
                        <div className="flex flex-row justify-between w-full h-auto mb-3">
                            <p className="flex items-center text-xs"><input type="checkbox"  className="mr-1 mt-0.5"/> Remember me</p>
                            <a href="" className="text-xs font-semibold text-blue-600">Forgot Password?</a>
                        </div>
                        <motion.button {...buttonEffects} className="mt-3 h-11 text-xs font-semibold bg-blue-600 text-white rounded-sm cursor-pointer">
                            Sign In
                        </motion.button>
                        <hr  className="border-1 my-3 text-gray-100"/>
                        <p className="font-semibold text-sm">
                            New to the Patient Portal?
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-500">
                            If you're a new patient or haven't registered for the portal yet, you can create an account
                        </p>
                        <motion.button {...buttonEffects} className="my-3 h-11 text-xs font-semibold border-1 border-blue-600 text-blue-600 rounded-sm cursor-pointer">
                            Create New Account
                        </motion.button>
                    </form>
                </div>
                <div className="rounded-md w-full lg:w-[45%] p-5 flex flex-col bg-white shadow-xs mt-5 lg:mt-0 overflow-hidden">
                    <h3 className="text-xl font-semibold">
                        What You Can Do
                    </h3>
                    <ul className="flex flex-col space-y-5 mt-5">
                        {portalinfo.map((info) =>(
                            <motion.div {...scrollRight} className="flex items-center p-5 bg-[#F9FAFB] rounded-sm space-x-3">
                                <info.icon  className="w-9 h-9 p-2.5 border-1 bg-blue-600 text-white rounded-sm"/>
                                <div className="flex flex-col space-y-1">
                                    <h3 className="font-semibold text-sm mt-2">
                                        {info.title}
                                    </h3>
                                    <p className="text-[10px] md:text-xs mb-3">
                                        {info.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </ul>
                </div>
            </div>
            <Subscribe />
            <Footer />
        </>
    );
}