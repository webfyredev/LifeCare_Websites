import { useEffect, useState } from "react"
import { LuArrowDown, LuArrowUp, LuCalendar, LuCalendarDays, LuChevronLeft, LuChevronRight, LuCircleAlert, LuDownload, LuFoldVertical, LuGripVertical, LuLoader, LuMail, LuMoveVertical, LuPhone, LuPlus, LuSearch, LuShield, LuShieldCheck, LuSquarePlus, LuStethoscope, LuTriangleAlert, LuUser, LuUserCheck, LuUserPlus, LuUserRound, LuUserRoundMinus, LuUserRoundX, LuUsers, LuX } from "react-icons/lu"
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

    const [selectedUserId, setSelectedUserId] = useState(null)
    const [editingUser, setEditingUser] = useState(null)

    const handleOpenEditModal  = (userData) => {
        setSelectedUserId(null);
        setEditingUser(userData)
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
    }

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
                <div className="md:flex md:flex-row flex flex-col md:items-center md:justify-between w-full space-y-5 md:space-y-0">
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
                                className="cursor-pointer px-2 py-2.5 border border-gray-200 rounded-lg w-45 md:w-35 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all">
                                <option value="all">All Roles</option>
                                <option value="patient">Patients</option>
                                <option value="doctor">Doctors</option>
                                <option value="admin">Admins</option>
                            </select>
                            <select value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="cursor-pointer px-2 py-2 border border-gray-200 rounded-lg w-45 md:w-45 text-sm font-medium text-gray-600 outline-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transtion-all"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button
                                className="cursor-pointer p-2.5 border border-gray-200 w-12 md:w-auto rounded-lg text-gray-600 hover:bg-gray-50 flex items-center justify-center"
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
                            <table className="min-w-max w-full text-left border-collapse">
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
                                        <th className="p-4">Address</th>
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
                                                    className={`px-2.5 py-1 capitalize rounded-lg text-xs font-medium capitaliza ${user.role === 'doctor' ? 'bg-purple-100 text-purple-600' : user.role === 'admin' ? 'bg-sky-100 text-sky-600' : 'bg-blue-100 text-blue-600'}`}
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
                                            <td className="p-4 text-gray-500">
                                                {user.address || 'Nill'}
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
                                                    <div className="absolute right-6 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-10 p-2 text-left">
                                                        <button
                                                            onClick={() => setSelectedUserId(user.id)} 
                                                            className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer mb-1.5 text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 transition-all duration-200"
                                                            >
                                                             <LuUserCheck  className="mr-1"/> View Profile
                                                        </button>
                                                        <button
                                                            onClick={() => handleToggleStatus(user.id, user.is_active)}
                                                            className="w-full text-left flex items-center px-3 py-2 text-xs text-amber-700 mb-1.5 bg-amber-50/50 font-medium rounded-md hover:bg-amber-50 cursor-pointer transition-all duration-200"
                                                        >   
                                                            {/* {user.is_active ? <LuCircleAlert /> : <LuShield />}    */}
                                                            {user.is_active ? <><LuCircleAlert  className="mr-1"/> Suspend User</> : <><LuShield className="mr-1" /> Restore User</>}
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            className="w-full flex font-medium items-center text-left px-3 py-2 rounded-md cursor-pointer text-xs text-rose-600 bg-rose-50/50 hover:bg-rose-50 mb-1.5 transition-all duration-200"
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
            {selectedUserId && (
                <UserProfileModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                    onEditUser={handleOpenEditModal}
                />
            )}
            {editingUser && (
                <EditUserModal 
                    userData={editingUser}
                    onClose={() => setEditingUser(null)}
                    onUpdated={handleUserUpdated}
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

function UserProfileModal({userId, onClose, onEditUser}){
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!userId) return;
        
        const fetchUserProfile = async() => {
            setLoading(true)
            try{
                const response = await api.get(`/admin/manage-users/${userId}/`);
                setUserData(response.data);
            }catch(err){
                console.error('Failed to fetch user details:', err);
            }finally{
                setLoading(false);
            }
        };
        fetchUserProfile()
    }, [userId])

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `http://localhost:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    if(!userId) return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-2.5 w-full max-w-md shadow-lg h-full flex flex-col overflow-y-auto">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : userData ? (
                    <>
                        <div className="px-3 py-4 border-b border-slate-200">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-md font-bold text-slate-800">User Profile</h2>
                                <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600 p-1 transition-all duration-300">
                                    <LuX className="w-6 h-6" />
                                </button>
                            </div>
                            <hr  className="border-1 border-slate-50 mb-3"/>
                            <div className="flex items-center space-x-3">
                                <img 
                                    src={getImageUrl(userData.profile_picture)}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                    className="w-16 h-16 rounded-full object-cover border border-slate-200"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{userData.name}</h3>
                                    <div className="flex flex-col items-left space-y-2 mt-1">
                                        <span className={`w-15 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                                            userData.role === 'doctor' ? 'bg-emerald-100 text-emerald-700':
                                            userData.role === 'patient' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                                        }`}>
                                            {userData.role}
                                        </span>
                                        <span className="flex items-center text-xs text-emerald-600 font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>
                                            {userData.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 space-y-2.5 text-xs text-slate-500 px-2">
                                <p className="flex items-center text-gray-500">
                                    <LuMail className="mr-3 w-3.5 h-3.5" />
                                    <a href={`mailto:${userData.email}`} className="font-medium hover:text-blue-500 transition-colors hover:underline">{userData.email}</a>
                                </p>
                                <p className="flex items-center">
                                    <LuPhone className="mr-3 w-3.5 h-3.5" />
                                    <a href={`tel:/${userData.phone}`} className="font-medium hover:text-blue-500 transition-colors hover:underline">{userData.phone || 'N/A'}</a>
                                    {/* {userData.phone || 'N/A'} */}
                                </p>
                                <p className="flex items-center text-slate-500">
                                    <LuCalendar className="mr-2 w-3.5 h-3.5" />
                                    DOB: <span className="font-medium ml-1">{userData.date_of_birth || 'N/A'}</span> <span className="mx-3">|</span> Gender: <span className="font-medium ml-1 capitalize">{userData.gender || 'N/A'}</span>
                                </p>
                            </div>
                            
                            
                        </div>
                        <p className="text-sm font-medium text-blue-500 px-3 mt-3 mb-1.5">
                            Overview
                        </p>
                        <div className="p-2 space-y-6 flex-1 bg-slate-50/50">
                            <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
                                <div className="flex items-center text-slate-600 font-semibold text-sm mb-3">
                                    <LuUser  className="mr-2 w-4 h-4 text-slate-500"/> <span>Personal Information</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 mb-1 font-medium">Email</span>
                                        <a href={`mailto:${userData.email}`} className="text-slate-800 font-medium hover:text-blue-700 transition-colors">{userData.email}</a>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 mb-1 font-medium">Phone</span>
                                        <a href={`tel:/${userData.phone}`} className="text-slate-800 font-medium hover:text-blue-700 transition-colors">{userData.phone || 'N/A'}</a>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 mb-1 font-medium">Date of Birth</span>
                                        <span className="text-slate-800 font-medium">{userData.date_of_birth || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 mb-1 font-medium">Gender</span>
                                        <span className="text-slate-800 font-medium capitalize">{userData.gender || 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-slate-400 mb-0.5 font-medium">Address</span>
                                        <span className="text-slate-800 font-medium">{userData.address || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                            {userData.role === 'patient' && userData.patient_profile && (
                                <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
                                    <div className="flex items-center text-slate-800 font-semibold text-sm">
                                        <LuSquarePlus  className="mr-2 w-4 h-4 text-blue-500"/> Patient Information 
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-xs">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Hospital Number</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.hospital_number}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Blood type</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.blood_type || 'Nill'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Allergies</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.allergies || 'Nill'}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Emergency Contact</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.emergency_contact_name} <a className="hover:text-blue-700 transition-colors" href={`tel:/${userData.patient_profile.emergency_contact_phone}`}>{userData.patient_profile.emergency_contact_phone}</a></span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Insurance Number</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.insurance_number}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Medical History</span>
                                            <span className="text-slate-800 font-medium">{userData.patient_profile.medical_history || 'Nill'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {userData.role === 'doctor' && userData.doctor_profile && (
                                <>
                                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-3">
                                        <div className="flex items-center text-slate-800 font-semibold text-sm">
                                            <LuSquarePlus  className="mr-2 w-4 h-4 text-blue-500"/> Professional Information 
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1 font-medium">Specialization</span>
                                                <span className="text-slate-800 font-medium">{userData.doctor_profile.specialization || 'Nill'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1 font-medium">License Number</span>
                                                <span className="text-slate-800 font-medium">{userData.doctor_profile.license_number || 'N/A'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1 font-medium">Years of Experience</span>
                                                <span className="text-slate-800 font-medium">{userData.doctor_profile.years_of_experience}years</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1 font-medium">Consultation Fee</span>
                                                <span className="text-slate-800 font-medium">${userData.doctor_profile.consultation_fee}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-3">
                                        <div className="flex items-center text-slate-800 font-semibold text-sm">
                                            <LuCalendar  className="mr-2 w-4 h-4 text-blue-500"/> Availability 
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-xs">
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1.5 font-medium">Available Days</span>
                                                <div className="flex space-x-1 mt-1">
                                                    {userData.doctor_profile.available_days.map((days) => (
                                                        <span key={days} className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-[10px] font-bold">
                                                            {days}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex space-x-3">
                                                <span className="text-slate-400 mb-1 font-medium">Max Patients / Day = </span>
                                                <span className="text-slate-800 font-medium">{userData.doctor_profile.max_patient_per_day}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-slate-400 mb-1">Is Available</span>
                                                <span className={`w-10 py-1 font-bold  text-white flex items-center justify-center rounded-full  ${userData.doctor_profile.is_available ? 'bg-emerald-500' : 'bg-red-500'}`}>{userData.doctor_profile.is_available ? 'Yes' : 'No'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {userData.role === 'admin' &&(
                                <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-3">
                                    <div className="flex items-center text-slate-800 font-semibold text-sm">
                                        <LuShieldCheck  className="mr-2 w-4 h-4 text-blue-500"/> Account Information 
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 text-xs">
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Role</span>
                                            <span className="text-slate-800 font-medium">Administrator</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Date Joined</span>
                                            <span className="text-slate-800 font-medium">{userData.date_joined}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-slate-400 mb-1 font-medium">Account Status</span>
                                            <span className="w-2 h-2 rounded-full font-bold mr-1.5">{userData.is_active ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='flex space-x-3 pt-1'>
                                <button
                                    type="button" 
                                    onClick={onClose} 
                                    className='flex-1 font-medium py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'
                                    >
                                        Cancel
                                </button>
                                <motion.button 
                                    type="submit"
                                    {...buttonEffects}
                                    onClick={() => onEditUser(userData)}
                                    // onClick={() => }
                                    className='flex-1 font-medium py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer'>
                                        Edit User
                                </motion.button>
                            </div>
                        </div>
                    </>
                ): (
                    <div className="flex justify-between items-center text-center text-slate-500">
                        <span>Failed to load user information.</span>
                        <button onClick={onClose} className="cursor-pointer text-slate-400 hover:text-slate-600 p-1">
                            <LuX className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

function EditUserModal({userData, onClose, onUpdated}){
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name : '',
        last_name : '',
        email : '',
        phone : '',
        gender : '',
        date_of_birth : '',
        address : '',
        is_active : true,
        role : 'admin',
        patient_profile : {},
        doctor_profile : {},
    })

    useEffect(() => {
        if(userData){
            const nameParts = (userData.name || '').split(' ');
            setFormData({
                first_name: userData.first_name || nameParts[0] || '',
                last_name: userData.last_name || nameParts.slice(1).join(' '),
                email : userData.email || '',
                phone: userData.phone || userData.phone_number || '',
                gender : userData.gender || '',
                date_of_birth : userData.date_of_birth || '',
                address : userData.address || '',
                is_active : userData.is_active ?? true,
                role: userData.role || 'admin',
                patient_profile: userData.patient_profile || {
                    hospital_number : '',
                    blood_type : '',
                    allergies : '',
                    emergency_contact_name : '',
                    emergency_contact_phone : '',
                    insurance_number : '',
                    medical_history : '',
                },
                doctor_profile: userData.doctor_profile || {
                    specialization : '',
                    license_number : '',
                    years_of_experience: 0,
                    consultation_fee : 0,
                    max_patient_per_day : 20,
                    is_available : true,
                    bio : ''
                },
            })
        }
    }, [userData])

    const handleBaseChange = (e) => {
        const { name, value, type , checked} = e.target;
        setFormData((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleNestedChange = (profileKey, field, value) => {
        setFormData((prev) => ({...prev, [profileKey]: {...prev[profileKey], [field]: value,
        }
    }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            first_name : formData.first_name,
            last_name : formData.last_name,
            email : formData.email,
            phone : formData.phone,
            gender : formData.gender,
            date_of_birth : formData.date_of_birth || null,
            address : formData.address,
            is_active: formData.is_active,
            role : formData.role

        };
        if(formData.role === 'patient'){
            payload.patient_profile = formData.patient_profile;
        }else if(formData.role === 'doctor'){
            payload.doctor_profile = formData.doctor_profile;
        }

        try{
            await api.patch(`/admin/manage-users/${userData.id}/`, payload);
            if(onUpdated) onUpdated();
            onClose();
        }catch(err){
            console.error('Failed to update user profile:', err)
        }finally{
            setLoading(false)
        }
    };
    if(!userData) return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Edit User</h2>
                        <p className="text-xs text-slate-500">
                            Updating account and profile data for <span className="font-semibold">{userData.name}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer transition-all duration-200"
                    >
                        <LuX  className="w-5 h-5"/>
                    </button>
                </div>
                <form 
                    onSubmit={handleSubmit}
                    className="overflow-y-auto space-y-6 flex-1 mt-5 overflow-x-hidden"
                >
                    <div>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                            General Information 
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">Date of Birth</label>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className='flex flex-col space-y-1'>
                                <label className='text-xs font-semibold text-slate-600'>Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleBaseChange} 

                                    className='border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300'>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label className="text-xs font-semibold text-slate-600">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleBaseChange}
                                    required
                                    className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                />
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <input 
                                    type="checkbox"
                                    id="is_active"
                                    name="is_active"
                                    checked={formData.is_active}
                                    onChange={handleBaseChange}
                                    className="rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label className="text-xs font-medium text-slate-700">
                                    Account Active Status
                                </label>
                            </div>
                        </div>
                    </div>
                    {formData.role === 'patient' && (
                        <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Patient Profile Information 
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Hospital Number</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.hospital_number || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'hospital_number', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Blood Type</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.blood_type || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'blood_type', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Emergency Contact Name</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.emergency_contact_name || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'emergency_contact_name', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Emergency Contact Phone</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.emergency_contact_phone || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'emergency_contact_phone', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Insurance Number</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.insurance_number || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'insurance_number', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Allergies</label>
                                    <input
                                        type="text"
                                        value={formData.patient_profile.allergies || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'allergies', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Medical History</label>
                                    <textarea
                                        rows={2}
                                        value={formData.patient_profile.medical_history || ''}
                                        onChange={(e) => handleNestedChange('patient_profile', 'medical_history', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {formData.role === 'doctor' &&(
                        <div className="pt-4 border-t border-slate-100">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                Doctor Profile Information 
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Specialization</label>
                                    <input
                                        type="text"
                                        value={formData.doctor_profile.specialization || ''}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'specialization', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">License Number</label>
                                    <input
                                        type="text"
                                        value={formData.doctor_profile.license_number || ''}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'license_number', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Years of Experience</label>
                                    <input
                                        type="number"
                                        value={formData.doctor_profile.years_of_experience || 0}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'years_of_experience', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Consulation Fee ($)</label>
                                    <input
                                        type="number"
                                        value={formData.doctor_profile.consultation_fee || 0}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'consultation_fee', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Max Patients / Day</label>
                                    <input
                                        type="text"
                                        value={formData.doctor_profile.max_patient_per_day || 0}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'max_patient_per_day', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="text-xs font-semibold text-slate-600">Bio</label>
                                    <textarea
                                        rows={2}
                                        value={formData.doctor_profile.bio || ''}
                                        onChange={(e) => handleNestedChange('doctor_profile', 'bio', e.target.value)}
                                        className='cursor-pointer border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-blue-300' 
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='flex space-x-5 pt-1 mb-3'>
                        <button
                            type="button" 
                            onClick={onClose}
                            className='w-1/2 py-2.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer'
                            >
                                Cancel
                        </button>
                        <motion.button 
                            type="submit"
                            disabled={loading}
                            {...buttonEffects}
                            className='w-1/2 py-2.5 text-sm bg-blue-600 flex items-center justify-center text-white rounded-lg hover:bg-blue-700 cursor-pointer font-semibold'
                        >
                            {loading ? <LuLoader className="w-4 h-4 animate-spin" /> : 'Update'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}