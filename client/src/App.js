import React, {Component} from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicCourses from "./pages/Courses/PublicCourses";
import MyCourses from "./pages/Courses/MyCourses";
import SharedCourses from "./pages/Courses/SharedCourses";
import Profil from "./pages/Profil/Profil";
import Home from "./pages/home/Home";
import CourseParameters from "./pages/Course/CourseParameters";
import Course from "./pages/Course/Course";
import Login from "./pages/Login/Login";
import Sign_up from "./pages/Sign_up/Sign_up";
import NotFound from './pages/Errors/NotFound';
import { useSession } from  'react-use-session';



import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";

export const theme = createTheme({
  palette: {
      primary: {
        light: '#94DDDE',
        main: '#94DDDE',
        dark: '#94DDDE',
        contrastText: '#fff',
      },
      secondary: {
        main: '#444',
      },
      light: {
        main: "#DDDDDD"
      },
      success: {
        main: "green"
      },
      danger: {
        main: "red"
      },
      warning: {
        main: "orange"
      },
      info: {
        main: "blue"
      }
  },
  typography: {
      fontFamily: '"Quicksand", sans-serif',
      h1: {
          fontSize: 55,
          fontWeight: 700,
          color: "#444"
      }
  }
})


function App() {
  // Récupérer la session
  const { session, saveJWT, clear } = useSession('itihel');

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Sign_up />} />
          <Route path="forgot" element={<ForgotPassword />} />
          <Route path="reset" element={<ResetPassword />} />
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
            session ? ( 
              <MyCourses page={"mes-cours"} />
            ) : (
              <Navigate to="login" /> 
            )
          }/>
          <Route path="/public-courses" exact element={
            session ? ( 
              <PublicCourses page={"cours-publics"} />
            ) : (
              <Navigate to="login" /> 
            )
          }/>
          <Route path="/shared-whith-me-courses" exact element={
            session ? ( 
              <SharedCourses page={"partages-avec-moi"} />
            ) : (
              <Navigate to="login" /> 
            )
          }/>


          <Route path="/courses/:id" exact element={
            session ? ( // Si une session est trouvée (= si on est connecté)
              <Course />
            ) : (
              <Navigate to="login" /> // Sinon on est renvoyé vers 404
            )
          }/> 
          <Route path="/courses/:id/parameters" exact element={
            session ? ( // Si une session est trouvée (= si on est connecté)
              <CourseParameters />
            ) : (
              <Navigate to="login" /> // Sinon on est renvoyé vers 404
            )
          }/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
