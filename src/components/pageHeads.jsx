export default function PageHeads(props){
    return(
        <>
            <div className="w-full h-70 mb-5 relative">
                <img src={props.image} className='w-full h-full object-cover object-bottom'/>
                <div className='absolute top-0 left-0 w-full h-full inset-0 bg-black/55'>
                    <div className='w-[60%] h-35 absolute top-20 left-[20%] flex  flex-col items-center'>
                        <h2 className='text-4xl font-bold text-white my-3'>
                            {props.title}
                        </h2>
                        <p className='w-150 text-center text-gray-200'>
                            {props.text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
};