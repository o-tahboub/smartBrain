import React from 'react'

const Navigation = ({onRouteChange}) => {
    return (
        <nav className='flex justify-end'>
            <p className='text-2xl 
            text-white 
            underline 
            p-3 
            hover:cursor-pointer 
            hover:transition-colors 
            hover:opacity-50'
            onClick={() => onRouteChange('signin')}>
                Sign Out
            </p>
        </nav>
    )
}

export default Navigation
