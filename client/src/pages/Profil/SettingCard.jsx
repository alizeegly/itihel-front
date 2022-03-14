import React, { createRef, useState } from "react";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
    CloudUpload as UploadIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        style={{ width: "100%" }}
      >
        {value === index && (
            <Grid container direction={{ xs: "column", md: "row" }} style={{ gap: 30 }}>
                {children}
            </Grid>
        )}
      </div>
    );
}

  
export default function SettingsCard(props) {
    const [value, setValue] = React.useState(0);
    const [image, _setImage] = useState(null);
    const inputFileRef = createRef(null);

    const cleanup = () => {
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        _setImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];

        if (newImage) {
        setImage(URL.createObjectURL(newImage));
        }
    };

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

     const [user, setUser] = useState({
        courses: props.courses,
        createdAt: props.createdAt,
        email: props.email,
        first_name: props.firstname,
        last_connection: props.lastconnection,
        last_name: props.lastname,
        password: props.password,
        profile_picture: props.profilepicture,
        pseudo: props.pseudo,
        updatedAt: props.updatedAt,
        _id: props.id
    })

    const handleChange = e => {
        setUser({
        ...user,
        [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("/api/users/" + user._id, user) // Lien pour modifier un user
            .then((res) => {
                console.log("modifié")
                Navigate("/profile") // redirect vers page profile
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
        }
    };

  return (
    <Card variant="outlined" sx={{ height: "100%", p: 2 }}>
        <Container sx={{ height: "100%" }}>
            <form style={{ position: "relative", height: "100%"}} onSubmit={handleSubmit} >
                <Tabs
                    sx={{ mb: 3 }}
                    value={value}
                    onChange={handleChangeValue}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab label="Données privées" value={0} />
                    <Tab label="Données publiques" value={1} />
                </Tabs>

                <Grid container direction={{ xs: "column", md: "row" }} >
                    <TabPanel value={value} index={0} >
                        <TextField
                            id="lastname"
                            label="Nom"
                            variant="outlined"
                            sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                            value={props.lastname}
                        />
                        <TextField
                            id="firstname"
                            label="Prénom"
                            variant="outlined"
                            sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                            value={props.firstname}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            sx={{ width: { sm: "40%", xs: "100%" }, mb: {sm: 2, xs: 10} }}
                            value={props.email}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1} >
                        <TextField
                            id="pseudo"
                            label="Pseudo"
                            variant="outlined"
                            sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                            value={props.pseudo}
                        />
                        <Grid direction="row" sx={{ width: "100%" }}>
                            <Box sx={{ display: "flex", gap: 3, mb:2, alignItems: "center" }}>
                                <Avatar
                                    alt="Avatar"
                                    src={image || "/static/img/avatars/default-profile.svg"}
                                    sx={{ width: 56, height: 56 }}
                                />
                                <input
                                    ref={inputFileRef}
                                    accept="image/*"
                                    hidden
                                    id="avatar-image-upload"
                                    type="file"
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="avatar-image-upload">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        mb={2}
                                        onClick={handleClick}
                                    >
                                        {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                                        {image ? " Delete" : " Upload"}
                                    </Button>
                                </label>
                            </Box>
                            <Typography variant="caption" display="block" gutterBottom sx={{ mb: {sm: 2, xs: 10} }}>
                                Pour de meilleurs résultats, utiliser une image de moins de 128px x 128px
                            </Typography>
                        </Grid>
                    </TabPanel>
                </Grid>
                <Button variant="contained" style={{ position: "absolute", bottom: 0 }}>Modifier</Button>
            </form>
        </Container>
    </Card>
  );
}
