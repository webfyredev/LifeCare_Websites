import {FaUserMd, FaCalendarCheck, FaAmbulance, FaUser} from 'react-icons/fa';
import { MdMedicalServices, MdVerified, MdOutlineAccessTime } from "react-icons/md";
import { FaUserDoctor, FaHospitalUser } from "react-icons/fa6";
import { GiHealthNormal } from "react-icons/gi";
import hService1 from '../images/homeService/service1.webp'
import hService2 from '../images/homeService/service2.webp'
import hService3 from '../images/homeService/service3.webp'
import hService4 from '../images/homeService/service4.webp'
import hService5 from '../images/homeService/service5.webp'
import hService6 from '../images/homeService/service6.webp'
import testimonial1 from '../images/testimonial/test1.jpg'
import testimonial2 from '../images/testimonial/test2.jpg'
import testimonial3 from '../images/testimonial/test3.jpg'
import blog1 from '../images/blog/blog1.jpg'
import blog2 from '../images/blog/blog2.jpg'
import blog3 from '../images/blog/blog3.jpg'
import doctors1 from '../images/doctors/doctors1.jpg'
import doctors2 from '../images/doctors/doctors2.jpg'
import doctors3 from '../images/doctors/doctors3.jpg'
import doctors4 from '../images/doctors/doctors4.jpg'
import team1 from '../images/team/team (1).jpg'
import team2 from '../images/team/team (2).jpg'
import team3 from '../images/team/team (3).jpg'
import team4 from '../images/team/team (4).jpg'
import team5 from '../images/team/team (5).jpg'
import team6 from '../images/team/team (6).jpg'
import choose1 from '../images/choose/choose1.webp'
import choose2 from '../images/choose/choose2.webp'
import choose3 from '../images/choose/choose3.webp'
import choose4 from '../images/choose/choose7.webp'
import choose5 from '../images/choose/choose5.webp'
import choose6 from '../images/choose/choose6.webp'

export const faqs = [
  {
    id : 1,
    question: "How can I book a medical appointment?",
    answer: "You can book an appointment online through our booking portal, by calling our hotline, or visiting the hospital reception."
  },
  {
    id : 2,
    question: "Do you offer 24/7 emergency services?",
    answer: "Yes, our Emergency Department operates round the clock with fully equipped staff and medical teams."
  },
  {
    id :3,
    question: "How can I find a specialist doctor?",
    answer: "Visit the 'Find a Doctor' section to browse specialists by name, department, or medical condition."
  },
  {
    id : 4,
    question: "Which health insurance plans do you accept?",
    answer: "We accept a wide range of insurance providers. You can view the full list on our Insurance Information page."
  },
  {
    id : 5,
    question: "Can I access my medical records online?",
    answer: "Yes, patients can securely access their medical records through our online Patient Portal after registration."
  },
  {
    id : 6,
    question: "What should I bring for my first hospital visit?",
    answer: "Please bring a valid ID, insurance card, previous medical reports (if any), and a list of medications you're currently using."
  }
];
export const facilities = [
    {
      title: "Modern Operating Theatre",
      desc: "Equipped with advanced surgical technology for safe and precise procedures.",
      image: choose1,
    },
    {
      title: "24/7 Emergency Room",
      desc: "Rapid response emergency care with dedicated medical teams.",
      image: choose2,
    },
    {
      title: "Digital Radiology & Imaging",
      desc: "High-resolution MRI, CT Scan, and X-Ray services for accurate diagnosis.",
      image: choose3,
    },
    {
      title: "Advanced Laboratory",
      desc: "Automated laboratory systems for fast and reliable test results.",
      image: choose4,
    },
    {
      title: "Pharmacy & Drug Store",
      desc: "Fully stocked pharmacy with expert pharmacists on duty.",
      image: choose5,
    },
    {
      title: "Patient Recovery Rooms",
      desc: "Comfortable, well-equipped rooms designed for patient safety and rest.",
      image: choose6,
    },
  ];
export const chooseUs = [
    {
      icon: MdMedicalServices,
      title: "Advanced Medical Technology",
      desc: "We use the latest diagnostic and treatment equipment to ensure the best patient outcomes.",
    },
    {
      icon: FaUserDoctor,
      title: "Experienced Specialists",
      desc: "Our team of certified doctors and surgeons bring decades of combined medical expertise.",
    },
    {
      icon: MdOutlineAccessTime,
      title: "24/7 Emergency Support",
      desc: "Round-the-clock emergency services with fast response and dedicated care teams.",
    },
    {
      icon: GiHealthNormal,
      title: "Patient-Centered Care",
      desc: "We prioritize compassion, comfort, and personalized attention for every patient.",
    },
    {
      icon: MdVerified,
      title: "Accredited & Certified",
      desc: "Recognized for maintaining international healthcare standards and safety protocols.",
    },
    {
      icon: FaHospitalUser,
      title: "High Success Rate",
      desc: "Our medical procedures and treatments have proven success supported by research and data.",
    },
];

export const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Cardiologist",
        image: doctors1,
        availableDays: ["Monday", "Wednesday", "Friday"],
    },
    {
        id: 2,
        name: "Dr. David Okafor",
        specialty: "Orthopedic Surgeon",
        image: doctors2,
        availableDays: ["Tuesday", "Thursday", "Saturday"],
    },
    {
        id: 3,
        name: "Dr. Emily Zhang",
        specialty: "Pediatrician",
        image: doctors3,
        availableDays: ["Monday", "Tuesday", "Friday"],
    },
    {
        id: 4,
        name: "Dr. Michael Adeyemi",
        specialty: "Neurologist",
        image: doctors4,
        availableDays: ["Wednesday", "Thursday", "Sunday"],
    },
];
export const heroNext = [
    {
        id : 1,
        icon : FaUserMd,
        icon_style : 'bg-blue-100 text-blue-600',
        title : 'Find a Doctor',
        text : 'Search our directory of Specialists',
        btn_text : 'Search Now',
        btn_style : 'border-1 border-blue-600 text-blue-600 rounded-md',
    },
    {
        id : 2,
        icon : FaCalendarCheck,
        icon_style : 'bg-green-100 text-green-600',
        title : 'Book Appointment',
        text : 'Schedule a visit online',
        btn_text : 'Book Now',
        btn_style : 'border-1 border-blue-600 text-blue-600 rounded-md',
    },
    {
        id : 1,
        icon : FaAmbulance,
        icon_style : 'bg-red-100 text-red-600',
        title : 'Emergency',
        text : '24/7 emergency services',
        btn_text : 'Search Now',
        btn_style : 'bg-red-600 text-white rounded-md',
    },
    {
        id : 4,
        icon : FaUser,
        icon_style : 'bg-blue-100 text-blue-600',
        title : 'Patient Portal',
        text : 'Access your medical records',
        btn_text : 'Login',
        btn_style : 'border-1 border-blue-600 text-blue-600 rounded-md',
    },
]

export const homeService = [
    {
        id : 1,
        image : hService1,
        title : 'Cardiology',
        text : 'Comprehensive heart care with advanced cardiac procedures and preventive treatments',
        path : ''
    },
    {
        id : 2,
        image : hService2,
        title : 'Neurology',
        text : 'Expert Neurological care for brain, spine and nervous system conditions',
        path : ''
    },
    {
        id : 3,
        image : hService3,
        title : 'Surgery',
        text : 'State-of-the-art surgical procedures with minimally invasive techniques',
        path : ''
    },
    {
        id : 4,
        image : hService4,
        title : 'Pediatrics',
        text : 'Specializedcare for children from infancy through adolescense',
        path : ''
    },
    {
        id : 5,
        image : hService5,
        title : 'Obstetrics & Gynecology',
        text : 'Complete womens health services including maternity and reproductive care',
        path : ''
    },
    {
        id : 6,
        image : hService6,
        title : 'Orthopedics',
        text : 'Advanced treatment for bone, joint and musculoskeletal conditions',
        path : ''
    }

]
export const about_data = [
    {
        id : 1,
        counts : 200,
        value : '+',
        text : 'Expert Physicians',
    },
    {
        id : 2,
        counts : 50,
        value : '+',
        text : 'Medical Sepcialities',
    },
    {
        id : 3,
        counts : 100,
        value : 'K',
        text : 'Patients Served',
    },
    {
        id : 4,
        counts : 24,
        value : '/7',
        text : 'Emergency Care',
    },
];

export const testimonials = [
    {
        id : 1,
        image : testimonial1,
        name : 'Sarah Johnson',
        rating : 5,
        role : 'Cardiac Surgery Patient',
        message : 'The cardiac team at LifeCare Hospital saved my life.Their expertise, compassion and state-of-art facilities made all the difference in my recovery. I cannot thank them enough.',
    },
    {
        id : 2,
        image: testimonial2,
        name : 'Micheal Bams',
        rating : 5,

        role : 'Orthopedic Patient',
        message : 'After my knee replacement surgery, the rehabilitation team helped me get back to playing tennis. The personalized care and attention to detail exceeding my expectations.'
    },
    {
        id : 3,
        image : testimonial3,
        name : 'Gloria Bums',
        rating : 5,

        role : 'Maternity Patient',
        message : 'Giving birth at LifeCare hospital was an amazing experience. The maternity staff made me feel safe and supported throughout the entire process.Highyly recommended.'
    }
]

export const blogs =[
    {
        id : 1,
        image :  blog2,
        tag : 'Health Tips',
        tag_style : 'text-blue-600',
        title : '10 Ways to Keep Youe Heart Healthy',
        text : 'Learn essential tips from our cardiologists to maintain a healthy heart and prevent cardiovascular diseases'
    },
    {
        id : 2,
        image :  blog3,
        tag : 'Hospital News',
        tag_style : 'text-green-600',
        title : 'New Advanced MRI Technology Installed',
        text : 'We have upgraded our imaging capabilities with state-of-art MRI technology for better patient diagnosis'
    },
    {
        id : 3,
        image :  blog1,
        tag : 'Community',
        tag_style : 'text-purple-600',
        title : 'Free Community Health Fair This Saturday',
        text : 'Join us for free health screenings, consultations and education workshops for the whole family.'
    },
];

export const about_core_values = [
    {
        id : 1,
        title : 'Compassion',
        text : 'We treat every patient with empathy, respects and  dignity',
    },
    {
        id : 2,
        title : 'Excellence',
        text : 'We strive for  the highest standards in everything we do',
    },
    {
        id : 3,
        title : 'Innovation',
        text : 'We embrance new technologies and treatments to improve care',
    },
    {
        id : 4,
        title : 'Integrity',
        text : 'We conduct ourselves with honesty and transparency',
    },
    {
        id : 5,
        title : 'Collaboration',
        text : 'We work together as a team to achieve the best outcomes',
    },
];

export const Teams = [
    {
        id : 1,
        image : team1, 
        name : 'Dr Gamlly Blems',
        title : 'Chief Executive Officer',
        desc : 'With over 25 years in healthcare administration. Dr Blems leads our strategic vision and operational excellence.He holds an MD Harvard Medical School and an MBA from Wharton'
    },
    {
        id : 2,
        image : team2, 
        name : 'Dr Micheal Coles',
        title : 'Chief Medical Officer',
        desc : 'Board-certified cardiologist with 20 years of  clinical experience. Dr Coles oversees all medical staff and ensures the highest standards of patient care and safety.'
    },
    {
        id : 3,
        image : team6, 
        name : 'Colmsill Kandey',
        title : 'Chief Nusring Officer',
        desc : 'Kandey is recognised as a nursing leader with 18 years of experience. Kandey champions nursing excellence and leads our 800+ nursing staff in delivering patient care.'
    },
    {
        id : 4,
        image : team4, 
        name : 'Robert Caloes',
        title : 'Chief Financial Officer',
        desc : 'With over 25 years in healthcare administration. Dr Blems leads our strategic vision and operational excellence.He holds an MD Harvard Medical School and an MBA from Wharton'
    },
    {
        id : 5,
        image : team5, 
        name : 'James Brownly',
        title : 'Chief Tecnology Officer',
        desc : 'With over 25 years in healthcare administration. Dr Blems leads our strategic vision and operational excellence.He holds an MD Harvard Medical School and an MBA from Wharton'
    },
    {
        id : 1,
        image : team3, 
        name : 'Stanlely Chelmson',
        title : 'Chief Operation Officer',
        desc : 'With over 25 years in healthcare administration. Dr Blems leads our strategic vision and operational excellence.He holds an MD Harvard Medical School and an MBA from Wharton'
    },

]