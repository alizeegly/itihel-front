import React, {Component} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";



class App extends Component {

  render(){
    return (
      <div className="App">
        <Home />
        <Router>
          <Routes>
            <Route path="/" exact />
            <Route path="/login" />
            <Route path="/signup" />
            <Route path="/profil" />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
