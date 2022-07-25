import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import { SettingsCard, ProfileCard } from '../../components'
import { connect, useSelector } from 'react-redux'
import profileImg from '../../assets/img/clavier-ordi.jpg'

const ProfilePage = () => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    return (
        <LayoutSidebar title="Mon profil" image={profileImg} position={"bottom 23% right 0"}>
            {/* PROFILE CARD */}
            <Grid item lg={3} md={3}>
                <ProfileCard user={userInfo} />
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item lg={9} md={9}>
                <SettingsCard></SettingsCard>
            </Grid>
        </LayoutSidebar>
    )
}

export default ProfilePage;