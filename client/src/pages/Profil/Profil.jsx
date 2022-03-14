import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./profil.scss"
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session'
import axios from 'axios'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

import { Alert, Avatar, Button, Grid, Menu, MenuItem, Paper, TextField } from '@mui/material'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingCard'

const drawerWidth = 240;


function Profil(){
    const [isModified, setIsModified] = useState(false);

    const handleCallback = (childData) =>{
        setIsModified(childData)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>
                
                {
                    isModified ? (
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => {setIsModified(false)}}>Votre profil a bien été modifié.</Alert>
                    ) : (
                        ""
                    )
                }
                
                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    {/* PROFILE CARD */}
                    <Grid item md={3}>
                        <ProfileCard></ProfileCard>
                    </Grid>

                    {/* SETTINGS CARD */}
                    <Grid item md={9}>
                        <SettingsCard handleCallback={handleCallback}></SettingsCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Profil
