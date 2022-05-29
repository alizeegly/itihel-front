import React, {useEffect} from "react";
import { createTheme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";
import { loadUser } from "./actions/auth";
import MainRouter from "./routing/MainRouter";
import setAuthToken from "./redux/setAuthToken";

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

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<>
			<div className="App">
				<MainRouter/>
			</div>
		</>
	);
}

export default App;
