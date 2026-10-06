import { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects";
import { LuBellMinus, LuCheck, LuChevronLeft, LuChevronRight, LuGripVertical, LuPlus, LuSearch, LuShieldCheck, LuTriangleAlert, LuX } from "react-icons/lu";
import api from "../../api/axios";
export default function Lifecare_Notifications(){
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter_type, setFilterType] = useState("all")
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [feedback, setFeedback] = useState({message : "", type : ""})
    const [status, setStatus] = useState("all")
    const [activeMenuId, setActiveMenuId] = useState(null)
    const [addNotification, setAddNotification] = useState(false)
    useEffect(() => {
        document.title = 'Manage Notifications - LifeCare (Admin Dashboard)'
    },[]);

    const fetchNotifications = async() => {
        setLoading(true)
        try{
            const response = await api.get('/admin/manage-notif/', { params : {search, filter_type, page, status}})
            setData(response.data)
        }catch(err){
            console.error('Error fetching notifications', err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [search, filter_type, page, status])


    const notification_data = data?.notif_data || []
    const totalCount = data?.pagination.count || 0

    const handleDeleteNotifications = async(id) => {
        try{
            const res = await api.delete(`/admin/delete-notif/${id}/`)
            setActiveMenuId(null)
            fetchNotifications()
            setFeedback({message : "Notification deleted successfully", type : "success"})
        }catch(err){
            setFeedback({message : "Failed to delete notification", type : "error"})
        }
    }
    const notificationTypeStyles = {
        appointment: 'bg-[#DBEAFE] text-[#2563EB]',
        message: 'bg-[#E0F2FE] text-[#0284C7]',
        prescription: 'bg-[#F3E8FF] text-[#9333EA]',
        lab_result: 'bg-[#DCFCE7] text-[#16A34A]',
        general: 'bg-[#F3F4F6] text-[#4B5563]',
    }
    
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Notifications</h3>
                        <p className='text-[13px] text-[#94a3b8]'>View and manage system notifications.</p>
                    </div>
                    <div className="flex space-x-5">
                        <motion.button
                            onClick={() => setAddNotification(true)}
                            {...buttonEffects}
                            className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                        >
                            <LuPlus className="mr-1" /> Add Notification
                        </motion.button>
                    </div>
                    
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className='p-4 border-b border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between'>
                        <div className="relative w-full md:w-120">
                            <LuSearch className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by patient_name, doctor_name, specialities..." 
                                // value={search}
                                // onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select 
                                value={filter_type}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Filter</option>
                                <option value="appointment">Appointments</option>
                                <option value="message">Message</option>
                                <option value="prescription">Prescription</option>
                                <option value="lab_result">Lab Result</option>
                                <option value="general">General</option>
                            </select>
                            <select 
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All</option>
                                <option value="False">Unread</option>
                                <option value="True">Read</option>

                            </select>
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
                            Loading notifications...
                        </p>
                    ) : notification_data.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuBellMinus size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">Notifications not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find a notification data matching your search</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="min-w-max w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Recipient</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Message</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Date</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {notification_data.map((notif) => (
                                        <tr key={notif.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4">
                                                <div className='flex flex-col'>
                                                    <span className='text-gray-800 font-semibold'>{notif.recipient}</span>
                                                    <a className="text-xs text-gray-500 font-medium hover:text-blue-600 transition-all duration-200" href={`mailto:${notif.recipient_email}`}>{notif.recipient_email}</a>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 capitalize rounded-lg text-xs font-medium capitaliza ${notif.role === 'doctor' ? 'bg-purple-100 text-purple-600' : notif.role === 'admin' ? 'bg-sky-100 text-sky-600' : 'bg-blue-100 text-blue-600'}`}
                                                >
                                                    {notif.role}
                                                </span>
                                            </td>
                                            <td className="p-4 ">
                                                <span className='text-gray-800 font-semibold'>{notif.title}</span>
                                            </td>
                                            
                                            <td className="p-4">
                                                <div className='text-left text-gray-800 font-semibold'>
                                                    {notif.message}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1.5 rounded-lg text-[11px] font-medium capitalize ${notificationTypeStyles[notif.type]}`}>{notif.type}</span>
                                            </td>
                                            
                                            <td className="p-4">
                                                <span className='text-gray-800 font-semibold '>{notif.date}</span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 capitalize rounded-lg text-xs font-medium capitaliza ${notif.is_read ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}
                                                >
                                                    {notif.is_read ? 'Read' : 'Unread'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === notif.id ? null : notif.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {activeMenuId === notif.id && (
                                                    <div className="absolute right-6 top-10 w-45 bg-whit rounded-xl shadow-lg border border-gray-100 -10 p-1 text-left flex flex-col space-y-2.5">
                                                        <button
                                                            onClick={() => {handleDeleteNotifications(notif.id)}}
                                                            className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-white bg-red-500 hover:bg-red-600"
                                                        >
                                                            Delete Notification
                                                        </button>
                                                    </div>
                                                )}
                                                {/* {activeMenuId === apt.id &&(
                                                    <div className="absolute right-6 top-10 w-45 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left flex flex-col items-center space-y-1.5">
                                                        {apt.status === 'pending' || apt.status === 'confirmed' ? 
                                                            <button
                                                            onClick={() => {
                                                                setRescheduleModal({
                                                                    open : true,
                                                                    appointmentId : apt.id,
                                                                    currentDate: apt.date,
                                                                    currentTime : apt.time
                                                                })
                                                                setActiveMenuId(null)
                                                            }}
                                                            
                                                            className='text-xs font-medium px-4 py-2 rounded-lg bg-[#F0F9FF] hover:bg-[#DBEAFE] text-slate-600 cursor-pointer transition-all duration-300'
                                                        >   
                                                            Reschedule Appointment
                                                        </button>    
                                                        : 
                                                        <span></span>
                                                        }
                                                        
                                                        {apt.status === 'cancelled' || apt.status === 'completed' ?
                                                            <motion.button
                                                                {...buttonEffects}
                                                                    onClick={() => deleteAppointments(apt.id)}
                                                                    className='text-xs w-full font-medium bg-red-500 px-4 py-2 rounded-lg text-white cursor-pointer'
                                                                >
                                                                Delete Appointment
                                                            </motion.button>
                                                        
                                                        :
                                                            <button
                                                                    onClick={() => {
                                                                        setCancelModal({open : true, appointmentId : apt.id})
                                                                        setActiveMenuId(null)
                                                                    }}
                                                                    className='text-xs w-full font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg text-red-500 cursor-pointer transition-all duration-300'
                                                                >
                                                                Cancel Appointment
                                                            </button>
                                                        }
                                                        
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
                            Showing <span className="font-semibold">{notification_data.length}</span> of <span className="font-semibold">{totalCount}</span> notifications
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!data?.pagination?.previous}
                                onClick={() => setPage(page -1)}
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
                    {addNotification && (
                        <AddNotification 
                            onClose={() => setAddNotification(false)}
                            onAdded={(msg) => {
                                setAddNotification(false);
                                fetchNotifications();
                                setFeedback({message : msg, type : "success"})
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

function AddNotification({onClose, onAdded}){
    const [formData, setFormData] = useState({
        title : "",
        body : "",
        recipient : "",
        type : "general",
    })

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('/admin/manage-users-list/')
        .then((res) => setUsers(res.data))
        .catch(err => console.error('Failed to fetch users', err))
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
        }, [error])
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)

        try{
            await api.post('/admin/manage-notif/', formData)
            onAdded("Notification added successfully!")

        }catch(err){
            console.error('Notification Failed', err)
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-slate-800">Add Notification</h2>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer transition"
                        >
                            <LuX  className="w-5 h-5" />
                        </button>
                    </div>
                    {error && (
                        <div className="bg-red-50 text-red-500 text-xs p-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-2 mt-2">
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Select Users</label>
                            <select
                                name="recipient"
                                value={formData.recipient}
                                onChange={handleChange}
                                required
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="">Choose users...</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} ({u.email})
                                        {/* {u.first_name || ''} {u.last_name || ''} ({u.role}) */}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="...."
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label className="text-xs font-semibold text-slate-600">Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange ={handleChange}
                                required
                                className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 bg-white"
                            >
                                <option value="appointment">Appointment</option>
                                <option value="message">Message</option>
                                <option value="prescription">Prescription</option>
                                <option value="lab_result">Lab Result</option>
                                <option value="general">General</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold text-slate-600">Message/Body</label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Write your notification..."
                            className="border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300 resize-none"

                        />
                    </div>
                        <motion.button {...buttonEffects} type="submit" disabled={loading} className="border-1 w-full h-11 mt-5 text-sm font-semibold text-white cursor-pointer bg-blue-600 rounded-lg">
                            {loading ? "Adding Notification..." : "Add Notification"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </>
    )

}