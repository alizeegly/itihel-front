import React, {Component} from "react"


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
      </div>
    );
  }
}

export default App;
