import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {FaCalendarCheck, FaAmbulance, FaUserMd, FaUsers, FaExclamationTriangle, FaClock} from 'react-icons/fa';
import { MdBiotech } from "react-icons/md";
import { LuMessageSquareHeart } from "react-icons/lu";
import slider1 from '../images/slider/slides1.webp';
import slider2 from '../images/slider/slides2.webp';
import slider3 from '../images/slider/slides3.webp';
import slider4 from '../images/slider/slides4.webp';


const slides = [
    {
        id : 1, 
        image : slider2,
        title_1 : 'Exceptional Healthcare',
        title_2 : 'You can Trust',
        text : 'Providing compassionate, world-class medical services with cutting-edge technology and a team of  dedicated healthcare professionals committed to your well-being.',
        buttons : [{text : 'Book Appointment', icon : <FaCalendarCheck  className="mr-2"/>, path : '', bg : 'bg-blue-600', color : 'text-white'}, {text : 'Emergency Services', icon : <FaAmbulance  className="mr-2"/>, path : '', bg : 'bg-red-600', color : 'text-white'}, {text : 'Find a Doctor', icon : <FaUserMd  className="mr-2"/>, path : '', bg : 'border-1 border-white', color : 'text-white'},]
    },
    {
        id : 2, 
        image : slider3,
        title_1 : 'Advanced Medical Technology',
        title_2 : 'Leading Innovation',
        text : 'Experience the future of healthcare with our state-of-the-art medical equipment, robotic surgery systems, and cutting-edge diagnostic tolls for precise treatment.',
        buttons : [{text : 'Our Technology', icon : <MdBiotech  className="mr-2"/>, path : '', bg : 'bg-blue-600', color : 'text-white'}, {text : 'Find a Doctor', icon : <FaUserMd  className="mr-2"/>, path : '', bg : 'bg-red-600', color : 'text-white'}, {text : 'Find a Doctor', icon : <FaUserMd  className="mr-2"/>, path : '', bg : 'border-1 border-white', color : 'text-white'},]
    },
    {
        id : 3, 
        image : slider1,
        title_1 : 'Compassionate Care',
        title_2 : 'Every Step of the Way',
        text : 'Our dedicated team of healthcare professionals provides personalized care with empathy, ensuring comfort and support throughout your healing journey',
        buttons : [{text : 'Patient Stories', icon : <LuMessageSquareHeart  className="mr-2"/>, path : '', bg : 'bg-blue-600', color : 'text-white'}, {text : 'About Our Team', icon : <FaUsers className="mr-2"/>, path : '', bg : 'bg-red-600', color : 'text-white'}, {text : 'Find a Doctor', icon : <FaUserMd className="mr-2"/>, path : '', bg : 'border-1 border-white', color : 'text-white'},]
    },
    {
        id : 4, 
        image : slider4,
        title_1 : '24/7 Emergency Care',
        title_2 : 'Always Here for You',
        text : 'Round-the-clock emergency services with rapid response times, specialized trauma care, and immediate access to life saving treatments when you need them most', 
        buttons : [{text : 'Emergency Info', icon : <FaExclamationTriangle className="mr-2"/>, path : '', bg : 'bg-blue-600', color : 'text-white'}, {text : 'ER Wait Times', icon : <FaClock  className="mr-2"/>, path : '', bg : 'bg-red-600', color : 'text-white'}, {text : 'Find a Doctor', icon : <FaUserMd className="mr-2" />, path : '', bg : 'border-1 border-white', color : 'text-white'},]
    },
];
const hero_data = [
    {
        id : 1,
        counts : 50,
        value : '+',
        text : 'Years of Excellence',
    },
    {
        id : 2,
        counts : 200,
        value : '+',
        text : 'Expert Doctors',
    },
    {
        id : 3,
        counts : 500,
        value : '+',
        text : 'Beds Available',
    },
    {
        id : 4,
        counts : 24,
        value : '/7',
        text : 'Emergency Care',
    },
]

function SlideInner({ slide }){
    const slideState = useSwiperSlide();
    const isActive = !!slideState && !!slideState.isActive;
    return (
        <div className="relative w-full h-full bg-cover bg-center overflow-hidden" style={{ backgroundImage : `url(${slide.image})`}}>
            <div className="absolute inset-0 bg-black/55" />
                <div className={`relative z-10 h-full flex flex-col justify-center items-center px-6 lg:px-24`}>
                    <motion.h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white text-center mb-1 w-full md:w-[70%] mt-15 md:mt-10"
                        initial = {{opacity : 0, x:40}}
                        animate = {isActive ? {opacity : 1, x :0} : {opacity : 0, x : 40}}
                        transition = {{delay : 0.15, duration : 0.7}}
                    >
                        {slide.title_1}
                    </motion.h1>
                    <motion.h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-blue-200 text-center mb-3"
                        initial = {{opacity : 0, x:-40}}
                        animate = {isActive ? {opacity : 1, x :0} : {opacity : 0, x : 40}}
                        transition = {{delay : 0.15, duration : 0.7}}
                    >
                        {slide.title_2}
                    </motion.h2>
                    <motion.h3
                        className="hidden md:flex md:text-xs lg:text-sm leading-tight text-white text-center mb-2 w-[60%]"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ delay: 0.35, duration: 0.7 }}
                        >
                        {slide.text}
                    </motion.h3>
                    <motion.div 
                        initial = {{opacity : 0, x : 40}}
                        whileInView={{opacity : 1, x : 0}}
                        transition={{duration : 1}}
                        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 w-[90%] md:w-[70%] lg:w-[55%] p-3">
                        {slide.buttons.map((button) => (
                            <motion.button whileHover={{scale : 1.05}} whileTap={{scale :0.95}} className={`md:w-38 lg:w-45 h-11 flex items-center ${button.bg} ${button.color} text-[10px] md:text-[12px] lg:text-[13px] font-semibold justify-center cursor-pointer rounded-sm`}>
                                {button.icon} {button.text}
                            </motion.button>
                        ))}
                    </motion.div>
                    <div 
                        
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 w-[80%] md:w-[65%] mt-10">
                        {hero_data.map((data) =>(
                            <motion.div 
                                // initial = {{opacity : 0, y:-20}}
                                // whileHover={{opacity : 1, y : 0}}
                                // transition={{duration : 1}}
                            className="flex flex-col items-center">
                                <h2 className="text-blue-200 text-xl md:text-2xl font-bold">
                                    {data.counts}{data.value}
                                </h2>
                                <p className="text-xs text-white mt-1 mb-3 md:mb-0">
                                    {data.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

        </div>
    )
}

export default function HeroSlider(){
    return(
        <section className="w-full min-h-[80vh] overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                slidesPerView={1}
                effect="fade"
                loop={true}
                autoplay = {{delay : 7000, disableOnInteraction:false}}
                navigation
                pagination = {{clickable:true}}
                className="h-[90vh]"
            >
                {slides.map((s) => (
                    <SwiperSlide key={s.id}>
                        <SlideInner slide={s} />
                    </SwiperSlide>
                ))}

            </Swiper>

        </section>
    );
}