import { FaEnvelope, FaLinkedin } from "react-icons/fa";
import { Teams } from "../data/data";
import { motion } from "framer-motion";
import { cardscrollRight, scrollLeft, scrollRight, scrollUp } from "../animations/effects";
export default function Team(){
    return(
        <>
            <div className="w-full flex flex-col items-center lg:p-10 bg-[#F9FAFB] overflow-hidden" id="aboutTeam">
                <motion.h3 {...scrollLeft} className="text-2xl md:text-3xl font-bold mt-5 md:mt-0">
                    Leadership Team
                </motion.h3>
                <motion.p {...scrollUp} className="text-gray-500 w-90 md:w-150 text-xs md:text-sm mt-2 text-center">
                    Meet the experienced leaders who guide our mission to provide exceptional healthcare
                    to our community.
                </motion.p>
                <div className="w-full mt-5 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden">
                    {Teams.map((team) =>(
                        <motion.div {...cardscrollRight} className="w-full flex flex-col mb-5 rounded-md">
                            <img src={team.image} className="w-full h-55 object-cover rounded-t-md" />
                            <div className="w-full flex flex-col p-3 rounded-b-md bg-white shadow-sm">
                                <h3 className="text-sm font-semibold">
                                    {team.name}
                                </h3>
                                <p className="text-blue-600 text-xs font-semibold my-2">
                                    {team.title}
                                </p>
                                <p className="text-[10px] mb-2 text-gray-600">
                                    {team.desc}
                                </p>
                                <div className="flex space-x-2">
                                   <a href=""><FaLinkedin  className="text-blue-600 cursor-pointer"/></a>
                                    <a href=""><FaEnvelope className="text-blue-600 cursor-pointer"/></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}