import { useState, useEffect } from 'react'
import { LuPill, LuUser, LuCalendarDays } from 'react-icons/lu'
import api from '../../api/axios'
export default function PatientPrescriptions(){
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        document.title = 'Prescriptions - Lifecare'
    })

     const fetchPrescriptions = (f = filter) => {
        setLoading(true)
        api.get(`/patients/prescriptions/?filter=${f}`)
            .then((res) => setData(res.data))
            .catch(console.error)
            .finally(() => setLoading(false))
    }
    useEffect(() => { fetchPrescriptions(filter) }, [filter])

    const statusStyle = (status) => {
        if (status === 'active') return 'bg-blue-50 text-blue-600'
        if (status === 'completed') return 'bg-slate-100 text-slate-500'
        return 'bg-red-50 text-red-400'
    }

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    })
    const prescription_stats = [
        {
            label : 'Active Prescriptions',
            value : data?.active_count ?? 0,
            style : 'text-blue-600'
        },
        {
            label : 'Completed',
            value : data?.completed_count ?? 0,
            style : 'text-slate-300'
        },
        {
            label : 'Total Medications',
            value : data?.total_count ?? 0,
            style : 'text-blue-600'

        }
    ]
    return(

        <>
            <div className='w-full md:p-3 flex flex-col'>
                <h3 className='font-semibold text-2xl text-[#1e293b]'>Prescriptions</h3>
                <p className='text-[13px] text-[#94a3b8]'>
                    Manage your medications and prescriptions
                </p>
                <div className='w-full py-3 mt-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4'>
                    {prescription_stats.map((data, index) => (
                        <div className='w-auto p-3 border-1 rounded-xl flex flex-col bg-white border-[#f1f5f9]'>
                            <h3 className='font-semibold text-slate-400 text-[14px]'>{data.label}</h3>
                            <p className={`font-bold ${data.style} text-3xl mt-2`}>{data.value}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex space-x-2 mt-3 px-1 md:px-5'>
                {['all', 'active', 'completed'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer
                            ${filter === f
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <div className='w-full md:w-[97.5%] md:ml-4 bg-white border border-slate-100 rounded-xl overflow-hidden mt-5'>
                {loading ? (
                    <div className='p-8 text-center'>
                        <p className='text-sm text-slate-400'>Loading prescriptions...</p>
                    </div>
                ) : !data?.prescriptions?.length ? (
                    <div className='p-8 text-center'>
                        <p className='text-sm text-slate-400'>No prescriptions found</p>
                    </div>
                ) : (
                    data.prescriptions.map((p, index) => (
                        <div
                            key={p.id}
                            className={`md:flex md:flex-row md:items-center md:justify-between flex flex-col px-5 py-4
                                ${index !== data.prescriptions.length - 1 ? 'border-b border-slate-100' : ''}`}
                        >
                            <div className='flex items-center space-x-4'>
                                {/* Icon */}
                                <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0'>
                                    <LuPill className='w-5 h-5 text-blue-500' />
                                </div>

                                {/* Info */}
                                <div className='flex flex-col space-y-1'>
                                    <div className='flex items-center space-x-5 md:space-x-2 mt-4 md:mt-0'>
                                        <p className='text-sm font-semibold text-slate-800'>{p.medication_name}</p>
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(p.status)}`}>
                                            {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className='flex space-x-3 mt-1.5'>
                                        <p className='text-xs text-slate-600 font-semibold'>
                                            {p.dosage}
                                        </p>
                                        <p className='text-xs text-slate-500 font-medium'>
                                            {p.frequency}
                                        </p>
                                        <p className='text-xs text-slate-500 font-medium'>
                                            {p.duration}
                                        </p>
                                    </div>
                                    
                                    <div className='flex items-center space-x-4'>
                                        <span className='flex items-center space-x-1 text-xs text-slate-400'>
                                            <LuUser className='w-3 h-3' />
                                            <span>{p.doctor_name}</span>
                                        </span>
                                        <span className='flex items-center space-x-1 text-xs text-slate-400'>
                                            <LuCalendarDays className='w-3 h-3' />
                                            <span>{formatDate(p.prescribed_date)}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Notes / instructions */}
                            {p.notes && (
                                <span className='text-xs text-slate-500 italic md:max-w-[180px] text-center mt-2 md:mt-0 md:text-right'>
                                    {p.notes}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>

        </>
    )
}