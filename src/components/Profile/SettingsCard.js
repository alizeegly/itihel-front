import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../redux/actions/authActions";

function SettingsCard() {
    
    const dispatch = useDispatch();
    let history = useHistory();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [pseudo, setPseudo] = useState();

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ first_name: firstName, last_name: lastName, email, pseudo }));
    };

    useEffect(() => {
        if (!userInfo) {
            history.push("/");
        } else {
            setLastName(userInfo.last_name);
            setFirstName(userInfo.first_name);
            setEmail(userInfo.email);
            setPseudo(userInfo.pseudo);
        }
    }, [history, userInfo]);

    return (
        <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
            <Container sx={{ height: "100%" }}>
                <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
                    <Grid container columns={12} sx={{ mb: {md: 5}, mt: 2 }} spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="lastname"
                                label="Nom"
                                variant="outlined"
                                name="last_name"
                                fullWidth
                                sx={{ mb: 2 }}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" variant="contained">Modifier</Button>
                </Box>
            </Container>
        </Card>
    );
}

export default SettingsCard;