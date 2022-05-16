import React, { useEffect, useState } from 'react'
import "./login.scss"
// import Button from '../../components/Button/Button'
import axios from 'axios'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useSession } from  'react-use-session';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
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


function ResetPassword() {
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(false)
    const [messageFromServer, setMessageFromServer] = useState('')
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("")

    console.log(searchParams.get('token'))
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        if (email !== null) {
            try {
                const response = await axios.post(
                    '/api/users/forgotPassword',{
                        email,
                    }
                );
                console.log(response.data)
                if (response.data === 'recovery email sent') {
                    setError(false)
                    setMessageFromServer("recovery email sent")
                } else if (response.data === 'email not in db') {
                    setError(true)
                    setMessageFromServer("email not in db")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        setEmail({
            email: event.target.value,
        });
    };

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
                error && messageFromServer === "email not in db" ? (
                    <Alert severity="error">Il n'existe aucun compte avec cette adresse mail.</Alert>
                ) : ""
            }
            {
                error === false && messageFromServer === "recovery email sent"? (
                    <Alert severity="info">
                        Veuillez vérifier votre boite mail ({email.email}).<br/>
                        <Typography variant="caption" onClick={handleSubmit} sx={{ cursor: "pointer" }}>
                            Je n'ai pas reçue l'email
                        </Typography>
                    </Alert>
                ) : ""
            }

            <Container component="main" maxWidth="xs">
                {
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
                            Oublie du mot de passe
                        </Typography>
                        {
                            
                        }
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Envoyer
                            </Button>
                        </Box>
                    </Box>
                }
                
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    )
}

export default ResetPassword