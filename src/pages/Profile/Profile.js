import { Grid } from '@mui/material'
import React from 'react'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingsCard'


const Profile = () => {

    return (
        <LayoutSidebar>
            {/* PROFILE CARD */}
            <Grid item lg={3} md={9}>
                <ProfileCard />
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item lg={9} md={9}>
                <SettingsCard></SettingsCard>
            </Grid>
        </LayoutSidebar>
    )
}

export default Profile