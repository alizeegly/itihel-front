import React, {Component} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Courses from "./pages/Courses/Courses";
import CreateCourse from "./pages/Courses/CreateCourse";
import Profil from "./pages/Profil/Profil";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
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
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to ="/404" />}/>
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
      </Routes>
    </div>
  );
}

export default App;
