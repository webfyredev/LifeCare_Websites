import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"
import { LuArrowDown, LuArrowUp, LuClipboardCheck, LuClipboardList, LuDownload, LuFileCheck2, LuFileX2, LuGripVertical, LuPill, LuPlus, LuSearch, LuShieldCheck, LuTriangleAlert, LuX } from "react-icons/lu"
import api from "../../api/axios"

export default function Lifecare_Prescriptions(){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState('all')
    const [doctors, setDoctors] = useState('all');
    const [page, setPage] = useState(1)
    const [feedback, setFeedback] = useState({message : "", type : ""})
    const fetchPrescriptions = async() => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-prescriptions/', {params : {search, status, doctors, page}})
            setData(response.data)
        }catch (err){
            console.error('Error fetching prescriptions data', err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPrescriptions();
    }, [search, status, doctors, page])


    useEffect(() => {
        document.title = 'Manage Prescriptions - Lifecare (Admin_Dashboard)'
    })

    const prescription_data = data?.prep_data || []
    const totalCount = data?.pagination?.count || 0
    
    const prescriptions_stats = [
        {
            label : 'Total Prescriptions',
            value : data?.stats?.total_prep ?? 0,
            change : data?.stats?.total_prep_change?.precentage ?? 0,
            direction : data?.stats?.total_prep_change?.direction,
            icon : LuClipboardList,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Active Prescriptions',
            value : data?.stats?.active_prep ?? 0,
            change : data?.stats?.active_prep_change?.percentage ?? 0,
            direction : data?.stats?.active_prep_change?.direction,
            icon : LuClipboardCheck,
            style : 'bg-[#DCFCE7] text-[#16A34A]'
        },
        {
            label : 'Completed Prescriptions',
            value : data?.stats?.completed_prep ?? 0,
            change : data?.stats?.completed_prep_change?.percentage ?? 0,
            direction : data?.stats?.completed_prep_change?.direction,
            icon : LuFileCheck2,
            style : 'bg-[#F3E8FF] text-[#9333EA]'
        },
        {
            label : 'Cancelled Prescriptions',
            value : data?.stats?.cancelled_prep ?? 0,
            change : data?.stats?.cancelled_prep_change?.percentage ?? 0,
            direction : data?.stats?.cancelled_prep_change?.direction,
            icon : LuFileX2,
            style : 'bg-[#FEE2E2] text-[#DC2626]'
        }
    ]
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Prescriptions</h3>
                        <p className='text-[13px] text-[#94a3b8]'>Manage patient prescriptions and medical records.</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        // onClick={() => setAddDoctors(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Add Prescription
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {prescriptions_stats.map((data) => (
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
                                placeholder="Search by patient, doctor or medication..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            
                            <select value={doctors} 
                                onChange={(e) => setDoctors(e.target.value)} 
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Doctors</option>
                                {prescription_data ? 
                                    <option>
                                        {prescription_data.doctor}
                                    </option>
                                    : <option>''</option>
                                }
                                {/* <option value="pediatrics">Pediatrics</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="Neurosurgeon">Neuro-surgeon</option>
                                <option value="ophthalmology">Ophthalmology</option> */}
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
                            Loading prescriptions...
                        </p>
                    ) : prescription_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuPill size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Prescriptions not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find a prescription matching your search</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Patient</th>
                                        <th className="p-4">Doctor</th>
                                        <th className="p-4">Medication</th>
                                        <th className="p-4">Prescribed Date</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-center">Actions</th>

                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {prescription_data.map((prep) => (
                                        <tr key={prep.id} className="hover:bg-ray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{prep.patient}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.patient_email}`}>{prep.patient_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{prep.doctor}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${prep.doctor_email}`}>{prep.doctor_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.medication}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.prescribed_date}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold'>{prep.status}</span>
                                            </td>
                                            <td className="p-4 text-center relative">
                                                <button
                                                    // onClick={() => setActiveMenuId(activeMenuId === doctor.id ? null : doctor.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {/* {activeMenuId === doctor.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center justify-center">
                                                        <button
                                                            onClick={() => handleToggleStatus(doctor.id, doctor.is_active)}
                                                            className="w-full text-left flex items-center px-3 py-2 text-xs text-gray-700 mb-1.5 bg-amber-50/50 font-medium rounded-md hover:bg-amber-50 cursor-pointer"
                                                        >   
                                                            {doctor.is_active ? <><LuCircleAlert  className="mr-1"/> Reject Doctor</> : <><LuShield className="mr-1" /> Approve Doctor</>}
                                                        </button>
                                                        <button
                                                                onClick={() => handleDeleteDoctors(doctor.id)}
                                                                className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-rose-600 bg-rose-50/50 hover:bg-rose-50"
                                                            >
                                                            <LuTriangleAlert  className="mr-1"/> Delete Doctor_Account
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
                </div>
            </div>
        </>
    )
}