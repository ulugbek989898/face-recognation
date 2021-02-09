import "./App.css";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Logo from "./Components/Logo/Logo";
import Navigation from "./Components/Navigation/Navigation";
import Rank from "./Components/Rank/Rank";
import { Component } from "react";
import FaceRecognation from "./Components/FaceRecognation/FaceRecognation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";

const app = new Clarifai.App({
  apiKey: "5ff7fc126c664b37b487273d9f724f79",
});

const particlesOptions = {
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route:'signin',
      isSignedIn:false
    };
  }
  componentDidMount(){
    fetch('http//localhost:3000')
      .then(response => response.json())
      .then(console.log);
  }
  calculateFaceDetection = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({box:box});
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.displayFaceBox(this.calculateFaceDetection(response));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn:false})
    }else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route})
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
          this.state.route === 'home'
          ?<div>
          <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognation box = {this.state.box} imageUrl={this.state.imageUrl} />
    
        </div>
        :(this.state.route === 'signin' 
            ?<SignIn onRouteChange ={this.onRouteChange} />
            :<Register onRouteChange ={this.onRouteChange} />  )

             }
        
        
      </div>
    );
  }
}

export default App;
