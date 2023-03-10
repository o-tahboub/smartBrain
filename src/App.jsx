import React, { Component } from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* 
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App
