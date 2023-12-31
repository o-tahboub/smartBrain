import React, { Component } from 'react'
import SignIn from './components/SignIn'
import Register from './components/Register'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import './App.css'

const initialState = {
  input: '',
  imageUrl:'',
  box: {},
  route: 'signin',
  isSignedIn: 'false',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  initState = () => {
    this.setState(initialState);
  }

  loadUser = (userData) => {
    this.setState({user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined,
    }})
  }

  getFaceBox = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputImage');
    const width = Number(image.width);
    const height= Number(image.height);
    return {
      top_row: faceBox.top_row * height,
      left_col: faceBox.left_col * width,
      bottom_row: height - (faceBox.bottom_row * height),
      right_col: width - (faceBox.right_col * width)
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  updateEntriesCount = () => {
    fetch('https://smartbrainapi-64j1.onrender.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id : this.state.user.id
      })
    }).then(res => res.json())
    .then(count => Number(count))
    .then(count => {
      this.setState(Object.assign(this.state.user, { entries: count }))
    })
  }

  onButtonSubmit = async (event) => {
    this.setState({imageUrl: this.state.input})

    try {
      const res = await fetch(
        'https://smartbrainapi-64j1.onrender.com/clarifaiFaceDetection',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            imageUrl : this.state.input
          })
        })
        .then(res => res.json())
        this.updateEntriesCount();
        this.displayFaceBox(this.getFaceBox(res));
      } catch (err) {
      console.log(err);
    }
  }

  onRouteChange = (route) => {
    this.setState({route: route})
  }

  route = (route) => {
    switch (route) {
      case 'home':
        return (
        <div>
          <Navigation 
            onRouteChange={this.onRouteChange}/>
          <Logo />
          <Rank 
            userName={this.state.user.name}
            userEntries={this.state.user.entries}/>                
          <ImageLinkForm 
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition 
            imageUrl={this.state.imageUrl}
            box={this.state.box}/>
        </div>
        )
      break;

      case 'signin':
        return (
          <div>
            <Logo />
            <SignIn 
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
              initState={this.initState}/>
          </div>
        )
        break;

      case 'register':
        return (
          <div>
            <Logo />
            <Register
              onRouteChange={this.onRouteChange} 
              loadUser={this.loadUser}/>
          </div>
        )
        break;
          
      default:
        return (
        <SignIn 
        onRouteChange={this.onRouteChange}
        loadUser={this.loadUser}
        initState={this.initState}/>
        )
        break;
    }

  }

  render() {
    return (
      <div className="App">
        {this.route(this.state.route)}
      </div>
    )
  }
}

export default App
