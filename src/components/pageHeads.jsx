import { motion } from "framer-motion"
import { pageheadEffects } from "../animations/effects"
export default function PageHeads(props){
    return(
        <>
            <div className="w-full h-70 mb-5 relative overflow-hidden">
                <img src={props.image} className='w-full h-full object-cover'/>
                <div className='absolute top-0 left-0 w-full h-full inset-0 bg-black/55'>
                    <motion.div {...pageheadEffects} className='w-[80%] lg:w-[60%] h-35 absolute top-20 left-[10%] lg:left-[20%] flex flex-col items-center'>
                        <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center my-3'>
                            {props.title}
                        </h2>
                        <p className='w-90 text-xs md:text-sm md:w-150 text-center text-gray-200'>
                            {props.text}
                        </p>
                    </motion.div>
                </div>
            </div>
        </>
    )
};