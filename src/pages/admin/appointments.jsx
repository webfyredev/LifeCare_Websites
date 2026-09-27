import { motion } from 'framer-motion'
import { LuArrowDown, LuArrowUp, LuCalendarCheck2, LuCalendarClock, LuCalendarDays, LuCalendarX2, LuChevronLeft, LuChevronRight, LuDownload, LuGripVertical, LuPlus, LuSearch, LuShieldCheck, LuTriangleAlert, LuUserRoundX, LuX } from 'react-icons/lu'
import { buttonEffects } from '../../animations/effects'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
export default function Lifecare_Appointments(){
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("all")
    const [page, setPage] = useState(1)
    const [feedback, setFeedback] = useState({message : "", type : ""})
    const [loading, setLoading] = useState(true)
    const [specialities, setSpecialities] = useState("all")
    const [scheduleAppointments, setScheduleAppointments] = useState(false)
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [cancelModal, setCancelModal] = useState({open : false, appointmentId: null})
    
    const [rescheduleModal, setRescheduleModal] = useState({
        open : false,
        appointmentId : null,
        currentDate : '',
        currentTime : '',
    })

    useEffect(() => {
        document.title = 'Manage Appointments - LifeCare (Admin Dashboard)'
    },[]);

    const fetchAppointments = async() => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-appointments/', {params : {search, status, specialities, page}})
            setData(response.data)
        }catch(err){
            console.error('Error fetching appointments', err)
        }finally{
            setLoading(false)
        }
    }

    const statusStyles = {
        pending : 'bg-[#FEF3C7] text-[#D97706]',
        confirmed: 'bg-[#DCFCE7] text-[#16A34A]',
        completed : 'bg-[#DBEAFE] text-[#2563EB]',
        cancelled : 'bg-[#FEE2E2] text-[#DC2626]',
        rescheduled : 'bg-[#F3E8FF] text-[#9333EA]'
    }

    useEffect(() => {
        fetchAppointments();
    }, [search, specialities, status, page])

    const deleteAppointments = async(appt_id) => {
        try{
            const response = await api.delete(`/admin/manage_appt/${appt_id}/delete/`)
            setActiveMenuId(null);
            fetchAppointments()
            setFeedback({message : "Appointment Deleted successfully!", type : "success"})
        }catch(err){
            setFeedback({messsage : "Failed to delete appointment"})
        }
    }
    const handleReschedule = async(newDate, newTime) => {
        try{
            await api.patch(`/appointments/${rescheduleModal.appointmentId}/reschedule/`, {
                appointment_date : newDate,
                appointment_time : newTime,
            })
            setRescheduleModal({open : false, appointmentId : null, currentDate : '', currentTime : ''})
            setFeedback({message : 'Appointment rescheduled successfully', type : 'success'})
            fetchAppointments()
        }catch (err){
            console.error(err)
        }
    }

    const handleCancel = async() => {
        try{
            await api.patch(`/appointments/${cancelModal.appointmentId}/cancel/`)
            setCancelModal({open : false, appointmentId :null})
            setFeedback({message : 'Appointment cancelled successfully', type: "success"})
            fetchAppointments();
        } catch(err){
            console.error(err)
        }
    }

    // const handleDelete = async(appt_id) => {
    //     try{
    //         const res = await api.delete(`/admin/manage-appointments/${appt_id}`)
    //     }
    // }

    const appointments_stats = [
        {
            label : 'Total Appointments',
            value : data?.stats?.total_appts ?? 0,
            change : data?.stats?.total_apt_change?.percentage ?? 0,
            direction : data?.stats?.total_apt_change?.direction,
            icon : LuCalendarDays,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Confirmed Appointments',
            value : data?.stats?.confirmed_appts ?? 0,
            change : data?.stats?.confirmed_change?.percentage ?? 0,
            direction : data?.stats?.confirmed_change?.direction,
            icon : LuCalendarCheck2,
            style : 'bg-[#DCFCE7] text-[#16A34A]'
        },
        {
            label : 'Pending Appointments',
            value : data?.stats?.pending_appts ?? 0,
            change : data?.stats?.pending_change?.percentage ?? 0,
            direction : data?.stats?.pending_change?.direction,
            icon : LuCalendarClock,
            style : 'bg-[#FEF3C7] text-[#D97706]'
        },
        {
            label : 'Cancelled Appointments',
            value : data?.stats?.cancelled_appts ?? 0,
            change : data?.stats?.cancelled_change?.percentage ?? 0,
            direction : data?.stats?.cancelled_change?.direction,
            icon : LuCalendarX2,
            style : 'bg-[#FEE2E2] text-[#DC2626]'
        },
    ]

    const appointment_data = data?.apt_data || []
    const totalCount = data?.pagination?.count || 0
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Appointments</h3>
                        <p className='text-[13px] text-[#94a3b8]'>View and manage all appointments.</p>
                    </div>
                    <motion.button
                        onClick={() => setScheduleAppointments(true)}
                        {...buttonEffects}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Schedule Appointment
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {appointments_stats.map((data) => (
                        <div className="p-5 border bg-white flex space-x-2.5 border-1 border-gray-100 rounded-xl shadow-xs hover:shadow-sm transition-all duration-300">
                            <div className={`w-9 h-9 flex items-center justify-center ${data.style} rounded-lg`}>
                                <data.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[13px] text-gray-500 font-medium">{data.label}</p>
                                <h3 className="font-bold text-2xl text-gray-800 mt-1">{data.value}</h3>
                                <span className={`flex mt-1 items-center space-x-2 text-[10px] ${data.direction === "up" ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                                    {data.direction === "up" ? <LuArrowUp /> : <LuArrowDown /> }
                                    {data.change}%
                                </span>
                                <p className="text-[10px] text-gray-500">vs. last month</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className='p-4 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between'>
                        <div className="relative w-full md:w-140">
                            <LuSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" 
                                placeholder="Search by patient_name, doctor_name, specialities..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="rescheduled">Rescheduled</option>

                            </select>

                            
                            <select value={status} 
                                onChange={(e) => setSpecialities(e.target.value)} 
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Specialities</option>
                                <option value="pediatrics">Pediatrics</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="Neurosurgeon">Neuro-surgeon</option>
                                <option value="ophthalmology">Ophthalmology</option>
                            </select>
                            
                            <button
                                className="cursor-pointer p-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                <LuDownload className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {feedback.message && (
                        <div
                            className={`p-3.5 mb-4 w-[95%] ml-5 rounded-lg text-sm font-semibold flex items-center justify-between transition-all
                                ${feedback.type === "error" ? "bg-rose-50 text-rose-700" : 'bg-emerald-50 text-emerald-700'}
                            `}
                        >
                            <div className="flex items-center gap-2">
                                {feedback.type === "error" ? <LuTriangleAlert className="w-4 h-4" /> : <LuShieldCheck className="w-4 h-4" />}
                                <span>{feedback.message}</span>
                            </div>
                            <button
                                onClick={() => setFeedback({message : "", type: ""})}
                                className="p-1 hover:opacity-10 cursor-pointer"
                            >
                                <LuX className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                    {loading ? (
                        <p className="text-center py-12 text-gray-400">
                            Loading appointments data...
                        </p>
                    ) : appointment_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuCalendarX2 size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Appointments not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find an appointments matching your search</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Patient</th>
                                        <th className="p-4">Doctor</th>
                                        <th className="p-4">Date & Time</th>
                                        <th className="p-4">Department</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {appointment_data.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className='flex flex-col'>
                                                    <span className='text-gray-800 font-semibold'>{apt.patient_name}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${apt.patient_email}`}>{apt.patient_email}</a>
                                                </div>
                                                
                                            </td>
                                            <td className="p-4 ">
                                                <div className='flex flex-col'>
                                                    <span className='text-gray-800 font-semibold'>{apt.doctor_name}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${apt.doctor_email}`}>{apt.doctor_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold '>{apt.date} {apt.time}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold '>{apt.department}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize ${statusStyles[apt.status]}`}>{apt.status}</span>
                                            </td>
                                            <td className="p-4 text-center relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === apt.id ? null : apt.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {activeMenuId === apt.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center space-y-1.5">
                                                        <button
                                                            onClick={() => {
                                                                setRescheduleModal({
                                                                    open : true,
                                                                    appointmentId : apt.id,
                                                                    currentDate: apt.date,
                                                                    currentTime : apt.time
                                                                })
                                                                setActiveMenuId(null)
                                                            }}
                                                            
                                                            className='text-xs font-medium px-4 py-2 rounded-lg bg-[#F0F9FF] hover:bg-[#DBEAFE] text-slate-600 cursor-pointer transition-all duration-300'
                                                        >   
                                                            Reschedule Appointment
                                                        </button>
                                                        {apt.status === 'cancelled' ?
                                                            <button
                                                                    onClick={() => deleteAppointments(apt.id)}
                                                                    className='text-xs w-full font-medium bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer transition-all duration-300'
                                                                >
                                                                Delete Appointment
                                                            </button>
                                                        
                                                        :
                                                            <button
                                                                    onClick={() => {
                                                                        setCancelModal({open : true, appointmentId : apt.id})
                                                                        setActiveMenuId(null)
                                                                    }}
                                                                    className='text-xs w-full font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-500 cursor-pointer transition-all duration-300'
                                                                >
                                                                Cancel Appointment
                                                            </button>
                                                        }
                                                        
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>
                            Showing <span className="font-semibold">{appointment_data.length}</span> of <span className="font-semibold">{totalCount}</span> appointments
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!data?.pagination?.previous}
                                onClick={() => setPage(page - 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!data?.pagination?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {scheduleAppointments && (
                <CreateAppointments 
                    onClose={() => setScheduleAppointments(false)}
                    onBooked={(msg) => {
                        setScheduleAppointments(false);
                        fetchAppointments();
                        setFeedback({message : msg, type : "success"})
                        }}
                    
                />
            )}
            {rescheduleModal.open && (
                <RescheduleModal 
                    currentDate={rescheduleModal.currentDate}
                    currentTime={rescheduleModal.currentTime}
                    onClose={() => setRescheduleModal({open : false, appointmentId : null, currentDate: '', currentTime : ''})}
                    onConfirm={handleReschedule}
                />
            )}
            {cancelModal.open && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-xl p-6 w-full max-w-sm shadow-lg flex flex-col items-center space-y-4'>
                        <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center'>
                            <LuX className='w-5 h-5 text-red-500' />
                        </div>
                        <div className='text-center'>
                            <h3 className='font-semibold text-slate-800 text-base'>Cancel Appointment</h3>
                            <p className='text-sm text-slate-400 mt-1'>
                                Are you sure you want to cancel this appointment? This action cannot be undone.
                            </p>
                        </div>
                        <div className='flex w-full space-x-3 mt-2'>
                            <motion.button
                                {...buttonEffects}
                                onClick={() => setCancelModal({ open: false, appointmentId: null })}
                                className='flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors'
                            >
                                Keep Appointment
                            </motion.button>
                            <motion.button
                                {...buttonEffects}
                                onClick={handleCancel}
                                className='flex-1 py-2.5 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer transition-colors'
                            >
                                Yes, Cancel
                            </motion.button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function CreateAppointments({ onClose, onBooked}){
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [form, setForm] = useState({
        doctor_id : '',
        patient_id : '',
        appointment_date : '',
        appointment_time : '',
        reason : '',
        location : 'Lifecare Medical Center'
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        if(!form.appointment_date) return
        api.get(`/appointments/doctors/?date=${form.appointment_date}`)
        .then((res) => setDoctors(res.data))
        .catch((err) => console.error('Error fetching doctors:', err))
    }, [form.appointment_date])

    useEffect(() => {
        api.get('/admin/manage-appt_users/')
        .then((res) => setPatients(res.data))
        .catch((err) => console.error('Error fetchng patients:', err))
    },[])


    const handleChange = (e) => setForm({...form, [e.target.name] : e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try{
            await api.post('/appointments/book/', form)
            onBooked('Appointment booked successfully')
        } catch (err){
            const msg = err.response?.data?.error || err.response?.data?.non_field_errors?.[0] || 'Failed to book appointment'
            setError(msg)
        } finally{
            setLoading(false)
        }
    }
    const selectedDoc = doctors.find(d => d.id === parseInt(form.doctor_id))
    return(
        <>
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='font-semibold text-slate-800'>Schedule Appointment</h2>
                        <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                            <LuX className='w-5 h-5' />
                        </button>
                    </div>

                    {error && (
                        <div className='bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4'>{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Date</label>
                            <input type='date' name='appointment_date' onChange={(e) => setForm({...form, appointment_date: e.target.value, doctor_id: ''})} required
                            min={new Date().toISOString().split('T')[0]}
                            className='border border-slate-200 rounded-lg px-3 py-2 text-sm outline-blue-300' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Select Patients</label>
                            <select name='patient_id' value={form.patient_id} onChange={handleChange} required
                                className='border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 outline-blue-300'>
                                <option value="">Choose a patient...</option>
                                    {patients.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.first_name} {p.last_name} ({p.email})
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Select Doctors</label>
                            <select name='doctor_id' value={form.doctor_id} onChange={handleChange} required disabled={!form.appointment_date}
                                className='border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 outline-blue-300'>
                                    <option value="">{form.appointment_date ? 'Choose a doctor...' : 'Select a date first'}</option>
                                    {doctors.map((d) => (
                                        <option
                                            key={d.id}
                                            value={d.id}
                                            disabled={d.is_fully_booked || !d.works_on_selected_day}
                                        >
                                            {d.name} - {d.specialization} {d.is_fully_booked ? '(Fully booked)' : !d.works_on_selected_day ? '(Not available)' : `(${d.slots_remaining} slots left)`}
                                        </option>
                                    ))}
                                {/* <option value=''>{form.appointment_date ? 'Choose a doctor...' : 'Select a date first'}.</option> */}
                                {doctors.map((d) => (
                                    <option 
                                        key={d.id} 
                                        value={d.id}
                                        disabled={d.is_fully_booked || !d.works_on_selected_day}
                                    >
                                    {d.name} - {d.specialization} {d.is_fully_booked ? 'Fully booked' : !d.works_on_selected_day ? '(Not available this day)' : `${d.slots_remaining} slot${d.slots_remaining !== 1 ? 's' : ''} left`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedDoc && (
                            <div
                                className={`text-xs px-3 py-2 rounded-lg font-medium ${selectedDoc.is_fully_booked ? 'bg-red-500 text-red-600' : selectedDoc.slots_remaining <= 5 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}
                            >
                                {selectedDoc.is_fully_booked ? `Fully booked on this date (${selectedDoc.max_patients_per_day}/${selectedDoc.max_patients_per_day} slots taken)` :
                                `${selectedDoc.slots_remaining} of ${selectedDoc.max_patients_per_day} slots available`
                                }
                            </div>
                        )}
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Time</label>
                            <input type='time' name='appointment_time' onChange={handleChange} required
                            className='border border-slate-200 rounded-lg px-3 py-2 text-sm outline-blue-300' />
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Reason for visit</label>
                            <textarea name='reason' onChange={handleChange} required rows={3}
                            placeholder='Describe your symptoms or reason...'
                            className='border border-slate-200 rounded-lg px-3 py-2 text-sm outline-blue-300 resize-none' />
                        </div>

                        <motion.button 
                            {...buttonEffects}
                            type='submit' disabled={loading || !form.doctor_id}
                            className='bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mt-1'>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </motion.button>
                    </form>
                </div>
            </div>
        </>
    )
}

function RescheduleModal({currentDate, currentTime, onClose, onConfirm}){
    const [newDate, setNewDate] = useState(currentDate || '')
    const [newTime, setNewTime] = useState(currentTime || '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!newDate || !newTime){
            setError('Please select both a date and time')
            return
        }
        setLoading(true)
        setError(null)
        try{
            await onConfirm(newDate, newTime)
        }catch(err){
            setError('Failed to reschedule. Please try again');
        } finally{
            setLoading(false)
        }
    }
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-sm shadow-lg flex flex-col space-y-4'>

                {/* Header */}
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold text-slate-800 text-base'>Reschedule Appointment</h3>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                        <LuX className='w-4 h-4' />
                    </button>
                </div>

                <p className='text-sm text-slate-400'>
                    Select a new date and time for your appointment.
                </p>

                {error && (
                    <div className='bg-red-50 text-red-500 text-xs p-3 rounded-lg'>{error}</div>
                )}

                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>New Date</label>
                        <input
                            type='date'
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            required
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                        />
                    </div>

                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>New Time</label>
                        <input
                            type='time'
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            required
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                        />
                    </div>

                    <div className='flex space-x-3 mt-1'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={loading}
                            className='flex-1 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-60'
                        >
                            {loading ? 'Rescheduling...' : 'Reschedule'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}