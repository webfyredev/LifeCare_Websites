import  logoImg  from '../../../images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuCalendarClock, LuFileHeart, LuPill, LuMessageSquare, LuUserCog, LuHeadphones, LuPhone, LuBell, LuChevronDown, LuChevronUp, LuUser, LuLogOut } from 'react-icons/lu'
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import { motion } from 'framer-motion'
import { scrolldown, scrollRight } from '../../../animations/effects';
export default function Portal_sidebar(){
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const [dashboard, setDashboard] = useState(null)

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    useEffect(() => {
        api.get('/patients/dashboard/')
        .then((res) => setDashboard(res.data))
        .catch(console.error)
    }, [])
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <>
            <div className='w-full h-screen flex overflow-hidden'>
                <div className="w-[20%] h-screen bg-white border-r-1 border-slate-100 flex flex-col fixed left-0 top-0">
                    <div className="w-full h-15 border-b-1 border-slate-100 flex space-x-1 items-center px-2.5">
                        <img src={logoImg} alt="Logo_image" className='w-11 h-11'/>
                        <div className='w-auto flex flex-col space-y-0'>
                            <h3 className='font-bold text-blue-500 text-lg'>LifeCare</h3>
                            <p className='text-[11px] text-slate-400 font-semibold'>Patient Portal</p>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-between py-3 mt-2'>
                        <div className='w-full px-2.5 flex flex-col space-y-2.5'>
                            <NavLink to="/patient/dashboard" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuLayoutDashboard  className='mt-0.5'/>
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/patient/appointments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuCalendarClock  className='mt-0.5'/>
                                <span>Appointment</span>
                            </NavLink>
                            <NavLink to="/patient/records" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuFileHeart  className='mt-0.5'/>
                                <span>Medical Records</span>
                            </NavLink>
                            <NavLink to="/patient/prescriptions" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuPill  className='mt-0.5'/>
                                <span>Prescription</span>
                            </NavLink>
                            <NavLink to="/patient/messages" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuMessageSquare  className='mt-0.5'/>
                                <span>Messages</span>
                            </NavLink>
                            <NavLink to="/patient/settings" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuUserCog  className='mt-0.5'/>
                                <span>Profile Settings</span>
                            </NavLink>
                        </div>
                        <div className='w-[90%] p-3 flex flex-col bg-[#f8fafc] rounded-lg shadow-xs'>
                            <div className='flex space-x-1.5 items-center'>
                                <span className='w-8 h-8 bg-[#dbeafe] rounded-full flex items-center justify-center text-[#2563eb]'>
                                    <LuHeadphones />
                                </span>

                                <span className='text-[#334155] text-[12px] font-semibold'>Need Help?</span>
                            </div>
                            <p className='text-[11px] text-[#94a3b8] font-normal mt-2'>Contact our support team.</p>
                            <a href="tel:+23480040000" className='mt-2 flex items-center space-x-1.5 text-[12px] font-semibold text-[#2563eb] hover:text-[#1d4ed8]'><LuPhone  className='mr-1'/> + (234) 800-4000</a>
                        </div>
                    </div>
                </div>
                <div className='w-[80%] ml-[20%] flex flex-col h-screen'>
                    <div className='px-5 w-[80%] h-13 bg-white border-b-1 border-slate-100 flex justify-between items-center fixed top-0 right-0 w-[80%] z-10'>
                        <h3 className='font-semibold text-[13px] text-[#94a3b8]'>{currentDate}</h3>
                        <div className='w-auto flex items-center space-x-5 mr-5'>
                            <span className='w-8 h-8 rounded-lg hover:bg-[#f8fafc] cursor-pointer flex items-center justify-center relative'>
                                <LuBell  className='text-[#475569]'/>
                                <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full'></span>
                            </span>
                            {/* <button className="lg:hidden flex text-blue-600 cursor-pointer hover:text-blue-400 transition-all duration-200" onClick={() => setIsOpen(!isOpen)}>
                                {isOpen ?  <FaXmark size={20}/> : <FaGripLines size={20}/>}
                            </button> */}
                            <div onClick={() => setIsOpen(!isOpen)} className='flex space-x-3 px-4 py-1 rounded-lg items-center hover:bg-[#f8fafc] cursor-pointer'>
                                <img src="" className='w-7 h-7 rounded-full border' alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-[14px] font-semibold text-[#1e293b]'>{user?.first_name} {user?.last_name}</span>
                                    <span className='text-[10px] text-[#94a3b8] font-normal'>
                                         {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                                    </span>
                                </div>
                                {isOpen ? <LuChevronUp  className='w-4 h-4 text-[#94a3b8]'/> : <LuChevronDown  className='w-4 h-4 text-[#94a3b8]'/>}
                                {/* <LuChevronDown  className='w-4 h-4 text-[#94a3b8]'/> */}
                            </div>
                            

                        </div>
                        {isOpen && (
                            <motion.div 
                                {...scrollRight}
                                className='w-[19%] border-1 border-[#f1f5f9] rounded-lg shadow-xs absolute top-12 right-12 bg-white px-3 py-2 flex flex-col'>
                                <h3 className='text-[13px] font-medium text-[#1e293b]'>
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <a href={`mailto:${user?.email}`} className='text-[11px] text-[#94a3b8] hover:text-[#1e293b] font-normal transition-all duration-300'>
                                    {user?.email}
                                </a>
                                <span className='w-full mt-2 border-1 border-[#94a3b8]/5'></span>
                                <Link to="/patient/settings" className="w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex items-center space-x-3 text-[#475569] hover:bg-[#f8fafc]">
                                    <LuUser  className='mt-0.5'/>
                                    <span>My Profile</span>
                                </Link>
                                <Link to="/patient/dashboard" className="w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex items-center space-x-3 text-[#475569] hover:bg-[#f8fafc]">
                                    <LuLayoutDashboard  className='mt-0.5'/>
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className="cursor-pointer w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex items-center space-x-3 text-[#ef4444] hover:bg-[#fef2f2]">
                                    <LuLogOut  className='mt-0.5'/>
                                    <span>Logout</span>
                                </button>
                            </motion.div>
                            )}
                    </div>
                    <div className="w-full p-5 mt-13 bg-[#f8fafc] overflow-y-auto flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
            
            
        </>
    )
}