import React, { useState, useEffect } from 'react'
import "./sign_up.scss"
import axios from 'axios'
import { Alert, AppBar, Avatar, Button, Container, Grid, Link, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const initialState = {last_name: "", first_name: "", pseudo: "", email:"", password: "", password_confirm: ""}

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
  
function Sign_up() {
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')

    const auth = useSelector(state => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/api/users/signup", {
            pseudo: formData.pseudo,
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password})
            .then((res) => {
                // saveJWT(res.data.token) // Créer la session
                Redirect("/profile"); // Redirection vers la page profile
            })
            .catch(err => {
                setError(err.msg)
            })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        console.log(auth)
        if (!auth.isAuthenticated) {
            return Redirect("/login")
        }
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Itihel
                        </Typography>
                        <Button color="inherit" href="/login">Se connecter</Button>
                        <Button color="inherit">S'inscrire</Button>
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
                        S'inscrire
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="first_name"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="Prénom"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Nom"
                                    name="last_name"
                                    autoComplete="family-name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="pseudo"
                                    label="Pseudo"
                                    name="pseudo"
                                    autoComplete="pseudo"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresse mail"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            S'inscrire
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login" variant="body2">
                                    Déjà un compte ?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </>
    )
}

export default Sign_up