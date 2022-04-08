import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import "./NotFound.scss"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { Alert, AppBar, IconButton, List, ListItem, Toolbar } from '@mui/material';

import lottie from 'lottie-web'

function NotFound() {
    
    const container = useRef(null)

    useEffect (() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/web-not-found.json")
        })
    })

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

            <div>
                <div className="container animation-404" ref={container} data-aos="fade-down"></div>
                <div className="redirections-404">
                    <p className="link-404"><Link to="/">Page d'accueil</Link></p>
                    <p className="link-404"><Link to="/login">Page de connexion</Link></p>
                    <p className="link-404"><Link to="/signup">Créer un compte</Link></p>
                </div>
            </div>
        </>
    )
}

export default NotFound;