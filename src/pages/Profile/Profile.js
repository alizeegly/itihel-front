import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingsCard'
import { connect } from 'react-redux'


const Profile = ({ auth: { user }, list: { publicCourses } }) => {

    return (
        <LayoutSidebar>
            {/* PROFILE CARD */}
            <Grid item lg={3} md={3}>
                {user && publicCourses && <ProfileCard user={user} />}
            </Grid>

            {/* SETTINGS CARD */}
            <Grid item lg={9} md={9}>
                <SettingsCard></SettingsCard>
            </Grid>
        </LayoutSidebar>
    )
}

const mapStateToProps = (state) => ({
	auth: state.auth,
    list: state.list
});

export default connect(mapStateToProps)(Profile);