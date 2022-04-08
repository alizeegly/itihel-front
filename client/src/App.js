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
import NotFound from "./pages/Errors/NotFound"
import { useSession } from  'react-use-session';



import { createTheme, ThemeProvider } from '@mui/material/styles';
import ForgotPassword from "./pages/Login/ForgotPassword";
import ResetPassword from "./pages/Login/ResetPassword";
import FlipCardAdd from "./pages/Course/FlipCards/FlipCardAdd";
import AddQuizz from "./pages/Course/Quizz/AddQuizz";

export const theme = createTheme({
   palette: {
      primary: {
        light:'#03a9f4',
        main: "#0288d1",
        dark:'#01579b',
         contrastText: '#fff',
      },
      secondary: {
         light: '#63667b',
         main: '#3D405B',
         dark: '#2a2c3f'
      },
      light: {
        light: '#FFFFFF',
        main: '#FFFFFF',
        dark:'#8FB399'
      },
      success: {
         light:'#94cb9d',
         main: '#7ABF85',
         dark:'#55855d'
      },
      danger: {
         light:'#e94b4b',
         main: '#F02222',
         dark:'#9f1515',

      },
      warning: {
         dark:'#9c5542',
         main: '#E07A5F',
         light:'#e6947f',
      },
      info: {
         light:'#03a9f4',
         main: "#0288d1",
         dark:'#01579b'
      }
   },

  typography: {
      fontFamily: '"Quicksand", sans-serif',
      // fontFamily: '"Gilroy-black", sans-serif',
      h1: {
        fontSize: 40,
        fontWeight: 700,
        color: "#444",
        marginBottom: 30
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
           <Route path="/courses/:id/flip-cards" exact element={
            session ? ( // Si une session est trouvée (= si on est connecté)
              <FlipCardAdd />
            ) : (
              <Navigate to="login" /> // Sinon on est renvoyé vers 404
            )
          }/> 
           <Route path="/courses/:id/quiz" exact element={
            session ? ( // Si une session est trouvée (= si on est connecté)
              <AddQuizz />
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
