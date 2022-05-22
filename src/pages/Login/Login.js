import React, { useEffect, useState } from 'react'
import "./login.scss"
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
import { Alert, AppBar, IconButton, Toolbar } from '@mui/material';
import store from '../../redux/store';
import { login } from '../../actions/authActions'
import { buttonClicked } from "../../actions/uiActions";
import { logout } from '../../actions/authActions';
import AlertHandler from '../../components/Alert/AlertHandler';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';



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

function Login(props) {
    const [formData, setFormData] = useState({email: "", password: ""})
    const [alertHandler, setAlertHandler] = useState({
        hasError: false,
        message: "",
        id: ""
    });
    const { auth, msg } = props;

    const handleSubmit = (e) => {
        e.preventDefault()
        const user = { email: formData.email, password: formData.password};
        store.dispatch(login(user, setAlertHandler))
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onLogout = (e) => {
        e.preventDefault();
        store.dispatch(logout(setAlertHandler));
    };
    

    useEffect(() => { 
        if (auth && auth.isAuthenticated) {
            return <Navigate to="/profile" />;
        }
        console.log(alertHandler)
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{background: "#006064"}}>
                    <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Itihel
                    </Typography>
                    <Button color="inherit">Se connecter</Button>
                    <Button color="inherit" href="/signup">S'inscrire</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <AlertHandler alertHandler={alertHandler}/>

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#006064' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se connecter
                    </Typography>
                    <Button size="lg" onClick={onLogout} color="primary">Logout</Button>
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
                            color="info"
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

function mapStateToProps(state) {
    const { auth } = state.auth;
    const { msg } = state.msg;

    return {
        auth,
        msg
    };
}

export default connect(mapStateToProps)(Login)