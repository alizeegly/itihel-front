import React, { useEffect, useState } from 'react'
import "./courses.scss"
import CreateCourse from './CreateCourse'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import CourseItem from '../../components/Course/CourseItem.js'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar/Navbar'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Avatar, Box, CardMedia, Divider, Grid, Menu, MenuItem } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'

const drawerWidth = 240;


const Courses = ({page}) => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [courses, setCourses] = useState({})
    const { id } = useParams()
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
    const [anchorEl, setAnchorEl] = React.useState(null);

    const getCourses = async () => {
        try {
            var courses = []
            if(page === "mes-cours"){
                courses = await axios.get("/api/users/"+session.user.id+"/courses")
                setCourses(courses.data.courses)
                // console.log(courses)
            } else if(page === "partages-avec-moi"){
                courses = await axios.get("/api/courses-shared/user/"+session.user.id)
                setCourses(courses.data)
                console.log(courses.data)
            } else if(page === "cours-publics"){
                courses = await axios.get("/api/courses/public")
                setCourses(courses.data)
                // console.log(courses)
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUser = async () => {
        try {
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
            // setUserShared(user.data._id)
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        getCourses()
        getUser()
    }, [])

    return (
        <Box sx={{ display: 'flex', position: "relative" }}>
            <Sidebar user={user}/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>

                <BrowserView>
                    <Papers
                        bg1="#94DDDE"
                        border1="#3D90BD"
                        bg2="#F3CD74"
                        border2="#3D90BD"
                    />
                </BrowserView>

                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ 
                        mb: 2, 
                        px: { xs: 0, md: 7 } ,
                        display: "flex",
                        gap: 10,
                        margin: "0 auto",
                        mt: 3
                    }}
                >
                    {
                        courses.length > 0 && courses.map((course, index) => (
                            <Card sx={{ maxWidth: 345, position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                                    alt="green iguana"
                                />
                                <CardContent sx={{mb: 7}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {course.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {course.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ position: "absolute", bottom: 0, left: 0, display: "flex", justifyContent: "space-between", width: "100%" }}>
                                    <Avatar 
                                        onClick={handleMenu}
                                        src={course.owner_id.profile_picture}
                                        sx={{cursor: "pointer"}}
                                    >{course.owner_id.first_name[0]}{course.owner_id.last_name[0]}</Avatar>
                                    <Menu
                                        sx={{ mt: '45px', boxShadow: 1 }}
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose} component='a' href={"/profile"}>Voir le profil</MenuItem>
                                        <MenuItem onClick={handleClose} component='a' href={"/profile"}>Voir tous les cours</MenuItem>
                                    </Menu>
                                    <Button size="small">Voir le cours</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Courses