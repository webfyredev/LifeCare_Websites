export default function Footer_Cta(){
    return(
        <>
            <div className="w-full h-70 bg-blue-600 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold text-white">
                    Ready to Experience Exceptional Healthcare?
                </h2>
                <p className="w-150 text-sm mt-4 text-center text-gray-200">
                    Take the first step towards your health. Book an appointment with our specialists or explore
                    our comprehensive medical services
                </p>
                <div className="flex mt-5 space-x-4">
                    <button className="border-1 px-9 py-3 text-sm bg-white rounded-sm font-semibold text-blue-600 cursor-pointer">
                        Book Appointment
                    </button>
                    <button className="border-1 border-white px-9 py-3 text-sm rounded-sm font-semibold text-white cursor-pointer">
                        Explore Services
                    </button>
                </div>
            </div>
        </>
    )
}