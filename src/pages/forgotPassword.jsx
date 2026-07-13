import { useEffect, useState } from "react"
import api from "../api/axios"
import NavBar from "../components/navbar"
import { Link } from "react-router-dom"
import logo from '../images/logo.png'
import { FaEnvelope } from "react-icons/fa"


export default function ForgotPassword(){
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        document.title = 'Forgot Password - LifeCare'
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await api.post('/accounts/forgot-password/', { email })
            setSuccess(true)
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return(
        <div className='min-h-screen bg-[#f8fafc] flex items-center justify-center px-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8'>

                {/* Logo */}
                <div className='flex flex-col items-center mb-8'>
                    <div className="flex items-center cursor-pointer">
                        <img src={logo} className="h-12 w-12 mt-1"/>
                        <h3 className="text-xl font-bold text-blue-500 ml-[-4px]">
                            LIFECARE
                        </h3>
                    </div>
                    <h1 className='text-xl font-bold text-slate-800'>Forgot your password?</h1>
                    <p className='text-sm text-slate-400 mt-1 text-center'>
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {success ? (
                    // Success state
                    <div className='flex flex-col items-center space-y-4'>
                        <div className='w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center'>
                            {/* <span className='text-3xl'></span> */}
                            <FaEnvelope  className="w-8 h-8 text-blue-600"/>
                        </div>
                        <div className='text-center'>
                            <h2 className='font-semibold text-slate-800'>Check your email</h2>
                            <p className='text-sm text-slate-400 mt-1'>
                                We sent a reset link to <span className='font-medium text-slate-700'>{email}</span>
                            </p>
                            <p className='text-xs text-slate-400 mt-2'>
                                Didn't receive it? Check your spam folder or try again.
                            </p>
                        </div>
                        <button
                            onClick={() => {setSuccess(false); setEmail('') }}
                            className='cursor-pointer text-sm text-blue-600 font-medium hover:text-blue-700'
                        >
                            Try a different email
                        </button>
                        <Link to='/login' className='text-sm text-slate-400 hover:text-slate-600'>
                            Back to login
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
                            <label className='text-xs font-semibold text-slate-600'>Email address</label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your registered email'
                                required
                                className='border border-slate-200 rounded-lg px-3 py-3 text-sm outline-blue-300'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-blue-500 text-white text-sm font-semibold py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-60'
                        >
                            {loading ? 'Sending...' : 'Send reset link'}
                        </button>

                        <Link to='/login' className='text-center text-sm text-slate-400 hover:text-slate-600'>
                            Back to login
                        </Link>
                    </form>
                )}
            </div>
        </div>
    )
}