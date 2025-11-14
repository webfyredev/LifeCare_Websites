import { cardscrollRight } from "../animations/effects";
import { chooseUs } from "../data/data";
import { motion } from "framer-motion";
export default function ChooseUs(){
    return(
        <>
            <div className="w-full flex flex-col items-center p-5 bg-white mt-10 overflow-hidden">
                <h3 className="text-2xl md:text-3xl font-bold">
                    Why Choose Our Hospital?
                </h3>
                <div className="w-full mt-5 py-5 px-5 lg:px-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {chooseUs.map((data) =>(
                        <motion.div {...cardscrollRight} className="mb-5 lg:mb-0 flex flex-col items-center hover:cursor-pointer px-5 py-10 bg-[#F9FAFB] shadow-sm hover:shadow-md rounded-md">
                            <data.icon className="text-3xl text-blue-400 mb-4"/>
                            <h3 className="mb-2 font-semibold text-sm">
                                {data.title}
                            </h3>
                            <p className="text-sm text-center text-gray-600">
                                {data.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </>
    );
}