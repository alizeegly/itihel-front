import React, {Component} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:8800")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render(){
    return (
      <div className="App">
        Salut les gars !
        <p>{this.state.apiResponse}</p>
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
