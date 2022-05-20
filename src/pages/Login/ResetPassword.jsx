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
import { AppBar, Toolbar } from '@mui/material';




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
        if(searchParams.get('user_id')){
            axios.put("/api/users/" + searchParams.get('user_id') + "/reset-password", user) // Lien pour modifier un user
                .then((res) => {
                    navigate("/login")
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const getUser = async () => {
        try {
            const user = await axios.get("/api/users/find/" + searchParams.get('user_id'))
            setUser(user.data);
            console.log(user)
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
                            type="password"
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