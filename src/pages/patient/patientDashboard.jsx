import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import Portal_Navbar from './components/sidebar'
import Portal_sidebar from './components/sidebar'
import { LuCalendarClock, LuHospital, LuPill, LuMessageSquare, LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { scrollRight, scrollUp } from '../../animations/effects'
import { motion } from 'framer-motion'
import PageLoader from '../../components/pageLoader'

export default function PatientDashboard() {
  const { user, logout } = useAuth()
  const [dashboard, setDashboard] = useState(null)

  useEffect(() => {
    api.get('/patients/dashboard/')
      .then((res) => setDashboard(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    document.title = "Patient Dashboard - LifeCare"
  })

  const getAge = (dob) => {
    if(!dob) return "N/A"
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthdiff = today.getMonth() - birthDate.getMonth();
    if (monthdiff < 0 || (monthdiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  const getGreeting = () => {
    const hour = new Date().getHours()
    if(hour < 12) return 'Good morning'
    if(hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const patients_stats = [
    {
        label : 'UPCOMING APPOINTMENTS',
        value : dashboard?.upcoming_appointments_count ?? 0,
        icon : LuCalendarClock

    },
    {
        label : 'TOTAL VISITS',
        value : dashboard?.total_visits  ?? 0,
        icon : LuHospital
    },
    {
        label : 'ACTIVE PRESCRIPTIONS',
        value : dashboard?.active_prescriptions_count ?? 0,
        icon : LuPill
    },
    {
        label : 'UNREAD MESSAGES',
        value : 0,
        icon : LuMessageSquare
    }
  ]

  if (!dashboard) return <PageLoader />

  return (
    <>
        <div className='w-full px-3 md:px-5 py-6 md:py-8 bg-[#2563eb] rounded-xl flex flex-col'>
            <p className='text-[13px] font-semibold text-[#dbeafe]'>{getGreeting()}, welcome back</p>
            <div className='w-full md:flex md:flex-row md:items-center flex flex-col md:justify-between'>
                <div className='w-auto flex flex-col'>
                    <h3 className='text-2xl font-bold text-white'>
                        {user?.first_name} {user?.last_name}
                    </h3>
                    <p className='text-[10px] md:text-[12px] mt-2 text-[#dbeafe] font-medium'>
                        Access your healthcare updates, appointments, and medical information in one place.
                    </p>
                </div>
                <div className='md:px-3 flex space-x-4 mt-3 md:mt-0'>
                    <div className='flex px-8 md:px-5 py-2 rounded-lg flex flex-col bg-white/10 hover:bg-white/20 text-center space-y-0.5 transition-all duration-300'>
                        <h3 className='text-white font-bold text-xl'>{getAge(user?.date_of_birth)}</h3>
                        <p className='text-[11px] text-[#dbeafe] font-medium'>Years</p>
                    </div>
                    <div className='flex px-8 md:px-5 py-2 rounded-lg flex flex-col bg-white/10 hover:bg-white/20 text-center space-y-0.5 transition-all duration-300'>
                        <h3 className='text-white font-bold text-xl'>{user?.patient_profile?.blood_type}</h3>
                        <p className='text-[11px] text-[#dbeafe] font-medium'>Blood Type</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full py-2 mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
           {patients_stats.map((data, index) => (
            <motion.div 
                {...scrollRight} 
                key={index} 
                className='w-full p-5 border-1 flex justify-between items-center border-[#f1f5f9] rounded-xl bg-white hover:shadow-sm'>
                <div className='w-auto flex flex-col space-y-3'>
                    <h1 className='text-[#94a3b8] font-semibold text-[12px]'>{data.label}</h1>
                    <h1 className='text-2xl font-bold text-[#1e293b]'>{data.value}</h1>
                </div>
                <div className='w-auto h-full flex items-center justify-center'>
                    <span className='w-10 h-10 rounded-xl flex items-center justify-center bg-[#eff6ff] text-[#2563eb]'>
                        <data.icon />
                    </span>
                </div>
            </motion.div>
           ))} 
        </div>
        <div className='w-full py-3 md:flex md:flex-row flex flex-col md:space-x-5'>
           <div className='flex flex-col w-full md:w-[60%] py-3'>
                <div className='w-full h-auto p-4 rounded-xl shadow-xs flex flex-col bg-white border-1 border-[#f1f5f9]'>
                    <div className='w-full flex items-center justify-between'>
                        <h3 className='text-md font-semibold text-[#1e293b]'>Upcoming Appointments</h3>
                        <Link to="/patient/appointments" className='flex items-center text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium'>
                            View All <LuArrowRight  className='ml-1'/>
                        </Link>
                    </div>
                    <div className='w-full py-3 flex flex-col space-y-3 mt-1'>
                        {dashboard?.upcoming_appointments?.length > 0 ? (
                            dashboard.upcoming_appointments.map((apt) => (
                                <motion.div
                                    {...scrollRight}
                                    key={apt.id} className='flex justify-between items-start p-3 bg-slate-50 rounded-lg'>
                                    <div className='flex space-x-3'>
                                        <img src="" alt="" className='w-10 h-10 border-1 rounded-full border-slate-200' />
                                        <div className='flex flex-col'>
                                            <div className='flex space-x-3'>
                                                <p className='text-sm font-semibold text-slate-800'>{apt.doctor_name}</p>
                                                <span className='hidden md:flex items-center justify-center text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium capitalize'> <span className='w-1 h-1 bg-blue-600 rounded-full mr-1'></span>{apt.status}</span>
                                            </div>
                                            <p className='text-xs text-slate-400'>{apt.specialization}</p>
                                            <p className='text-xs text-slate-500 mt-1'>{apt.appointment_date} · {apt.appointment_time}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <Link to="/patient/appointments" className='text-xs font-medium px-4 py-2 rounded-lg bg-[#F0F9FF] hover:bg-[#DBEAFE] text-slate-600 cursor-pointer transition-all duration-300 flex items-center justify-center'>
                                            Reschedule
                                        </Link>
                                        <Link to="/patient/appointments"
                                            // onClick={() => setCancelModal({ open: true, appointmentId: apt.id })}
                                            className='text-xs font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-500 cursor-pointer transition-all duration-300 flex items-center justify-center'
                                        >
                                            Cancel
                                        </Link>
                                        {/* <button className='text-[10px] border border-slate-200 px-2 py-0.5 rounded text-slate-500 hover:bg-slate-100'>Reschedule</button> */}
                                        {/* <button className='text-[10px] border border-red-100 px-2 py-0.5 rounded text-red-400 hover:bg-red-50'>Cancel</button> */}
                                    </div>
                                </motion.div>
                            ))
                            ) : (
                            <p className='text-sm text-slate-400'>No upcoming appointments</p>
                            )}
                    </div>
                </div>
           </div>
           <div className='w-full md:w-[40%] py-3'>
                <div className='w-full h-auto p-4 rounded-xl shadow-xs flex flex-col bg-white border-1 border-[#f1f5f9]'>
                    <div className='w-full flex items-center justify-between'>
                        <h3 className='text-md font-semibold text-[#1e293b]'>Active Prescriptions</h3>
                        <Link to="/patient/prescriptions" className='flex items-center text-[12px] text-[#2563eb] hover:text-[#1d4ed8] font-medium'>
                            View All <LuArrowRight  className='ml-1'/>
                        </Link>
                    </div>
                    <div className='flex flex-col space-y-3'>
                        {dashboard?.active_prescriptions?.length > 0 ? (
                            dashboard.active_prescriptions.map((p) => (
                                <motion.div 
                                    {...scrollUp}
                                    key={p.id} className='p-3 bg-slate-50 rounded-lg mt-2'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm font-semibold text-slate-800'>{p.medication_name}</p>
                                    <span className='text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium'>Active</span>
                                </div>
                                <p className='text-xs text-slate-500 mt-1 font-normal'><span className='font-medium'>{p.dosage}</span> · {p.frequency} · {p.duration}</p>
                                <p className='text-xs text-slate-400 mt-0.5'>Prescribed by <span className='font-medium underline hover:text-blue-500 transition-all duration-300'>{p.doctor_name}</span></p>
                                </motion.div>
                            ))
                            ) : (
                            <p className='text-sm text-slate-400 mt-2'>No active prescriptions</p>
                        )}
                    </div>
                </div>
           </div>
        </div>
        
    </>
  )
}