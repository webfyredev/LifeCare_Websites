import { useState, useEffect } from 'react'
import { LuCalendarClock, LuMessageSquare, LuPill, LuFlaskConical, LuBell, LuCheck } from 'react-icons/lu'
import api from '../../api/axios'

export default function DoctorNotifications(){
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        document.title = 'Doctor Notifications - LifeCare'
        fetchNotifications()
    }, [])

    const fetchNotifications = () => {
        setLoading(true)
        api.get('/notifications/')
        .then((res) => setNotifications(res.data.notifications))
        .catch(console.error)
        .finally(() => setLoading(false))
    }

    const handleMarkAllRead = async () => {
        await api.patch('/notifications/mark-all-read/')
        setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    }

    const handleMarkOneRead = async (id) => {
        await api.patch(`/notifications/${id}/read/`)
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, is_read: true } : n
        ))
    }

    const filtered = notifications.filter(n => {
        if (filter === 'unread') return !n.is_read
        return true
    })

    const unreadCount = notifications.filter(n => !n.is_read).length

    const notifIcon = (type) => {
        const icons = {
            appointment: { icon: LuCalendarClock, bg: 'bg-blue-100', color: 'text-blue-600' },
            message:     { icon: LuMessageSquare, bg: 'bg-green-100', color: 'text-green-600' },
            prescription:{ icon: LuPill,          bg: 'bg-purple-100', color: 'text-purple-600' },
            lab_result:  { icon: LuFlaskConical,  bg: 'bg-orange-100', color: 'text-orange-600' },
            general:     { icon: LuBell,          bg: 'bg-gray-100',  color: 'text-gray-600' },
        }
        const selected = icons[type] || icons.general
        const Icon = selected.icon
        return (
            <span className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selected.bg}`}>
                <Icon className={`w-5 h-5 ${selected.color}`} />
            </span>
        )
    }

    const timeAgo = (dateStr) => {
        const diff = Math.floor((new Date() - new Date(dateStr)) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }
    return (
        <>
            <div className='w-full flex flex-col space-y-5 md:px-5 md:py-5'>
                <div className='flex justify-between items-start'>
                        <div>
                            <h1 className='text-2xl font-bold text-[#1e293b]'>Notifications</h1>
                            <p className='text-[13px] text-[#94a3b8] mt-0.5'>
                                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'Manage and read notifications'}
                            </p>
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className='flex items-center space-x-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors cursor-pointer'
                            >
                                <LuCheck className='w-4 h-4' />
                                <span>Mark all as read</span>
                            </button>
                        )}
                </div>
                <div className='flex items-center space-x-2'>
                    {['all', 'unread'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 flex items-center rounded-lg text-sm font-medium capitalize transition-colors cursor-pointer
                                ${filter === f
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {f}
                            {f === 'unread' && unreadCount > 0 && (
                                <span className='ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full'>
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            <div className='bg-white border border-slate-100 rounded-xl overflow-hidden'>
                {loading ? (
                    <div className='p-8 text-center'>
                        <p className='text-sm text-slate-400'>Loading notifications...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className='p-10 text-center flex flex-col items-center space-y-2'>
                        <div className='w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center'>
                            <LuBell className='w-5 h-5 text-slate-400' />
                        </div>
                        <p className='text-sm text-slate-400'>
                            {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
                        </p>
                    </div>
                ) : (
                    filtered.map((n, index) => (
                        <div
                            key={n.id}
                            onClick={() => !n.is_read && handleMarkOneRead(n.id)}
                            className={`flex items-start space-x-4 p-5 cursor-pointer transition-colors
                                ${index !== filtered.length - 1 ? 'border-b border-slate-50' : ''}
                                ${n.is_read ? 'bg-white hover:bg-slate-50' : 'bg-blue-50/30 hover:bg-blue-50'}`}
                        >
                            {notifIcon(n.type)}

                            <div className='flex-1 min-w-0'>
                                <div className='flex justify-between items-start'>
                                    <p className={`text-sm ${n.is_read ? 'font-medium text-slate-700' : 'font-semibold text-slate-900'}`}>
                                        {n.title}
                                    </p>
                                    {!n.is_read && (
                                        <span className='w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5 ml-3' />
                                    )}
                                </div>
                                <p className='text-[11px] md:text-[13px] text-slate-500 mt-1.5 md:mt-1'>{n.body}</p>
                                <p className='text-xs text-slate-400 mt-1.5 font-medium'>{timeAgo(n.created_at)}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            </div>
        </>
    )
}