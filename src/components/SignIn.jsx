import React, { useState } from "react"

const SignIn = (props) => {
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onSignInEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }

    const onSignInPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    const onSubmitSignIn = () => {
        fetch( import.meta.env.VITE_API_URL + '/signin',
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(res => res.json())
        .then(userData => {
            if(userData.id) {
                props.loadUser(userData)
                props.onRouteChange('home')
                setErrorMessage('') 
            }
        }).catch(setErrorMessage('Please enter a valid email and password'))
    }

    const {onRouteChange} = props;

    return(
        <div className="center px-6 py-4 mt-24">
            <div className="w-full max-w-xs shadow-2xl">
                <form className="rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-white text-3xl mb-4">Sign In</h2>
                    <div className="mb-4">
                    <label className="block text-white text-base mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    onChange={onSignInEmailChange}
                    />
                    </div>
                    <div className="mb-6">
                    <label className="block text-white text-base mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    type="password" 
                    placeholder="******************" 
                    onChange={onSignInPasswordChange}
                    />
                    <p className="text-red-500 text-xs italic">{errorMessage}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-purple-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button" 
                    onClick={onSubmitSignIn }>
                        Sign In
                    </button>
                    <p className="inline-block align-baseline text-base text-white hover:text-blue-800 hover:cursor-pointer" onClick={() => onRouteChange('register')}>
                        Register
                    </p>
                    </div>
                </form>
            </div>
        </div>
    )
} 

export default SignIn