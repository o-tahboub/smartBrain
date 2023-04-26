import React, { Component } from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      clarifaiConfig: {
        PAT:***REMOVED***,
        USER_ID:***REMOVED***,
        APP_ID:***REMOVED***,
        MODEL_ID: ***REMOVED***,
      }
    }
  }

  setupClarifiaRequestBody = (config, imageUrl) => {
    return JSON.stringify({
      "user_app_id": {
          "user_id": config.USER_ID,
          "app_id": config.APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": imageUrl
                  }
              }
          }
      ]
  });
  }

  setupClarifiaRequestOptions = (config, imageUrl) => {
    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + config.PAT
      },
      body: this.setupClarifiaRequestBody(config, imageUrl)
    };
  }

  setupClarifaiRequest = (config, imageUrl) => {
    const requestOptions = this.setupClarifiaRequestOptions(config, imageUrl);
  
    fetch("https://api.clarifai.com/v2/models/" + config.MODEL_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    console.log(this.state)
    this.setState({imageUrl: this.state.input})
    this.setupClarifaiRequest(this.state.clarifaiConfig, this.state.input);
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    )
  }
}

export default App
