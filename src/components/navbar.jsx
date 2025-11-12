import { Link } from "react-router-dom"
export default function NavBar(){
    return(
        <>
            <nav className="w-full h-auto flex items-center justify-between border-1 border-red-500  px-10 py-3">
                <div className="flex cursor-pointer">
                    <h3 className="font-bold text-blue-600">
                        LIFECARE
                    </h3>
                </div>
                <ul className="hidden lg:flex items-center space-x-2 text-gray-600">
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            Home
                        </Link>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            About Us
                        </Link>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            Services
                        </Link>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            Find a Doctor
                        </Link>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            Emergency
                        </Link>
                    </li>
                    <li className="cursor-pointer px-5 text-[12px] h-9 flex items-center hover:rounded-sm hover:font-semibold hover:text-blue-600">
                        <Link>
                            Contact
                        </Link>
                    </li>
                    <div className="flex space-x-3 h-full">
                        <button className="border-1 text-xs px-4 py-2 h-full rounded-sm cursor-pointer border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                            Patient Portal
                        </button>
                        <button className="border-1 text-xs px-4 py-2 h-full rounded-sm cursor-pointer bg-blue-600 text-white font-semibold hover:bg-transparent hover:border-1 hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                            Book Appointment
                        </button>
                    </div>
                </ul>
            </nav>
        </>
    )
}