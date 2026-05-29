import { useState, useEffect } from 'react'
import { LuCalendarDays, LuClock, LuMapPin, LuCheck, LuX, LuFileText, LuPlus } from 'react-icons/lu'
import api from '../../api/axios'
import { motion } from 'framer-motion' 
import { buttonEffects } from '../../animations/effects'

export default function DoctorAppointments(){
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [completeModal, setCompleteModal] = useState({ open: false, appointmentId: null })
    const [notes, setNotes] = useState('')

    useEffect(() => { document.title = 'Appointments - LifeCare' })

    useEffect(() => {fetchAppointments(filter)}, [filter])

    const fetchAppointments = (f = filter) => {
        setLoading(true)
        api.get(`/appointments/doctor/?filter=${f}`)
        .then((res) => setAppointments(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }

    const handleConfirm = async (id) => {
        try{
            await api.patch(`/appointments/${id}/confirm/`)
            fetchAppointments()
        } catch (err) {console.error(err)}
    }

    const handleComplete = async () => {
        try{
            await api.patch(`/appointments/${completeModal.appointmentId}/complete/`, { notes })
            setCompleteModal({ open : false, appointmentId : null })
            setNotes('')
            fetchAppointments()

        } catch (err) {console.error(err)}
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

    const statusStyle = (status) => {
        if (status === 'confirmed') return 'bg-blue-50 text-blue-600'
        if (status === 'completed') return 'bg-green-50 text-green-600'
        if (status === 'cancelled') return 'bg-red-50 text-red-400'
        return 'bg-amber-50 text-amber-600'
    }
    
    return (
        <>
            <div className='w-full md:px-4 py-3 md:flex md:flex-row flex flex-col md:justify-between space-y-4 md:space-y-0 mb-5 md:mb-0'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>Appointments</h3>
                    <p className='text-[13px] text-[#94a3b8]'>Manage your patient appointments</p>
                </div>
                <motion.button
                    {...buttonEffects} 
                    
                    className='bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300'>
                    <LuPlus className='mr-1' /> Block time
                </motion.button>
            </div>
            <div className='flex space-x-2.5 mt-2 md:px-5'>
                {['all', 'today', 'upcoming', 'completed'].map((f) => (
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
            <div className='w-[97%] ml-5 bg-white border border-slate-100 mt-5 rounded-xl overflow-hidden'>
                {loading ? (
                    <div className='p-8 text-center text-sm text-slate-400'>Loading...</div>
                        ) : appointments.length === 0 ? (
                            <div className='p-8 text-center text-sm text-slate-400'>No appointments found</div>
                        ) : appointments.map((apt, index) => (
                            <div
                                key={apt.id}
                                className={`flex items-center justify-between px-5 py-4 mb-3
                                    ${index !== appointments.length - 1 ? 'border-b border-slate-100' : ''}`}
                            >
                                <div className='flex items-center space-x-4'>
                                    {apt.patient_picture ? (
                                        <img src={apt.patient_picture} className='w-11 h-11 rounded-full object-cover' alt='' />
                                    ) : (
                                        <div className='w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm flex-shrink-0'>
                                            {apt.patient_initials}
                                        </div>
                                    )}
                                    <div>
                                        <div className='flex items-center space-x-2'>
                                            <p className='text-sm font-semibold text-slate-800'>{apt.patient_name}</p>
                                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(apt.status)}`}>
                                                • {apt.status}
                                            </span>
                                        </div>
                                        <p className='text-xs text-slate-400 mt-0.5'>{apt.reason}</p>
                                        <div className='flex items-center space-x-4 mt-1'>
                                            <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                                <LuCalendarDays className='w-3 h-3' />
                                                <span>{formatDate(apt.date)}</span>
                                            </span>
                                            <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                                <LuClock className='w-3 h-3' />
                                                <span>{formatTime(apt.time)}</span>
                                            </span>
                                            <span className='flex items-center space-x-1 text-xs text-slate-500'>
                                                <LuMapPin className='w-3 h-3' />
                                                <span>{apt.location}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className='flex items-center space-x-2'>
                                    {apt.status === 'pending' && (
                                        <button
                                            onClick={() => handleConfirm(apt.id)}
                                            className='flex items-center space-x-1 text-xs font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg cursor-pointer transition-colors'
                                        >
                                            <LuCheck className='w-3 h-3' />
                                            <span>Confirm</span>
                                        </button>
                                    )}
                                    {(apt.status === 'confirmed' || apt.status === 'pending') && (
                                        <button
                                            onClick={() => setCompleteModal({ open: true, appointmentId: apt.id })}
                                            className='flex items-center space-x-1 text-xs font-medium px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg cursor-pointer transition-colors'
                                        >
                                            <LuFileText className='w-3 h-3' />
                                            <span>Complete + Notes</span>
                                        </button>
                                    )}
                                    {apt.status === 'completed' && apt.notes && (
                                        <span className='text-xs text-slate-400 italic max-w-[160px] truncate'>
                                            {apt.notes}
                                        </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {completeModal.open && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='font-semibold text-slate-800'>Complete Appointment</h2>
                            <button onClick={() => setCompleteModal({ open: false, appointmentId: null })} className='text-slate-400 hover:text-slate-600 cursor-pointer'>
                                <LuX className='w-5 h-5' />
                            </button>
                        </div>
                        <p className='text-sm text-slate-400 mb-3'>Add consultation notes before marking as complete.</p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            placeholder='Consultation notes, diagnosis, next steps...'
                            className='w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none'
                        />
                        <div className='flex space-x-3 mt-4'>
                            <button
                                onClick={() => setCompleteModal({ open: false, appointmentId: null })}
                                className='flex-1 py-2.5 text-sm font-medium border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleComplete}
                                className='flex-1 py-2.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer transition-colors'
                            >
                                Mark Complete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}