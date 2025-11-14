import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { facilities } from "../data/data";
import { cardscrollRight } from "../animations/effects";
import { motion } from "framer-motion";


export default function Facilities(){
    return(
        <>
            <div className="max-w-6xl mx-auto px-2 md:px-4 py-16 overflow-hidden" id="facilities">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                    Our Medical Facilities & Technology
                </h2>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    loop={true}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    }}
                >
                    {facilities.map((item, index) => (
                    <SwiperSlide key={index}>
                        <motion.div {...cardscrollRight} className="rounded-xl overflow-hidden shadow-lg bg-white">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-50 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                        </motion.div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}