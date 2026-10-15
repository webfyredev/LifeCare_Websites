import { useEffect, useState } from "react"
import api from "../../api/axios"
import { LuChevronLeft, LuPlus, LuChevronRight, LuClock, LuGripVertical, LuMessageCircle, LuMessageCircleX, LuMessagesSquare, LuSearch, LuX, LuLoader, LuTriangleAlert, LuShieldCheck } from "react-icons/lu"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"
export default function Lifecare_Messages(){
    const [loading, setLoading] = useState(true)
    // const [conversations, setConversations] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('all')
    const [page, setPage] = useState(1)
    const [data, setData] = useState(null)
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [feedback, setFeedback] = useState({message : "", type : ""})

    useEffect(() => {
        document.title = 'Message Management - LifeCare Admin'
    }, []);

    const fetchMessages = async () => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-messsages/', {params : { search, status, page}})
            setData(response.data)
        }catch(err){
            console.error('Error fetching messages', err);
        }finally{
            setLoading(false);
        }
    }

    const deleteConversations = async(conv_id) => {
        try{
            const response = await api.delete(`/admin/conversations/${conv_id}/delete/`)
            setActiveMenuId(null);
            fetchMessages()
            setFeedback({message : "Conversation deleted sucessfully", type : "success"})
        }catch(err){
            setFeedback({message : "Failed to delete conversation", type : "error" })
            console.error('Failed to delete conversations', err)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [search, page, status])

    const messages_stats = [
        {
            label : 'Total Conversations',
            value : data?.stats?.total_conversations ?? 0,
            icon : LuMessagesSquare,
            style : 'bg-[#DBEAFE] text-[#2563EB]'
        },
        {
            label : 'Active Conversations',
            value : data?.stats?.active_conversations ?? 0,
            icon : LuMessageCircle,
            style : 'bg-[#DCFCE7] text-[#16A34A]'
        },
        {
            label : 'Pending / Unread',
            value : data?.stats?.pending_conversations ?? 0,
            icon : LuClock,
            style : 'bg-[#FEF3C7] text-[#D97706]'

        }
    ]
    const messages = data?.conversations || []
    const totalCount = data?.pagination?.count || 0

    return(
        <>
            <div className="w-full space-y-5">
                <div className="md:flex md:flex-row flex flex-col md:items-center md:justify-between w-full space-y-5 md:space-y-0">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Message Management</h3>
                        <p className='text-[13px] text-[#94a3b8]'>View and manage conversations between patients and doctors.</p>
                    </div>
                    <div className="flex flex-col space-y-3">
                        <motion.button
                            onClick={() => setIsOpenModal(true)}
                            {...buttonEffects}
                            className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                        >
                            <LuPlus className="mr-1" /> Add Conversation
                        </motion.button>
                        <div className="flex items-center gap-3">
                            <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white cursor-pointer"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending / Unread</option>
                        </select>
                        <div className="relative w-64">
                            <LuSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                value={search}
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 bg-white pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {messages_stats.map((data) => (
                        <div className="p-5 border bg-white flex space-x-2.5 border-1 border-gray-100 rounded-xl shadow-xs hover:shadow-sm transition-all duration-300">
                            <div className={`w-9 h-9 flex items-center justify-center ${data.style} rounded-lg`}>
                                <data.icon size={18} />
                            </div>
                            <div>
                                <p className="text-[13px] text-gray-500 font-medium">{data.label}</p>
                                <h3 className="font-bold text-2xl text-gray-800 mt-1">{data.value}</h3>
                            </div>
                        </div>
                    ))}
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
                        Loading messages...
                    </p>
                ) : messages.length === 0 ? (
                    <div className="w-full p-12 flex items-center justify-center flex-col">
                        <LuMessageCircleX size={22}  className="text-gray-400 mb-3"/>
                        <p className="text-sm text-gray-700 font-medium">Messages not Found</p>
                        <p className="text-xs text-gray-400 mt-1">We couldn't find a message matching your search</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="min-w-max w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                    <th className="p-4">Patient</th>
                                    <th className="p-4">Doctor</th>
                                    <th className="p-4">Last Message</th>
                                    <th className="p-4">Last Activity</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {messages.map((msg) => (
                                    <tr key={msg.id} className="hover:bg-gray-50/50 transition-colors">
                                        
                                        <td className="p-4">
                                            <div className='flex space-x-2'>
                                                {msg.patient.avatar ? (
                                                    <img src={msg.patient.avatar} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs">
                                                        {msg.patient.initials}
                                                    </div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className='text-gray-800 font-semibold'>{msg.patient.name}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${msg.patient.email}`}>{msg.patient.email}</a>
                                                </div>
                                            </div>
                                            
                                        </td>
                                        <td className="p-4 ">
                                            <div className='flex space-x-2'>
                                                {msg.doctor.avatar ? (
                                                    <img src={msg.doctor.avatar} className="w-10 h-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs">
                                                        {msg.doctor.initials}
                                                    </div>
                                                )}
                                                <div className="flex flex-col space-y-1.5">
                                                    <span className='text-gray-800 font-semibold'>Dr. {msg.doctor.name}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${msg.doctor.email}`}>{msg.doctor.email}</a>
                                                </div>
                                            </div>
                                            
                                        </td>
                                        <td className="p-4">
                                            <div className='text-left text-gray-800 font-semibold truncate max-w-xs'>
                                                {msg.last_message}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className='text-gray-800 font-semibold '>{msg.last_activity || 'N/A'}</span>
                                        </td>
                                        
                                        <td className="p-4">
                                            <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize ${msg.status === 'Active' ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                                                {msg.status}
                                            </span>
                                        </td>
                                        
                                        <td className="p-4 text-center relative">
                                            <button
                                                onClick={() => setActiveMenuId(activeMenuId === msg.id ? null : msg.id)}
                                                className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                            >
                                                <LuGripVertical className="w-4 h-4" />
                                            </button>
                                            {activeMenuId === msg.id &&(
                                                <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center space-y-1.5">
                                                    <motion.button
                                                        {...buttonEffects}
                                                            onClick={() => deleteConversations(msg.id)}
                                                            className='text-xs w-full font-medium bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer'
                                                        >
                                                        Delete Conversations
                                                    </motion.button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <div>
                        Showing <span className="font-semibold">{messages.length}</span> of <span className="font-semibold">{totalCount}</span> messages
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            disabled={!data?.pagination?.previous}
                            onClick={() => setPage(page - 1)}
                            className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                        >
                            <LuChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                        <button
                            disabled={!data?.pagination?.next}
                            onClick={() => setPage(page + 1)}
                            className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                        >
                            <LuChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {isOpenModal && (
                    <AddConversationModal 
                        onClose={() => setIsOpenModal(false)}
                        onCreated={() => fetchMessages()}
                    />
                )}
            </div>
        </>
    )
}

function AddConversationModal({onClose, onCreated}){
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [formData, setFormData] = useState({patient_id: '', doctor_id:''})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState({message : "", type : ""})

    useEffect(() => {
        const fetchDropdownData = async () => {
            try{
                const [patientRes, doctorRes] = await Promise.all([
                    api.get('/admin/manage-patients-list/'),
                    api.get('/admin/manage-doctors-list/')
                ]);
                setPatients(patientRes.data.results || patientRes.data || []);
                setDoctors(doctorRes.data.results || doctorRes.data || [])
            }catch(err){
                console.error('Failed to load users', err)
                // setError('Failed to load patient or doctor lists')
                setFeedback({message : "Failed to load patient or doctor lists", type : "error"})
            }
        };
        fetchDropdownData();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')

        try{
            await api.post('/admin/conversations/add/', formData);
            onCreated();
            onClose();
            setFeedback({message : "Conversation created successfullly", type : "success"})
        }catch(err){
            setFeedback({message : "Failed to create conversation or conversation already existed", type : "error"})
            // setError(err.response?.data?.error || 'Failed to create conversation or conversation already existed.')
        } finally{
            setLoading(false)
        }
    }   
    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-slate-800">
                        Create New Conversations
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <LuX  className="w-5 h-5"/>
                    </button>
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
                {/* {error && <div className="mb-3 p-2 bg-red-50 text-red-600 text-xs rounded-lg">{error}</div>} */}
                
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Select Patient</label>
                        <select 
                            value={formData.patient_id} 
                            onChange={(e) => setFormData({...formData, patient_id:e.target.value})} 
                            required
                            className='border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 outline-blue-300'>
                            <option value="">Choose a patient...</option>
                                {patients.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name || `${p.first_name} ${p.last_name}`} ({p.email})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <label className='text-xs font-semibold text-slate-600'>Select Patient</label>
                        <select 
                            value={formData.doctor_id} 
                            onChange={(e) => setFormData({...formData, doctor_id:e.target.value})} 
                            required
                            className='border border-slate-100 rounded-lg px-3 py-2 text-sm text-slate-700 outline-blue-300'>
                            <option value="">Choose doctor...</option>
                                {doctors.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        Dr. {d.name || `${d.first_name} ${d.last_name}`} ({d.email})
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="flex space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 text-sm border border-slate-200 font-semibold rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium flex justify-center items-center"
                        >
                            {loading ? <LuLoader className="w-4 h-4 animate-spin" /> : 'Create Conversation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}