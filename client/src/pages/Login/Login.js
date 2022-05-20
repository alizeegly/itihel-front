import React, { useState } from 'react'
import "./login.scss"
// import Button from '../../components/Button/Button'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AppBar, Toolbar } from '@mui/material';



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

const initialState = {email: "", password: ""}

function Login({message}) {
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel'); // Récupérer la session itihel

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (formData.email === "" || formData.password === "") {
        //     setError("Les champs sont requis pour se connecter");
        //     return;
        // } else {
            axios.post("/api/users/login", {email: formData.email, password: formData.password})
                .then((res) => {
                    saveJWT(res.data.token) // Créer la session
                    console.log(session)
                    navigate("/courses"); // Redirection vers la page profile
                })
            .catch(err => {
                setError("error")
            })
        // }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

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

            {
                error !== "" ? (
                    <Alert severity="error">{error}</Alert>
                ) : ""
            }

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
                        Se connecter
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se souvenir de moi"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/forgot" variant="body2">
                                    Mot de passe oublié?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Pas encore inscrit?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}

export default Login