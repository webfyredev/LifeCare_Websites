import { blogs } from "../data/data";
export default function Blog(){
    return(
        <>
            <div className="w-full p-10 bg-[#F9FAFB] flex flex-col items-center mt-5">
                <h3 className="text-3xl font-bold">
                    Latest News & Health Tips
                </h3>
                <p className="text-gray-500 w-150 text-sm text-center mt-2">
                    Stay informed with the latest medical news, health tips, and updates from our hospital
                </p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 p-5">
                    {blogs.map((blog) =>(
                        <div className="flex flex-col rounded-md bg-white shadow-sm">
                            <img src={blog.image} className="object-cover h-60 rounded-t-md"/>
                            <div className="w-full flex flex-col p-3">
                                <p className={`text-xs font-semibold ${blog.tag_style}`}>
                                    {blog.tag}
                                </p>
                                <h3 className="font-semibold my-2 text-sm">
                                    {blog.title}
                                </h3>
                                <p className="text-[13px] text-gray-500 mb-3">
                                    {blog.text}
                                </p>

                                <button className="w-30 h-10 my-2 text-sm text-left font-semibold text-blue-600 cursor-pointer">
                                    Read More
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
                <button className="border-1 mt-3 px-9 py-3 text-sm border-1 border-blue-600 rounded-sm font-semibold text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-white transition-all duration-300">
                    View All News & Article
                </button>
            </div>
        </>
    );
}