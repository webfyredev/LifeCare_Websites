import { useState, useEffect } from 'react'
import { LuPill, LuUser, LuCalendarDays, LuPlus, LuX, LuUsers } from 'react-icons/lu'
import api from '../../api/axios'
import { motion } from 'framer-motion'
import { buttonEffects } from '../../animations/effects'

export default function DoctorPrescriptions(){
    const [prescriptions, setPrescriptions] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [editModal, setEditModal] = useState({open : false, prescription : null})

    useEffect(() => { document.title = 'Prescriptions - Lifecare'})
    useEffect(() => {fetchPrescriptions(filter)}, [filter])

    const fetchPrescriptions = (f=filter) => {
        setLoading(true)
        api.get(`/doctors/prescriptions/?filter=${f}`)
        .then((res) => setPrescriptions(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))

    }

    const handleEdit = async (id, updatedData) => {
        try{
            await api.patch(`/doctors/prescriptions/${id}/`, updatedData)
            setEditModal({ open : false, prescription : null })
            fetchPrescriptions()
        } catch (err) { console.error(err)}
    }

    const statusStyle = (status) => {
        if (status === 'active') return 'bg-green-50 text-green-600'
        if (status === 'completed') return 'bg-slate-100 text-slate-500'
        return 'bg-red-50 text-red-400'
    }

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })

    return (
        <div className='w-full flex flex-col space-y-5'>
            <div className='w-auto flex flex-col space-y-1'>
                <h3 className='font-bold text-2xl text-[#1e293b]'>Prescriptions</h3>
                <p className='text-[13px] text-[#94a3b8]'>All prescriptions you have  issued</p>
            </div>

            <div className='flex space-x-2'>
                {['all', 'active', 'completed'].map((f) => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize cursor-pointer transition-colors
                            ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        {f}
                    </button>
                ))}
            </div>
            <div className='w-full border-1 bg-white border-slate-100 rounded-xl overflow-hidden p-5'>
                {loading ? (
                    <span className='p-8 text-center text-sm text-slate-400'>
                        Loading...
                    </span>
                ) : prescriptions.length === 0 ? (
                    <span className='p-8 text-center text-sm text-slate-400'>
                        No prescriptions found
                    </span>
                ) : prescriptions.map((p, index) => (
                    <div key={p.id} className={`lg:flex lg:flex-row border-b border-slate-200 md:item-center md:justify-between lg:px-5 mb-3 py-2 lg:py-4 ${index !== prescriptions.length - 1 ? 'border-b border-slate-100' : ''}`}>
                        <div className='md:flex md:flex-row flex flex-col md:items-center space-x-6 lg:space-x-4 space-y-1.5 md:space-y-0'>
                            <span className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center'>
                                <LuPill className='w-5 h-5 text-blue-500' />
                            </span>
                            <div className='flex items-center space-x-2'>
                                <p className='text-sm font-semibold text-slate-800'>
                                    {p.medication_name}
                                </p>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(p.status)}`}>
                                    {p.status}
                                </span>
                            </div>
                            <p className='text-xs text-slate-400 mt-0.5 flex items-center font-semibold'><span className=''>{p.dosage}</span> <span className='w-1 h-1 rounded-full bg-slate-600 mx-2 mt-0.5'></span> {p.frequency} <span className='w-1 h-1 rounded-full bg-slate-600 mx-2 mt-0.5'></span> {p.duration}</p>
                            <div className='flex items-center space-x-4 mt-1'>
                                <div className='flex items-center space-x-1 text-[14px] md:text-xs text-slate-500'>
                                    <LuUsers  className='w-4 h-4 md:w-3 md:h-3'/> <span className='font-semibold'>{p.patient_name}</span>
                                </div>
                                <div className='flex items-center space-x-1 text-[14px] md:text-xs text-slate-500'>
                                    <LuCalendarDays  className='w-4 h-4 md:w-3 md:h-3'/> <span>{formatDate(p.prescribed_date)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2 md:mt-0 w-auto md:flex md:flex-row justify-between flex flex-col space-x-5 md:items-center'>
                            <p className="flex md:hidden text-slate-600 font-medium text-[12px]">Instruction:</p>
                            <p className="flex lg:hidden text-slate-500 text-[13px] italic">{p.notes}</p>

                            <motion.button
                                {...buttonEffects}
                                onClick={() => setEditModal({open : true, prescription : p})}
                                    className='mt-3 lg:mt-0 text-xs font-medium px-5 py-2.5 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all duratin-300 cursor-pointer'
                                >
                                    Edit Prescriptions
                            </motion.button>
                        </div>
                        

                    </div>
                    
                ))}
            </div>
            {editModal.open && (
                <EditPrescriptionModal 
                    prescription={editModal.prescription}
                    onClose={() => setEditModal({open : false, prescription : null})}
                    onSave = {handleEdit}
                />
            )}
        </div>
    )
};

function EditPrescriptionModal({prescription, onClose, onSave}){
    const [form, setForm] = useState({
        medication_name : prescription.medication_name,
        dosage : prescription.dosage,
        frequency : prescription.frequency,
        duration : prescription.duration,
        notes : prescription.notes,
        status : prescription.status,
    })

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold text-slate-800'>Edit Prescription</h2>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'><LuX className='w-5 h-5' /></button>
                </div>
                <div className='flex flex-col space-y-3'>
                    {[
                        { label: 'Medication Name', key: 'medication_name', placeholder: 'e.g. Metformin' },
                        { label: 'Dosage', key: 'dosage', placeholder: '500mg' },
                        { label: 'Frequency', key: 'frequency', placeholder: 'Twice daily' },
                        { label: 'Duration', key: 'duration', placeholder: '30 days' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key} className='flex flex-col space-y-1'>
                            <label className='text-xs font-semibold text-slate-600'>{label}</label>
                            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                placeholder={placeholder} className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                    ))}
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Status</label>
                        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                            <option value='active'>Active</option>
                            <option value='completed'>Completed</option>
                            <option value='cancelled'>Cancelled</option>
                        </select>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Instructions</label>
                        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            rows={2} className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                    </div>
                    <div className='flex space-x-3 pt-1'>
                        <button onClick={onClose} className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'>Cancel</button>
                        <motion.button 
                            {...buttonEffects}
                            onClick={() => onSave(prescription.id, form)} className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'>Save Changes</motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}