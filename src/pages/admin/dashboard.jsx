import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import { LuAArrowDown, LuArrowDown, LuArrowUp, LuBell, LuCalendarDays, LuChevronLeft, LuChevronRight, LuFileBadge, LuPill, LuPlus, LuStethoscope, LuUserRound, LuUsers } from "react-icons/lu";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Link, useNavigate } from "react-router-dom";

export default function Lifecare_AdminDashboard(){
    const navigate = useNavigate();
    const { user, logout} = useAuth();
    const [dashboard, setDashboard] = useState(null)
    useEffect(() => {
        document.title = "Admin Dashboard - LifeCare"
    })

    useEffect(() => {
        api.get('/admin/dashboard/')
        .then((res) => setDashboard(res.data))
        .catch(console.error)
    }, []);

    const getGreeting = () => {
        const hour = new Date().getHours()
        if(hour < 12) return 'Good Morning'
        if(hour < 17) return 'Good Afternoon'
        return 'Good Evening'
    }
    const currentTime = new Date().toLocaleTimeString("en-US", {hour:"numeric", minute:"2-digit", hour12: true});
    const currentDate = new Date().toLocaleDateString("en-US", {weekday: "long", month:"long", day:"numeric", year: "numeric"})
    const formatTime = (time) => {
        return new Date(time).toLocaleTimeString("en-US", {hour:"numeric", minute: "2-digit", hour12: true })
    }
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {month: "long", day:"numeric", year: "numeric"})
    }
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
            label : 'Appointments',
            value : dashboard?.stats?.total_appointments ?? 0,
            change : dashboard?.stats?.appointment_change?.percentage ?? 0,
            direction : dashboard?.stats?.appointment_change?.direction,
            icon : LuCalendarDays,
            style : "bg-[#DBEAFE] text-[#2563EB]"

        }
    ]
    const formatDateTime = (date) => {
        return new Date(date).toLocaleString("en-US", { month: "long", day:"numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true})
    }
    
    // const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const quick_actions = [
        {
            icon : LuPlus,
            title : 'Add New User',
            sub_title : 'Register a new user to the system',
            link : '/admin/users'
        },
        {
            icon : LuStethoscope,
            title : 'Add New Doctor',
            sub_title : 'Onboard a new doctor',
            link : '/admin/doctors'
        },
        {
            icon : LuCalendarDays,
            title : 'Schedule Appointment',
            sub_title : 'Book a new appointment',
            link : '/admin/appointments'
        },
        {
            icon : LuPill,
            title : 'Add Prescription',
            sub_title : 'Create a new prescription',
            link : '/admin/prescriptions'
        },
        {
            icon : LuFileBadge,
            title : 'Add Medical Record',
            sub_title : 'Upload or create a medical record',
            link : '/admin/records'
        },
        {
            icon : LuBell,
            title : 'Send Notification',
            sub_title : 'Send message or alert',
            link : '/admin/notifications'
        },
    ]
    const getStatusBadge = (status) => {
        switch(status?.toLowerCase()){
            case 'upcoming':
            case 'pending':
                return 'bg-blue-50 text-blue-600 border border-blue-100';
            case 'completed':
                return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'cancelled':
                return 'bg-rose-50 text-rose-600 border border-rose-100';
            default:
                return 'bg-gray-50 text-gray-600 border border-gray-100';
        }
    }
    return(
        <>
            <div className="space-y-5">
                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-2xl text-[#1e293b]">{getGreeting()}, {user?.first_name}</h3>
                            <p className='text-[13px] text-[#94a3b8]'>
                                Here's what's happening with LifeCare system today.
                            </p>
                        </div>
                        <div>
                            <p className="text-[11px] font-medium text-gray-500">{currentDate}</p>
                            <p className="text-right text-[11px] font-medium text-gray-500">{currentTime}</p>
                        </div>
                    </div>
                    <div className="w-full py-2  mt-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                    
                </div>
                <div className="py-2 w-full flex lg:flex-row flex-col justify-between space-y-5 lg:space-y-0">
                    <div className="bg-white p-4 rounded-lg shadow-xs hover:shadow-sm transition border border-gray-100 w-full lg:w-[58%]">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-lg font-semibold tex-gray-800">
                                    Appointments Overview
                                </h3>
                                <p className="text-[12px] text-gray-400">
                                    Last 7 days
                                </p>
                            </div>
                            <select name="" id="" className="border border-gray-200 text-xs rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 outline-none">
                                <option>This Week</option>
                                <option>Last Week</option>
                            </select>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dashboard?.appointments_overview} margin={{top: 10, right:10, left:-20, bottom: 0}}>
                                    <defs>
                                        <linearGradient id="appointmentGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis 
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    />
                                    <YAxis 
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12}}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB'}}
                                    />
                                    <Area 
                                        type="monotone"
                                        dataKey="appointment"
                                        stroke="#2563EB"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#appointmentGradient)"
                                        dot={{fill : '#2563EB', r: 4, strokeWidth: 2, stroke: '#fff'}}
                                        activeDot={{r:6}}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-xs hover:shadow-sm transition border border-gray-100 lg:w-[40%]">
                        <h3 className="text-lg font-semibold tex-gray-800">
                            User Distribution
                        </h3>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                            <div className="relative w-48 h-48 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={dashboard?.user_distribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={85}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {dashboard?.user_distribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xl font-bold text-gray-900">
                                        {dashboard?.stats?.total_users.toLocaleString()}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-medium">
                                        Total Users
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                {dashboard?.user_distribution.map((item, index)=> (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor : item.color}} />
                                            <span className="text-[11px] font-medium text-gray-600">{item.name}</span>
                                        </div>
                                        <span className="text-[12px] font-semibold text-gray-800">
                                            {item.value} ({item.percentage}%)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex md:flex-row flex-col space-x-5 space-y-5 md:space-y-0">
                    <div className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-all p-3 w-full md:w-[45%]">
                        <div className="w-full flex items-center justify-between">
                            <h3 className="text-sm font-semibold tex-gray-800">
                                Recent Users
                            </h3>
                            <Link to="/admin/users"
                                className="text-blue-500 text-xs font-medium cursor-pointer hover:text-blue-600 transition-all"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="w-full overflow-x-auto mt-3">
                            <table className="w-full text-left border-collapse space-y-2">
                                <thead className="mb-2">
                                    <tr className="text-[11px] w-full font-semibold text-gray-400 border-b border-gray-50 uppercase tracking-wider">
                                        <th className="pb-3 font-medium">Name</th>
                                        <th className="pb-3 font-medium">Role</th>
                                        <th className="pb-3 font-medium text-right">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 text-xs">
                                    {dashboard?.recent_registration.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 flex space-x-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-xs flex-shrink-0">
                                                        {user.initials}
                                                    </div>
                                                    <div className="truncate max-w-[110px]">
                                                        <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                                                        <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <span
                                                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${user.role === 'doctor' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}
                                                >
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td
                                                className="py-3 text-right text-gray-500 text-[11px] whitespace-nowrap"
                                            >
                                                {formatDateTime(user.joined)}
                                                {/* {user.joined.toLocaleDateString("en-GB", {year:"", month:""})} */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-all p-3 w-full md:w-[55%]">
                        <div className="w-full flex items-center justify-between">
                            <h3 className="text-sm font-semibold tex-gray-800">
                                Recent Appointments
                            </h3>
                            <Link to="/admin/users"
                                className="text-blue-500 text-xs font-medium cursor-pointer hover:text-blue-600 transition-all"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="overflow-x-auto mt-2.5">
                            <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[11px] font-semibold text-gray-400 border-b border-gray-50 uppercase tracking-wider">
                                            <th className="pb-3 font-medium">Patient</th>
                                            <th className="pb-3 font-medium">Doctor</th>
                                            <th className="pb-3 font-medium">Date & Time</th>
                                            <th className="pb-3 font-medium text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 text-xs">
                                        {dashboard?.recent_appointment.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3"> 
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{item.patient_name}</p>
                                                        <p className="text-[11px] text-gray-400 truncate">{item.reason || 'General Checkup'}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3"> 
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{item.doctor_name}</p>
                                                        <p className="text-[11px] text-gray-400 truncate">{item.doctor_speciality || 'General'}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 text-gray-500 text-[11px] whitespace-nowrap"> 
                                                    <div className="flex flex-col space-y-1">
                                                        {/* <span>{formatTime(item.time)}</span> */}
                                                        <span>{item.time}</span>
                                                        <span>{formatDate(item.date)}</span>
                                                        
                                                    </div>
                                                </td>
                                                <td className="py-3 text-right">
                                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize inline-block ${getStatusBadge(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                            </table>
                        </div>
                        
                    </div>
                    {/* <div className="bg-white rounded-lg border border-gray-100 shadow-xs hover:shadow-sm transition-all p-3 w-[25%]">
                        <div className="w-full flex items-center justify-between">
                            <h3 className="text-sm font-semibold tex-gray-800">
                                Quick Actions
                            </h3>
                            <Link to="/admin/users"
                                className="text-blue-500 text-xs font-medium cursor-pointer hover:text-blue-600 transition-all"
                            >
                                View all
                            </Link>
                        </div>
                        <div className="flex flex-col space-y-2 mt-3">
                            {quick_actions.map((data) => (
                            <button 
                                onClick={() => navigate(`${data.link}`)}
                                className="w-full rounded-lg cursor-pointer hover:bg-blue-50 flex space-x-2 items-center group py-1">
                                <div className="w-7 h-7 rounded-md bg-blue-500 text-white flex items-center group-hover:bg-transparent group-hover:text-blue-600 justify-center ml-0.5 transition-all">
                                    <data.icon />
                                </div>
                                <div className="flex items-center justify-between w-[80%]">
                                    <div className="flex flex-col items-left">
                                        <h3 className="text-xs text-left font-medium">{data.title}</h3>
                                        <p className="text-[9px] text-left">{data.sub_title}</p>
                                    </div>
                                    <LuChevronRight className="text-gray-500 group-hover:text-blue-600" />
                                </div>
                            </button>
                        ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}