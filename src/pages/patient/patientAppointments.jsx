
import { useState, useEffect } from 'react'
import { LuCalendarDays, LuClock, LuMapPin, LuPlus, LuX } from 'react-icons/lu'
import api from '../../api/axios'
import { buttonEffects } from '../../animations/effects'
import { motion } from 'framer-motion'
export default function PatientAppointments() {
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('all')
    const [showBooking, setShowBooking] = useState(false)
    const [loading, setLoading] = useState(true)

    const [cancelModal, setCancelModal] = useState({ open: false, appointmentId: null })

    const [rescheduleModal, setRescheduleModal] = useState({
        open: false,
        appointmentId: null,
        currentDate: '',
        currentTime: '',
    })

    const fetchAppointments = (f= filter) => {
        setLoading(true)
        api.get(`/appointments/?filter=${f}`)
        .then((res) => setAppointments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        document.title = "My Appointments - LifeCare"
    })
    useEffect(() => { fetchAppointments(filter)}, [filter])

    const handleReschedule = async (newDate, newTime) => {
        try {
            await api.patch(`/appointments/${rescheduleModal.appointmentId}/reschedule/`, {
                appointment_date: newDate,
                appointment_time: newTime,
            })
            setRescheduleModal({ open: false, appointmentId: null, currentDate: '', currentTime: '' })
            fetchAppointments()
        } catch (err) {
            console.error(err)
        }
    }
   const handleCancel = async () => {
        try {
            await api.patch(`/appointments/${cancelModal.appointmentId}/cancel/`)
            setCancelModal({ open: false, appointmentId: null })
            fetchAppointments()
        } catch (err) {
            console.error(err)
        }
    }

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    })
    const formatTime = (time) => {
    const [h, m] = time.split(':')
    const d = new Date()
    d.setHours(h, m)
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase()
    
    return(
        <>
        <div className='w-full md:px-4 py-3 md:flex md:flex-row flex flex-col md:justify-between space-y-4 md:space-y-0 mb-5 md:mb-0'>
            <div className='w-auto flex flex-col space-y-1'>
                <h3 className='font-bold text-2xl text-[#1e293b]'>My Appointments</h3>
                <p className='text-[13px] text-[#94a3b8]'>Manage your upcoming and past appointments</p>
            </div>
            <motion.button
                {...buttonEffects} 
                onClick={() => setShowBooking(true)}
                className='bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300'>
                <LuPlus className='mr-1' /> Book Appointment
            </motion.button>
        </div>
        <div className='flex space-x-2.5 mt-2 md:px-5'>
            {['all', 'upcoming', 'past'].map((f) => (
            <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-2 rounded-lg text-sm capitalize transition-colors cursor-pointer
                ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border-1 border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
                {f}
            </button>
            ))}
        </div>
        <div className='w-full md:w-[95%] md:ml-5 bg-white border-1 border-slate-100 p-3 md:p-5 mt-8 rounded-lg'>
            {loading ? (
                <p className='text-sm text-slate-400'>Loading...</p>
                ) : appointments.length === 0 ? (
                <div className='bg-white rounded-xl border border-slate-100 p-8 text-center'>
                    <p className='text-slate-400 text-sm'>No appointments found</p>
                </div>
                ) : (
                appointments.map((apt) => (
                    <div key={apt.id} className='bg-white hover:bg-[#f8fafc] transition-all duration-300 rounded-xl border-b-1 border-slate-100 p-3 md:p-4 md:flex md:flex-row md:items-center md:justify-between flex flex-col space-y-5 md:space-y-0 mb-5 md:mb-3'>
                        <div className='md:flex md:flex-row md:items-center flex flex-col space-y-3 md:space-x-4'>
                            {apt.doctor.profile_picture ? (
                                <img src={apt.doctor.profile_picture} className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover' alt="" />
                                ) : (
                                <div className='w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm'>
                                    {getInitials(`${apt.doctor.first_name} ${apt.doctor.last_name}`)}
                                </div>
                            )}
                            <div>
                            <div className='flex items-center space-x-5 md:space-x-2'>
                                <p className='text-sm font-semibold text-slate-800'>
                                Dr. {apt.doctor.first_name} {apt.doctor.last_name}
                                </p>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full
                                ${apt.status === 'confirmed' || apt.status === 'pending'
                                    ? 'bg-blue-50 text-blue-600'
                                    : apt.status === 'completed'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-red-50 text-red-400'}`}>
                                • {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                                </span>
                            </div>
                            <p className='text-xs text-slate-400 mt-1 md:mt-0'>{apt.doctor.specialization}</p>
                            <div className='md:flex md:flex-row md:items-center md:space-x-4 mt-1.5 flex flex-col space-y-2 md:space-y-0'>
                                <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                    <LuCalendarDays className='w-3 h-3' />
                                <span>{formatDate(apt.appointment_date)}</span>
                                </span>
                                <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                    <LuClock className='w-3 h-3' />
                                <span>{formatTime(apt.appointment_time)}</span>
                                </span>
                                <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                    <LuMapPin className='w-3 h-3' />
                                <span>{apt.location}</span>
                                </span>
                            </div>
                            </div>
                        </div>

                    {/* Actions */}
                        {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                            <div className='flex space-x-2'>
                                <motion.button
                                    {...buttonEffects} 
                                    onClick={() => setRescheduleModal({
                                        open: true,
                                        appointmentId: apt.id,
                                        currentDate: apt.appointment_date,
                                        currentTime: apt.appointment_time,
                                    })}
                                    className='text-xs font-medium px-4 py-2 rounded-lg bg-[#F0F9FF] hover:bg-[#DBEAFE] text-slate-600 cursor-pointer transition-all duration-300'>
                                    Reschedule
                                </motion.button>
                                <motion.button
                                    {...buttonEffects}
                                    onClick={() => setCancelModal({ open: true, appointmentId: apt.id })}
                                    className='text-xs font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-500 cursor-pointer transition-all duration-300'
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        )}
                    </div>
                ))
                )}
        
        </div>
        {showBooking && (
            <BookingModal
            onClose={() => setShowBooking(false)}
            onBooked={() => { setShowBooking(false); fetchAppointments() }}
            />
        )}
        {rescheduleModal.open && (
        <RescheduleModal
            currentDate={rescheduleModal.currentDate}
            currentTime={rescheduleModal.currentTime}
            onClose={() => setRescheduleModal({ open: false, appointmentId: null, currentDate: '', currentTime: '' })}
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

function BookingModal({ onClose, onBooked }){
    const [doctors, setDoctors] = useState([])
    const [form, setForm] = useState({
        doctor_id : '',
        appointment_date : '',
        appointment_time : '',
        reason : '',
        location : 'Lifecare Medical Center'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    useEffect(() => {
    api.get('/appointments/doctors/')
      .then((res) => setDoctors(res.data))
      .catch(console.error)
    }, [])
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await api.post('/appointments/book/', form)
        onBooked()
        } catch (err) {
            setError('Failed to book appointment. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='font-semibold text-slate-800'>Book Appointment</h2>
                        <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                            <LuX className='w-5 h-5' />
                        </button>
                    </div>

                    {error && (
                        <div className='bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4'>{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Select Doctor</label>
                            <select name='doctor_id' onChange={handleChange} required
                                className='border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 outline-blue-300'>
                                <option value=''>Choose a doctor...</option>
                                {doctors.map((d) => (
                                    <option key={d.id} value={d.id}>
                                    {d.name} - {d.specialization}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Date</label>
                            <input type='date' name='appointment_date' onChange={handleChange} required
                            min={new Date().toISOString().split('T')[0]}
                            className='border border-slate-200 rounded-lg px-3 py-2 text-sm outline-blue-300' />
                        </div>

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
                            type='submit' disabled={loading}
                            className='bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mt-1'>
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </motion.button>
                    </form>
                </div>
            </div>
        </>
    )

}

function RescheduleModal({ currentDate, currentTime, onClose, onConfirm }) {
    const [newDate, setNewDate] = useState(currentDate ?? '')
    const [newTime, setNewTime] = useState(currentTime ?? '')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!newDate || !newTime) {
            setError('Please select both a date and time.')
            return
        }
        setLoading(true)
        setError(null)
        try {
            await onConfirm(newDate, newTime)
        } catch (err) {
            setError('Failed to reschedule. Please try again.')
        } finally {
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
                            {loading ? 'Saving...' : 'Confirm'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}