import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/axios'
import NavBar from '../../components/navbar'
import Footer from '../../components/footer'
import Portal_Navbar from './components/sidebar'
import Portal_sidebar from './components/sidebar'
import { LuCalendarClock, LuHospital, LuPill, LuMessageSquare, LuArrowRight, LuFileText, LuTriangle, LuCircleAlert, LuInfo, LuPlus, LuActivity, LuTriangleAlert } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { scrollRight, scrollUp } from '../../animations/effects'
import { motion } from 'framer-motion'
import PageLoader from '../../components/pageLoader'
import { bloodTypeInfo, getAllergyInfo, getMedicationGuide, medicationGuides } from '../../data/heathContent'

export default function PatientDashboard() {
  const { user, logout } = useAuth()
  const [dashboard, setDashboard] = useState(null)
  const [vitalModal, setVitalModal] = useState(false)
  const [vitalsForm, setVitalForms] = useState({
    blood_pressure_systolic : '',
    blood_pressure_diastolic : '',
    weight_kg : '',
    heart_rate_bpm : '',
    temperature_celsius : '',
    blood_sugar_mgdl : '',
    notes : '',
  })
  const [vitalsLoading, setVitalsLoading] = useState(false)
  const [vitalsSuccess, setVitalSuccess] = useState(false)

  const handleVitalsSubmit = async (e) => {
    e.preventDefault()
    setVitalsLoading(true)
    try{
        await api.post('/patients/vitals/', vitalsForm)
        setVitalSuccess(true)
        setVitalModal(false)
        api.get('/patients/dashboard/').then(res => setDashboard(res.data))
        setTimeout(() => setVitalSuccess(false), 3000)
    } catch(err) {
        console.error(err)
    } finally{
        setVitalsLoading(false)
    }
  }

  const bloodType = user?.patient_profile?.blood_type
  const bloodTypeData = bloodType ? bloodTypeInfo[bloodType] : null
  const allergyCards = getAllergyInfo(user?.patient_profile?.allergies || '')
  const medicalGuides = (dashboard?.active_prescriptions || []).map(p => ({...getMedicationGuide(p.medication_name), prescriptionName: p.medication_name})).filter(g => g.name)


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
            <div className='w-full lg:flex lg:flex-row lg:items-center flex flex-col lg:justify-between'>
                <div className='w-auto flex flex-col'>
                    <h3 className='text-2xl font-bold text-white'>
                        {user?.first_name} {user?.last_name} 
                    </h3>
                    <p className='text-[10px] md:text-[12px] mt-2 text-[#dbeafe] font-medium'>
                        Access your healthcare updates, appointments, and medical information in one place.
                    </p>
                </div>
                
                <div className='lg:px-3 md:flex md:flex-row flex flex-col space-y-3 md:space-x-4 mt-3 lg:mt-0'>
                    <div className='flex px-8 md:px-5 py-2 rounded-lg flex flex-col bg-white/10 hover:bg-white/20 text-center space-y-0.5 transition-all duration-300'>
                        <h3 className='text-white font-bold text-xl'>{getAge(user?.date_of_birth)}</h3>
                        <p className='text-[11px] text-[#dbeafe] font-medium'>Years</p>
                    </div>
                    <div className='flex px-8 md:px-5 py-2 rounded-lg flex flex-col bg-white/10 hover:bg-white/20 text-center space-y-0.5 transition-all duration-300'>
                        <h3 className='text-white font-bold text-xl'>{user?.patient_profile?.blood_type}</h3>
                        <p className='text-[11px] text-[#dbeafe] font-medium'>Blood Type</p>
                    </div>
                    <div className='flex px-8 md:px-5 py-2 rounded-lg flex flex-col bg-white/10 hover:bg-white/20 text-center space-y-0.5 transition-all duration-300'>
                        <h3 className='text-white font-bold text-md'>{user?.patient_profile?.hospital_number || 'N/A'}</h3>
                        <p className='text-[11px] text-[#dbeafe] font-medium'>Patient ID</p>
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
        {dashboard?.next_appointment && (
            <div className='w-full bg-white border border-slate-100 rounded-xl p-4 flex items-center justify-between'>
                <div className='flex items-center space-x-4'>
                    <div className='w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0'>
                        <LuCalendarClock className='w-6 h-6 text-white' />
                    </div>
                    <div>
                        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wide'>Next appointment</p>
                        <p className='text-sm font-semibold text-slate-800 mt-0.5'>
                            {dashboard.next_appointment.doctor_name} · {dashboard.next_appointment.specialization}
                        </p>
                        <p className='text-xs text-slate-500 mt-0.5'>
                            {new Date(dashboard.next_appointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {dashboard.next_appointment.time}
                        </p>
                    </div>
                </div>
                <div className='text-right flex-shrink-0'>
                    {dashboard.next_appointment.days_until === 0 ? (
                        <span className='text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg'>Today</span>
                    ) : dashboard.next_appointment.days_until === 1 ? (
                        <span className='text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg'>Tomorrow</span>
                    ) : (
                        <div className='text-center bg-blue-50 px-4 py-2 rounded-lg'>
                            <p className='text-2xl font-bold text-blue-600'>{dashboard.next_appointment.days_until}</p>
                            <p className='text-[10px] text-blue-400'>days away</p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {dashboard?.todays_medications?.length > 0 && (
            <div className='bg-white border border-slate-100 rounded-xl p-4'>
                <div className='flex justify-between items-center mb-3'>
                    <div>
                        <h3 className='font-semibold text-slate-800'>Today's medications</h3>
                        <p className='text-[11px] text-slate-400 mt-0.5'>Your active prescriptions for today</p>
                    </div>
                    <Link to='/patient/prescriptions' className='text-xs text-blue-600 font-medium flex items-center'>
                        View all <LuArrowRight className='ml-1 w-3 h-3' />
                    </Link>
                </div>
                <div className='flex flex-col space-y-2'>
                    {dashboard.todays_medications.map((med) => (
                        <div key={med.id} className='flex items-center space-x-3 p-3 bg-slate-50 rounded-lg'>
                            <div className='w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0'>
                                <LuPill className='w-4 h-4 text-purple-600' />
                            </div>
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-slate-800'>{med.medication_name}</p>
                                <p className='text-xs text-slate-400'>{med.dosage} · {med.frequency}</p>
                            </div>
                            <span className='text-xs text-slate-400'>{med.doctor_name}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
        {dashboard?.recent_records?.length > 0 && (
            <div className='bg-white border border-slate-100 rounded-xl p-4'>
                <div className='flex justify-between items-center mb-3'>
                    <div>
                        <h3 className='font-semibold text-slate-800'>Recent records</h3>
                        <p className='text-[11px] text-slate-400 mt-0.5'>Your latest medical documents</p>
                    </div>
                    <Link to='/patient/records' className='text-xs text-blue-600 font-medium flex items-center'>
                        View all <LuArrowRight className='ml-1 w-3 h-3' />
                    </Link>
                </div>
                <div className='flex flex-col space-y-2'>
                    {dashboard.recent_records.map((r) => {
                        const typeColors = {
                            lab_result: 'bg-blue-50 text-blue-600',
                            imaging: 'bg-purple-50 text-purple-600',
                            diagnosis: 'bg-teal-50 text-teal-600',
                            vaccination: 'bg-green-50 text-green-600',
                            surgery: 'bg-red-50 text-red-500',
                            allergy: 'bg-amber-50 text-amber-600',
                            general: 'bg-slate-100 text-slate-500',
                        }
                        return (
                            <div key={r.id} className='flex items-center space-x-3 p-3 bg-slate-50 rounded-lg overflow-hidden'>
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[r.record_type] || typeColors.general}`}>
                                    <LuFileText className='w-4 h-4' />
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-slate-800 truncate'>{r.title}</p>
                                    <p className='text-xs text-slate-400'>
                                        {r.record_type.replace('_', ' ')} · {new Date(r.date_recorded).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )}
        {dashboard?.alerts?.length > 0 && (
            <div className='flex flex-col space-y-2 border-1 border-red-500'>
                {dashboard.alerts.map((alert, i) => {
                    const styles = {
                        warning : 'bg-amber-50 border-amber-200 text-amber-800',
                        danger : 'bg-red-50 border-red-200 text-red-700',
                        info : 'bg-blue-50 border-blue-200 text-blue-700'
                    }
                    const icons = {
                        warning : <LuTriangle  className='w-4 h-4 flex-shrink-0 mt-0.5'/>,
                        danger : <LuCircleAlert  className='w-4 h-4 flex-shrink-0 mt-0.5'/>,
                        info : <LuInfo  className='w-4 h-4 flex-shrink-0 mt-0.5'/>,

                    }
                    return (
                        <div key={i} className={`flex items-center space-x-3 p-3 rounded-xl border ${styles[alert.severity]}`}>
                            {icons[alert.severity]}
                            <div className='flex-1'>
                                <p className='text-sm font-semibold'>
                                    {alert.title}
                                </p>
                                <p className='text-xs mt-0.5 opacity-80'>
                                    {alert.message}
                                </p>
                            </div>
                            <Link
                                to={alert.action_path}
                                className='text-xs font-medium underline flex-shrink-0 mt-0.5'
                            >
                                {alert.action_label}
                            </Link>

                        </div>
                    )
                })}
            </div>
        )}
        <div className='bg-white border border-slate-100 mt-5 rounded-xl p-4'>
            <div className='flex justify-between items-center mb-4'>
                <div>
                    <h3 className='font-semibold text-slate-800'>My Vitals</h3>
                    <p className='text-[11px] text-slate-400 mt-0.5'>
                        {dashboard?.lastest_vitals ? `Last Logged ${new Date(dashboard.latest_vitals.logged_at).toLocaleDateString('en-US', {month : 'short', day : 'numeric'})}` : 'No vitals logged yet'}
                    </p>
                </div>
                <button onClick={() => setVitalModal(true)}
                    className='flex items-center space-x-1.5 text-xs font-medium px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors'
                >
                    <LuPlus  className='w-3.5 h-3.5'/>
                    <span>Log Vitals</span>
                </button>

            </div>
            {dashboard?.latest_vitals ? (
                <div className='border-1 border-red-500 grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {[
                        {
                            label: 'Blood Pressure',
                            value: dashboard.latest_vitals.blood_pressure || 'N/A',
                            unit: 'mmHg',
                            icon: LuActivity,
                            color: 'bg-red-50 text-red-500'
                        },
                        {
                            label: 'Heart Rate',
                            value: dashboard.latest_vitals.heart_rate_bpm || 'N/A',
                            unit: 'bpm',
                            icon: LuHeart,
                            color: 'bg-pink-50 text-pink-500'
                        },
                        {
                            label: 'Weight',
                            value: dashboard.latest_vitals.weight_kg || 'N/A',
                            unit: 'kg',
                            icon: LuActivity,
                            color: 'bg-blue-50 text-blue-500'
                        },
                        {
                            label: 'Blood Sugar',
                            value: dashboard.latest_vitals.blood_sugar_mgdl || 'N/A',
                            unit: 'mg/dL',
                            icon: LuDroplets,
                            color: 'bg-amber-50 text-amber-500'
                        },
                    ].map(({label, value, unit, icon: Icon, color }) => (
                        <div key={label} className='bg-slate-50 rounded-xl p-3'>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${color}`}>
                                <Icon  className='w-4 h-4'/>
                            </div>
                            <p className='text-lg font-bold text-slate-800'>
                                {value !== 'N/A' ? value : <span className='text-slate-300 text-sm'>-</span>}
                            </p>
                            {value !== 'N/A' && <p className='text-[10px] text-slate-400'> {unit} </p>}
                            <p className='text-[10px] text-slate-400 mt-0.5'>
                                {label}
                            </p>

                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center py-6 space-y-2'>
                    <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center'>
                        <LuActivity className='w-5 h-5 text-slate-400' />
                    </div>
                    <p className='text-sm text-slate-400'>No vitals logged yet</p>
                    <p className='text-xs text-slate-300'>Log your vitals to track your health over time</p>
                </div>
            )}
        </div>

        {bloodTypeData && (
            <div className='bg-white border border-slate-100 rounded-xl p-4 mt-5'>
                <h3 className='font-semibold text-slate-800 mb-3'>Your Blood Type: <span className='text-blue-600'>{bloodType}</span></h3>
                <p className='text-sm text-slate-600 mb-3'> { bloodTypeData.summary}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <div className='bg-green-50 rounded-xl p-3'>
                        <p className='text-xs font-semibold text-green-700 mb-2'>
                            You can donate to 
                        </p>
                        <div className='flex flex-wrap gap-1.5'>
                            {bloodTypeData.canDonateTo.map((t, i) => (
                                <span key={i} className='font-medium text-xs bg-green-100 text-green-700 p-2.5 rounded-full'>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='bg-blue-50 rounded-xl p-3'>
                        <p className='text-xs font-semibold text-blue-700 mb-2'> You can recieve from</p>
                        <div className='flex flex-wrap gap-1.5'>
                            {bloodTypeData.canReceiveFrom.map((t, i) => (
                                <span key={i} className='font-medium text-xs bg-blue-100 text-blue-700 p-2.5 rounded-full'>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100'>
                        <p className='text-xs text-amber-700'>
                            <span className='font-semibold'>In emergencies: </span> {bloodTypeData.emergency}
                        </p>
                    </div>
                    <p className='text-xs text-slate-400 lg:mt-5'>
                        {bloodTypeData.fact}
                    </p>
                </div>

            </div>
        )}

        {allergyCards.length > 0 && (
            <div className='flex flex-col space-y-3 mt-5'>
                <h3 className='font-semibold text-slate-800'>Your Allergy Information</h3>
                {allergyCards.map((allergy, i) => (
                    <div key={i} className='bg-white border border-amber-100 rounded-xl p-4'>
                        <div className='flex items-center space-x-2 mb-3'>
                            <div className='w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0'>
                                <LuTriangleAlert  className='w-4 h-4 text-amber-600'/>
                            </div>
                            <h3 className='font-semibold text-slate-800'>
                                {allergy.title}
                            </h3>
                        </div>
                        <p className='text-sm text-slate-600 mb-3'>{allergy.summary}</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <div>
                                <p className='text-xs font-semibold text-red-600 mb-1.5'>Avoid these</p>
                                <ul className='flex flex-col space-y-2'>
                                    {allergy.avoid.map((item, j) => (
                                        <li key={j} className='text-xs text-slate-600 flex items-center space-x-1.5'>
                                            <span className='w-1 h-1 rounded-full bg-red-400 flex-shrink-0'></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-amber-600 mb-2'>Watch for these symptoms</p>
                                <ul className='flex flex-col space-y-2'>
                                    {allergy.symptoms.map((item, j) => (
                                        <li key={j} className='text-xs text-slate-600 flex items-center space-x-1.5'>
                                            <span className='w-1 h-1 rounded-full bg-amber-400 flex-shrink-0'></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='mt-3 p-2.5 bg-blue-50 rounded-lg'>
                            <p className='text-xs text-blue-700'>
                                <span className='font-semibold'>Tip: </span> {allergy.tip}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        )}
        {medicalGuides.length > 0 && (
            <div className='flex flex-col space-y-3 mt-5'>
                <h3 className='font-semibold text-slate-800'>Your Medication Guides</h3>
                {medicalGuides.map((guide, i) => (
                    <div key={i} className='bg-white border border-slate-100 rounded-xl p-4'>
                        <div className='lg:flex lg:flex-row flex flex-col lg:items-center space-y-2 lg:space-y-0 lg:space-x-2 mb-3'>
                            <div className='w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0'>
                                <LuPlus  className='w-4 h-4 text-purple-600'/>
                            </div>
                            <div>
                                <h3 className='font-semibold text-slate-800'>{guide.name}</h3>
                                <p className='text-xs text-slate-400'>{guide.purpose}</p>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3'>
                                <div className='bg-slate-50 rounded-lg p-3'>
                                    <p className='text-xs font-semibold text-slate-600 mb-1.5'>Common side effects</p>
                                    <ul className='flex flex-col space-y-1'>
                                        {guide.sideEffects.map((s, j)=> (
                                            <li key={j} className='text-xs text-slate-500'>
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='bg-green-50 rounded-lg p-3'>
                                    <p className='text-xs font-semibold text-green-700 mb-1.5'>
                                        Tips
                                    </p>
                                    <ul className='flex flex-col space-y-1'>
                                        {guide.tips.map((t, j) => (
                                            <li key={j} className='text-xs text-green-700'>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='bg-red-50 rounded-lg p-3'>
                                    <p className='font-semibold text-red-500 mb-1.5'>Call your doctor if</p> 
                                    <ul className='flex flex-col space-y-1'>
                                        {guide.callDoctor.map((c, j) => (
                                        <li key={j} className='text-xs text-red-600'>
                                            - {c}
                                        </li>
                                        ))} 
                                    </ul> 
                                </div>

                            </div>

                        </div>

                    </div>
                ))}
            </div>
        )}
        
        
    </>
  )
}