import { motion } from "framer-motion";
import { buttonEffects } from "../animations/effects";
export default function Subscribe(){
    return(
        <>
            <div className="w-full p-5 flex flex-col items-center bg-[#F9FAFB] mt-5">
                <h2 className="mt-5 font-bold text-2xl">
                    Stay Connected with LifeCare
                </h2>
                <p className="text-[13px] mt-2 text-gray-500">
                    Get the latest health tips, hospital news, and important updates delivered to your inbox.
                </p>
                <form className="w-[45%] my-3 flex justify-evenly py-2">
                    <input type="email" placeholder="Enter your email address" className="w-[60%] h-10 text-xs px-3 rounded-sm bg-white shadow-sm"/>
                    <motion.button 
                        {...buttonEffects}
                    className="w-[35%] rounded-sm cursor-pointer text-xs font-semibold text-blue-600 bg-blue-500 text-white shadow-sm">
                        Subscribe
                    </motion.button>
                </form>
            </div>
        </>
    );
}