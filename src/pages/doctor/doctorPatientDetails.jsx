import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { LuArrowLeft, LuPill, LuFileText, LuMessageSquare, LuX, LuPlus, LuDownload } from 'react-icons/lu'
import api from '../../api/axios'
import { motion } from 'framer-motion'
import { buttonEffects, scrollLeft, scrollRight, scrollUp } from '../../animations/effects'


function AddRecordModal({ patientId, patientName, onClose, onSaved}){
    const [form, setForm] = useState({
        title : '',
        record_type : 'general',
        description : '',
        date_recorded: new Date().toISOString().split('T')[0],
    })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try{
            const formData = new FormData()
            formData.append('patient_id', patientId)
            formData.append('title', form.title)
            formData.append('record_type', form.record_type)
            formData.append('description', form.description)
            formData.append('date_recorded', form.date_recorded)
            if(file) formData.append('file', file)
            
                await api.post('/patients/records/add/', formData, {
                    headers : {'Content-Type' : 'multipart/form-data'}
                })
                onSaved()
        } catch (err){
            setError(err.response?.data?.error || 'Failed to add record.')
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <div>
                        <h2>Add Medical Record</h2>
                        <p className='text-xs text-slate-400'>{patientName}</p>
                    </div>
                    <button
                        onClick={onClose} className='text-slate-400 hover:slate-600 cursor-pointer'
                        >   
                        <LuX  className='w-5 h-5' />
                    </button>
                </div>
                {error && (
                    <div className='bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-3'>
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Title</label>
                        <input 
                            value={form.title}
                            onChange={e => setForm({...form, title:e.target.value })}
                            required
                            placeholder='e.g. Blood Test Results'
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                        />
                    </div>
                    <div className='w-full grid grid-cols-2 gap-3'>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Record Type</label>
                            <select 
                                value={form.record_type} 
                                onChange={e => setForm({...form, record_type : e.target.value})}
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                            >
                                <option value="lab_result">Lab Result</option>
                                <option value="imaging">Imaging</option>
                                <option value="diagnosis">Diagnosis</option>
                                <option value="surgery">Surgery</option>
                                <option value="vaccination">Vaccination</option>
                                <option value="allergy">Allergy</option>
                                <option value="general">General</option>

                            </select>
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Date</label>
                            <input 
                                type='date'
                                value={form.date_recorded}
                                onChange={e => setForm({...form, title:e.target.value })}
                                required
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Description / Notes</label>
                            <textarea 
                                value={form.description}
                                onChange={e => setForm({...form, description:e.target.value })}
                                rows={3}
                                placeholder='Clinical findings, observations...'
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>Attach File (optional)</label>
                            <input
                                type='file' 
                                accept='.pdf, .doc,.docx,.jpg,.jpeg,.png'
                                onChange={e => setFile(e.target.files[0])}
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'
                            />
                            {file && (
                                <p className='text-[10px] text-slate-400'>
                                    {file.name}
                                </p>
                            )}
                        </div>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'
                        >
                            Cancel
                        </button>
                        <motion.button
                            {...buttonEffects}
                            type='submit'
                            disabled={loading}
                            className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-60'
                        >
                            {loading ? "Saving..." : 'Add Record'}
                        </motion.button>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}
export default function PatientDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [noteModal, setNoteModal] = useState(false)
    const [recordModal, setRecordModal] = useState(false)
    const [prescribeModal, setPrescribeModal] = useState(false)

    useEffect(() => {
        api.get(`/doctors/patients/${id}/`)
            .then((res) => {
                setPatient(res.data)
                document.title = `${res.data.name} Details - LifeCare`
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
    const recordStyle = (record_type) => {
        if(record_type === 'lab_result') return 'bg-blue-50 text-blue-600'
        if(record_type === 'imaging') return 'bg-purple-50 text-purple-600'
        if(record_type === 'diagnosis') return 'bg-teal-50 text-teal-600'
        if(record_type === 'surgery') return 'bg-red-50 text-red-500'
        if(record_type === 'vaccination') return 'bg-green-50 text-green-600'
        if(record_type === 'allergy') return 'bg-amber-50 text-amber-600'
        if(record_type === 'general') return 'bg-slate-50 text-slate-500'
        
    }

    if (loading) return <div className='p-8 text-center text-sm text-slate-400'>Loading patient...</div>
    if (!patient) return <div className='p-8 text-center text-sm text-slate-400'>Patient not found</div>

    return (
        <div className='w-full flex flex-col space-y-5'>

            <div className='flex flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 space-x-4'>
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
                            {patient.gender} · {getAge(patient.date_of_birth)} yrs · {patient.blood_type || 'N/A'} · (Allergies : {patient.allergies || 'No known allergies'})
                        </p>
                    </div>
                </div>
                <div className='flex flex-col md:flex md:flex-row md:space-x-3 lg:space-x-5 space-y-4 md:space-y-0'>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setNoteModal(true)}
                        className='flex items-center justify-center space-x-1.5 text-sm font-medium px-4.5 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer transition-all duration-100'
                    >
                        <LuFileText className='w-4 h-4' />
                        <span>Add Note</span>
                    </motion.button>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setPrescribeModal(true)}
                        className='flex justify-center items-center space-x-1.5 text-sm font-medium px-4.5 py-2.5 md:py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 cursor-pointer transition-all duration-300'
                    >
                        <LuPill className='w-4 h-4' />
                        <span>Prescribe</span>
                    </motion.button>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setRecordModal(true)}
                        className='flex justify-center items-center space-x-1.5 text-sm font-medium px-4.5 py-2.5 md:py-2 border-1 border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer transition-all duration-300'
                    >
                        <LuFileText className='w-4 h-4' />
                        <span>Add Record</span>
                    </motion.button>
                    {recordModal && (
                        <AddRecordModal 
                            patientId={id}
                            patientName={patient.name}
                            onClose={() => setRecordModal(false)}
                            onSaved={() => {
                                setRecordModal(false)
                                api.get(`/doctors/patients/${id}/`).then(res => setPatient(res.data))
                            }}
                        />
                    )}
                    {patient.conversation_id && (
                        <Link
                            to='/doctor/messages'
                            className='flex justify-center items-center space-x-1.5 text-sm font-medium px-4.5 py-2.5 md:py-2 bg-green-100 rounded-lg text-green-600 hover:bg-green-200 transition-all duration-300'
                        >
                            <LuMessageSquare className='w-4 h-4' />
                            <span>Message</span>
                        </Link>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

                {/* Patient info */}
                <motion.div 
                    {...scrollLeft}
                    className='bg-white border border-slate-100 rounded-xl p-4 flex flex-col space-y-4.5'>
                    <h2 className='font-semibold text-slate-800'>Patient Info</h2>
                    {[
                        { label: 'Email', value: patient.email, type : "email" },
                        { label: 'Phone', value: patient.phone || 'N/A', type : "phone" },
                        { label: 'Date of Birth', value: patient.date_of_birth || 'N/A' },
                        { label : 'Hospital ID', value : patient.hospital_number || 'N/A'},
                        { label: 'Address', value: patient.address || 'N/A' },
                        { label: 'Insurance', value: patient.insurance_number || 'N/A' },
                        { label: 'Emergency Contact', value: patient.emergency_contact_name ? `${patient.emergency_contact_name} - ${patient.emergency_contact_phone}` : 'N/A'},
                        { label: 'Medical History', value: patient.medical_history || 'None recorded' },
                    ].map(({ label, value, type}) => (
                        <div key={label} className='flex flex-col space-y-0.5'>
                            <span className='text-[10px] font-semibold text-slate-400 uppercase tracking-wide'>{label}</span>
                            {type === "email" && value !== 'N/A' ? (
                                <a href={`mailto:${value}`} className='text-sm text-slate-700 hover:text-blue-600 hover:underline transition-all'>
                                    {value}
                                </a>
                            ) : type === 'phone' && value !== 'N/A' ? (
                                <a href={`tel:${value}`} className='text-sm text-slate-700 hover:text-blue-600 hover:underline transition-all'>
                                    {value}
                                </a>
                            ) : (
                                <span className='text-sm text-slate-700'>{value}</span>                            
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Appointments + prescriptions */}
                
                <div className='lg:col-span-2 flex flex-col space-y-5'>

                    {/* Recent appointments */}
                    <div className='bg-white border border-slate-100 rounded-xl p-4 flex flex-col space-y-4.5'>
                        <div className='flex justify-between items-center'>
                            <h3 className='font-semibold text-slate-800 mb-3'>Patient Vitals</h3>
                            {patient.vitals_logged_at && (
                                <span className='text-[10px] text-slate-400 font-medium'>
                                    Last logged {new Date(patient.vitals_logged_at).toLocaleDateString('en-US', {month : 'short', day : 'numeric', year : 'numeric'})}
                                </span>
                            )}
                        </div>
                        {!patient.blood_pressure_systolic && !patient.heart_rate_bpm && !patient.blood_sugar_mgdl && !patient.temperature_celcius ? (
                            <div className='flex flex-col items-center py-4 space-y-1'>
                                <p className='text-sm text-slate-400'>No vitals logged yet</p>
                                <p className='text-xs text-slate-300'>Patient has not recorded any vitals</p>

                            </div>
                        ) : (
                                <div className='grid grid-cols-2 gap-4 borde-1 border-red-500'>
                                    {[
                                        {label : 'Blood Pressure', value : patient.blood_pressure_systolic && patient.blood_pressure_diastolic ? `${patient.blood_pressure_systolic}/${patient.blood_pressure_diastolic} mmHg` : 'N/A'},
                                        {label : 'Heart Rate', value : patient.heart_rate_bpm ? `${patient.heart_rate_bpm} bpm` : 'N/A'},
                                        {label : 'Blood Sugar', value : patient.blood_sugar_mgdl ? `${patient.blood_sugar_mgdl} mg/dL` : 'N/A'},
                                        {label : 'Temperature', value : patient.temperature_celcius ? `${patient.temperature_celcius}°C` : 'N/A'},
                                    ].map(({label, value, value2}) => (
                                    <div key={label} className='w-auto border-1 border-slate-100 p-3 rounded-xl bg-slate-50'>
                                        <h3 className='font-bold text-xl mb-1 text-slate-700'>
                                            {value}
                                        </h3>
                                        <h3 className='text-sm font-medium text-slate-800'>
                                            {label}
                                        </h3>

                                    </div>
                                    ))}
                                </div>
                                
                            // </div>
                        )}
                    
                    </div>
                    <motion.div 
                        {...scrollRight}
                        className='bg-white border border-slate-100 rounded-xl p-4'>
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
                    </motion.div>

                    {/* Active prescriptions */}
                    <motion.div 
                        {...scrollUp}
                        className='bg-white border border-slate-100 rounded-xl p-4'>
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
                    </motion.div>

                    {/* Medical Records */}
                    <div className='bg-white border border-slate-100 rounded-xl p-5'>
                        <h2 className='font-semibold text-slate-800 mb-3'>Patient Medical Records </h2>
                        {patient.medical_records?.length === 0 ? (
                            <p className='text-sm text-slate-400'>No medical records recorded yet.</p>
                        ) : patient.medical_records?.map((record) => (
                            <div key={record.id} className='flex flex-col p-2.5 bg-slate-100 rounded-lg mb-5'>
                                <div className='flex flex-row justify-between items-center'>
                                    <h3 className='text-sm font-semibold  text-slate-800 mb-2'>-{record.title}</h3>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center justify-center capitalize ${recordStyle(record.record_type)}`}>
                                        {record.record_type}
                                    </span>
                                </div>
                                <p className='text-[13px] text-gray-500 my-1'>{record.description}</p>
                                <p className='text-xs text-slate-400 mt-0.5 italic'>{record.date_recorded}</p>
                                <div className='flex items-center space-x-3 mt-3'>
                                    {record.file && (
                                        <a
                                            href={record.file}
                                            target= '_blank'
                                            rel='noreferrer'
                                            onClick={(e) => e.stopPropagation()}
                                            className='flex items-center space-x-1.5 text-xs font-medium px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all duration-300'
                                        >
                                            <LuDownload  className='w-3.5 h-3.5'/>
                                            <span>Download</span>

                                        </a>
                                    )}
                                    
                                </div>
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