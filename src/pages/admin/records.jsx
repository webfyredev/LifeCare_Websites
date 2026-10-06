import { useEffect, useState } from "react"
import api from "../../api/axios"
import { LuArrowDown, LuArrowUp, LuChevronLeft, LuChevronRight, LuClipboardList, LuDownload, LuFiles, LuFlaskConical, LuGripVertical, LuPlus, LuSearch, LuShieldCheck, LuStethoscope, LuTriangleAlert, LuX } from "react-icons/lu"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"
export default function Lifecare_Records(){
    const [recordsData, setRecordsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [recordType, setRecordType] = useState('all')
    const [patients, setPatients] = useState('all')
    const [feedback, setFeedback] = useState({message : "", type : ""})
    
    const fetchMedicalRecords = async () => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-records/', {params : {search, recordType, page, patients}})
            setRecordsData(response.data)
        }catch(err){
            console.error('Error fetching medical records', err)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchMedicalRecords();
    }, [search, recordType, page, patients])

    useEffect(() => {
        document.title = 'Manage Records - Lifecare (Admin Dashboard)'
    })

    useEffect(() => {
        api.get('/admin/manage-patients-list/')
        .then((res) => setPatients(res.data))
        .catch((err) => console.error('Error fetching patients', err))
    });
    
    const records_data = recordsData?.records_data || []
    const totalCount = recordsData?.pagination?.count || 0
    const record_type_style = {
        lab_result : 'bg-purple-50 text-purple-700',
        imaging : 'bg-indigo-50 text-indigo-700',
        diagnosis : 'bg-amber-50 text-amber-700',
        surgery : 'bg-rose-50 text-rose-700',
        vaccination : 'bg-emerald-50 text-emerald-700',
        allergy : 'bg-red-50 text-red-700',
        general : 'bg-slate-100 text-slate-700'
    }
    const formatDateTime = (dt) => {
        return new Date(dt).toLocaleTimeString("en-US", {month : 'long', day:'numeric', year: 'numeric'})
    }
    const medical_records_stats = [
        {
            label : 'Total Records',
            value : recordsData?.stats?.total_records ?? 0,
            change : recordsData?.stats?.total_records_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_records_change?.direction,
            icon : LuFiles,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Lab Results',
            value : recordsData?.stats?.total_lab_results ?? 0,
            change : recordsData?.stats?.total_lab_results_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_lab_results_change?.direction,
            icon : LuFlaskConical,
            style : 'bg-[#CFFAFE] text-[#0891B2]'
        },
        {
            label : 'Diagnosis',
            value : recordsData?.stats?.total_diagnosis_results ?? 0,
            change : recordsData?.stats?.total_diagnosis_result_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_diagnosis_result_change?.direction,
            icon : LuStethoscope,
            style : 'bg-[#F3E8FF] text-[#9333EA]'
        },
        {
            label : 'General',
            value : recordsData?.stats?.total_general_results ?? 0,
            change : recordsData?.stats?.total_general_results_change?.percentage ?? 0,
            direction : recordsData?.stats?.total_general_results_change?.direction,
            icon : LuClipboardList,
            style : 'bg-[#FFEDD5] text-[#EA580C]'
        }
    ]
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Medical Records</h3>
                        <p className='text-[13px] text-[#94a3b8]'>Access and manage patient medical records.</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        // onClick={() => setCreatePrescription(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Add Records
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {medical_records_stats.map((data) => (
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
                                placeholder="Search by patient, record or title..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            
                            <select value={recordType}
                                onChange={(e) => setRecordType(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Record Types</option>
                                <option value="lab_result">Lab Results</option>
                                <option value="imaging">Imaging</option>
                                <option value="diagnosis">Diagnosis</option>
                                <option value="surgery">Surgery</option>
                                <option value="vaccination">Vaccination</option>
                                <option  value="allergy">Allergy</option>
                                <option value="general">General</option>
                            </select>
                            
                            <select 
                                value={patients} 
                                onChange={(e) => setPatients(e.target.value)} 
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Patients</option>
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
                            Loading records...
                        </p>
                    ) : records_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuFiles size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Records not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find records matching your search</p>
                        </div>
                    ) : (
                        <div className="w-full overflow-x-auto min-h-[300px]">
                            <table className="min-w-max w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Patient</th>
                                        <th className="p-4">Record Type</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Date Recorded</th>
                                        <th className="p-4">Doctor</th>
                                        <th className="p-4">Files</th>
                                        <th className="p-4">Description</th>
                                        <th className="p-4">Date Created</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {records_data.map((record) => (
                                        <tr key={record.id} className="hover:bg-ray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{record.patient}</span>
                                                    {/* <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.patient_email}`}>{prep.patient_email}</a> */}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px]  font-medium capitalize ${record_type_style[record.record_type]}`}>{record.record_type}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{record.title}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-center text-gray-800 font-semibold'>{record.date}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{record.doctor}</span>
                                            </td>
                                            {record.file ? (
                                                <td className="p-4">
                                                    <a
                                                    // href={record.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className=" p-4 text-blue-500 hover:text-blue-700 underline font-medium cursor-pointer"
                                                    >
                                                        {/* View file */}
                                                        {record.file}
                                                    </a>
                                                </td>
                                                
                                            ) : (
                                                <td className="p-4">
                                                    <span className='text-gray-800 font-semibold'>No file attached</span>
                                                </td>
                                            )}
                                            <td className="p-4">
                                                <div className="w-90 text-left text-gray-800 font-medium">
                                                    {record.description || 'N/A'}
                                                </div>
                                            </td>
                                            
                                            <td className="p-4">
                                                <span className='text-center text-gray-800 font-semibold'>{formatDateTime(record.created_at)}</span>
                                            </td>
                                            {/* <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize`}>{formatDateTime(record.created_at)}</span>
                                            </td> */}
                                            <td className="p-4 text-center relative">
                                                <button
                                                    // onClick={() => setActiveMenuId(activeMenuId === record.id ? null : record.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {/* {activeMenuId === prep.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center justify-center">
                                                        <button
                                                            className="w-full text-left flex items-center px-3 py-2 text-xs mb-1.5 font-medium rounded-md cursor-pointer bg-[#DBEAFE]/50 hover:bg-[#DBEAFE] text-[#2563EB] transition-all duration-300"
                                                        >   
                                                        Edit Prescription
                                                        </button>
                                                        <button
                                                                className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-white bg-red-500 hover:bg-red-600"
                                                            >
                                                                Delete Prescription
                                                        </button>
                                                    
                                                    </div>
                                                )} */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>
                            Showing <span className="font-semibold">{records_data.length}</span> of <span className="font-semibold">{totalCount}</span> records
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!records_data?.pagination?.previous}
                                onClick={() => setPage(page - 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!records_data?.pagination?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}