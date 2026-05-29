import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { LuUsers, LuCalendarClock, LuClock, LuShieldAlert, LuArrowRight, LuStethoscope } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { scrollRight } from '../../animations/effects'
import { Link } from 'react-router-dom'

export default function DoctorDashboard() {
    const { user} = useAuth()
    const [dashboard, setDashboard] = useState(null)

    useEffect(() => {
        document.title = 'Doctor Dashboard - Lifecare'
        api.get('/doctors/dashboard/')
        .then((res) => setDashboard(res.data))
        .catch(console.error)

    }, [])

    const getGreeting = () => {
        const h = new Date().getHours()
        if (h < 12) return 'Good morning'
        if (h < 17) return 'Good afternoon'
        return 'Good evening'
    }

    const dashboard_stats = [
        {
            label : "TODAY APPOINTMENT", 
            value : dashboard?.today_appointments_count ?? 0,
            icon : LuCalendarClock,
            style: 'bg-blue-50 text-blue-600'
        },
        {
            label : "TOTAL PATIENTS",
            value : dashboard?.total_patients ?? 0,
            icon : LuUsers,
            style : 'bg-green-50 text-green-600'
        },
        {
            label : "PENDING",
            value : dashboard?.pending_count ?? 0,
            icon : LuClock,
            style : 'bg-amber-50 text-amber-600'
        },
        {
            label : "CRITICAL TODAY", 
            value : dashboard?.critical_count ?? 0,
            icon : LuShieldAlert,
            style : 'bg-red-50 text-red-500'
        }
    ];

    const statusStyle = (status) => {
        if (status === 'confirmed') return 'bg-blue-50 text-blue-600'
        if (status === 'completed') return 'bg-green-50 text-green-600'
        if (status === 'cancelled') return 'bg-red-50 text-red-400'
        return 'bg-amber-50 text-amber-600'
    }

  return (
    <>
        <div className='w-full flex flex-col md:p-5'>
            <div className='w-full px-3 md:px-5 py-6 md:py-8 bg-[#2563eb] rounded-xl flex flex-col relative'>
                <p className='text-[13px] font-semibold text-[#dbeafe]'>{getGreeting()}</p>
                <div className='w-full flex flex-col'>
                    <div className='w-auto flex flex-col'>
                        <div className='flex items-center justify-between'>
                            <h3 className='text-2xl font-bold text-white'>
                                Dr. {user?.first_name} {user?.last_name}
                            </h3>
                            <div className='flex space-x-5 items-center'>
                                <LuStethoscope  className='hidden md:flex absolute w-25 h-25 right-40 lg:right-60 text-blue-500'/>
                                <div className={`px-4 py-2 rounded-lg text-sm flex items-center font-medium ${dashboard?.is_available ? 'bg-white/10 text-white' : 'bg-slate-400 text-white'}`}>
                                    <LuUsers  className='mr-1'/> {dashboard?.is_available ? 'Available' : 'Unavailable'}
                                </div>
                            </div>
                            {/* <p className='text-red-600 px-2 py-3 border'>{dashboard?.is_available}</p> */}
                        </div>
                        <p className='text-[10px] md:text-[12px] mt-2 text-[#dbeafe] font-medium flex items-center'>
                            {dashboard?.specialization} <span className='w-1 h-1 rounded-full bg-white mx-2 mt-0.5'></span> {dashboard?.today_appointments_count ?? 0} Appointments today.
                        </p>
                    </div>
                </div>
            </div>
            <div className='w-full py-2 mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                {dashboard_stats.map((data, index) => (
                    <motion.div 
                        {...scrollRight} 
                        key={index} 
                        className='w-full p-5 border-1 flex flex-col border-[#f1f5f9] rounded-xl bg-white hover:shadow-sm space-y-2'>
                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${data.style}`}>
                                <data.icon />
                            </span>
                            <h1 className='text-[#94a3b8] font-semibold text-[12px]'>{data.label}</h1>
                            <h1 className='text-2xl font-bold text-[#1e293b]'>{data.value}</h1>
                    </motion.div>
                ))} 
            </div>
            <div className='w-full py-3 md:flex md:flex-row flex flex-col md:space-x-5'>
                <div className='flex flex-col w-full md:w-[60%] py-3 space-y-5'>
                    <div className='w-full h-auto p-4 rounded-xl shadow-xs flex flex-col bg-white border-1 border-[#f1f5f9]'>
                        <div className='w-full flex items-center justify-between'>
                            <h3 className='text-md font-semibold text-[#1e293b]'>Today's Appointments</h3>
                            <Link to="/doctor/appointments" className='flex items-center text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium'>
                                View All <LuArrowRight  className='ml-1'/>
                            </Link>
                        </div>
                        <div className='w-full py-3 flex flex-col space-y-3 mt-1'>
                            {!dashboard?.today_appointments?.length ? (
                                <p className='text-sm text-slate-400'>No appointments today</p>
                            ) : dashboard.today_appointments.map((apt) => (
                                    <motion.div
                                        {...scrollRight}
                                        key={apt.id} className='flex justify-between items-start p-3 bg-slate-50 rounded-lg'>
                                        <div className='flex space-x-3'>
                                            {apt.patient_picture ? (
                                                <img src={apt.patient_picture} className='w-10 h-10 rounded-full object-cover border border-slate-200' alt='' />
                                            ) : (
                                                <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                                    {apt.patient_initials}
                                                </div>
                                            )}
                                            <div className='flex flex-col'>
                                                <div className='flex flex-col'>
                                                    <p className='text-sm font-semibold text-slate-800'>{apt.patient_name}</p>
                                                    <p className='text-xs text-slate-500 mt-1'>{apt.time} <span className='w-1 h-1 rounded-full bg-blue-600 mx-2 mt-0.5'></span> {apt.reason}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(apt.status)}`}>
                                            {apt.status}
                                        </span>
                                        
                                    </motion.div>
                            ))}
                        </div>
                        
                    </div>
                    <div className='w-full h-auto p-4 rounded-xl shadow-xs flex flex-col bg-white border-1 border-[#f1f5f9]'>
                        <div className='w-full flex items-center justify-between'>
                            <h3 className='text-md font-semibold text-[#1e293b]'>Upcoming Appointments</h3>
                            <Link to="/doctor/appointments" className='flex items-center text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium'>
                                View All <LuArrowRight  className='ml-1'/>
                            </Link>
                        </div>
                        <div className='w-full py-3 flex flex-col space-y-3 mt-1'>
                            {!dashboard?.upcoming_appointments?.length ? (
                                <p className='text-sm text-slate-400'>No upcoming appointments</p>
                            ) : dashboard.upcoming_appointments.map((apt) => (
                                    <motion.div
                                        {...scrollRight}
                                        key={apt.id} className='flex justify-between items-start p-3 bg-slate-50 rounded-lg'>
                                        <div className='flex space-x-3'>
                                            {apt.patient_picture ? (
                                                <img src={apt.patient_picture} className='w-10 h-10 rounded-full object-cover border border-slate-200' alt='' />
                                            ) : (
                                                <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                                    {apt.patient_initials}
                                                </div>
                                            )}
                                            <div className='flex flex-col'>
                                                <div className='flex flex-col'>
                                                    <p className='text-sm font-semibold text-slate-800'>{apt.patient_name}</p>
                                                    <p className='text-xs text-slate-500 mt-1'>
                                                        {new Date(apt.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})} <span className='w-1 h-1 rounded-full bg-blue-600 mx-2 mt-0.5'></span> {apt.time} <span className='w-1 h-1 rounded-full bg-blue-600 mx-2 mt-0.5'></span> {apt.reason}
                                                        {/* {apt.time} <span className='w-1 h-1 rounded-full bg-blue-600 mx-2 mt-0.5'></span> {apt.reason} */}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(apt.status)}`}>
                                            {apt.status}
                                        </span>
                                        
                                </motion.div>
                            ))}
                        </div>
                        
                    </div>
                </div>
                <div className='w-full md:w-[40%] py-3'>
                    <div className='w-full h-auto p-4 rounded-xl shadow-xs flex flex-col bg-white border-1 border-[#f1f5f9]'>
                        {/* <h3 className='text-md font-semibold text-[#1e293b]'>Weekly Overview</h3> */}
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className='text-md font-semibold text-[#1e293b]'>Weekly Overview</h3>
                            <span className='text-xs text-slate-400'>Last 7 days</span>
                        </div>
                        {dashboard?.weekly_data ? (
                            <>
                                <div className='flex items-end justify-between space-x-2 h-32 px-1'>
                                    {dashboard.weekly_data.map((d, i) => {
                                        const max = Math.max(...dashboard.weekly_data.map(x => x.count), 1)
                                        const heightPct = d.count === 0 ? 4 : Math.max((d.count / max) * 100, 10)
                                        const isToday = i === dashboard.weekly_data.length - 1

                                        return (
                                            <div key={i} className='flex flex-col items-center flex-1 space-y-1 group relative'>
                                                {/* Tooltip on hover */}
                                                <span className='absolute -top-6 text-[9px] bg-slate-800 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
                                                    {d.count} apt{d.count !== 1 ? 's' : ''}
                                                </span>
                                                <span className='text-[9px] text-slate-400'>{d.count > 0 ? d.count : ''}</span>
                                                <div
                                                    className={`w-full rounded-t-md transition-all duration-500 ${isToday ? 'bg-blue-600' : 'bg-blue-200'}`}
                                                    style={{ height: `${heightPct}%` }}
                                                />
                                                <span className={`text-[9px] font-medium ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                                                    {d.day}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='flex justify-between mt-3 pt-3 border-t border-slate-100'>
                                    <div className='text-center'>
                                        <p className='text-xs font-bold text-slate-800'>
                                            {dashboard.weekly_data.reduce((sum, d) => sum + d.count, 0)}
                                        </p>
                                        <p className='text-[10px] text-slate-400'>This week</p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-xs font-bold text-slate-800'>
                                            {Math.max(...dashboard.weekly_data.map(d => d.count))}
                                        </p>
                                        <p className='text-[10px] text-slate-400'>Busiest day</p>
                                    </div>
                                    <div className='text-center'>
                                        <p className='text-xs font-bold text-slate-800'>
                                            {(dashboard.weekly_data.reduce((sum, d) => sum + d.count, 0) / 7).toFixed(1)}
                                        </p>
                                        <p className='text-[10px] text-slate-400'>Daily avg</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className='text-sm text-slate-400 text-center py-8'>No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}