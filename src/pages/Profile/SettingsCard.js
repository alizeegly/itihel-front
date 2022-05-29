import React, { createRef, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import axios from "axios";
import {
    CloudUpload as UploadIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import { updateUser } from "../../actions/auth";

const styles = {
  label: {
    fontWeight: "bold",
    marginBottom: ".5rem"
  },
  field: {
    width: "40%",
    marginBottom: "2rem"
  }
};

  
function SettingsCard({ handleCallback, auth: { user } }) {
    const [value, setValue] = React.useState(0);
    const [userState, setUserState] = useState(user)
    const [image, _setImage] = useState(null);
    const inputFileRef = createRef(null);
console.log(user)
    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
        const pic = "profile_picture"
        setUserState({ ...user, [pic]: newImage })
    };

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