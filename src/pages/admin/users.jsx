import { useEffect, useState } from "react"
import { LuArrowDown, LuArrowUp, LuCalendarDays, LuChevronLeft, LuChevronRight, LuCircleAlert, LuDownload, LuFoldVertical, LuGripVertical, LuMoveVertical, LuPlus, LuSearch, LuShield, LuShieldCheck, LuStethoscope, LuTriangleAlert, LuUserRound, LuUserRoundMinus, LuUserRoundX, LuUsers, LuX } from "react-icons/lu"
import { motion } from 'framer-motion'
import { buttonEffects } from "../../animations/effects"
import api from "../../api/axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Lifecare_Users(){
    const [dashboard, setDashboard] = useState(null)
    const [data, setData] = useState(null)
    const [addUsers, setAddUsers] = useState(false)
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("");
    const [role, setRole] = useState('all');
    const [status, setStatus] = useState('all')
    const [page, setPage] = useState(1);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [feedback, setFeedback] = useState({message: "", type: ""})

    const navigate = useNavigate();


    useEffect(() => {
        if(feedback.message){
            const timer = setTimeout(() => setFeedback({message : "", type : ""}), 4000)
            return () => clearTimeout(timer)
        }
    },[feedback]);
    const fetchUsers = async() => {
        setLoading(true);
        try{
            const response = await api.get(`/admin/manage-users/`, {params : {search, role, status, page} });
            setData(response.data)
        }catch(err){
            console.error('Error fetching users data:', err)
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [search, role, status, page])

    const handleToggleStatus = async (userId, isActive) => {
        const endpoint = isActive ? `/admin/manage-users/${userId}/suspend/` : `/admin/manage-users/${userId}/restore/`
        try {
            const res = await api.patch(endpoint)
            setActiveMenuId(null);
            fetchUsers();
            setFeedback({
                message : res.data?.message || `User ${isActive ? 'suspended' : 'restored'} successfully!`,
                type:"success"
            })
        }catch (err){
            console.error('Failed to change user status', err)
            setFeedback({message : "Failed to update user status.", type: "error"})
        }
    }

    const handleDeleteUser = async(userId) => {
        try{
            const res = await api.delete(`/admin/manage-users/${userId}/`);
            setActiveMenuId(null);
            fetchUsers();
            setFeedback({
                message : "User deleted successfully!", type: "success"
            })
        }catch (err){
            console.error('Failed to delete user', err)
            setFeedback({message : "Failed to delete user.", type : "error"})
        }
    }

    useEffect(() => {
        document.title = 'Manage-Users - LifeCare (Admin Dashboard)'
    });


    useEffect(() => {
        api.get('/admin/dashboard/')
        .then((res) => setDashboard(res.data))
        .catch(console.error)
    }, []);

    const userList = data?.results?.users || []
    const totalCount = data?.count || 0

    const system_stats = [
        {
            label : 'Users',
            value : dashboard?.stats?.total_users ?? 0,
            change : dashboard?.stats?.user_change?.percentage ?? 0,
            direction : dashboard?.stats?.user_change?.direction,
            icon : LuUsers,
            style : "bg-[#DBEAFE] text-[#2563EB]"
        },
        {
            label: 'Patients',
            value : dashboard?.stats?.total_patients ?? 0,
            change : dashboard?.stats?.patient_change?.percentage ?? 0,
            direction : dashboard?.stats?.patient_change?.direction,
            icon : LuUserRound,
            style : "bg-[#DCFCE7] text-[#16A34A]"
        },
        {
            label : 'Doctors',
            value : dashboard?.stats?.total_doctors ?? 0,
            change : dashboard?.stats?.doctor_change?.percentage ?? 0,
            direction : dashboard?.stats?.doctor_change?.direction,
            icon : LuStethoscope,
            style : "bg-[#F3E8FF] text-[#9333EA]"
        },
        {
            label : 'Admins',
            value : dashboard?.stats?.total_admin ?? 0,
            change : dashboard?.stats?.admin_change?.percentage ?? 0,
            direction : dashboard?.stats?.admin_change?.direction,
            icon : LuShieldCheck,
            style : "bg-[#DBEAFE] text-[#2563EB]"

        }
    ]

    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Users</h3>
                        <p className='text-[13px] text-[#94a3b8]'>Manage all platform users (patients, doctors, and admins).</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        onClick={() => setAddUsers(true)}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Add User
                    </motion.button>
                </div>
                <div className="w-full py-2 mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {system_stats.map((data) => (
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
                                placeholder="Search users by name, email or phone..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4  py-2.5 border border-gray-200 rounded-lg text-sm outline-none  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition"
                            />
                        </div>
                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select value={role} 
                                onChange={(e) => setRole(e.target.value)} 
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Roles</option>
                                <option value="patient">Patients</option>
                                <option value="doctor">Doctors</option>
                                <option value="admin">Admins</option>
                            </select>
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
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
                            Loading users...
                        </p>
                    ) : userList.length === 0 ? (
                        <div className="w-full p-12 flex items-center justify-center flex-col">
                            <LuUserRoundX size={22}  className="text-gray-400 mb-3"/>
                            <p className="text-sm text-gray-700 font-medium">User not Found</p>
                            <p className="text-xs text-gray-400 mt-1">We couldn't find a user matching your search</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 text-[12px] text-gray-500 bg-gray-50/50">
                                        <th className="p-4 w-10">
                                            <input type="checkbox" className="rounded" />
                                        </th>
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Phone</th>
                                        <th className="p-4">Role</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Joined On</th>
                                        <th className="p-4 text-center">Actions</th>

                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-gray-50 text-sm">
                                    {userList.map((user) => (
                                        <tr key={user.id} className="hover:bg-ray-50/50 transition-colors">
                                            <td className="p-4">
                                                <input type="checkbox" className="rounded" />
                                            </td>
                                            <td className="p-4 font-semibold text-gray-800">
                                                {user.name}
                                            </td>
                                            <td className="p-4 text-gray-500 hover:text-blue-500 hover:underline transition-all">
                                                <a href={`mailto:${user.email}`}>{user.email}</a>
                                            </td>
                                            <td className="p-4 text-gray-500">
                                                <a href={`tel:/${user.phone}`}>{user.phone}</a>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-lg text-xs font-medium capitaliza ${user.role === 'doctor' ? 'bg-purple-100 text-purple-600' : user.role === 'admin' ? 'bg-sky-100 text-sky-600' : 'bg-blue-100 text-blue-600'}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${user.is_active ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
                                                >
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-xs">{user.date_joined}</td>
                                            <td className="p-4 text-center relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === user.id ? null : user.id)}
                                                    className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 cursor-pointer"
                                                >
                                                    <LuGripVertical className="w-4 h-4" />
                                                </button>
                                                {activeMenuId === user.id &&(
                                                    <div className="absolute right-6 top-10 w-36 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-1 text-left">
                                                        <button
                                                            onClick={() => handleToggleStatus(user.id, user.is_active)}
                                                            className="w-full text-left flex items-center px-3 py-2 text-xs text-gray-700 mb-1.5 bg-amber-50/50 font-medium rounded-md hover:bg-amber-50 cursor-pointer"
                                                        >   
                                                            {/* {user.is_active ? <LuCircleAlert /> : <LuShield />}    */}
                                                            {user.is_active ? <><LuCircleAlert  className="mr-1"/> Suspend User</> : <><LuShield className="mr-1" /> Restore User</>}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-rose-600 bg-rose-50/50 hover:bg-rose-50"
                                                        >
                                                        <LuTriangleAlert  className="mr-1"/> Delete User
                                                        </button>
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
                            Showing <span className="font-semibold">{userList.length}</span> of <span className="font-semibold">{totalCount}</span> users
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!data?.previous}
                                onClick={() => setPage(page -1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!data?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {addUsers && (
                <AddUserModal 
                    onClose={() => setAddUsers(false)}
                    onAdded={(msg) => { 
                        setAddUsers(false); 
                        fetchUsers();
                        setFeedback({message : msg, type : "success"})
                    }}
                />
            )}
        </>
    )
}

function AddUserModal({ onClose, onAdded}){
    const { register, setUser} = useAuth();
    const [formData, setFormData] = useState({
        email : "",
        first_name : "",
        last_name : "",
        phone_number : "",
        role : "patient",
        password : "",
        confirm_password : "",
    })

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value })
        
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
        }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)

        try{
            await register(formData);
            onAdded("User registered successfully!");
            navigate('/admin/users', {state : "Registration successful", type : "success"})
        }catch(err){
            console.error('Registration error:', err)
            if(err.response){
                const data = err.response.data
                console.error('Response data:', data)
                console.error('Status code:', err.response.status);
                if(typeof data === 'object'){
                    const messages = Object.entries(data)
                        .map(([field, msgs]) => `${Array.isArray(msgs) ? msgs.join(' ') : msgs}`)
                        .join('\n')
                    setTimeout(() => (setError(messages), 4000))
                }else{
                    setError("Something went wrong. Please try again later.")
                }

            }else if(err.request){
                setError("Cannot reach the server. Check that Django is running on port 8000.")
                console.error('No response received — likely a CORS or network issue')
            }else{
                setError('Something went wrong. Please try again.')
            }
        } finally{
            setLoading(false);
        }
    }
    return(
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-slate-800">Register Users</h2>
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
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-2">
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">First Name</label>
                            <input type="text" name="first_name" required onChange={handleChange} placeholder="Enter your first name" className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Last Name</label>
                            <input type="text" name="last_name" onChange={handleChange} placeholder="Enter your last name" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Email</label>
                            <input type="email" name="email" onChange={handleChange} placeholder="Enter your email" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Phone Number</label>
                            <input type="text" name="phone_number" onChange={handleChange} placeholder="Enter your phone number" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Role</label>
                            <select name="role" onChange={handleChange} value={formData.role} required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition">
                                <option value="patient">I am a Patient</option>
                                <option value="doctor">I am a Doctor</option>
                            </select>
                        </div>
                        
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Password</label>
                            <input type="password" name="password" onChange={handleChange} placeholder="Enter your password" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-xs mb-2 font-semibold">Confirm Password</label>
                            <input type="password" name="password2" onChange={handleChange} placeholder="Confirm password" required className="px-3 text-sm w-full h-10 outline-none rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition" />
                        </div>
                        <motion.button {...buttonEffects} type="submit" disabled={loading} className="border-1 w-full h-11 mt-5 text-sm font-semibold text-white cursor-pointer bg-blue-600 rounded-lg">
                            {loading ? "Creating Account..." : "Create Account"}
                        </motion.button>
                    </form>
                </div>
            </div>
        </>
    )
}