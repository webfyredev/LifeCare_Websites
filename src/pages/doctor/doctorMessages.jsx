import { useState, useEffect, useRef } from 'react'
import { LuSend, LuArrowLeft, LuPlus, LuImage, LuFileText, LuFile, LuX, LuDownload, LuPencil, LuTrash2, LuCheck } from 'react-icons/lu'
import api from '../../api/axios'
import { messageActions, scrollLeft, scrollRight, scrollUp } from '../../animations/effects'
import { motion, AnimatePresence } from 'framer-motion'
export default function DoctorMessages(){
    const [conversations, setConversations] = useState([])
    const [activeConv, setActiveConv] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [mobileView, setMobileView] = useState('list')
    const messagesEndRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [filePreview, setFilePreview ] = useState(null)
    const [showAttachMenu, setShowAttachMenu] = useState(false)
    const fileInputRef = useRef(null)
    const attachMenuRef = useRef(null)
    const [hoveredMsgId, setHoveredMsgId] = useState(null)
    const [editingMsg, setEditingMsg] = useState(null)
    const [editBody, setEditBody] = useState('')



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (attachMenuRef.current && !attachMenuRef.current.contains(e.target)){
                setShowAttachMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    useEffect(() => {
        document.title = 'Messages - Lifecare'
        api.get('/messages/')
        .then((res) => {
            setConversations(res.data)
            if(res.data.length > 0 && window.innerWidth >= 768){
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


    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setSelectedFile(file)
        setShowAttachMenu(false)

        if (file.type.startsWith('image')) {
            setFilePreview(URL.createObjectURL(file))
        } else {
            setFilePreview(null)
        }

        e.target.value = ''
    }

    const clearFile = () => {
        setSelectedFile(null)
        setFilePreview(null)
    }
    const handleSelectConv = (conv) => {
        setActiveConv(conv)
        setMobileView('chat')
    }

    const handleBack = () => {
        setMobileView('list')
    }

    const handleDeleteMessage = async (messageId) => {
        try{
            await api.delete(`/messages/${activeConv.id}/messages/${messageId}/`)
            setMessages(prev => prev.filter(m => m.id !== messageId))
        } catch (err) {
            console.error(err)
        }

    }

    const handleEditStart = (msg) => {
        setEditingMsg(msg)
        setEditBody(msg.body)
    }

    const handleEditSave = async (e) => {
        e.preventDefault()
        if (!editBody.trim()) return
        try {
            const res = await api.patch(`/messages/${activeConv.id}/messages/${editingMsg.id}/`, { body : editBody.trim()})
            setMessages(prev => prev.map(m => m.id === editingMsg.id ? res.data : m))
            setEditingMsg(null)
            setEditBody('')
        } catch (err) {
            console.error(err)
        }
    }

    const handleEditCancel = () => {
        setEditingMsg(null)
        setEditBody('')
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if(!newMessage.trim() && !selectedFile) return
        if(!activeConv) return
        setSending(true)

        try {
            let res
             if (selectedFile){
                const formData = new FormData()
                if (newMessage.trim()) formData.append('body', newMessage.trim())
                formData.append('file', selectedFile)
                res = await api.post(`/messages/${activeConv.id}/messages/`, formData, {headers : {'Content-Type' : 'multipart/form-data'}})
            } else {
                res = await api.post(`/messages/${activeConv.id}/messages/`, {body : newMessage.trim()})
            }

            setMessages(prev => [...prev, res.data])
            setNewMessage('')
            clearFile()
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

                
                <div className={`
                    flex flex-col bg-white border-r border-slate-100
                    ${mobileView === 'chat' ? 'hidden' : 'flex'}
                    w-full md:flex md:w-[35%]
                `}>
                    <div className='px-4 py-4 border-b border-slate-100'>
                        <h2 className='font-bold text-lg text-slate-800'>Messages</h2>
                        <p className='text-xs text-slate-400'>Chat with your patients</p>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                        {conversations.length === 0 ? (
                            <div className='p-6 text-center text-sm text-slate-400'>
                                No conversations yet
                            </div>
                        ) : conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => handleSelectConv(conv)}  // ← use handleSelectConv
                                className={`flex items-start space-x-3 px-4 py-3.5 cursor-pointer border-b border-slate-100 transition-colors
                                    ${activeConv?.id === conv.id ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                            >
                                {conv.other_person_picture ? (
                                    <img src={conv.other_person_picture} className='w-10 h-10 rounded-full object-cover flex-shrink-0' alt='' />
                                ) : (
                                    <div className='w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0'>
                                        {getInitials(conv.other_person_name)}
                                    </div>
                                )}
                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-center'>
                                        <p className='text-sm font-semibold text-slate-800 truncate'>{conv.other_person_name}</p>
                                        {conv.unread_count > 0 && (
                                            <span className='w-5 h-5 bg-blue-500 rounded-full text-[9px] text-white flex items-center justify-center flex-shrink-0'>
                                                {conv.unread_count}
                                            </span>
                                        )}
                                    </div>
                                    <p className='text-[10px] font-medium text-slate-500'>{conv.other_person_subtitle}</p>
                                    {conv.last_message && (
                                        <p className='text-xs text-slate-400 truncate mt-0.5'>{conv.last_message.body}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className={`
                    flex-col bg-[#f8fafc]
                    ${mobileView === 'chat' ? 'flex' : 'hidden'}
                    w-full md:flex md:flex-1
                `}>
                    {activeConv ? (
                        <>
                            <div className='bg-white px-4 py-3.5 border-b border-slate-100 flex items-center space-x-3'>
                                <button
                                    onClick={handleBack}
                                    className='md:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer flex-shrink-0'
                                >
                                    <LuArrowLeft className='w-4 h-4 text-slate-600' />
                                </button>
                                {activeConv.other_person_picture ? (
                                    <img src={activeConv.other_person_picture} className='w-9 h-9 rounded-full object-cover' alt='' />
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

                            <div className='flex-1 overflow-y-auto px-5 py-4 flex flex-col space-y-3'>
                                {messages.map((msg) => (
                                    <div 
                                        key={msg.id} 
                                        className={`flex ${msg.is_mine ? 'justify-end' : 'justify-start'}`}
                                        onMouseEnter={() => setHoveredMsgId(msg.id)}
                                        onMouseLeave={() => setHoveredMsgId(null)}
                                    >
                                        <div className={`max-w-[75%] md:max-w-[65%] flex flex-col space-y-1 ${msg.is_mine ? 'items-end' : 'items-start'}`}>

                                            
                                            {msg.file_url && (
                                                <div className={`rounded-2xl overflow-hidden ${msg.is_mine ? 'rounded-br-sm' : 'rounded-bl-sm'}`}>
                                                    {msg.file_type === 'image' ? (
                                                        <img
                                                            src={msg.file_url}
                                                            className='max-w-full max-h-45 object-cover cursor-pointer rounded-xl'
                                                            alt='attachment'
                                                            onClick={() => window.open(msg.file_url, '_blank')}
                                                        />
                                                    ) : (
                                                        <a
                                                            href={msg.file_url}
                                                            target='_blank'
                                                            rel='noreferrer'
                                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl border
                                                                ${msg.is_mine
                                                                    ? 'bg-blue-500 border-blue-400 text-white'
                                                                    : 'bg-white border-slate-100 text-slate-800'
                                                                }`}
                                                        >
                                                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                                                                ${msg.is_mine ? 'bg-blue-400' : 'bg-red-50'}`}>
                                                                {msg.file_type === 'pdf' ? (
                                                                    <LuFileText className={`w-5 h-5 ${msg.is_mine ? 'text-white' : 'text-red-500'}`} />
                                                                ) : (
                                                                    <LuFile className={`w-5 h-5 ${msg.is_mine ? 'text-white' : 'text-blue-500'}`} />
                                                                )}
                                                            </div>
                                                            <div className='flex-1 min-w-0'>
                                                                <p className='text-xs font-medium truncate'>
                                                                    {msg.file_url.split('/').pop()}
                                                                </p>
                                                                <p className={`text-[10px] ${msg.is_mine ? 'text-blue-200' : 'text-slate-400'}`}>
                                                                    Tap to open
                                                                </p>
                                                            </div>
                                                            <LuDownload className={`w-4 h-4 flex-shrink-0 ${msg.is_mine ? 'text-blue-200' : 'text-slate-400'}`} />
                                                        </a>
                                                    )}
                                                </div>
                                            )}

                                            {msg.body && (
                                                editingMsg?.id === msg.id ? (
                                                    <form onSubmit={handleEditSave} className='flex items-center space-x-2 w-full mt-2'>
                                                        <input
                                                            autoFocus
                                                            value={editBody}
                                                            onChange={(e) => setEditBody(e.target.value)}
                                                            className='flex-1 bg-white border-2 border-blue-300 rounded-xl px-3 py-2 text-sm outline-none'
                                                        />
                                                        <button type='submit'
                                                            className='w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700'>
                                                            <LuCheck className='w-3.5 h-3.5 text-white' />
                                                        </button>
                                                        <button type='button' onClick={handleEditCancel}
                                                            className='w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-200'>
                                                            <LuX className='w-3.5 h-3.5 text-slate-600' />
                                                        </button>
                                                    </form>

                                                ) : (
                                                    <div className='flex items-center space-x-4'>
                                                        <div className={`px-4 py-2.5 rounded-2xl text-sm
                                                            ${msg.is_mine
                                                                ? 'bg-blue-600 text-white rounded-br-sm'
                                                                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                                                            }`}
                                                        >
                                                            {msg.body}
                                                            
                                                        </div>
                                                        <AnimatePresence>
                                                            {msg.is_mine && hoveredMsgId === msg.id && !editingMsg && (
                                                                <motion.div
                                                                    {...messageActions} 
                                                                    className='flex items-center space-x-2 mb-1 overflow-hidden'>
                                                                    <button
                                                                        onClick={() => handleEditStart(msg)}
                                                                        className='flex items-center space-x-1 text-[10px] justify-center text-slate-400 hover:text-blue-600 bg-white border border-slate-100 p-1 h-7 w-7 rounded-lg shadow-xs cursor-pointer transition-colors'
                                                                    >
                                                                        <LuPencil  className='w-3 h-3'/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteMessage(msg.id)}
                                                                        className='flex items-center space-x-1 text-[10px] justify-center text-slate-400 hover:text-red-500 bg-white border border-slate-100 p-1 h-7 w-7 rounded-lg shadow-xs cursor-pointer transition-colors'
                                                                    >
                                                                        <LuTrash2  className='w-3 h-3'/>
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                        
                                                    </div>
                                                    
                                                )
                                                
                                            )}
                                            

                                            <span className='text-[10px] text-slate-400'>
                                                {msg.is_mine ? 'You' : msg.sender_name} · {formatTime(msg.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <form onSubmit={handleSend} className='bg-white border-t border-slate-100 px-3 py-3 flex flex-col space-y-2'>

                                {selectedFile && (
                                    <div className='flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2'>
                                        {filePreview ? (
                                            <img src={filePreview} className='w-10 h-10 rounded-lg object-cover flex-shrink-0' alt='preview' />
                                        ) : (
                                            <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0'>
                                                {selectedFile.type === 'application/pdf' ? (
                                                    <LuFileText className='w-5 h-5 text-red-500' />
                                                ) : (
                                                    <LuFile className='w-5 h-5 text-blue-500' />
                                                )}
                                            </div>
                                        )}
                                        <div className='flex-1 min-w-0'>
                                            <p className='text-xs font-medium text-slate-700 truncate'>{selectedFile.name}</p>
                                            <p className='text-[10px] text-slate-400'>
                                                {(selectedFile.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                        <button
                                            type='button'
                                            onClick={clearFile}
                                            className='w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center flex-shrink-0 cursor-pointer'
                                        >
                                            <LuX className='w-3 h-3 text-slate-600' />
                                        </button>
                                    </div>
                                )}

                                <div className='flex items-center space-x-2'>

                                    <div className='relative' ref={attachMenuRef}>
                                        <button
                                            type='button'
                                            onClick={() => setShowAttachMenu(!showAttachMenu)}
                                            className={`w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-colors flex-shrink-0
                                                ${showAttachMenu ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
                                        >
                                            <LuPlus className='w-4 h-4' />
                                        </button>

                                        {showAttachMenu && (
                                            <div className='absolute bottom-12 left-0 bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden w-50 z-10'>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        fileInputRef.current.accept = 'image/*'
                                                        fileInputRef.current.click()
                                                    }}
                                                    className='w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-left'
                                                >
                                                    <div className='w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0'>
                                                        <LuImage className='w-3.5 h-3.5 text-green-600' />
                                                    </div>
                                                    <span className='text-[13px] text-slate-700'>Photo / Video</span>
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        fileInputRef.current.accept = 'application/pdf'
                                                        fileInputRef.current.click()
                                                    }}
                                                    className='w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-left border-t border-slate-50'
                                                >
                                                    <div className='w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0'>
                                                        <LuFileText className='w-3.5 h-3.5 text-red-500' />
                                                    </div>
                                                    <span className='text-[13px] text-slate-700'>PDF</span>
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={() => {
                                                        fileInputRef.current.accept = '.doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt'
                                                        fileInputRef.current.click()
                                                    }}
                                                    className='w-full flex items-center border space-x-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer text-left border-t border-slate-50'
                                                >
                                                    <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0'>
                                                        <LuFile className='w-3.5 h-3.5 text-blue-500' />
                                                    </div>
                                                    <span className='text-[13px] text-slate-700'>Document</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type='file'
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className='hidden'
                                    />

                                    <input
                                        type='text'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder='Type your message...'
                                        className='flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-blue-300'
                                    />

                                    <button
                                        type='submit'
                                        disabled={sending || (!newMessage.trim() && !selectedFile)}
                                        className='w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0'
                                    >
                                        <LuSend className='w-4 h-4 text-white' />
                                    </button>
                                </div>
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