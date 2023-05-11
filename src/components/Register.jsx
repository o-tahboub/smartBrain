import React from "react";

const Register = ({onRouteChange}) => {
    return(
        <div className="center px-6 py-4  mt-24">
            <div className="w-full max-w-xs shadow-2xl">
                <form className="rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-white text-3xl mb-4">Register</h2>
                    <div className="mb-4">
                    <label className="block text-white text-base mb-2" htmlFor="name">
                        Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name"/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-white text-base mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
                    </div>
                    <div className="mb-6">
                    <label className="block text-white text-base mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-purple-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => onRouteChange('signin')}>
                        Register
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register