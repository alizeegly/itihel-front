import React, {Component} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Profil from "./pages/Profil/Profil";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NotFound from './pages/Errors/NotFound';
import { useSession } from  'react-use-session';


function App() {

  // Récupérer
  const { session, saveJWT, clear } = useSession('itihel');

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to ="/404" />}/>
        <Route path="profile" element={
          session ? (
            <Profil />
          ) : (
            <Navigate to="login" />
          )
        }/>
      </Routes>
    </div>
  );
}

export default App;
