import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }

    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRegister = () => {
        try {
            fetch('http://localhost:3000/register',
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res => res.json()).then(user => {
                if(user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('signin')
                }
            }) 

        } catch(e) {
            console.log(e.message);
        }

    }

    render(){
        const {onRouteChange} = this.props;
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
                        onChange={this.onNameChange}/>
                        </div>
                        <div className="mb-4">
                        <label className="block text-white text-base mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        placeholder="Email"
                        onChange={this.onEmailChange}/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-white text-base mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        type="password" 
                        placeholder="******************"
                        onChange={this.onPasswordChange}/>
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <button className="bg-purple-600 hover:bg-blue-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={this.onRegister}>
                            Register
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register