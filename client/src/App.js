import React, {Component} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from "./pages/Courses/Courses";
import Profil from "./pages/Profil/Profil";
import Home from "./pages/home/Home";
import CourseParameters from "./pages/Course/CourseParameters";
import Course from "./pages/Course/Course";
import Login from "./pages/Login/Login";
import Sign_up from "./pages/Sign_up/Sign_up";
import NotFound from './pages/Errors/NotFound';
import { useSession } from  'react-use-session';


function App() {
  // Récupérer la session
  const { session, saveJWT, clear } = useSession('itihel');

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Sign_up />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to ="/404" />}/>
        {/*<Route path="profile" element={<Profil />}/>*/}
        <Route path="profile" element={
          session ? ( // Si une session est trouvée (= si on est connecté)
            <Profil />
          ) : (
            <Navigate to="login" /> // Sinon on est renvoyé vers 404
          )
        }/>
        <Route path="/courses" element={
          session ? ( // Si une session est trouvée (= si on est connecté)
            <Courses />
          ) : (
            <Navigate to="login" /> // Sinon on est renvoyé vers 404
          )
        }/>
        <Route path="/course/:id" exact element={
          session ? ( // Si une session est trouvée (= si on est connecté)
            <Course />
          ) : (
            <Navigate to="login" /> // Sinon on est renvoyé vers 404
          )
        }/> 
        <Route path="/course/:id/parameters" exact element={
          session ? ( // Si une session est trouvée (= si on est connecté)
            <CourseParameters />
          ) : (
            <Navigate to="login" /> // Sinon on est renvoyé vers 404
          )
        }/>
      </Routes>
    </div>
  );
}

export default App;
