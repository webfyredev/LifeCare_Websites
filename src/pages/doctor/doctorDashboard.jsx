import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import { LuUsers, LuCalendarClock, LuClock, LuShieldAlert, LuArrowRight, LuStethoscope, LuOctagonAlert } from 'react-icons/lu'
import { motion } from 'framer-motion'
import { scrollRight } from '../../animations/effects'
import { Link, useNavigate } from 'react-router-dom'
import PageLoader from '../../components/pageLoader'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

export default function DoctorDashboard() {
    const { user} = useAuth()
    const [dashboard, setDashboard] = useState(null)

    const navigate = useNavigate()

    const breakdownData = dashboard?.appointment_breakdown ? [
        {
            name : 'Completed',
            value : dashboard.appointment_breakdown.completed,
            color : '#22c55e',
        },
        {
            name : 'Confirmed',
            value : dashboard.appointment_breakdown.confirmed,
            color : '#3b82f6'
        },
        {
            name : 'Pending',
            value : dashboard.appointment_breakdown.pending,
            color : '#f59e0b'
        },
        {
            name : 'Cancelled',
            value : dashboard.appointment_breakdown.cancelled,
            color: '#ef4444'
        }
    ].filter(d => d.value > 0) : []

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
            value : dashboard?.today_appointment_counts ?? 0,
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

      if (!dashboard) return <PageLoader />
    

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
                            {dashboard?.specialization} <span className='w-1 h-1 rounded-full bg-white mx-2 mt-0.5'></span> <Link to="/doctor/appointments" className='hover:underline hover:font-semibold hover:text-white transition-all duration-300'>{dashboard?.today_appointment_counts ?? 0} Appointments today.</Link>
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
                            <span className='text-[11px] text-slate-400 font-medium'>Appointments Last 7 days</span>
                        </div>
                        <div className='flex space-x-4 text-center mb-3'>
                            <div>
                                <p className='text-sm font-bold text-slate-800'>
                                    {dashboard?.weekly_data?.reduce((s, d) => s + d.count, 0) ?? 0}
                                </p>
                                <p className='text-[10px] text-slate-400'>This week</p>
                            </div>
                            <div>
                                <p className='text-sm font-bold text-slate-800'>
                                    {dashboard?.weekly_data ? Math.max(...dashboard.weekly_data.map(d => d.count)) : 0}
                                </p>
                                <p className='text-[10px] text-slate-400'>Busiest day</p>
                            </div>
                        </div>
                        {dashboard?.weekly_data ? (
                            <ResponsiveContainer width='100%' height={160}>
                                <BarChart data={dashboard.weekly_data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9' vertical={false} />
                                    <XAxis
                                        dataKey='day'
                                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#1e293b',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            color: '#fff',
                                            padding: '6px 12px'
                                        }}
                                        cursor={{ fill: '#eff6ff' }}
                                        formatter={(value) => [`${value} appointment${value !== 1 ? 's' : ''}`, '']}
                                        labelStyle={{ color: '#94a3b8', marginBottom: '2px' }}
                                    />
                                    <Bar
                                        dataKey='count'
                                        fill='#2563eb'
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className='h-40 flex items-center justify-center text-sm text-slate-400'>No data</div>
                        )}
                    </div>
                </div>
                
            </div>
            {/* Row 3 — Appointment breakdown + Follow-up patients */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>

                {/* Appointment breakdown donut */}
                <div className='bg-white border border-slate-100 rounded-xl p-4'>
                    <div className='flex justify-between items-center mb-2'>
                        <div>
                            <h3 className='font-semibold text-slate-800'>This month</h3>
                            <p className='text-[11px] text-slate-400 mt-0.5'>Appointment breakdown</p>
                        </div>
                    </div>
                    {breakdownData.length > 0 ? (
                        <ResponsiveContainer width='100%' height={180}>
                            <PieChart>
                                <Pie
                                    data={breakdownData}
                                    cx='50%'
                                    cy='50%'
                                    innerRadius={50}
                                    outerRadius={75}
                                    paddingAngle={3}
                                    dataKey='value'
                                >
                                    {breakdownData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                                    formatter={(value, name) => [`${value} appointments`, name]}
                                />
                                <Legend
                                    iconType='circle'
                                    iconSize={8}
                                    formatter={(value) => <span style={{ fontSize: '11px', color: '#64748b' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className='h-40 flex items-center justify-center text-sm text-slate-400'>
                            No appointment data this month
                        </div>
                    )}
                </div>

                {/* Patients due for follow-up */}
                <div className='bg-white border border-slate-100 rounded-xl p-4'>
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h3 className='font-semibold text-slate-800'>Follow-up needed</h3>
                            <p className='text-[11px] text-slate-400 mt-0.5'>No appointment in 30+ days</p>
                        </div>
                        <Link to='/doctor/mypatients' className='text-xs text-blue-600 font-medium flex items-center'>
                            All patients <LuArrowRight className='ml-1 w-3 h-3' />
                        </Link>
                    </div>
                    {!dashboard?.followup_patients?.length ? (
                        <div className='flex flex-col items-center py-6 space-y-2'>
                            <div className='w-10 h-10 rounded-full bg-green-50 flex items-center justify-center'>
                                <LuUsers className='w-5 h-5 text-green-500' />
                            </div>
                            <p className='text-sm text-slate-400'>All patients are up to date</p>
                        </div>
                    ) : (
                        <div className='flex flex-col space-y-2'>
                            {dashboard.followup_patients.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => navigate(`/doctor/mypatients/${p.id}`)}
                                    className='flex items-center space-x-3 p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors border border-transparent hover:border-amber-100'
                                >
                                    {p.profile_picture ? (
                                        <img src={p.profile_picture} className='w-9 h-9 rounded-full object-cover flex-shrink-0' alt='' />
                                    ) : (
                                        <div className='w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                            {p.initials}
                                        </div>
                                    )}
                                    <div className='flex-1 min-w-0'>
                                        <p className='text-sm font-medium text-slate-800 truncate'>{p.name}</p>
                                        <p className='text-xs text-slate-400'>No recent visit</p>
                                    </div>
                                    <span className='flex items-center space-x-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0'>
                                        <LuOctagonAlert className='w-3 h-3' />
                                        <span>Follow up</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Row 4 — Recent medical notes */}
            <div className='bg-white border border-slate-100 rounded-xl p-4 mt-5'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h3 className='font-semibold text-slate-800'>Recent medical notes</h3>
                        <p className='text-[11px] text-slate-400 mt-0.5'>Latest clinical observations</p>
                    </div>
                    <Link to='/doctor/notes' className='text-xs text-blue-600 font-medium flex items-center'>
                        View all <LuArrowRight className='ml-1 w-3 h-3' />
                    </Link>
                </div>
                {!dashboard?.recent_notes?.length ? (
                    <p className='text-sm text-slate-400 py-4 text-center'>No notes yet</p>
                ) : (
                    <div className='flex flex-col space-y-2'>
                        {dashboard.recent_notes.map((n) => {
                            const severityColor = n.severity === 'critical' ? 'border-red-400' : n.severity === 'monitor' ? 'border-amber-400' : 'border-blue-300'
                            const badgeColor = n.severity === 'critical' ? 'bg-red-50 text-red-500' : n.severity === 'monitor' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                            return (
                                <div key={n.id} className={`border-l-4 ${severityColor} pl-3 py-2 bg-slate-50 rounded-r-lg`}>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <p className='text-sm font-medium text-slate-800'>{n.title}</p>
                                            <p className='text-xs text-slate-400 mt-0.5'>Patient: {n.patient_name}</p>
                                        </div>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize flex-shrink-0 ${badgeColor}`}>
                                            {n.severity}
                                        </span>
                                    </div>
                                    <p className='text-[10px] text-slate-400 mt-1'>
                                        {new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    </>
  )
}