import React, {Component} from "react"
import Navbar from "./components/Navbar";
import Profil from "./pages/Profil/Profil";


class App extends Component {

  render(){
    return (
      <div className="App">
        <Profil/>
      </div>
    );
  }
}

export default App;
