import { motion } from "framer-motion"
import { buttonEffects } from "../animations/effects"
import { useState } from "react";
export default function Footer_Cta(){
    return(
        <>
            <div className="w-full h-70 bg-blue-600 flex flex-col items-center justify-center overflow-hidden">
                <h2 className="text-xl text-center md:text-3xl font-bold text-white">
                    Ready to Experience Exceptional Healthcare?
                </h2>
                <p className="w-90 md:w-150 text-xs md:text-sm mt-4 text-center text-gray-200">
                    Take the first step towards your health. Book an appointment with our specialists or explore
                    our comprehensive medical services
                </p>
                <div className="flex mt-5 space-x-4">
                    <motion.button {...buttonEffects}  className="border-1 px-7 md:px-9 py-3 text-xs md:text-sm bg-white rounded-sm font-semibold text-blue-600 cursor-pointer">
                        Book Appointment
                    </motion.button>
                    <motion.button {...buttonEffects} className="border-1 border-white px-7 md:px-9 py-3 text-xs md:text-sm rounded-sm font-semibold text-white cursor-pointer">
                        Explore Services
                    </motion.button>
                </div>
            </div>
        </>
    )
}