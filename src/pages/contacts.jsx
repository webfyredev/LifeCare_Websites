import { useEffect } from "react";
import { cardscrollRight } from "../animations/effects";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import { contactNumbers } from "../data/data";
import contactImg from '../images/contacts.webp'
import { motion } from "framer-motion";
export default function Contacts(){
    useEffect(() =>{
        document.title = 'LifeCare | Contacts'
    })
    return(
        <>
            <NavBar />
            <PageHeads 
            image = {contactImg}
            title = 'Contact Us'
            text = 'We are here to help with all your healthcare needs. Reach out to us anytime'/>
            <div className="w-full flex flex-col items-center p-5 bg-[#F9FAFB]">
                <h3 className="text-2xl font-bold">
                    Quick Contact Numbers
                </h3>
                <div className="w-[85%] mt-5 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {contactNumbers.map((num) =>(
                        <motion.div {...cardscrollRight} className="p-5 flex flex-col items-center shadow-sm bg-white rounded-md">
                            <h3 className="text-sm font-semibold">
                                {num.title}
                            </h3>
                            <h2 className="mt-1.5 text-blue-600 font-bold cursor-pointer">
                                <a href={`tel:/ ${num.number}`}>{num.number}</a>
                            </h2>
                            <p className="text-[11px] mt-1.5 text-gray-500">
                                {num.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full border-1 p-5 mt-5">

            </div>
            <Footer />
        </>
    );
}