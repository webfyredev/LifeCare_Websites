import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeads from "../components/pageHeads";
import aboutImage from '../images/homeService/about.webp'
import { about_core_values } from "../data/data";
import { FaCheck } from "react-icons/fa";
import coreImg from '../images/about_core.webp'
import Team from "../components/team";
export default function About(){
    return(
        <>
            <NavBar />
            <PageHeads 
            title = 'About LifeCare Hospital'
            image = {aboutImage}
            text = 'Dedicated to excellence in healthcare for over 50 years, serving our community with compassion, innovation, and unwavering commitment to patient care.'/>
            <div className="w-full flex flex-col mt-5 px-10 py-5">
                <h3 className="text-2xl mt-5 font-bold px-5">
                    Our Mission & Vission
                </h3>
                <div className="w-full mt-5 flex">
                    <div className="w-[45%] h-auto p-5">
                        <p className="text-blue-600 font-semibold mb-4">
                            Mission Statement
                        </p>
                        <p className="text-[13px] text-gray-600 text-justify mb-5">
                            To provide exceptional, compassionate healthcare services that improve the  health and well-being
                            of your community. We are committed to delivering patient-centered care through clinical excellence, innovative
                            treatments, and a dedication to healing that extends beyond medical treatment to encompass the whole person.
                        </p>
                        <p className="text-blue-600 font-semibold mb-4">
                            Our Vission
                        </p>
                        <p className="text-[13px] text-gray-600 text-justify mb-5">
                            To be the leading healthcare provider in our region, recognized for our clinical excellence, 
                            innovative care delivery, and commitmentto improving community health outcomes. We envision a future where every patient
                            recieves personalized, world-class medical care in a compassionate and healthy environments.
                        </p>
                        <p className="text-blue-600 font-semibold mb-4">
                            Core Values
                        </p>
                        <div className="flex flex-col space-y-6">
                            {about_core_values.map((values) =>(
                                <p className="flex items-center text-xs text-gray-600"><FaCheck  className="w-2 h-2 text-green-400 mr-2"/> <span className="font-semibold mr-1">{values.title}:</span> {values.text}</p>
                            ))}
                        </div>
                    </div>
                    <div className="w-[45%] ml-15 p-5">
                    <img src={coreImg} className="w-full h-full object-cover rounded-md"/>
                    </div>
                </div>
            </div>
            <Team />
            <Footer />
        </>
    )
}