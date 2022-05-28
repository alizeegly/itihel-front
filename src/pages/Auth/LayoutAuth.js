import React from 'react'
// import NavbarHome from '../../components/Navbar/NavbarHome'
import { AppBar, Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Toolbar, Typography } from '@mui/material';
import { Button } from 'react-scroll';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '../../components/layout/Alert';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const LayoutAuth = ({title, children}) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Navbar/>
            </Box>
            <Container component="main" maxWidth="md">
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
                        {title}
                    </Typography>

                    <Alert />
                    
                    {children}

                    <p className="link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </Box>
            </Container>
        </>
    )
}

export default LayoutAuth