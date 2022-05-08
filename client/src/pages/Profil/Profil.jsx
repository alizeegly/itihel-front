import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useSession } from  'react-use-session'
import axios from 'axios'
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

import { Grid, Stack } from '@mui/material'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingCard'
import Papers from '../../components/Papers/Papers'
import { BrowserView } from 'react-device-detect'
import Alert from '@mui/material/Alert';

const drawerWidth = 240;


function Profil(){
    const [isModified, setIsModified] = useState(false)
    const { session, saveJWT, clear } = useSession('itihel')
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

    const handleCallback = (childData) =>{
        setIsModified(childData)
    }

    const getUser = async () => {
        try {
            console.log(session)
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <Box sx={{ display: 'flex', position: "relative", overflow: "hidden" }}>
            <Sidebar user={user}/>
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
                        <Stack sx={{ width: '95%', margin: "0 auto", color: "#5EB760", fontWeight: "bold" }} spacing={2}>
                            <Alert icon={<CheckIcon fontSize="inherit" color='#5EB760' />} severity="success" onClose={() => {setIsModified(false)}} sx={{ background: "#EDF7ED", color: "#5EB760", fontWeight: "bold" }}>Votre profil a bien été modifié.</Alert>
                        </Stack>
                    ) : (
                        ""
                    )
                }


                <BrowserView>
                    <Papers
                        bg1="#94DDDE"
                        border1="#3D90BD"
                        bg2="#F3CD74"
                        border2="#3D90BD"
                    />
                </BrowserView>


                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    {/* PROFILE CARD */}
                    <Grid item lg={3} md={9}>
                        <ProfileCard 
                            pseudo={user.pseudo} 
                            picture={user.profile_picture}
                            nb_courses={user.length}
                            last_connection={user.last_connection}
                        />
                    </Grid>

                    {/* SETTINGS CARD */}
                    <Grid item lg={9} md={9}>
                        <SettingsCard handleCallback={handleCallback}></SettingsCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Profil
