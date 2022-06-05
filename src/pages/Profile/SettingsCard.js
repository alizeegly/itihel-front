import React, { useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { updateUser } from "../../actions/authActions";

function SettingsCard({ auth: { user } }) {
    const [userState, setUserState] = useState(user)

    const handleSubmit = (e) => {
        e.preventDefault()
        //update user
        updateUser(userState)
    }

    return (
        <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
            <Container sx={{ height: "100%" }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container columns={12} sx={{ mb: {md: 5}, mt: 2 }} spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastname"
                                label="Nom"
                                variant="outlined"
                                name="last_name"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={userState && userState.last_name}
                                onChange={(e) => setUserState(prevState => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="firstname"
                                label="Prénom"
                                variant="outlined"
                                name="first_name"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={userState && userState.first_name}
                                onChange={(e) => setUserState(prevState => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                fullWidth
                                sx={{ mb: {sm: 2, xs: 10} }}
                                value={userState && userState.email}
                                onChange={(e) => setUserState(prevState => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="pseudo"
                                label="Pseudo"
                                variant="outlined"
                                name="pseudo"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={userState && userState.pseudo}
                                onChange={(e) => setUserState(prevState => ({
                                    ...prevState,
                                    [e.target.name]: e.target.value
                                }))}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained">Modifier</Button>
                </Box>
            </Container>
        </Card>
    );
}

SettingsCard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(SettingsCard);