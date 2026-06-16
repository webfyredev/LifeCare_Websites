import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { LuArrowLeft, LuPill, LuFileText, LuMessageSquare, LuX, LuPlus } from 'react-icons/lu'
import api from '../../api/axios'
import { motion } from 'framer-motion'
import { buttonEffects } from '../../animations/effects'

export default function PatientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [noteModal, setNoteModal] = useState(false)
    const [prescribeModal, setPrescribeModal] = useState(false)

    useEffect(() => {
        api.get(`/doctors/patients/${id}/`)
            .then((res) => {
                setPatient(res.data)
                document.title = `${res.data.name} - LifeCare`
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [id])

    const getAge = (dob) => {
        if (!dob) return 'N/A'
        const diff = new Date() - new Date(dob)
        return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
    }

    const statusStyle = (status) => {
        if (status === 'confirmed') return 'bg-blue-50 text-blue-600'
        if (status === 'completed') return 'bg-green-50 text-green-600'
        if (status === 'cancelled') return 'bg-red-50 text-red-400'
        return 'bg-amber-50 text-amber-600'
    }

    if (loading) return <div className='p-8 text-center text-sm text-slate-400'>Loading patient...</div>
    if (!patient) return <div className='p-8 text-center text-sm text-slate-400'>Patient not found</div>

    return (
        <div className='w-full flex flex-col space-y-5'>

            {/* Back + header */}
            <div className='flex items-center space-x-4'>
                <button onClick={() => navigate('/doctor/mypatients')} className='w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all duration-300'>
                    <LuArrowLeft className='w-4 h-4 text-slate-600' />
                </button>
                <div className='flex items-center space-x-3 flex-1'>
                    {patient.profile_picture ? (
                        <img src={patient.profile_picture} className='w-12 h-12 rounded-full object-cover' alt='' />
                    ) : (
                        <div className='w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold'>
                            {patient.initials}
                        </div>
                    )}
                    <div>
                        <h1 className='text-xl font-bold text-slate-800'>{patient.name}</h1>
                        <p className='text-sm text-slate-400'>
                            {patient.gender} · {getAge(patient.date_of_birth)} yrs · {patient.blood_type || 'N/A'} · {patient.allergies || 'No known allergies'}
                        </p>
                    </div>
                </div>
                <div className='flex space-x-5'>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setNoteModal(true)}
                        className='flex items-center space-x-1.5 text-sm font-medium px-4.5 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-all duration-100'
                    >
                        <LuFileText className='w-4 h-4' />
                        <span>Add Note</span>
                    </motion.button>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setPrescribeModal(true)}
                        className='flex items-center space-x-1.5 text-sm font-medium px-4.5 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 cursor-pointer transition-all duration-300'
                    >
                        <LuPill className='w-4 h-4' />
                        <span>Prescribe</span>
                    </motion.button>
                    {patient.conversation_id && (
                        <Link
                            to='/doctor/messages'
                            className='flex items-center space-x-1.5 text-sm font-medium px-4.5 py-2 bg-green-100 rounded-lg text-green-600 hover:bg-green-200 transition-all duration-300'
                        >
                            <LuMessageSquare className='w-4 h-4' />
                            <span>Message</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

                {/* Patient info */}
                <div className='bg-white border border-slate-100 rounded-xl p-4 flex flex-col space-y-3'>
                    <h2 className='font-semibold text-slate-800'>Patient Info</h2>
                    {[
                        { label: 'Email', value: patient.email },
                        { label: 'Phone', value: patient.phone || 'N/A' },
                        { label: 'Date of Birth', value: patient.date_of_birth || 'N/A' },
                        { label: 'Address', value: patient.address || 'N/A' },
                        { label: 'Insurance', value: patient.insurance_number || 'N/A' },
                        { label: 'Emergency Contact', value: patient.emergency_contact_name ? `${patient.emergency_contact_name} · ${patient.emergency_contact_phone}` : 'N/A' },
                        { label: 'Medical History', value: patient.medical_history || 'None recorded' },
                    ].map(({ label, value }) => (
                        <div key={label} className='flex flex-col space-y-0.5'>
                            <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-wide'>{label}</span>
                            <span className='text-sm text-slate-700'>{value}</span>
                        </div>
                    ))}
                </div>

                {/* Appointments + prescriptions */}
                <div className='lg:col-span-2 flex flex-col space-y-5'>

                    {/* Recent appointments */}
                    <div className='bg-white border border-slate-100 rounded-xl p-4'>
                        <h2 className='font-semibold text-slate-800 mb-3'>Recent Appointments</h2>
                        {patient.recent_appointments?.length === 0 ? (
                            <p className='text-sm text-slate-400'>No appointments yet</p>
                        ) : patient.recent_appointments?.map((a) => (
                            <div key={a.id} className='flex justify-between items-start py-2.5 border-b border-slate-50 last:border-0'>
                                <div>
                                    <p className='text-sm font-medium text-slate-800'>{a.reason}</p>
                                    <p className='text-xs text-slate-400 mt-0.5'>{a.date} · {a.time}</p>
                                    {a.notes && <p className='text-xs text-slate-500 mt-0.5 italic'>{a.notes}</p>}
                                </div>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(a.status)}`}>
                                    {a.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Active prescriptions */}
                    <div className='bg-white border border-slate-100 rounded-xl p-4'>
                        <h2 className='font-semibold text-slate-800 mb-3'>Active Prescriptions</h2>
                        {patient.active_prescriptions?.length === 0 ? (
                            <p className='text-sm text-slate-400'>No active prescriptions</p>
                        ) : patient.active_prescriptions?.map((p) => (
                            <div key={p.id} className='flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0'>
                                <div>
                                    <p className='text-sm font-semibold text-slate-800'>{p.medication_name}</p>
                                    <p className='text-xs text-slate-400 mt-0.5'>{p.dosage} · {p.frequency} · {p.duration}</p>
                                    {p.notes && <p className='text-xs text-slate-500 mt-0.5 italic'>{p.notes}</p>}
                                </div>
                                <span className='text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium'>Active</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add note modal */}
            {noteModal && <NoteModal patientId={id} patientName={patient.name} onClose={() => setNoteModal(false)} onSaved={() => { setNoteModal(false) }} />}

            {/* Prescribe modal */}
            {prescribeModal && <PrescribeModal patientId={id} patientName={patient.name} onClose={() => setPrescribeModal(false)} onSaved={() => { setPrescribeModal(false) }} />}
        </div>
    )
}

function NoteModal({ patientId, patientName, onClose, onSaved }) {
    const [form, setForm] = useState({ title: '', content: '', category: '', severity: 'normal' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/notes/', { ...form, patient_id: patientId })
            onSaved()
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h2 className='font-semibold text-slate-800'>Add Medical Note</h2>
                        <p className='text-xs text-slate-400'>{patientName}</p>
                    </div>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'><LuX className='w-5 h-5' /></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Title</label>
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder='e.g. Follow-up visit' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                    </div>
                    <div className='flex space-x-3'>
                        <div className='flex flex-col space-y-1 flex-1'>
                            <label className='text-xs font-semibold text-slate-600'>Category</label>
                            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder='e.g. Hypertension' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                        <div className='flex flex-col space-y-1 flex-1'>
                            <label className='text-xs font-semibold text-slate-600'>Severity</label>
                            <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                                <option value='normal'>Normal</option>
                                <option value='monitor'>Monitor</option>
                                <option value='critical'>Critical</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Notes</label>
                        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4} placeholder='Clinical observations, diagnosis, next steps...' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                    </div>
                    <div className='flex space-x-3 pt-1'>
                        <button type='button' onClick={onClose} className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'>Cancel</button>
                        <motion.button 
                            {...buttonEffects}
                            type='submit' disabled={loading} className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-100 disabled:opacity-60'>{loading ? 'Saving...' : 'Save Note'}</motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function PrescribeModal({ patientId, patientName, onClose, onSaved }) {
    const [form, setForm] = useState({ medication_name: '', dosage: '', frequency: '', duration: '', notes: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/doctors/prescriptions/', { ...form, patient_id: patientId })
            onSaved()
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h2 className='font-semibold text-slate-800'>Write Prescription</h2>
                        <p className='text-xs text-slate-400'>{patientName}</p>
                    </div>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'><LuX className='w-5 h-5' /></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Medication Name</label>
                        <input value={form.medication_name} onChange={(e) => setForm({ ...form, medication_name: e.target.value })} required placeholder='e.g. Metformin' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                    </div>
                    <div className='grid grid-cols-3 gap-3'>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Dosage</label>
                            <input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} required placeholder='500mg' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Frequency</label>
                            <input value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} required placeholder='Twice daily' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Duration</label>
                            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required placeholder='30 days' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Instructions</label>
                        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} placeholder='e.g. Take with food' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                    </div>
                    <div className='flex space-x-3 pt-1'>
                        <button type='button' onClick={onClose} className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'>Cancel</button>
                        <motion.button 
                            {...buttonEffects}
                            type='submit' disabled={loading} className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg transition-all duration-100 hover:bg-blue-700 cursor-pointer disabled:opacity-60'>{loading ? 'Prescribing...' : 'Confirm Prescription'}</motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}