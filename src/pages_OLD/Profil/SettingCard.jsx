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
import axios from "axios";
import {
    CloudUpload as UploadIcon,
    Edit as EditIcon,
} from "@mui/icons-material";
import { useSession } from "react-use-session";

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
        setUser({ ...user, [pic]: newImage })
    };

    const handleOnChange = (event) => {
        console.log(event)
        const newImage = event.target?.files?.[0];

        if (newImage) {
            setImage(URL.createObjectURL(newImage));
        }
    };

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = e => {
        if(e.target.files){
            const newImage = e.target?.files?.[0]
            if (newImage) {
                setImage(URL.createObjectURL(newImage));
            }
        }
        setUser({ ...user, [e.target.name]: e.target.value })
    };


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit")
        console.log(e)
        axios.put("/api/users/" + user._id, user) // Lien pour modifier un user
            .then((res) => {
                console.log("modifié")
                // Navigate("/profile") // redirect vers page profile
                props.handleCallback(true)
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

                    <Grid container direction={{ xs: "column", md: "row" }} sx={{ mb: {md: 10} }}>
                        <TabPanel value={value} index={0} >
                            <TextField
                                id="lastname"
                                label="Nom"
                                variant="outlined"
                                name="last_name"
                                sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                                value={user.last_name}
                                onChange={handleChange}
                            />
                            <TextField
                                id="firstname"
                                label="Prénom"
                                variant="outlined"
                                name="first_name"
                                sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                                value={user.first_name}
                                onChange={handleChange}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                sx={{ width: { sm: "40%", xs: "100%" }, mb: {sm: 2, xs: 10} }}
                                value={user.email}
                                onChange={handleChange}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1} >
                            <TextField
                                id="pseudo"
                                label="Pseudo"
                                variant="outlined"
                                name="pseudo"
                                sx={{ width: { sm: "40%", xs: "100%" }, mb: 2 }}
                                value={user.pseudo}
                                onChange={handleChange}
                            />
                            <Grid container sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                <Box sx={{ display: "flex", gap: 3, mb: 2, alignItems: "center" }}>
                                    <Avatar
                                        alt="Avatar"
                                        src={user.profile_picture || "/static/img/avatars/default-profile.svg"}
                                        sx={{ width: 56, height: 56 }}
                                    >{!user.profile_picture ? user.first_name[0] + user.last_name[0] : ""}</Avatar>
                                    <input
                                        ref={inputFileRef}
                                        accept="image/*"
                                        hidden
                                        name="profile_picture"
                                        id="avatar-image-upload"
                                        type="file"
                                        onChange={handleOnChange}
                                    />
                                    <label htmlFor="avatar-image-upload">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            component="span"
                                            name="profile_picture"
                                            mb={2}
                                            onClick={handleClick}
                                            onChange={handleOnChange}
                                        >
                                            <UploadIcon mr={2} /> &nbsp;Upload
                                        </Button>
                                    </label>
                                </Box>
                                <Typography variant="caption" display="block" gutterBottom sx={{ mb: {sm: 2, xs: 10} }}>
                                    Pour de meilleurs résultats, utiliser une image de moins de 128px x 128px
                                </Typography>
                            </Grid>
                        </TabPanel>
                    </Grid>
                    <Button type="submit" variant="contained" style={{ position: "absolute", bottom: 0 }}>Modifier</Button>
                </form>
            </Container>
        </Card>
    );
}
