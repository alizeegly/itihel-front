import React, { useEffect, useState } from 'react'
import "./login.scss"
// import Button from '../../components/Button/Button'
import axios from 'axios'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSession } from  'react-use-session';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Alert, AppBar, IconButton, List, ListItem, Toolbar } from '@mui/material';
import { AirlineSeatLegroomNormalOutlined } from '@mui/icons-material';
import {bcrypt} from "bcryptjs"




function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Itihel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}


function ResetPassword() {
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(false)
    const [messageFromServer, setMessageFromServer] = useState('')
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({
        courses: [],
        createdAt: "",
        email: "",
        first_name: "",
        last_connection: "",
        last_name: "",
        password: "",
        profile_picture: "",
        pseudo: "",
        updatedAt: "",
        _id: ""
    })

    // console.log(searchParams.get('token'))
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')


    const handleSubmit = (e) => {
        axios.put("/api/users/" + searchParams.get('user_id') + "/reset-password", user) // Lien pour modifier un user
            .then((res) => {
                navigate("/login")
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getUser = async () => {
        try {
            console.log(session)
            const user = await axios.get("/api/users/find/" + searchParams.get('user_id'))
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Itihel
                    </Typography>
                    <Button color="inherit" href="/login">Se connecter</Button>
                    <Button color="inherit" href="/signup">S'inscrire</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset du mot de passe
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Nouveau mot de passe"
                            name="password"
                            autoComplete="password"
                            autoFocus 
                            onChange={e => {
                                setUser({ ...user, [e.target.name]: e.target.value })
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Modifier
                        </Button>
                    </Box>
                </Box>
                
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}

export default ResetPassword