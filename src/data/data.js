import {FaUserMd, FaCalendarCheck, FaAmbulance, FaUser, FaBaby, FaHospital, FaUserCheck, FaAward, FaStethoscope, FaClipboardCheck, FaRadiation, FaRobot, FaFileMedical, FaMobileAlt, FaNotesMedical, FaPrescriptionBottleAlt, FaSkullCrossbones, FaPhoneVolume} from 'react-icons/fa';
import { MdMedicalServices, MdVerified, MdOutlineAccessTime, MdScanner, MdMonitorHeart, MdOutlineVideoCall, MdQuickreply, MdSchedule, MdPayment} from "react-icons/md";
import { FaUserDoctor, FaHospitalUser, FaHeartPulse, FaPeopleGroup } from "react-icons/fa6";
import { FiAward, FiShield, FiActivity, FiHeart} from "react-icons/fi"
import { AiFillStar } from "react-icons/ai"
import { BiTestTube } from "react-icons/bi";
import { IoChatbubblesSharp } from "react-icons/io5";
import { GiHealthNormal, GiScalpel, GiMicroscope} from "react-icons/gi";
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
import team1 from '../images/team/team1.webp'
import team2 from '../images/team/team2.webp'
import team3 from '../images/team/team3.webp'
import team4 from '../images/team/team4.webp'
import team5 from '../images/team/team5.webp'
import team6 from '../images/team/team6.webp'
import choose1 from '../images/choose/choose1.webp'
import choose2 from '../images/choose/choose2.webp'
import choose3 from '../images/choose/choose3.webp'
import choose4 from '../images/choose/choose7.webp'
import choose5 from '../images/choose/choose5.webp'
import choose6 from '../images/choose/choose6.webp'
import service1 from '../images/services/service1.webp'
import service2 from '../images/services/service2.webp'
import service3 from '../images/services/service3.webp'
import service4 from '../images/services/service4.webp'
import service5 from '../images/services/service5.webp'
import service6 from '../images/services/service6.webp'
import service7 from '../images/services/service7.webp'
import service8 from '../images/services/service8.webp'
import f_doctors3 from '../images/find_doctor/doctor3.webp'
import f_doctors2 from '../images/find_doctor/doctor2.webp'
import f_doctors1 from '../images/find_doctor/doctor1.webp'
import f_doctors4 from '../images/find_doctor/doctor4.webp'
import f_doctors5 from '../images/find_doctor/doctor5.webp'
import f_doctors6 from '../images/find_doctor/doctor6.webp'
import f_doctors7 from '../images/find_doctor/doctor7.webp'
import f_doctors10 from '../images/find_doctor/doctor10.webp'
import f_doctors9 from '../images/find_doctor/doctor9.webp'
import f_doctors8 from '../images/find_doctor/doctor8.webp'


export const emergencycontacts = [
    {
        id : 1,
        icon : FaHeartPulse,
        title : 'Life-Threatening Emergency',
        phone : '911'
    },
    {
        id : 2,
        icon : FaHospital,
        title : 'Emergency Departments',
        phone : '(234) 8079 0098'
    },
    {
        id : 3,
        icon : FaSkullCrossbones,
        title : 'Poison Control',
        phone : '(234) 8098 99980'
    },
    {
        id : 4,
        icon : FaPhoneVolume,
        title : 'Crisis Hotline',
        phone : '988'
    },

]
export const contactslocation = [
    {
        title : 'Main Hospital',
        id : 1,
        address : '17 life clinic street Lagos. Nigeria',
        phone_1 : '(234) 8054 7860',
        phone_2 : '(234) 8054 7860',
        visitingHours : ['24/7  Emergency Services', 'Visiting Hours: 8 AM - 8 PM']
    },
    {
        title : 'North Campus',
        id : 1,
        address : '17 life clinic street Lagos. Nigeria',
        phone_1 : '(234) 8054 7860',
        phone_2 : '(234) 8054 7860',
        visitingHours : ['Mon-Fri: 7 AM - 7 PM', 'Sat-Sun: 8 AM - 5 PM']
    },
    
]
export const contactNumbers = [
    {
        id : 1,
        title : 'Emergency', 
        number : '911', 
        text : 'Life threatening emergencies',
    },
    {
        id : 2,
        title : 'Main Line', 
        number : '(234) 8043 - 4567', 
        text : 'General information & appointments',
    },
    {
        id : 3,
        title : 'Patient services', 
        number : '(234) 8045 - 4509', 
        text : 'Patient advocacy & support',
    },
    {
        id : 4,
        title : 'Billing', 
        number : '(234) 8109 9078', 
        text : 'Insurance & billing questions',
    },
    {
        id : 5,
        title : 'Medical records', 
        number : '(234) 8067 4675', 
        text : 'Record requests & transfers',
    },
    {
        id : 6,
        title : 'Pharmacy', 
        number : '(234) 9089 0980', 
        text : 'Prescription information',
    },

]
export const portalinfo = [
    {
        id : 1,
        icon : FaNotesMedical, 
        title : 'Medical Records',
        text : 'Access your complete medical history, test results and treatment plans',
    },
    {
        id : 2,
        icon : MdSchedule, 
        title : 'Appointments',
        text : 'Schedule, reschedule, or cancel appointments with your healthcare provider'
    },
    {
        id : 3,
        icon : FaPrescriptionBottleAlt, 
        title : 'Prescription',
        text : 'Request prescription refills and view your current medications',
    },
    {
        id : 4,
        icon : BiTestTube, 
        title : 'Test Results',
        text : 'View lab results, imaging reports, and other diagnostic information.',
    },
    {
        id : 5,
        icon : MdPayment,
        title : 'Billing',
        text : 'View and pay bills, check insurance coverage, and manage payments.',
    },
    {
        id : 6,
        icon : IoChatbubblesSharp,
        title : 'Secure messaging',
        text : 'Communicate securely with your healthcare team and ask questions'
    },
]
export const medicalaid = ['First aid supplies', 'Emergency medications', 'Emergency contacts', 'Medical Information', 'Flashlight & batteries', 'Emergency water']
export const emergency911 = ['Person is unconcious or unresponsive', 'Severe chest pain or difficult breahting', 'Signs of broke (face drooping, arm weakness, speech difficulty', 'Severe bleeding that wont stop', 'Suspected poisoning or overdose', 'Severe burns or electrical shock', 'Head injury with loss of consciousness']
export const emergencycare = ['High Fever with severe symptoms', 'Persistent vomitting or diarrhea', 'Severe abdominal pain', 'Deep cuts that may need stiches', 'Suspected broken bones', 'Severe allergic reactions'];
export const emergencysteps = [
    {
        id : 1,
        title : 'Assess the Situation', 
        text : 'Check for responsiveness and breathing.Ensure the scene is safe.'
    },
    {
        id : 2,
        title : 'Call for Help', 
        text : 'Call 911 immediately, Provide clear location and description of emergency',
    },
    {
        id : 3,
        title : 'Provide First Aid', 
        text : 'Apply basic first aid if trained.Do not more injured person unless neccessary',
    },
    {
        id : 4,
        title : 'Stay with Patient', 
        text : 'Monitor breathing and conciousness. Provide comfort and reassurance',
    },
    {
        id : 5,
        title : 'Prepare for EMS', 
        text : 'Gather medical information, medications, and insurance cards if possible'
    },

]
export const emergencyDocs = ['Valid photo ID', 'Insurance cards', 'Lis of current medications', 'Medical history or information', 'Emergency contact information', 'Any relevant medical records', 'Comfort items for children'];
export const emergencynotes = [
    {
        id : 1, 
        title : 'Insurance',
        text : 'We accept most major insurance plans. Financial assistance available for qualifying patients.',
    },
    {
        id : 2, 
        title : 'Parking',
        text : 'Free emergency parking is available in the designated emergency entrance area'
    },
    {
        id : 3, 
        title : 'Visitors',
        text : 'Limited visitors allowed in emergency department. Check current visitor policies'
    },
]
export const emergencyData = [
    {
        id : 1,
        icon : FaAmbulance, 
        title : 'Emergency Department',
        text : 'For life-threatening conditions that require immediate medical attention:',
        values : ['Chest pain or pressure', 'Difficulty breathing', 'Severe bleeding', 'Head injury with loss of consciousness', 'Stroke symptoms (face drooping, arm weakness, speech difficulty)', 'Severe burns', 'Poisoning or overdose', 'Severe allergic reactions', 'Broken bones with visible deformity', 'High fever wth severe symptoms'],
        btn_text : 'Call 911',
        card_bg : 'bg-[#FEECE9]',
        btn_bg : 'bg-red-500',
        text_style : 'text-red-500'

    },
    {
        id : 2,
        icon : MdQuickreply, 
        title : 'Urgent Care',
        text : 'For non-life-threatening conditions that need prompt attention',
        values : ['Minor cuts and wounds', 'Sprains and minor fractures', 'Mild to moderate fever', 'Ear infections', 'Sore throat', 'Minor burns', 'Rashes and skin irritations', 'Cold and flu symptoms', 'Minor eye injuries', 'Urinary tract infections'],
        btn_text : 'Book Urgent Care',
        card_bg : 'bg-[#E8F1FF]',
        btn_bg : 'bg-blue-600',
        text_style : 'text-blue-600'

    }

]
export const find_doctors = [
  {
    id: 1,
    name: "Dr. Amara Kenson",
    title: "Chief of Cardiology",
    department: "Cardiology",
    education: "MD, Trinity Medical College",
    experience: "14+ years",
    location: "Main Hospital",
    rating: 4.9,
    languages: ["English", "Igbo"],
    image: f_doctors1,
    acceptingPatients: true,
  },
  {
    id: 2,
    name: "Dr. Malik Davenport",
    title: "Chief Surgeon",
    department: "Surgery",
    education: "MD, Eastbridge University",
    experience: "19+ years",
    location: "Main Hospital",
    rating: 4.8,
    languages: ["English"],
    image: f_doctors2,
    acceptingPatients: true,
  },
  {
    id: 3,
    name: "Dr. Liora Menendez",
    title: "Pediatric Specialist",
    department: "Pediatrics",
    education: "MD, St. Claire Medical Institute",
    experience: "11+ years",
    location: "North Campus",
    rating: 4.9,
    languages: ["English", "Spanish"],
    image: f_doctors3,
    acceptingPatients: true,
  },
  {
    id: 4,
    name: "Dr. Jaden Oriri",
    title: "Emergency Medicine Director",
    department: "Emergency",
    education: "MD, Hillcrest Medical School",
    experience: "17+ years",
    location: "Main Hospital",
    rating: 4.7,
    languages: ["English"],
    image: f_doctors4,
    acceptingPatients: false,
  },
  {
    id: 5,
    name: "Dr. Zariah Koldren",
    title: "Neurology Consultant",
    department: "Neurology",
    education: "MD, Northwind University",
    experience: "13+ years",
    location: "City Branch",
    rating: 4.8,
    languages: ["English", "French"],
    image: f_doctors5,
    acceptingPatients: true,
  },
  {
    id: 6,
    name: "Dr. Rowan Ekwueme",
    title: "Orthopedic Surgeon",
    department: "Orthopedics",
    education: "MD, Southridge College of Medicine",
    experience: "15+ years",
    location: "West Campus",
    rating: 4.7,
    languages: ["English"],
    image: f_doctors6,
    acceptingPatients: true,
  },
  {
    id: 7,
    name: "Dr. Elara Nworie",
    title: "OB/GYN Specialist",
    department: "OB/GYN",
    education: "MD, Meridian Health University",
    experience: "10+ years",
    location: "Main Hospital",
    rating: 4.9,
    languages: ["English", "Yoruba"],
    image: f_doctors7,
    acceptingPatients: false,
  },
  {
    id: 8,
    name: "Dr. Caelan Vester",
    title: "Oncology Consultant",
    department: "Oncology",
    education: "MD, Arcadia School of Medicine",
    experience: "16+ years",
    location: "Cancer Center",
    rating: 4.8,
    languages: ["English"],
    image: f_doctors8,
    acceptingPatients: true,
  },
  {
    id: 9,
    name: "Dr. Mireya Solarin",
    title: "Dermatology Specialist",
    department: "Dermatology",
    education: "MD, Crestview Medical University",
    experience: "9+ years",
    location: "South Campus",
    rating: 4.6,
    languages: ["English", "Portuguese"],
    image: f_doctors9,
    acceptingPatients: true,
  },
  {
    id: 10,
    name: "Dr. Kieran Adedayo",
    title: "Pulmonology Consultant",
    department: "Pulmonology",
    education: "MD, Riverview Medical Institute",
    experience: "18+ years",
    location: "Main Hospital",
    rating: 4.8,
    languages: ["English"],
    image: f_doctors10,
    acceptingPatients: false,
  },
];

export const edgeCards = [
    {
        id : 1,
        icon : GiMicroscope, 
        icon_style : 'bg-[#E8F1FF] text-[#3B82F6]',
        title : 'Digital Pathology',
        text : 'AI assisted pathology for faster, more accurate diagnosis'
    },
    {
        id : 2,
        icon : MdOutlineVideoCall, 
        icon_style : 'bg-[#E9F8F1] text-[#22C55E]',
        title : 'Telemedicine',
        text : 'Remote consultations and follow-up care from home',
    },
    {
        id : 3,
        icon : FaFileMedical, 
        icon_style : 'bg-[#F4E8FF] text-[#A855F7]',
        title : 'Electronic Health Records',
        text : 'Integrated digital health records for coordinated care',
    },
    {
        id : 4,
        icon : FaMobileAlt, 
        icon_style : 'bg-[#FEECE9] text-[#F87171]',
        title : 'Mobile Health Apps',
        text : 'Patient portal and health monitoring applications'
    },
];
export const edges = [
    {
        id : 1,
        icon : FaRobot,
        icon_style : 'bg-[#E8F1FF] text-[#3B82F6]',
        title : 'Robotic Surgery',
        text : 'Minimally invasive robotic surgery with enhanced precision, smaller incision, and faster recovery times.'
    },
    {
        id : 2,
        icon : MdScanner,
        icon_style : 'bg-[#E9F8F1] text-[#22C55E]',
        title : 'MRI Technology',
        text : 'High-field MRI providing exceptional image wuality for accurate diagosis of complex conditions'
    },
    {
        id : 3,
        icon : MdMonitorHeart,
        icon_style : 'bg-[#F4E8FF] text-[#A855F7]',
        title : 'Cardiac Cathetherization Lab',
        text : 'Advanced cardiac intervention capabilities with real-time imaging and minimally invasive procedures',
    },
    {
        id : 4,
        icon : FaRadiation,
        icon_style : 'bg-[#FEECE9] text-[#F87171]',
        title : 'Linear Accelerator',
        text : 'Precision radition therapy for cancer treatment with image-guide targeting technology',
    },
]
export const packages = [
    {
        id : 1,
        icon : FaHeartPulse, 
        icon_style : 'bg-[#3B82F6]',
        card_bg : 'bg-[#E8F1FF]',
        title : 'Heart Health Package',
        text : 'Comprehensive cardiovascular screening and  preventive care including EKG, stress testing, and consultation.',
        activities : ['Complete cardiac evalutaion', 'Lipid profile and blood work', 'Nutritional counselling', 'Follow-up care plan'],
        price : '299',
        price_style : 'text-[#3B82F6]' 
    },
    {
        id : 2,
        icon : FaClipboardCheck, 
        icon_style : 'bg-[#22C55E]',
        card_bg : 'bg-[#E9F8F1]',
        title : 'Wellness Screening',
        text : 'Annual comprehensive health screening to  detect potential health issues early and maintain optimal wellness.',
        activities : ['Complete physical examination', 'Cancer screenings', 'Immunization updates', 'Health risk assessment'],
        price : '199', 
        price_style : 'text-[#22C55E]',
    },
    {
        id : 3,
        icon : FaPeopleGroup, 
        icon_style : 'bg-[#A855F7]',
        card_bg : 'bg-[#F4E8FF]',
        title : 'Heart Health Package',
        text : 'Comprehensive healthcare for the entire family with pediatric and adult services under one roof',
        activities : ['Fmaily Medicine consultaion', 'Pediatric care included', 'Vaccination schedules', 'Health education resources'],
        price : '449', 
        price_style : 'text-[#A855F7]',
    },
]
export const services = [
    {
        id : 1,
        image : service1,
        title : '24/7 Emergency Department',
        text : 'Round-the-clock emergency medical care with trauma specialists and advanced life support.',
        values : ['Trauma Center Level ||', 'Cardiac Emergency Care', 'Stroke Center', 'Pediatric Emergency']
    },
    {
        id : 2,
        image : service2,
        title : 'Advanced Surgical Services',
        text : 'State-of-the-art surgical suites with minimally invasive and robotic surgery options.',
        values : ['Robotic Surgery', 'Minimally Invasive Procedures', 'Outpatient Surgery', 'Complex Procedures']
    },
    {
        id : 3,
        image : service3,
        title : 'Cardiovascular Care',
        text : 'Comprehensive heart and vascular care from prevention to advanced international procedures',
        values : ['Cardiac Catheterization', 'Heart Surgery', 'Preventive Cardiology', 'Electrophysiology']
    },
    {
        id : 4,
        image : service4,
        title : 'Pediatric Services',
        text : 'Specialized medical care for infants, children, and adolescents in a child-friendly environment',
        values : ['Pediatric Emergency', 'Child Surgery', 'Development Care', 'Family-Centered Care']
    },
    {
        id : 5,
        image : service5,
        title : 'Medical Imaging & Radiology',
        text : 'Advanced diagnostic imaging services with the latest technology for accurate diagnosis',
        values : ['MRI& CT Scans', 'Digital X-Ray', 'Ultrasound', 'Nuclear Medicine']
    },
    {
        id : 6,
        image : service6,
        title : 'Oncology Services',
        text : 'Comprehensive cancer care with multidisciplinary approach and latest treatments options.',
        values : ['Chemotherapy', 'Radiation Therapy', 'Surgical Oncology', 'Support Services']
    },
    {
        id : 7,
        image : service7,
        title : 'Orthopedic Services',
        text : 'Expert carefor bone, joint, and muscle conditions with advanced treatment options.',
        values : ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Physical Therapy']
    },
    {
        id : 8,
        image : service8,
        title : 'Women Health',
        text : 'Comprehsive womens healthcare services from routine care to  specialized treatments.',
        values : ['Obstetrics & Gynecology', 'Maternity Care', 'Breast Health', 'Reproductive Health']
    },

]
export const number2 = [
    {
        id : 1,
        icon : FaAmbulance, 
        icon_style : 'bg-[#3B82F6]',
        card_bg : 'bg-[#E8F1FF]',
        counts : 35000,
        value : '+',
        title : 'Annual Emergency Visits',
        text : '24/7 emergency care with average 15-minutes wait time.'
    },
    {
        id : 2,
        icon : GiScalpel, 
        icon_style : 'bg-[#22C55E]',
        card_bg : 'bg-[#E9F8F1]',
        counts : 12000,
        value : '+',
        title : 'Annual Surgeries',
        text : 'Including 2000+ robotic-assisted procedures'
    },
    {
        id : 3,
        icon : FaBaby, 
        icon_style : 'bg-[#A855F7]',
        card_bg : 'bg-[#F4E8FF]',
        counts : 1800,
        value : '+',
        title : 'Annul Births',
        text : 'Level ||| NICU with 24/7 neonatology coverage'
    },
]
export const number1 = [
    {
        id : 1,
        count : 500,
        value : '+',
        text : 'Licensed Beds',
    },
    {
        id : 2,
        count : 200,
        value : '+',
        text : 'Physicians',
    },
    {
        id : 3,
        count : 800,
        value : '+',
        text : 'Nurses',
    },
    {
        id : 4,
        count : 50,
        value : '+',
        text : 'Specialist',
    },
    {
        id : 5,
        count : 100,
        value : 'K+',
        text : 'Licensed Beds',
    },
    {
        id : 6,
        count : 2500,
        value : '+',
        text : 'Employees',
    },

]
export const aboutCards = [
    {
        id : 1,
        icon : FiActivity, 
        icon_style : 'bg-[#3B82F6]',
        card_bg : 'bg-[#E8F1FF]',
        title : 'Free Health Screenings',
        text : 'Monthly community health fairs offering free screenings for diabetics, hypertension, cholesterol and cancer prevention'
    },
    {
        id : 2,
        icon : FaStethoscope, 
        icon_style : 'bg-[#22C55E]',
        card_bg : 'bg-[#E9F8F1]',
        title : 'Free Health Screenings',
        text : 'Monthly community health fairs offering free screenings for diabetics, hypertension, cholesterol and cancer prevention'
    },
    {
        id : 3,
        icon : FiHeart, 
        icon_style : 'bg-[#A855F7]',
        card_bg : 'bg-[#F4E8FF]',
        title : 'Free Health Screenings',
        text : 'Monthly community health fairs offering free screenings for diabetics, hypertension, cholesterol and cancer prevention'
    },
]

export const difference = [
    {
        id : 1,
        value : '$15M',
        text : 'Annual Charity Care'
    },
    {
        id : 2,
        value : '25000',
        text : 'Community Screenings',
    },
    {
        id : 3,
        value : '150', 
        text : 'Health Education Events',
    },
    {
        id : 4,
        value : '50+',
        text : 'Community Partners'
    }
]
export const awards = [
    {
        id : 1,
        icon : FiAward, 
        icon_style : 'bg-[#FFF7CC] text-[#F4C400]',
        title : 'JCI Accreditation',
        text : 'Joint Commission International accreditation for meeting thehighest international standards for patient safety and quality care'
    },
    {
        id : 2, 
        icon : AiFillStar, 
        icon_style : 'bg-[#E8F1FF] text-[#3B82F6]',
        title : '5-Star Rating',
        text : 'CMS 5-star overall rating for exceptional performance in quality measures, patient experience and safety.',
    },
    {
        id : 3,
        icon : FiShield,
        icon_style : 'bg-[#F4E8FF] text-[#A855F7]',
        title : 'Magnet Recognition', 
        text : 'American Nurses Credentialing Center. Magnet Recognition for nursing excellence and quality patient outcomes.'
    },
    {
        id : 4,
        icon : FaHospital,
        icon_style : 'bg-[#FEECE9] text-[#F87171]',
        title : 'Top Hospital', 
        text : 'Recognized as a Top Hospital by the Joint Comission for quality and safety performance excellence.'
    },
    {
        id : 5,
        icon : FaUserCheck, 
        icon_style : 'bg-[#EDEBFF] text-[#6D28D9]',
        title : 'Patient Choice Award',
        text : 'National Research Corporation Patient Choice Award for exceptional patient experience and satisfaction scores.'
    },
    {
        id : 6,
        icon : FaAward,
        icon_style : 'bg-[#FFF4E5] text-[#F59E0B]',
        title : 'Best Workplace',
        text : 'Fortune Best companies to Work For recognition for creating an  exceptional workspace culture and employee satisfaction.'
    }
]
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
        link : '/doctors#doctorsForm',
        btn_style : 'border-1 border-blue-600 text-blue-600 rounded-md',
    },
    {
        id : 2,
        icon : FaCalendarCheck,
        icon_style : 'bg-green-100 text-green-600',
        title : 'Book Appointment',
        text : 'Schedule a visit online',
        btn_text : 'Book Now',
        link : '/appointments#appointments',
        btn_style : 'border-1 border-blue-600 text-blue-600 rounded-md',
    },
    {
        id : 1,
        icon : FaAmbulance,
        icon_style : 'bg-red-100 text-red-600',
        title : 'Emergency',
        text : '24/7 emergency services',
        btn_text : 'Call Now',
        link : '/emergency#emergencyprep',
        btn_style : 'bg-red-600 text-white rounded-md',
    },
    {
        id : 4,
        icon : FaUser,
        icon_style : 'bg-blue-100 text-blue-600',
        title : 'Patient Portal',
        text : 'Access your medical records',
        btn_text : 'Login',
        link : '/patient-portal',
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
        name : 'Dr Angellina Coles',
        title : 'Chief Medical Officer',
        desc : 'Board-certified cardiologist with 20 years of  clinical experience. Dr Coles oversees all medical staff and ensures the highest standards of patient care and safety.'
    },
    {
        id : 3,
        image : team3, 
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
        image : team6, 
        name : 'Stanlely Chelmson',
        title : 'Chief Operation Officer',
        desc : 'With over 25 years in healthcare administration. Dr Blems leads our strategic vision and operational excellence.He holds an MD Harvard Medical School and an MBA from Wharton'
    },

];