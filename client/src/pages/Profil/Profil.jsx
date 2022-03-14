import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./profil.scss"
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session'
import axios from 'axios'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Avatar, Button, Grid, Menu, MenuItem, Paper, TextField } from '@mui/material'
import ProfileCard from './ProfilCard'
import SettingsCard from './SettingCard'

const drawerWidth = 240;


function Profil(){
    const navigate = useNavigate()
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
    const [showFormPassword, setShowFormPassword] = useState(false)

    const logout = () => {
        clear()
        console.log("logout")
        navigate("/login", {message: "Vous êtes déconnecté"})// redirect vers page login + test d'envoi de message pour dire qu'on est bien déconnecté (ça marche pas)
    }
    
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
                navigate("/profile") // redirect vers page profile
            })
            .catch(err => {
                console.log(err)
            })
    }

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
        <Box sx={{ display: 'flex' }}>
            <Sidebar/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>
                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    {/* PROFILE CARD */}
                    <Grid item md={3}>
                        <ProfileCard
                            firstname={user.first_name}
                            lastname={user.last_name}
                            pseudo={user.pseudo}
                            lastconnection={user.last_connection}
                            email={user.email}
                            password={user.password}
                            picture={user.profile_picture}
                            courses={user.courses}
                            createdAt={user.createdAt}
                            id={user._id}
                        ></ProfileCard>
                    </Grid>

                    {/* SETTINGS CARD */}
                    <Grid item md={9}>
                        <SettingsCard
                            firstname={user.first_name}
                            lastname={user.last_name}
                            pseudo={user.pseudo}
                            lastconnection={user.last_connection}
                            email={user.email}
                            password={user.password}
                            picture={user.profile_picture}
                            courses={user.courses}
                            createdAt={user.createdAt}
                            id={user._id}
                        ></SettingsCard>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Profil
