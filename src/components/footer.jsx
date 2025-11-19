import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock} from "react-icons/fa";
import { Link } from "react-router-dom";
import {SiX} from "react-icons/si"
export default function Footer(){
    const dates = new Date().getFullYear();
    const social_links = [
        {
            id : 1, 
            icons : <FaFacebook className="w-8 h-8 p-2 rounded-md hover:text-gray-400 bg-[#0D3B66] hover:bg-[#1E293B] cursor-pointer text-white transition-all duration-300"/>,
        },
        {
            id : 2, 
            icons : <SiX  className="w-8 h-8 p-2 rounded-md hover:text-gray-400 bg-[#0D3B66] hover:bg-[#1E293B] cursor-pointer text-white transition-all duration-300"/>,
        },
        {
            id : 3, 
            icons : <FaInstagram className="w-8 h-8 p-2 rounded-md hover:text-gray-400 bg-[#0D3B66] hover:bg-[#1E293B] cursor-pointer text-white transition-all duration-300"/>,
        },
        {
            id : 4, 
            icons : <FaLinkedin className="w-8 h-8 p-2 rounded-md hover:text-gray-400 bg-[#0D3B66] hover:bg-[#1E293B] cursor-pointer text-white transition-all duration-300"/>,
        }
    ]
    return(
        <>
            <footer className="flex flex-col px-5 md:px-10 py-10 bg-[#0F172A] overflow-hidden">
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="w-full">
                        <h3 className="font-bold text-xl text-white">
                            LIFECARE
                        </h3>
                        <p className="mt-2 text-gray-200 text-[13px]">
                            Providing exceptional healthcare services with compassion and  excellence for over 50 years.
                        </p>
                        <div className="flex space-x-3 mt-3">
                            {social_links.map((icon) =>(
                                <div key={icon.id}>
                                    {icon.icons}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:ml-20">
                        <h3 className="font-semibold text-white mb-2">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col space-y-3.5">
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/services">
                                    Services
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/doctors">
                                    Find a Doctor
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/emergency">
                                    Emergency
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/contacts">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:ml-10">
                        <h3 className="font-semibold text-white mb-2">
                            Patient Resources
                        </h3>
                        <ul className="flex flex-col space-y-3.5">
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link to="/patient-portal">
                                    Patient Information
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link>
                                    Insurance & Billing
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link>
                                    Medical Records
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link>
                                    Visiting Hours
                                </Link>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-blue-400 hover:font-semibold">
                                <Link>
                                    Support Groups
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:ml-5">
                        <h3 className="font-semibold text-white mb-2">
                            Contact Information
                        </h3>
                        <ul className="flex flex-col space-y-3.5">
                            <li className="text-gray-200 text-[13px] hover:text-white hover:font-semibold">
                                <a href="https://www.gogglemaps.com" className="flex items-center">
                                    <FaMapMarkerAlt  className="text-blue-400 mr-1.5"/>17 life clinic street Lagos. Nigeria
                                </a>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-white hover:font-semibold">
                                <a href="tel://+2349131580378" className="flex items-center">
                                    <FaPhoneAlt className="text-blue-400 mr-1.5" /> (234) 913 1580 378
                                </a>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-white hover:font-semibold">
                                <a href="mailto:// lifecaremed@gmail.com" className="flex items-center">
                                    <FaEnvelope className="text-blue-400 mr-1.5" /> lifecaremed@gmail.com
                                </a>
                            </li>
                            <li className="text-gray-200 text-[13px] hover:text-white hover:font-semibold flex items-center">
                                    <FaClock className="text-blue-400 mr-1.5" />Emergency 24/7
                            </li>
                        </ul>
                    </div>
                </div>
                <hr  className="mt-5 text-[#0D3B66] opacity-30"/>
                <div className="w-full p-2 mt-5 flex justify-between items-center">
                    <p className="text-[9px] md:text-[12px] text-gray-300">
                        &copy; {dates} <span className="hover:text-blue-400 cursor-pointer transition-all duration-300 hover:font-semibold">LifeCare Hospital</span>. All right reserved
                    </p>
                    <div className="flex space-x-4">
                        <a href="" className="text-[9px] md:text-xs hover:font-semibold text-gray-300">
                            Privacy Policy
                        </a>
                        <a href="" className="text-[9px] md:text-xs hover:font-semibold text-gray-300">
                            Terms of Service
                        </a>
                        <a href="" className="hidden md:flex text-[9px] md:text-xs hover:font-semibold text-gray-300">
                            webfyre@gmail.com
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}