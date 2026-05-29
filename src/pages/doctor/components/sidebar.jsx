import  logoImg  from '../../../images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard, LuCalendarClock, LuFileHeart, LuPill, LuMessageSquare, LuUserCog, LuHeadphones, LuPhone, LuBell, LuChevronDown, LuChevronUp, LuUser, LuLogOut, LuFlaskConical, LuMenu, LuX } from 'react-icons/lu'
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';
import api from '../../../api/axios';
import { motion } from 'framer-motion'
import { scrolldown, scrollLeft, scrollRight } from '../../../animations/effects';
import { FaGripLines } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
export default function Doctor_Portal_sidebar(){
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuth()
    const [dashboard, setDashboard] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [notifOpen, setNotifOpen] = useState(false)
    const notifRef = useRef(null)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const fetchNotifications = () => {
            api.get('/notifications/')
            .then((res) => {
                setNotifications(res.data.notifications)
                setUnreadCount(res.data.unread_count)
            })
            .catch(console.error)
        }
        fetchNotifications()
        const interval = setInterval(fetchNotifications, 30000)
        return () => clearInterval(interval)
    }, [])


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    
    }, [])

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    const handleMarkAllRead = async () => {
        await api.patch('/notifications/mark-all-read/')
        setNotifications(notifications.map(n => ({ ...n, is_read:true })))
        setUnreadCount(0)
    }

    const handleMarkOneRead = async (id) => {
        await api.patch(`/notifications/${id}/read/`)
        setNotifications(notifications.map(n => n.id === id ? { ...n, is_read:true} : n))
        setUnreadCount(prev => Math.max(0, prev -1 ))

    }

    const timeAgo = (dateStr) => {
        const diff = Math.floor((new Date() - new Date(dateStr)) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return `${Math.floor(diff / 86400)}d ago`
    }
    const notifIcon = (type) => {
        const icons = {
            appointment: {
                icon : LuCalendarClock,
                bg: 'bg-blue-100',
                color: 'text-blue-600'
            },
            message: {
                icon : LuMessageSquare,
                bg: 'bg-green-100',
                color: 'text-green-600'
            },
            prescription: {
                icon : LuPill,
                bg: 'bg-purple-100',
                color: 'text-purple-600'
            },
            lab_result: {
                icon : LuFlaskConical,
                bg: 'bg-orange-100',
                color: 'text-orange-600'
            },
            general: {
                icon : LuBell,
                bg: 'bg-gray-100',
                color: 'text-gray-600'
            },
        }
        const selected = icons[type] || icons.general
        const Icon = selected.icon
        return (
            <span className={`w-8 h-8 rounded-full flex items-center justify-center ${selected.bg}`}>
                <Icon className={`w-4 h-4 ${selected.color}`} />
            </span>
        )
    }

    const navigate = useNavigate();

    

    useEffect(() => {
        api.get('/doctor/dashboard/')
        .then((res) => setDashboard(res.data))
        .catch(console.error)
    }, [])
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <>
            <div className='w-full h-screen flex overflow-hidden'>
                <div className="w-[20%] h-screen bg-white border-r-1 border-slate-100 hidden lg:flex flex-col fixed left-0 top-0">
                    <div className="w-full h-15 border-b-1 border-slate-100 flex space-x-1 items-center px-2.5">
                        <img src={logoImg} alt="Logo_image" className='w-11 h-11'/>
                        <div className='w-auto flex flex-col space-y-0'>
                            <h3 className='font-bold text-blue-500 text-lg'>LifeCare</h3>
                            <p className='text-[11px] text-slate-400 font-semibold'>Doctor Portal</p>
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-between py-3 mt-2'>
                        <div className='w-full px-2.5 flex flex-col space-y-2.5'>
                            <NavLink to="/doctor/dashboard" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuLayoutDashboard  className='mt-0.5'/>
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/doctor/appointments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuCalendarClock  className='mt-0.5'/>
                                <span>Appointment</span>
                            </NavLink>
                            <NavLink to="/doctor/mypatients" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuFileHeart  className='mt-0.5'/>
                                <span>My Patients</span>
                            </NavLink>
                            <NavLink to="/doctor/prescriptions" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuPill  className='mt-0.5'/>
                                <span>Prescriptions</span>
                            </NavLink>
                            <NavLink to="/doctor/messages" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuMessageSquare  className='mt-0.5'/>
                                <span>Messages</span>
                            </NavLink>
                            <NavLink to="/doctor/notes" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuMessageSquare  className='mt-0.5'/>
                                <span>Medical Notes</span>
                            </NavLink>
                            <NavLink to="/doctor/profile" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
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
                {mobileMenuOpen && (
                    <div className='fixed inset-0 z-50 lg:hidden'>
                        <div onClick={() => setMobileMenuOpen(false)} className='absolute inset-0 bg-black/40'>
                            <motion.div 
                                {...scrollLeft}
                                className='absolute left-0 top-0 h-full w-[55%] max-w-xs bg-white flex flex-col shadow-sm'>
                                <div className='w-full h-15 border-b border-slate-100 flex items-center justify-between px-3'>
                                    <div className='flex items-center space-x-1'>
                                        <img src={logoImg} alt='Logo' className='w-10 h-10' />
                                        <div className='flex flex-col'>
                                            <h3 className='font-bold text-blue-500 text-lg'>LifeCare</h3>
                                            <p className='text-[11px] text-slate-400 font-semibold'>Docs Portal</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer'
                                    >
                                        <FaXmark className='w-6 h-6 text-slate-500 hover:text-blue-600 transition-all duration-300' />
                                    </button>
                                </div>
                                <div className='w-full h-full flex flex-col items-center justify-between py-3 mt-2'>
                                    <div className='w-full px-2.5 flex flex-col space-y-2.5'>
                                        <NavLink to="/doctor/dashboard" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuLayoutDashboard  className='mt-0.5'/>
                                            <span>Dashboard</span>
                                        </NavLink>
                                        <NavLink to="/doctor/appointments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuCalendarClock  className='mt-0.5'/>
                                            <span>Appointment</span>
                                        </NavLink>
                                        <NavLink to="/doctor/mypatients" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuCalendarClock  className='mt-0.5'/>
                                            <span>My Patients</span>
                                        </NavLink>
                                        <NavLink to="/doctor/prescriptions" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuPill  className='mt-0.5'/>
                                            <span>Prescription</span>
                                        </NavLink>
                                        <NavLink to="/doctor/messages" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuMessageSquare  className='mt-0.5'/>
                                            <span>Messages</span>
                                        </NavLink>
                                        <NavLink to="/doctor/notes" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuFileHeart  className='mt-0.5'/>
                                            <span>Medical Notes</span>
                                        </NavLink>
                                        
                                        
                                        <NavLink to="/doctor/profile" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-[#64748b] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
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
                                
                            </motion.div>
                        </div>
                    </div>
                )}
                <div className='w-full lg:w-[80%] lg:ml-[20%] flex flex-col h-screen'>
                    <div className='px-5 w-full lg:w-[80%] h-13 bg-white border-b-1 border-slate-100 flex justify-between items-center fixed top-0 right-0 w-[80%] z-10'>
                        <div className='flex items-center space-x-5'>
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className='lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer group'
                            >
                                <FaGripLines className='w-6 h-6 text-blue-600 transition-all duration-300' />
                            </button>
                            <h3 className='font-semibold text-[13px] text-[#94a3b8] hidden md:flex'>{currentDate}</h3>
                        </div>
                        <div className='w-auto flex items-center space-x-5 lg:mr-5 relative' ref={notifRef}>
                            <span
                                onClick={() => setNotifOpen(!notifOpen)} 
                                className='w-10 h-10 rounded-lg hover:bg-[#f8fafc] cursor-pointer flex items-center justify-center relative hidden md:flex'>
                                <LuBell  className='text-[#475569] '/>
                                {unreadCount > 0 && (
                                    <span className='absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold'>
                                        <p className='text-center'>{unreadCount > 9 ? '9+' : unreadCount}</p>
                                    </span>
                                )}
                            </span>
                            {notifOpen && (
                                <div className='absolute top-11 right-50 w-70 h-auto bg-white border-1 border-slate-100 p-2 rounded-xl shadow-lg z-50 overflow-hidden flex flex-col hidden md:flex'>
                                    <div className='w-full flex items-center justify-between px-2'>
                                        <h3 className='text-[13px] font-medium text-[#1e293b]'>Notifications</h3>
                                        {unreadCount > 0 && (
                                            <button 
                                                onClick={handleMarkAllRead}
                                                className='text-xs text-blue-600 font-medium hover:text-blue-700 cursor-pointer'>
                                                Mark all read
                                            </button>
                                        )}
                                    </div>
                                    <div className='w-[95%] ml-2 mt-1.5 h-0.5 bg-slate-50'></div>
                                        <div className='w-full flex flex-col p-2 mt-3 max-h-80 overflow-y-auto bg-[#f8fafc]'>
                                            {notifications.length === 0 ? (
                                                <p className='text-center text-sm text-slate-400 mb-2'>
                                                    No notifications yet
                                                </p>
                                            ) : (
                                                notifications.map((n) => (
                                                    <div key={n.id} 
                                                        className={`flex space-x-2 p-1.5 rounded-lg mb-1.5 border-none hover:border hover:border-slate-100 bg-slate-50 cursor-pointer transition-colors ${n.is_read ? 'bg-white' : 'bg-blue-50/40 hover:bg-blue-50'}`}
                                                        onClick={() => !n.is_read && handleMarkOneRead(n.id)}
                                                    >
                                                        <span className='w-8 h-8 rounded-full'>
                                                            {notifIcon(n.type)}
                                                        </span>
                                                        <div className='w-[85%] flex flex-col'>
                                                            <div className='w-full flex flex-row items-center justify-between'>
                                                                <p className='text-xs font-medium text-slate-800 truncate'>{n.title}</p>
                                                                {!n.is_read && (
                                                                    <span className='w-1.5 h-1.5 bg-blue-500 rounded-full' />
                                                                )}
                                                            </div>
                                                            <p className='text-[10px] text-slate-500 mt-0.5 truncate'>{n.body}</p>
                                                            <p className='text-[10px] text-slate-400 mt-1'>{timeAgo(n.created_at)}</p>
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                ))
                                            )}
                                        </div>
                                        <div className='w-full border-t border-slate-100 mt-2 pt-2 px-2'>
                                            <Link
                                                to='/doctor/notifications'
                                                onClick={() => setNotifOpen(false)}
                                                className='w-full flex items-center justify-center py-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors'
                                            >
                                                View all notifications
                                            </Link>
                                        </div>
                                    </div>
                            )}
                            <div onClick={() => setIsOpen(!isOpen)} className='flex space-x-3 px-4 py-1 rounded-lg items-center hover:bg-[#f8fafc] cursor-pointer'>
                                {user?.profile_picture ? (
                                    <img
                                        src={`http://localhost:8000${user.profile_picture}`}
                                        className='w-9 h-9 rounded-full object-cover'
                                        alt="profile"
                                    />
                                ) : (
                                    <div className='w-9 h-9 rounded-full border bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold'>
                                        {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
                                    </div>
                                )}
                                {/* <img src="" className='w-7 h-7 rounded-full border' alt="" /> */}
                                <div className='flex flex-col'>
                                    <span className='text-[14px] font-semibold text-[#1e293b]'>{user?.first_name} {user?.last_name}</span>
                                    <span className='text-[10px] text-blue-500 font-medium'>
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
                                className='w-[50%] md:w-[27%] lg:w-[19%] border-1 border-[#f1f5f9] rounded-lg shadow-xs absolute top-12 right-6 md:right-12 bg-white px-3 py-2 flex flex-col'>
                                <h3 className='text-[13px] font-medium text-[#1e293b]'>
                                    {user?.first_name} {user?.last_name}
                                </h3>
                                <a href={`mailto:${user?.email}`} className='text-[11px] text-[#94a3b8] hover:text-[#1e293b] font-normal transition-all duration-300'>
                                    {user?.email}
                                </a>
                                <span className='w-full mt-2 border-1 border-[#94a3b8]/5'></span>
                                <Link to="/doctor/profile" className="w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex items-center space-x-3 text-[#475569] hover:bg-[#f8fafc]">
                                    <LuUser  className='mt-0.5'/>
                                    <span>My Profile</span>
                                </Link>
                                <Link to="/doctor/dashboard" className="w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex items-center space-x-3 text-[#475569] hover:bg-[#f8fafc]">
                                    <LuLayoutDashboard  className='mt-0.5'/>
                                    <span>Dashboard</span>
                                </Link>
                                <Link to="/doctor/notifications" className="w-full mt-1.5 font-normal text-[13px] rounded-lg px-1.5 py-2 flex md:hidden  items-center space-x-3 text-[#475569] hover:bg-[#f8fafc]">
                                    <LuBell  className='mt-0.5'/>
                                    <span>Notifications</span>
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