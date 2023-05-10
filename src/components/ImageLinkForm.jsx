import React from 'react'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className='center m-4 text-base text-white'>
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
                    <input 
                        type="text" 
                        className='text-sm p-2 w-9/12 mx-auto rounded-l' 
                        onChange={onInputChange}/>
                    <button className='w-3/12 
                        rounded-r 
                        text-sm
                        px-4
                        py-2
                        inline-block
                        text-white
                        bg-purple-600
                        hover:bg-blue-800
                        cursor-pointer'
                        onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm