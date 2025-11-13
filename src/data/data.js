import {FaUserMd, FaCalendarCheck, FaAmbulance, FaUser} from 'react-icons/fa'
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
]