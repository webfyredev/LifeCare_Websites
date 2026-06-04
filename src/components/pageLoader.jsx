import { useEffect, useState } from 'react'
import logoImg from '../images/logo.png'

export default function PageLoader(){
    const [dots, setDots] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >=3 ? '' : prev + '.')
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6'>
            {/* Animated logo */}
            <div className='relative'>
                <div className='w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse'>
                    <img src={logoImg} alt='LifeCare' className='w-10 h-10' />
                </div>
                {/* Spinning ring */}
                <div className='absolute inset-0 rounded-2xl border-4 border-blue-200 border-t-blue-600 animate-spin' />
            </div>

            <div className='flex flex-col items-center space-y-1'>
                <h3 className='font-bold text-blue-600 text-lg'>LifeCare</h3>
                <p className='text-sm text-slate-400'>Loading your dashboard{dots}</p>
            </div>

            {/* Progress bar */}
            <div className='w-48 h-1 bg-slate-100 rounded-full overflow-hidden'>
                <div className='h-full bg-blue-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]' />
            </div>
        </div>
    )
}