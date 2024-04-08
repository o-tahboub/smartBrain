import React, { useState } from 'react'
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

const App = (props) => {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setIsSignedIn] = useState('false')
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const initState = () => {
    setInput('')
    setImageUrl('')
    setBox({})
    setRoute('signin')
    setIsSignedIn('false')
    setUser(Object.assign(user,{
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }))
  }

  const loadUser = (userData) => {
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined,
    })
  }

  const getFaceBox = (data) => {
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
  
  const displayFaceBox = (box) => {
    setBox(box);
  }
  
  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const updateEntriesCount = () => {
    fetch(import.meta.env.VITE_API_URL + '/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id : user.id
      })
    }).then(res => res.json())
    .then(count => Number(count))
    .then(count => {
      setUser(Object.assign(user, { entries: count }))
    })
  }

  const onButtonSubmit = async (event) => {
    setImageUrl(input)

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/clarifaiFaceDetection',
        {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            imageUrl : input
          })
        })
        .then(res => res.json())
        updateEntriesCount();
        displayFaceBox(getFaceBox(res));
      } catch (err) {
      console.log(err);
    }
  }

  const onRouteChange = (route) => {
    setRoute(route)
  }

  const router = (route) => {
    switch (route) {
      case 'home':
        return (
        <div>
          <Navigation 
            onRouteChange={onRouteChange}/>
          <Logo />
          <Rank 
            userName={user.name}
            userEntries={user.entries}/>                
          <ImageLinkForm 
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition 
            imageUrl={imageUrl}
            box={box}/>
        </div>
        )
      break;

      case 'signin':
        return (
          <div>
            <Logo />
            <SignIn 
              onRouteChange={onRouteChange}
              loadUser={loadUser}
              initState={initState}/>
          </div>
        )
        break;

      case 'register':
        return (
          <div>
            <Logo />
            <Register
              onRouteChange={onRouteChange} 
              loadUser={loadUser}/>
          </div>
        )
        break;
          
      default:
        return (
        <SignIn 
        onRouteChange={onRouteChange}
        loadUser={loadUser}
        initState={initState}/>
        )
        break;
    }

  }
  
  return (
    <div className="App">
      {router(route)}
    </div>
  )
}

export default App
