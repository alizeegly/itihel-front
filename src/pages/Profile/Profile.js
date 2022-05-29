import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'
import SidebarComponent from '../../components/Sidebar/Sidebar'
import LayoutProfile from './LayoutProfile'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingsCard'


const Profile = () => {
    const [isModified, setIsModified] = useState(false);

    const handleCallback = (childData) =>{
        setIsModified(childData)
    }

    return (
        <LayoutProfile handleCallback={handleCallback}>
            {/* PROFILE CARD */}
            <Grid item lg={3} md={9}>
                <ProfileCard />
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item lg={9} md={9}>
                <SettingsCard handleCallback={handleCallback}></SettingsCard>
            </Grid>
        </LayoutProfile>
    )
}

export default Profile