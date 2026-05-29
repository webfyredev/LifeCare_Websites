import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LuSearch, LuChevronRight } from 'react-icons/lu'
import api from '../../api/axios'

export default function DoctorPatients(){
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const navigate = useNavigate()

    useEffect(() => { document.title = 'My Patients - LifeCare' })

    useEffect(() => {
        setLoading(true)
        api.get(`/doctors/patients/?search=${search}&filter=${filter}`)
            .then((res) => {
                console.log('Patients response:', res.data)
                setPatients(res.data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [search, filter])

    const getAge = (dob) => {
        if (!dob) return 'N/A'
        const diff = new Date() - new Date(dob)
        return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
    }

    const statusStyle = (status) => {
        if (status === 'critical') return 'bg-red-50 text-red-500'
        if (status === 'monitor') return 'bg-amber-50 text-amber-600'
        return 'bg-green-50 text-green-600'
    }
    return (
        <>
            <div className='w-full flex flex-col space-y-5 py-3'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>My Patients</h3>
                    <p className='text-[13px] text-[#94a3b8]'>{patients.length} patients under your care</p>
                </div>
                <div className='flex space-x-3'>
                    <div className='flex-1 flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-2'>
                        <LuSearch className='w-4 h-4 text-slate-400' />
                        <input
                            type='text'
                            placeholder='Search patients...'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='flex-1 text-sm outline-none bg-transparent text-slate-700 placeholder-slate-400'
                        />
                    </div>
                    {['all', 'critical', 'recent'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1 rounded-lg text-sm font-medium capitalize cursor-pointer transition-colors
                                ${filter === f ? 'bg-blue-600 text-white' : 'bg-white border border-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}
                        >
                            {f}
                        </button>
                    ))}
                    
                </div>
                <div className='bg-white border border-slate-100 rounded-xl overflow-hidden'>
                    {loading ? (
                        <div className='p-8 text-center text-sm text-slate-400'>Loading...</div>
                    ) : patients.length === 0 ? (
                        <div className='p-8 text-center text-sm text-slate-400'>No patients found</div>
                    ) : patients.map((p, index) => (
                        <div
                            key={p.id}
                            onClick={() => navigate(`/doctor/patients/${p.id}`)}
                            className={`flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors
                                ${index !== patients.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <div className='flex items-center space-x-4'>
                                {p.profile_picture ? (
                                    <img src={p.profile_picture} className='w-11 h-11 rounded-full object-cover' alt='' />
                                ) : (
                                    <div className='w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm flex-shrink-0'>
                                        {p.initials}
                                    </div>
                                )}
                                <div>
                                    <p className='text-sm font-semibold text-slate-800'>{p.name}</p>
                                    <p className='text-xs text-slate-400 mt-0.5'>
                                        {p.gender ? p.gender.charAt(0).toUpperCase() + p.gender.slice(1) : 'N/A'} · {getAge(p.date_of_birth)} yrs · {p.blood_type || 'N/A'}
                                    </p>
                                    <p className='text-xs text-slate-400 mt-0.5'>
                                        Last visit: {p.last_visit ? new Date(p.last_visit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${statusStyle(p.status)}`}>
                                    {p.status || 'Stable'}
                                </span>
                                <LuChevronRight className='w-4 h-4 text-slate-400' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}