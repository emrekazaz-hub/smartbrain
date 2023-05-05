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
import ImageLoader from './components/Loader/ImageLoader';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: '413d037fed0c4f1994f79edcb6ef02fd'
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
 
 // No Longer need this. Updated to particles-bg
 // const particlesOptions = {
 //   particles: {
 //     number: {
 //       value: 30,
 //       density: {
 //         enable: true,
 //         value_area: 800
 //       }
 //     }
 //   }
 // }
 
const inuitialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signIn',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

 class App extends Component {
   constructor() {
     super();
     this.state = inuitialState;
   }
 
   loadUser = (data) => {
     this.setState({user: {
       id: data.id,
       name: data.name,
       email: data.email,
       entries: data.entries,
       joined: data.joined
     }})
   }
 
   calculateFaceLocation = (data) => {
     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
     const image = document.getElementById('inputimage');
     const width = Number(image.width);
     const height = Number(image.height);
     return {
       leftCol: clarifaiFace.left_col * width,
       topRow: clarifaiFace.top_row * height,
       rightCol: width - (clarifaiFace.right_col * width),
       bottomRow: height - (clarifaiFace.bottom_row * height)
     }
   }
 
   displayFaceBox = (box) => {
     this.setState({box: box});
   }
 
   onInputChange = (event) => {
     this.setState({input: event.target.value});
   }

   onButtonSubmit = () => {
    if (!this.state.input) {
    alert('Please enter a valid image URL');
    console.log("Please enter a valid image URL");
    return;
  }
     this.setState({imageUrl: this.state.input});
     app.models.predict('face-detection', this.state.input)
       .then(response => {
         console.log('hi', response)
         if (response) {
           fetch('http://localhost:3000/image', {
             method: 'put',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
               id: this.state.user.id
             })
           })
             .then(response => response.json())
             .then(count => {
               this.setState(Object.assign(this.state.user, { entries: count}))
             })
 
         }
         this.displayFaceBox(this.calculateFaceLocation(response))
       })
       .catch(err => console.log(err));
   }
 
 
   onRouteChange = (route) => {
     if (route === 'signout') {
       this.setState({inuitialState})
     } else if (route === 'home') {
       this.setState({isSignedIn: true})
     }
     this.setState({route: route});
   }
 
   render() {
     const { isSignedIn, imageUrl, route, box } = this.state;
     if(this.state.route.length === 0){
      return <ImageLoader/>
     }
     return (
       <div className="App">
         <Particlee/>
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
         { route === 'home'
           ? <div>
               <Logo />
               <Rank
                 name={this.state.user.name}
                 entries={this.state.user.entries}
               />
               <ImageLinkForm
                 onInputChange={this.onInputChange}
                 onButtonSubmit={this.onButtonSubmit}
               />
               <FaceRecognition box={box} imageUrl={imageUrl} />
             </div>
           : (
              route === 'signIn'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             )
         }
       </div>
     );
   }
 }
 
 export default App;
 
