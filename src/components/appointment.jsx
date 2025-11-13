import { motion } from "framer-motion";
import { FaTimes, FaCalendarAlt, FaUserMd } from "react-icons/fa";

export default function Appointment(){
    return(
        <>
            <div className="w-full p-5 border-1 border-red-500 flex flex-col items-center bg-[#F9FAFB]">
                <form className="w-[65%] h-auto px-10 py-5 flex flex-col items-center bg-white rounded-md">
                    <h3 className="font-semibold text-xl mb-3">
                        Book an Appointment
                    </h3>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Full Name</label>
                        <input type="text"  placeholder="Enter your full name" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Email</label>
                        <input type="text"  placeholder="Enter your email" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Phone Number</label>
                        <input type="text"  placeholder="+234 800 000 0000" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Select Services</label>
                        <select type="text"  placeholder="+234 800 000 0000" className=" h-11 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"> 
                            <option value="" disabled>-- Choose Department --</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                            <option value="Orthopedics">Orthopedics</option>

                        </select>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Preffered Date</label>
                        <input type="date" className=" h-10 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"/>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        <label htmlFor="" className="text-[12px] mb-0.5">Message (Optional)</label>
                        <textarea placeholder="Describe your concern" className=" h-20 border-1 border-gray-400 p-3 rounded-sm text-[13px] outline-none hover:border-1 hover:border-blue-300 transition-all"></textarea>
                        <input  />
                    </div>
                </form>
            </div>
        </>
    );
}
