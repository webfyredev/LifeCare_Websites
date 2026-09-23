import { motion } from 'framer-motion'
import { LuPlus } from 'react-icons/lu'
import { buttonEffects } from '../../animations/effects'
export default function Lifecare_Appointments(){
    return(
        <>
            <div className="w-full space-y-5">
                <div className="flex items-center justify-between w-full">
                    <div className='w-auto flex flex-col space-y-1'>
                        <h3 className='font-bold text-2xl text-[#1e293b]'>Appointments</h3>
                        <p className='text-[13px] text-[#94a3b8]'>View and manage all appointments.</p>
                    </div>
                    <motion.button
                        {...buttonEffects}
                        className="bg-blue-600 text-white hover:bg-blue-700 flex h-11 md:h-10 flex justify-center items-center px-4 text-sm font-semibold rounded-lg cursor-pointer"
                    >
                        <LuPlus className="mr-1" /> Schedule Appointment
                    </motion.button>
                </div>
            </div>
        </>
    )
}