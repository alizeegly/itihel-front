import React, {Component} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



class App extends Component {

  render(){
    return (
      <div className="App">
        Salut les gars !
        <Router>
          <Routes>
            <Route path="/" exact />
            <Route path="/login" />
            <Route path="/signup" />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
