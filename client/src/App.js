import React, {Component} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from "./pages/Courses/Courses";
import Profil from "./pages/Profil/Profil";
import Home from "./pages/home/Home";
import NotFound from './pages/Errors/NotFound';


class App extends Component {

  render(){
    return (
      <div className="App">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="profil" element={<Profil />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to ="/404" />}/>
        </Routes>
      </div>
    );
  }
}

export default App;
