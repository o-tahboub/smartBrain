import React, {  useState } from "react";

const Register = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onRegister = () => {
        fetch(import.meta.env.VITE_API_URL + '/register',
        {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(res => res.json()).then(user => {
            if(user.id) {
                props.loadUser(user)
                setErrorMessage('')
                props.onRouteChange('signin')
            }
        }).catch(setErrorMessage('Please enter a valid name, email and password. Your password should be at least 8 characters long'))
    }

    const {onRouteChange} = props;
    
    return(
        <div className="center px-6 py-4  mt-24">
            <div className="w-full max-w-xs shadow-2xl">
                <form className="rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-white text-3xl mb-4">Register</h2>
                    <div className="mb-4">
                    <label className="block text-white text-base mb-2" htmlFor="name">
                        Name
                    </label>
                    <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    placeholder="Name"
                    onChange={onNameChange}/>
                    </div>
                    <div className="mb-4">
                    <label className="block text-white text-base mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    placeholder="Email"
                    onChange={onEmailChange}/>
                    </div>
                    <div className="mb-6">
                    <label className="block text-white text-base mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    type="password" 
                    placeholder="******************"
                    onChange={onPasswordChange}/>
                    <p className="text-red-500 text-xs italic">{errorMessage}</p>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="bg-purple-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={onRegister}>
                        Register
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register