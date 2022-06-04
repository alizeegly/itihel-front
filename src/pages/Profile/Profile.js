import { Grid } from '@mui/material'
import React from 'react'
import LayoutSidebar from '../../layouts/LayoutSidebar'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingsCard'
import { connect } from 'react-redux'
import PropTypes from "prop-types"


const Profile = ({ auth: { user } }) => {
    console.log(user)
    return (
        <LayoutSidebar>
            {/* PROFILE CARD */}
            <Grid item lg={3} md={3}>
                {user && <ProfileCard user={user}/>}
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
});

export default connect(mapStateToProps)(Profile);