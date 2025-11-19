import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { FaGripLines, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { scrolldown } from "../animations/effects";
import logo from '../images/logo.png'

export default function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    return(

        <>
            <nav className="w-full h-auto flex items-center justify-between px-10 py-3 relative">
                <div className="flex items-center cursor-pointer">
                    <img src={logo} className="h-8 w-8 mt-1"/>
                    <h3 className="font-bold text-blue-500 ml-[-4px]">
                        <Link to="/">
                            LIFECARE
                        </Link>
                    </h3>
                </div>
                <ul className="hidden lg:flex items-center space-x-2 text-gray-600">
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/" end className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Home
                        </NavLink>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/about" className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            About Us
                        </NavLink>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/services" className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Services
                        </NavLink>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/doctors" className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Find a Doctor
                        </NavLink>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/emergency" className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Emergency
                        </NavLink>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <NavLink to="/contacts" className={({isActive}) => `${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Contact
                        </NavLink>
                    </li>
                    <div className="flex space-x-3 h-full">
                        <button className="border-1 text-xs px-4 py-2 h-full rounded-sm cursor-pointer border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                            <Link to="/patient-portal">
                                Patient Portal
                            </Link>
                        </button>
                        <button className="border-1 text-xs px-4 py-2 h-full rounded-sm cursor-pointer bg-blue-600 text-white font-semibold hover:bg-transparent hover:border-1 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                            <Link to="/appointments">
                                Book Appointment
                            </Link>
                        </button>
                    </div>
                </ul>
                <button className="lg:hidden flex text-blue-600 cursor-pointer hover:text-blue-400 transition-all duration-200" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ?  <FaXmark size={20}/> : <FaGripLines size={20}/>}
                </button>
                {isOpen && (
                    <motion.div {...scrolldown} className="lg:hidden flex p-5 absolute w-full bg-[#E8F1FF] border-red-200 z-50 top-12 left-0">
                        <ul className="w-full flex flex-col space-y-1.5">
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/about">
                                    About Us
                                </Link>
                            </li>
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/services">
                                    Services
                                </Link>
                            </li>
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/doctors">
                                    Find a Doctor
                                </Link>
                            </li>
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/emergency">
                                    Emergency
                                </Link>
                            </li>
                            <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center rounded-sm hover:font-semibold border-1 border-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-300">
                                <Link to="/contacts">
                                    Contact
                                </Link>
                            </li>
                            <div className="flex flex-col space-y-3 mt-2">
                                <button className="border-1 text-xs px-4 py-3 h-full rounded-sm cursor-pointer border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Link to="/patient-portal">
                                        Patient Portal
                                    </Link>
                                </button>
                                <button className="border-1 text-xs px-4 py-3 h-full rounded-sm cursor-pointer bg-blue-600 text-white font-semibold hover:bg-transparent hover:border-1 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                                    <Link to="/appointments">
                                        Book Appointment
                                    </Link>
                                </button>
                            </div>
                        </ul>
                    </motion.div>
                )}

            </nav>
        </>
    )
}