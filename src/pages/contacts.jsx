import { useEffect, useState } from "react";
import { buttonEffects, cardscrollRight, scrollRight } from "../animations/effects";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import { contactNumbers, contactslocation } from "../data/data";
import contactImg from '../images/contacts.webp'
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
export default function Contacts(){
    const [contactsData, setContactsData] = useState({
        full_name : "", email : "", phone_number : "", departments : "",
        subject : "", message : ""
    });
    const [status, setStatus] = useState({message : "", type : ""})
    const handleContactsChange = (e) => {
        setContactsData({...contactsData, [e.target.name] : e.target.value})
    };
    const contactsSubmission = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/contacts/", contactsData)
            setStatus({message : "Contacts message submitted successfully", type : "success"});
            setContactsData({
                full_name : "", email : "", phone_number : "", departments : "",
                subject : "", message : ""
            });
            setTimeout(() => setStatus(""), 7000);
        } catch(error){
                setStatus({message : "Failed to submit contacts message. Try again later", type : "error"})
                setTimeout(() => setStatus(""), 7000);
        }
    }
    useEffect(() =>{
        document.title = 'LifeCare | Contacts'
    })
    return(
        <>
            {status.message && (
                <motion.div 
                initial = {{opacity : 0, y : -40}}
                animate = {{opacity : 1, y : 0}}
                transition={{duration:1}}
                exit={{opacity : 0, y : -40}}
                className={`fixed top-5 transform -translate-x-1/2 left-1/2 z-50 px-3 py-4 md:py-3.5 rounded-md shadow-sm text-white text-xs md:text-sm text-center w-[95%] h-12 font-semibold ${status.type === "success" ? 'bg-green-500' : 'bg-red-500'}`}>
                    {status.message}
                </motion.div>
            )}
            <NavBar />
            <PageHeads 
            image = {contactImg}
            title = 'Contact Us'
            text = 'We are here to help with all your healthcare needs. Reach out to us anytime'/>
            <div className="w-full flex flex-col items-center p-5 bg-[#F9FAFB] overflow-hidden">
                <h3 className="text-2xl font-bold">
                    Quick Contact Numbers
                </h3>
                <div className="w-full lg:w-[85%] mt-5 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <div className="w-full p-5 lg:p-10 mt-5 lg:flex lg:flex-row flex flex-col overflow-hidden">
                <div className="flex flex-col w-full lg:w-[50%] shadow-xs rounded-sm md:p-5">
                    <h3 className="text-2xl font-bold">
                        Contact Our Team
                    </h3>
                    <form onSubmit={contactsSubmission} className="flex flex-col space-y-2 mt-3">
                        <div className="w-full md:flex md:flex-row flex flex-col space-x-4 mb-3 space-y-3 md:space-y-0">
                            <div className="flex flex-col md:w-1/2 w-full">
                                <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Full Name *</label>
                                <input type="text" name="full_name" value={contactsData.full_name} required onChange={handleContactsChange}  placeholder="Enter your full name" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200" />
                            </div>
                            <div className="flex flex-col md:w-1/2 w-full">
                                <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Email Address *</label>
                                <input type="email" name="email" value={contactsData.email} required onChange={handleContactsChange} placeholder="Enter your email" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200" />
                            </div>
                        </div>
                        <div className="w-full md:flex md:flex-row flex flex-col space-x-4 mb-3">
                            <div className="flex flex-col md:w-1/2 w-full">
                                <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Phone Number </label>
                                <input type="text" name="phone_number" value={contactsData.phone_number} required onChange={handleContactsChange} placeholder="Enter your phone number" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200" />
                            </div>
                            <div className="flex flex-col md:w-1/2 w-full">
                                <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Department *</label>
                                <select name="departments" value={contactsData.departments} required onChange={handleContactsChange} id="" placeholder="Select Department" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200">
                                    <option value="" disabled>Select Department</option>
                                    <option value="24/7 Emergency Department">24/7 Emergency Department</option>
                                    <option value="Advanced Surgical Services">Advanced Surgical Services</option>
                                    <option value="Cardiovascular Care">Cardiovascular Care</option>
                                    <option value="Pediatric Services">Pediatric Services</option>
                                    <option value="Medical Imaging & Radiology">Medical Imaging & Radiology</option>
                                    <option value="Oncology Services">Oncology Services</option>
                                    <option value="Orthopedic Services">Orthopedic Services</option>
                                    <option value="Women Health">Women Health</option>



                                </select>
                                {/* <input type="email" placeholder="Enter your email" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[13px] px-3 border-gray-200 outline-blue-200" /> */}
                            </div>
                        </div>
                        <div className="flex flex-col w-full mb-3">
                            <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Subject *</label>
                            <input type="text" name="subject" value={contactsData.subject} required onChange={handleContactsChange} placeholder="Enter message subjects" className="border-1 h-10 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200" />
                        </div>
                        <div className="flex flex-col w-full mb-3">
                            <label htmlFor="" className="text-[10px] font-semibold text-gray-600 my-2">Message *</label>
                            <textarea name="message" value={contactsData.message} required onChange={handleContactsChange} id="" placeholder="Enter your message (max 500 characters)" className="p-2 border-1 h-25 rounded-sm bg-[#F9FAFB] text-[12px] px-3 border-gray-200 outline-blue-200"></textarea>
                            {/* <input type="text" placeholder="" className="" /> */}
                        </div>
                        <motion.button {...buttonEffects} className="border-1 my-3 h-11 text-sm font-semibold rounded-sm bg-blue-600 text-white cursor-pointer">
                            Contact Us
                        </motion.button>
                    </form>
                </div>
                <div className="w-full lg:w-[50%] flex flex-col md:p-5 mt-5 md:mt-0">
                    <h3 className="text-2xl font-bold">
                        Our Location
                    </h3>
                    <div className="flex flex-col mt-5 space-y-5">
                    {contactslocation.map((contacts) =>(
                        <motion.div {...scrollRight} key={contacts.id} className="p-5 space-y-2 rounded-md bg-[#F9FAFB]">
                            <h3 className="text-sm font-semibold">
                                {contacts.title}
                            </h3>
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="w-2.5 h-2.5 text-blue-600 mr-1" />
                                <p className="text-xs text-gray-500">
                                    {contacts.address}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt className="w-2.5 h-2.5 text-blue-600 mr-1" />
                                <a href={`tel:/ ${contacts.phone_1}`} className="text-xs text-blue-600 font-semibold">
                                    {contacts.phone_1}
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaPhoneAlt className="w-2.5 h-2.5 text-blue-600 mr-1" />
                                <a href={`tel:/ ${contacts.phone_1}`} className="text-xs text-blue-600 font-semibold">
                                    {contacts.phone_2}
                                </a>
                            </div>
                            <div className="flex items-center">
                                <FaClock className="w-2.5 h-2.5 text-blue-600 mr-1 mt-[-2%]" />
                                <div className="flex flex-col">
                                    {contacts.visitingHours.map((hour) =>(
                                    <p className="text-[10px]">{hour}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}