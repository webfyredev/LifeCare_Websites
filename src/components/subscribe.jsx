import { motion } from "framer-motion";
import { buttonEffects } from "../animations/effects";
import axios from "axios";
import { useState } from "react";
export default function Subscribe(){
    const [subscriptionData, setSubscriptionData] = useState({
        email : ""
    });
    const [status, setStatus] = useState({message: "", type: ""})
    const handlesubscriptionChange = (e) => {
        setSubscriptionData({...subscriptionData, [e.target.name] : e.target.value});
    };
    const handleSubscriptionSubmission = async(e) => {
        e.preventDefault();
        try{
            await axios.post("http://127.0.0.1:8000/subscription/", subscriptionData)
            setStatus({message : `Thanks for subscribing to our newsletter (${subscriptionData.email})`, type : "success"});
            setSubscriptionData({
                email : ""
            });
            setTimeout(() => setStatus(""), 7000);
        } catch(error){
            setStatus({message : "Failed to subscribe to our newsletter", type : "error"});
            setTimeout(() => setStatus(""), 7000)
        }
    }
    return(
        <>
        {status.message && (
            <motion.div 
            initial = {{opacity : 0, y : -40}}
            animate = {{opacity : 1, y : 0}}
            transition={{duration:1}}
            exit={{opacity : 0, y : -40}}
            className={`fixed top-5 transform -translate-x-1/2 left-1/2 z-50 px-3 py-4 md:py-3.5 rounded-md shadow-sm text-white text-xs md:text-sm text-center w-[95%] h-12 font-semibold ${status.type === "success" ? 'bg-green-500' : 'bg-red-500'}`}>
                {status.message}
            </motion.div>
        )}
            <div className="w-full p-5 flex flex-col items-center bg-[#F9FAFB] mt-5 overflow-hidden">
                <h2 className="mt-5 font-bold text-xl md:text-2xl">
                    Stay Connected with LifeCare
                </h2>
                <p className="text-[10px] md:text-[13px] mt-2 text-gray-500 text-center">
                    Get the latest health tips, hospital news, and important updates delivered to your inbox.
                </p>
                <form onSubmit={handleSubscriptionSubmission} className="w-[45%] md:w-[65%] w-full my-3 flex justify-evenly py-2">
                    <input type="email" name="email" value={subscriptionData.email} required onChange={handlesubscriptionChange} placeholder="Enter your email address" className="w-[60%] h-10 text-xs px-3 rounded-sm bg-white shadow-sm outline-blue-200"/>
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