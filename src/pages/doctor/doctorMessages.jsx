import { useState, useEffect, useRef } from 'react'
import { LuSend } from 'react-icons/lu'
import api from '../../api/axios'
export default function DoctorMessages(){
    const [conversations, setConversations] = useState([])
    const [activeConv, setActiveConv] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const messagesEndRef = useRef(null)

    useEffect(() => {
        document.title = 'Messages - Lifecare'
        api.get('/messages/')
        .then((res) => {
            console.log('Conversations:', res.data)
            setConversations(res.data)
            if(res.data.length > 0){
                setActiveConv(res.data[0])
            }
        })
        .catch(console.error)
    }, [])

    useEffect(() => {
        if(activeConv) fetchMessages()
    }, [activeConv])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior : "smooth"})
    }, [messages])

    useEffect(() => {
        if(!activeConv) return 
        const interval = setInterval(fetchMessages, 5000)
        return () => clearInterval(interval)

    }, [activeConv])

    const fetchMessages = () => {
        if(!activeConv) return
        api.get(`/messages/${activeConv.id}/messages/`)
        .then((res) => setMessages(res.data))
        .catch(console.error)
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if(!newMessage.trim() || !activeConv) return
        setSending(true)

        try {
            const res = await api.post(`/messages/${activeConv.id}/messages/`, {body :newMessage.trim()})
            setMessages(prev => [...prev, res.data])
            setNewMessage('')
        } catch(error){
            console.error(error)
        } finally {
            setSending(false)
        }
    }

    const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase()

    const formatTime = (dateStr) => {
        const diff = Math.floor((new Date() - new Date(dateStr)) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }

    return(
        <>
            <div className='w-full h-[calc(100vh-52px)] flex overflow-hidden'>

            {/* Conversations sidebar */}
            <div className='w-[35%] border-r border-slate-100 flex flex-col bg-white'>
                <div className='px-4 py-4 border-b border-slate-100'>
                    <h2 className='font-bold text-lg text-slate-800'>Messages</h2>
                    <p className='text-xs text-slate-400'>Chat with your care team</p>
                </div>
                <div className='flex-1 overflow-y-auto'>
                    {conversations.length === 0 ? (
                        <div className='p-6 text-center text-sm text-slate-400'>
                            No conversations yet
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConv(conv)}
                                className={`flex items-start space-x-3 px-4 py-3.5 cursor-pointer border-b border-slate-50 transition-colors
                                    ${activeConv?.id === conv.id ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                            >
                                {/* Avatar */}
                                {conv.other_person_picture ? (
                                    <img src={conv.other_person_picture} className='w-10 h-10 rounded-full object-cover flex-shrink-0' alt="" />
                                ) : (
                                    <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                        {getInitials(conv.other_person_name)}
                                    </div>
                                )}
                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-sm font-semibold text-slate-800 truncate'>{conv.other_person_name}</p>
                                        {conv.unread_count > 0 && (
                                            <span className='w-4 h-4 bg-blue-500 rounded-full text-[9px] text-white flex items-center justify-center flex-shrink-0'>
                                                {conv.unread_count}
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-[10px] font-medium text-slate-500'>{conv.other_person_subtitle}</p>
                                    {conv.last_message && (
                                        <p className='text-xs text-slate-400 truncate mt-0.5'>
                                            {conv.last_message.body}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Chat area */}
            <div className='flex-1 flex flex-col bg-[#f8fafc]'>
                {activeConv ? (
                    <>
                        {/* Chat header */}
                        <div className='bg-white px-5 py-3.5 border-b border-slate-100 flex items-center space-x-3'>
                            {activeConv.other_person_picture ? (
                                <img src={activeConv.other_person_picture} className='w-9 h-9 rounded-full object-cover' alt="" />
                            ) : (
                                <div className='w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold'>
                                    {getInitials(activeConv.other_person_name)}
                                </div>
                            )}
                            <div>
                                <p className='text-sm font-semibold text-slate-800'>{activeConv.other_person_name}</p>
                                <p className='text-xs text-slate-400'>{activeConv.other_person_subtitle}</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col space-y-3'>
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.is_mine ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[65%] flex flex-col space-y-1 ${msg.is_mine ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm
                                            ${msg.is_mine
                                                ? 'bg-blue-600 text-white rounded-br-sm'
                                                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                                            }`}
                                        >
                                            {msg.body}
                                        </div>
                                        <span className='text-[10px] text-slate-400'>
                                            {msg.is_mine ? 'You' : msg.sender_name} · {formatTime(msg.created_at)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSend}
                            className='bg-white border-t border-slate-100 px-4 py-3 flex items-center space-x-3'
                        >
                            <input
                                type='text'
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder='Type your message...'
                                className='flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-blue-300'
                            />
                            <button
                                type='submit'
                                disabled={sending || !newMessage.trim()}
                                className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50'
                            >
                                <LuSend className='w-4 h-4 text-white' />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className='flex-1 flex items-center justify-center'>
                        <p className='text-sm text-slate-400'>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}