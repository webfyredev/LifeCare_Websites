import { doctors } from "../data/data";
export default function Doctors(){
    return(
        <>
            <div className="w-full p-5 flex flex-col items-center bg-[#F9FAFB] overflow-hidden">
                <h3 className="text-3xl font-bold mt-5">
                    Meet Our Doctors
                </h3>
                <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 overflow-hidden">
                    {doctors.map((doctor) =>(
                        <div key={doctor.id} className="mb-5 lg:mb-0">
                            <img src={doctor.image} className="w-full h-50 object-cover rounded-t-md"/>
                            <div className="w-full flex flex-col p-2 shadow-xs rounded-b-md">
                                <h3 className="text-sm font-semibold">
                                    {doctor.name}
                                </h3>
                                <p className="text-gray-500 text-xs my-2">
                                    {doctor.specialty}
                                </p>
                                <p className="text-xs font-semibold mt-2 text-gray-600">
                                    Available Days:
                                </p>
                                <ul className="flex space-x-3 my-2">
                                    {doctor.availableDays.map((days) =>(
                                        <li key={doctor.id} className="w-20 text-xs p-1.5 text-center rounded-md bg-gray-100">
                                            {days}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}