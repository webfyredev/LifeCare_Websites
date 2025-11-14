import { Teams } from "../data/data";
export default function Team(){
    return(
        <>
            <div className="w-full flex flex-col items-center p-10 bg-[#F9FAFB]">
                <h3 className="text-3xl font-bold">
                    Leadership Team
                </h3>
                <p className="text-gray-500 w-150 text-sm mt-2 text-center">
                    Meet the experienced leaders who guide our mission to provide exceptional healthcare
                    to our community.
                </p>
                <div className="w-full border-1 mt-5 p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Teams.map((team) =>(
                        <div className="border-1 flex flex-col mb-5 rounded-md">
                            <img src={team.image} className="w-full h-60 object-cover object-top rounded-t-md" />
                            <div className="w-full flex flex-col p-3 border-1 border-red-500 rounded-b-md">
                                <h3 className="text-sm font-semibold">
                                    {team.name}
                                </h3>
                                <p className="text-blue-600 text-xs font-semibold my-2">
                                    {team.title}
                                </p>
                                <p className="text-[10px] mb-2">
                                    {team.desc}
                                </p>
                                <div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}