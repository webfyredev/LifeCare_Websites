import { useState } from "react";
import { faqs } from "../data/data";
import { motion } from "framer-motion";
import { scrollUp } from "../animations/effects";

export default function FAQs(){
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null :index);
    }
    return(
        <>
            <div className="w-full p-5 flex flex-col items-center mt-5 overflow-hidden">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Frequently Asked Questions
                </h2>
                <div className="lg:px-5 py-10 w-full lg:w-[80%] my-5 space-y-5 bg-[#F9FAFB] rounded-md">
                    {faqs.map((faq) => (
                        <motion.div {...scrollUp} key={faq.id} className="w-full rounded-xl p-3 bg-white cursor-pointer" onClick={() => toggleFAQ(faq.id)}>
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-sm text-blue-600">
                                    {faq.question}
                                </h3>
                                <span className="text-lg font-bold text-blue-600">
                                    {openIndex === faq.id ? "-" : "+"}
                                </span>
                            </div>
                            {openIndex === faq.id && (
                                <p className="mt-3 text-gray-600 text-[10px] md:text-[13px]">{faq.answer}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}