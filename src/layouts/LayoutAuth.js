import React from 'react'
import { Avatar, Box, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '../components/Alert/Alert';
import Navbar from '../components/Navbar/Navbar';
import { cyan } from '@mui/material/colors';

const bg = cyan[50]

const LayoutAuth = ({title, children}) => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Navbar color={bg} styleSx={{ color: "white" }} />
            </Box>
            <Alert />
            <Container component="main" maxWidth="md">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, p: 2, bgcolor: bg, color: "black" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    
                    {children}
                </Box>
            </Container>
        </>
    )
}

export default LayoutAuth