import { useState, useEffect } from 'react'
import { LuFlaskConical, LuScanLine, LuStethoscope, LuPocketKnife, LuSyringe, LuBadgeAlert, LuFileText, LuDownload, LuCalendarDays, LuUser, LuArrowDown, LuArrowUp } from 'react-icons/lu'
import api from '../../api/axios'
import { scrollRight } from '../../animations/effects'
import { motion } from 'framer-motion'

const RECORD_TYPES = [
    { key: 'all',         label: 'All' },
    { key: 'lab_result',  label: 'Lab Results' },
    { key: 'imaging',     label: 'Imaging' },
    { key: 'diagnosis',   label: 'Diagnosis' },
    { key: 'surgery',     label: 'Surgery' },
    { key: 'vaccination', label: 'Vaccination' },
    { key: 'allergy',     label: 'Allergy' },
    { key: 'general',     label: 'General' },
]

const typeConfig = {
    lab_result:  { icon: LuFlaskConical,    color: 'bg-blue-50 text-blue-600',   label: 'Lab Result' },
    imaging:     { icon: LuScanLine,        color: 'bg-purple-50 text-purple-600', label: 'Imaging' },
    diagnosis:   { icon: LuStethoscope,     color: 'bg-teal-50 text-teal-600',   label: 'Diagnosis' },
    surgery:     { icon: LuPocketKnife,         color: 'bg-red-50 text-red-500',     label: 'Surgery' },
    vaccination: { icon: LuSyringe,         color: 'bg-green-50 text-green-600', label: 'Vaccination' },
    allergy:     { icon: LuBadgeAlert,   color: 'bg-amber-50 text-amber-600', label: 'Allergy' },
    general:     { icon: LuFileText,        color: 'bg-slate-50 text-slate-500', label: 'General' },
}

export default function PatientRecords (){
    const [data, setData] = useState(null)
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {document.title = 'Medical Records - LifeCare'})

    useEffect(() => {
        setLoading(true)
        api.get(`/patients/records/?filter=${filter}`)
        .then((res) => setData(res.data))
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [filter])

    const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    })

    const data_records = [
        {
            id : 1,
            label : 'Total Records',
            value : data?.total ?? 0,
            style : 'text-blue-600'
        },
        {
            id : 2,
            label : 'Lab Results',
            value :data?.type_counts?.lab_result ?? 0,
            style : 'text-blue-600'
        },
        {
            id : 3,
            label : 'Imaging',
            value : data?.type_counts?.imaging ?? 0,
            style : 'text-purple-600'
        },
        {
            id : 4,
            label : 'Vaccinations',
            value : data?.type_counts?.vaccination ?? 0,
            style : 'text-green-600'
        }
    ]
    return(
        <>
            <div className="w-full lg:p-5 space-y-5">
                <h3 className='font-bold text-2xl text-[#1e293b] mt-3 lg:mt-0'>Medical Records</h3>
                {/* <p className='text-[13px] text-[#94a3b8]'>Access and download your health records</p> */}
                <div className='w-full py-3 mt-5 grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {data_records.map((record) => (
                        <div key={record.id} className='px-5 py-4 border-1 border-slate-100 rounded-xl bg-white flex flex-col'>
                            <h3 className='font-semibold text-slate-500 text-[15px]'>
                                {record.label}
                            </h3>
                            <p className={`text-3xl font-bold mt-1 ${record.style}`}>
                                {record.value}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='w-full p-5 border border-slate-200 rounded-xl overflow-hidden'>
                    {loading ? (
                        <div className='p-10 text-center text-sm text-slate'>
                            Loading records....
                        </div>
                    ) : !data?.records?.length ? (
                        <div className='p-10 text-center flex flex-col items-center space-y-2'>
                            <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center'>
                                <LuFileText className='w-5 h-5 text-slate-400' />
                            </div>
                            <p className='text-sm text-slate-400'>No records found</p>
                            <p className='text-xs text-slate-300'>Records added by your doctor will appear here</p>
                        </div>
                    ) : (
                        data.records.map((record, index) => {
                            const config = typeConfig[record.record_type] || typeConfig.general
                            const Icon = config.icon
                            const isExpanded =  expandedId === record.id

                            return (
                                <div
                                    key={record.id}
                                    className={`${index !== data.records.length - 1 ? 'border-b border-slate-200 mb-3 lg:mb-0' : ''}`}>
                                        <div
                                            onClick={() => setExpandedId(isExpanded ? null : record.id)}
                                            className='w-full md:flex md:flex-row md:items-center md:justify-between space-y-5 md:space-y-0 flex flex-col md:px-5 py-2 md:py-4 cursor-pointer hover:bg-slate-50 transition-all duration-300'
                                        >
                                            <div className='flex items-center space-x-4'>
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${config.color}`}>
                                                    <Icon className='w-5 h-5' />
                                                </div>
                                                <div>
                                                    <div className='flex items-center space-x-4 md:space-x-2'>
                                                        <p className='text-sm font-semibold text-slate-800'>{record.title}</p>
                                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${config.color}`}>
                                                            {config.label}
                                                        </span>
                                                    </div>
                                                    <div className='flex items-center space-x-4 mt-1.5'>
                                                        <span className='flex items-center space-x-1.5 text-xs text-slate-400'>
                                                            <LuCalendarDays  className='w-3 h-3'/>
                                                            <span className='font-semibold'>{formatDate(record.date_recorded)}</span>
                                                        </span>
                                                        <span className='flex items-center space-x-1.5 text-xs text-slate-400'>
                                                            <LuUser  className='w-3 h-3'/>
                                                            <span className='font-semibold'>{record.doctor_name}</span>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex items-center space-x-3'>
                                                {record.file && (
                                                    <a
                                                        href={record.file}
                                                        target= '_blank'
                                                        rel='noreferrer'
                                                        onClick={(e) => e.stopPropagation()}
                                                        className='flex items-center space-x-1.5 text-xs font-medium px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-300'
                                                    >
                                                        <LuDownload  className='w-3.5 h-3.5'/>
                                                        <span>Download</span>

                                                    </a>
                                                )}
                                                {/* <span className={`text-xs text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                                    {isExpanded ? <LuArrowDown /> : <LuArrowUp />}
                                                </span> */}
                                            </div>

                                        </div>
                                    {isExpanded && record.description && (
                                        <motion.div 
                                            {...scrollRight}
                                            className='border-1 px-5 mb-4 bg-slate-100 border-t border-slate-100 rounded-xl flex items-center'>
                                            <p className='text-[14px] text-blue-500 font-semibold'>Description:</p>
                                            <p className='text-[14px] text-slate-600 leading-relaxed p-3'>
                                                {record.description}
                                            </p>
                                        </motion.div>
                                    )}

                                </div>
                            )

                        })
                    )}

                </div>
            </div>
        </>
    )
}