import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import logo from '../images/logo.png'

import api from "../api/axios"

export default function ResetPassword(){
    const { uid, token } = useParams()
    const navigate = useNavigate()
    const [form, setForm ] = useState({password : '', confirm_password : ''})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = 'Reset-Password - LifeCare'
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.password !== form.confirm_password){
            setError('Password do not match')
            return
        }

        if (form.password.length < 8){
            setError('Password must be atleast 8 characters.')
            return 
        }
        setLoading(true)
        setError(null)

        try{
            await api.post('/accounts/reset-password/',{uid, token, password: form.password, confirm_password : form.confirm_password})
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch (err) {
            setError(err.response?.data?.error || 'This reset link is invalid or has expired.')
        } finally {
            setLoading(false)
        }
    }   

    return (
        <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>

                <div className='flex flex-col items-center mb-8'>
                    <div className="flex items-center cursor-pointer">
                        <img src={logo} className="h-12 w-12 mt-1"/>
                        <h3 className="text-xl font-bold text-blue-500 ml-[-4px]">
                            LIFECARE
                        </h3>
                    </div>
                    <h1 className='text-xl font-bold text-slate-800'>Set new password</h1>
                    <p className='text-sm text-slate-400 mt-1'>Must be at least 8 characters</p>
                </div>

                {success ? (
                    <div className='flex flex-col items-center space-y-4'>
                        <div className='w-16 h-16 bg-green-50 rounded-full flex items-center justify-center'>
                            <span className='text-3xl'>✅</span>
                        </div>
                        <div className='text-center'>
                            <h2 className='font-semibold text-slate-800'>Password reset!</h2>
                            <p className='text-sm text-slate-400 mt-1'>
                                Redirecting you to login in a moment...
                            </p>
                        </div>
                        <Link to='/login' className='text-sm text-blue-600 font-medium'>
                            Go to login now
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='flex flex-col space-y-4'>
                        {error && (
                            <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg'>
                                {error}
                            </div>
                        )}

                        <div className='flex flex-col space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-600'>New password</label>
                            <input
                                type='password'
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder='At least 8 characters'
                                required
                                className='border border-slate-200 rounded-lg px-3 py-3 text-sm outline-blue-300'
                            />
                        </div>

                        <div className='flex flex-col space-y-1.5'>
                            <label className='text-xs font-semibold text-slate-600'>Confirm new password</label>
                            <input
                                type='password'
                                value={form.confirm_password}
                                onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
                                placeholder='Repeat your new password'
                                required
                                className='border border-slate-200 rounded-lg px-3 py-3 text-sm outline-blue-300'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-blue-600 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-60'
                        >
                            {loading ? 'Resetting...' : 'Reset password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}