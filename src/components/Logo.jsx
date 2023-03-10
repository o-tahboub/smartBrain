import React from 'react'
import Tilt from 'react-parallax-tilt';
import logo from '../assets/logo.svg'

const Logo = () => {
    return (
        <div className="h-28 w-28 m-4 mt-0 p-3">
            <Tilt>
                <img src={logo} className='pt-1' alt="smart-brain-logo"/>
            </Tilt>
        </div>
    )
}

export default Logo
