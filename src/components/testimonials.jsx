import { testimonials } from "../data/data"
import { FaStar } from "react-icons/fa"
import { motion } from "framer-motion"
import { CardscrollLeft, scrollLeft, scrollUp } from "../animations/effects"
export default function Testimonial(){
    return (
        <>
            <div className="flex items-center flex-col px-5 lg:px-10 py-10 bg-white mt-5 overflow-hidden" id="testimonial">
                <motion.h3 {...scrollLeft} className="text-2xl md:text-3xl font-bold">
                    What Our Patients Say
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-sm text-center mt-2">
                    Read testimonials from patients who have experienced our exceptional care and service
                </motion.p>
                <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 md:px-5 lg:px-10 overflow-hidden">
                    {testimonials.map((data) =>(
                        <motion.div {...CardscrollLeft} className="flex flex-col bg-[#F9FAFB] px-5 py-10 rounded-md shadow-xs mb-3 lg:mb-0">
                            <div className="flex">
                                <img src={data.image} className="w-13 h-13 object-cover rounded-full"/>
                                <div className="flex flex-col p-2">
                                    <h3 className="text-xs font-semibold">
                                        {data.name}
                                    </h3>
                                    <p className="text-xs">
                                        {data.role}
                                    </p>
                                </div>
                            </div>
                            <div className="flex mt-3">
                                {Array.from({length : 5}).map((_, i) =>(
                                    <FaStar key={i} size={12} className={i < data.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                                ))}
                            </div>
                            <p className="text-[12px] my-3">
                                "
                                    {data.message}
                                "
                            </p>
                        </motion.div>

                    ))}
                </div>
            </div>
        </>
    )
}