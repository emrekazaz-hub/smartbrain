import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import React, { Component } from "react";
import Particlee from "./components/ParticleFolder/Particlee";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";

const app = new Clarifai.App({
  apiKey: "413d037fed0c4f1994f79edcb6ef02fd",
});


const retunrClarifaiJSONRequest = (imagegUrl) => {
  const PAT = 'bf9078dc01664b64a55e0239d7d79ec6';
  const USER_ID = 'emrekazaz13';       
  const APP_ID = 'smartbrain';
  const MODEL_ID = 'face-detection'; 
  const IMAGE_URL = imagegUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};
return requestOptions

}

//------------------------------------------------------------------

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn : false
    };
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log('width, height:', width, height);
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmit = (cikti) => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", retunrClarifaiJSONRequest(this.state.input))
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    console.log("basarili");
    console.log(cikti);
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  render() {
    return (
      <div className="App">
        <Particlee />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition imageUrl={this.state.imageUrl} />
          </div>
        ) : this.state.route === "signin" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
