import React, { Component } from 'react'
import Navigation from './components/Navigation'
import Logo from './components/Logo'
import Rank from './components/Rank'
import ImageLinkForm from './components/ImageLinkForm'
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      clarifaiConfig: {
        PAT:***REMOVED***,
        USER_ID:***REMOVED***,
        APP_ID:***REMOVED***,
        MODEL_ID: ***REMOVED***,
        IMAGE_URL: 'https://samples.clarifai.com/metro-north.jpg'
      }
    }
  }

  setupClarifiaRequestBody = () => {
    const config = this.state.clarifaiConfig;
    return JSON.stringify({
      "user_app_id": {
          "user_id": config.USER_ID ,
          "app_id": config.APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": config.IMAGE_URL
                  }
              }
          }
      ]
  });
  }

  setupClarifiaRequestOptions = () => {
    const config = this.state.clarifaiConfig;
    return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + config.PAT
      },
      body: this.setupClarifiaRequestBody(config)
    };
  }

  setupClarifaiRequest = () => {
    const config = this.state.clarifaiConfig;
    const requestOptions = this.setupClarifiaRequestOptions(config);
  
    fetch("https://api.clarifai.com/v2/models/" + config.MODEL_ID + "/outputs", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = (event) => {
    const config = this.state.clarifaiConfig;
    this.setupClarifaiRequest(config);
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
        {/* 
        <FaceRecognition /> */}
      </div>
    )
  }
}

export default App
