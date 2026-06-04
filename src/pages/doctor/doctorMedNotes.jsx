import { useState, useEffect } from 'react'
import { LuPlus, LuX } from 'react-icons/lu'
import api from '../../api/axios'
import { buttonEffects } from '../../animations/effects'
import { motion } from 'framer-motion'

export default function DoctorMedicalNotes(){
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [showModal, setShowModal] = useState(false)
    const [patients, setPatients] = useState([])

    useEffect(() => { document.title = 'Medical Notes - LifeCare'})

    useEffect(() => {
        fetchNotes()
        api.get(`/doctors/patients/`).then((res) => setPatients(res.data)).catch(console.error)
    }, [])

    useEffect(() => { fetchNotes () }, [filter])

    const fetchNotes = () => {
        setLoading(true)
        const query = filter !== 'all' ? `?severity=${filter}` : ''
        api.get(`/notes/${query}`)
        .then((res) => setNotes(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }

    const severityStyle = (severity) => {
        if (severity === 'critical') return 'border-red-400 bg-red-50/30'
        if (severity === 'monitor') return 'border-amber-400 bg-amber-50/30'
        return 'border-blue-300 bg-blue-50/20'
    }

    const severityBadge = (severity) => {
        if (severity === 'critical') return 'bg-red-50 text-red-500'
        if (severity === 'monitor') return 'bg-amber-50 text-amber-600'
        return 'bg-blue-50 text-blue-600'
    }
    return(
        <div className='w-full flex flex-col space-y-5 py-3'>
            <div className='w-full flex items-center justify-between'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>Medical Notes</h3>
                    <p className='text-[13px] text-[#94a3b8]'>Clinical notes across all your patients</p>
                </div>
                {/* <button></button> */}
                <motion.button 
                    {...buttonEffects}
                    onClick={() => setShowModal(true)}
                    className='flex items-center space-x-1.5 text-sm font-medium px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-all duration-300'>
                    <LuPlus className='w-4 h-4' /><span>New Note</span>
                </motion.button>
            </div>
            <div className='flex space-x-2 mt-2'>
                {['all', 'normal', 'monitor', 'critical'].map((f) => (
                    <motion.button 
                        {...buttonEffects}
                        key={f} onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-lg text-sm font-medium capitalize cursor-pointer transition-colors
                            ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        {f}
                    </motion.button>
                ))}
            </div>
            <div className='w-full flex flex-col space-y-3 mt-2'>
                {loading ? (
                    <div className='bg-white p-8 text-center text-sm text-slate-400 rounded-xl border border-slate-100'>Loading...</div>
                ) : notes.length === 0 ? (
                    <div className='bg-white p-8 text-center text-sm text-slate-400 rounded-xl border border-slate-100'>No notes found</div>
                ): notes.map((n) => (
                    <div key={n.id} className={`w-full bg-white border-l-4 border-1 border-slate-200 rounded-xl px-4 py-3`}>
                        <div className='w-full flex items-center justify-between'>
                            <div className='flex items-center space-x-2 text-slate-800 font-semibold text-base'>
                                <h3>{n.title}</h3>
                                <span className='w-1 h-1 rounded-full bg-slate-800 mt-1'></span>
                                <span className='text-blue-500'>{n.patient_name}</span>
                            </div>
                            <span className={`text-[10px] font-medium px-4 py-1.5 rounded-full capitalize ${severityBadge(n.severity)}`}>
                                {n.severity}
                            </span>
                            {/* {n.category && (
                                <span className={`text-[10px] font-medium px-4 shadow-sm py-1.5 rounded-full ${severityBadge(n.severity)}`}>
                                    {n.category}
                                </span>
                            )} */}
                        </div>
                        <p className='text-[13px] text-slate-600 mt-1'>{n.content}</p>
                        <p className='text-xs text-slate-500 mt-2 font-medium'>
                            {new Date(n.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                ))}
            </div>
            {showModal && (
                <NewNoteModal
                    patients={patients}
                    onClose ={() => setShowModal(false)}
                    onSaved = {() => { setShowModal(false); fetchNotes() }}
                />
            )}
        </div>
    )
}

function NewNoteModal({ patients, onClose, onSaved }) {
    const [form, setForm] = useState({ patient_id: '', title: '', content: '', category: '', severity: 'normal' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/notes/', form)
            onSaved()
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl p-6 w-full max-w-md shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='font-semibold text-slate-800'>New Medical Note</h2>
                    <button onClick={onClose} className='text-slate-400 hover:text-slate-600 cursor-pointer'><LuX className='w-5 h-5' /></button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Patient</label>
                        <select value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} required
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                            <option value=''>Select patient...</option>
                            {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Title</label>
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                            placeholder='e.g. Follow-up visit' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                    </div>
                    <div className='flex space-x-3'>
                        <div className='flex flex-col space-y-1 flex-1'>
                            <label className='text-xs font-semibold text-slate-600'>Category</label>
                            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                placeholder='e.g. Hypertension' className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' />
                        </div>
                        <div className='flex flex-col space-y-1 flex-1'>
                            <label className='text-xs font-semibold text-slate-600'>Severity</label>
                            <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}
                                className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                                <option value='normal'>Normal</option>
                                <option value='monitor'>Monitor</option>
                                <option value='critical'>Critical</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Content</label>
                        <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={4}
                            placeholder='Clinical observations, diagnosis, next steps...'
                            className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none' />
                    </div>
                    <div className='flex space-x-3 pt-1'>
                        <button type='button' onClick={onClose} className='flex-1 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'>Cancel</button>
                        <motion.button 
                            {...buttonEffects}
                            type='submit' disabled={loading} className='flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer disabled:opacity-60'>
                            {loading ? 'Saving...' : 'Save Note'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}