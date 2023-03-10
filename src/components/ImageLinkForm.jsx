import React from 'react'

const ImageLinkForm = () => {
    return (
        <div>
            <p className='center m-4 text-base'>
                {'This magic brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='flex 
                                justify-center
                                w-4/6
                                min-w-max 
                                p-4 
                                rounded-lg 
                                shadow-lg
                                bg-sky-800'>
                    <input type="text" className='text-sm p-2 w-9/12 mx-auto'/>
                    <button className='w-3/12 
                        ease-out 
                        text-sm
                        hover:scale-105
                        hover:transition-colors
                        hover:ease-in
                        px-4
                        py-2
                        inline-block
                        text-white
                        bg-purple-600
                        cursor-pointer'>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm