import React, { useEffect, useState } from 'react'
import "./courses.scss"
import CreateCourse from './CreateCourse'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import CourseItem from '../../components/Course/CourseItem.js'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import Clear from '@mui/icons-material/Clear'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Avatar, Box, CardMedia, Divider, Grid, IconButton, Menu, MenuItem, TextField } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const drawerWidth = 240;


const Courses = ({page}) => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [courses, setCourses] = useState([])
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
    const [search, setSearch] = useState('');

    const getCourses = async () => {
        try {
            let courses = await axios.get("/api/courses/public")
            // let courses2 = await axios.get("http://localhost:8800/api/courses/user/617dab88d80551e2ac0d309f")
            // console.log(courses2.data)
            // setCourses(courses2.data)
            setCourses(courses.data)
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


    const filteredCourses = courses.filter(course => {
        if(courses.length > 0){
            return course.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 || course.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 || course.owner_id.pseudo.toLowerCase().indexOf(search.toLowerCase()) !== -1 
        }
        return false
    });
    


    useEffect(()=>{
        getCourses()
        getUser()
        console.log("courses", courses)
    }, [])

    return (
        <Box sx={{ display: 'flex', position: "relative", overflowX: "hidden"  }}>
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
                        px: { xs: 0, md: 7 },
                        display: "flex",
                        gap: 10,
                        margin: "0 auto",
                        mt: 3
                    }}
                >
                    <TextField
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input"
                        placeholder="Rechercher"
                        sx={{
                            width: "40%",
                            margin: "0 auto",
                            outline: "none",
                            pl: 1
                        }}
                        InputProps={{
                            startAdornment: <SearchIcon color="light" sx={{ pr: 1, width: 35, height: 35 }}/>
                        }}
                    />
                </Grid>

                <Grid
                    container
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    sx={{ 
                        mb: 5, 
                        px: { xs: 0, md: 7 },
                        display: "flex",
                        gap: 10,
                        margin: "0 auto",
                        mt: 3
                    }}
                >
                    {
                        filteredCourses.map((course, index) => (
                            <Card sx={{ maxWidth: 345, position: "relative" }} key={index}>
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
                                        // src={course.owner_id.profile_picture !== "" ? course.owner_id.profile_picture : ""}
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
                                    <Button size="small" href={"/courses/" + course._id}>Voir le cours</Button>
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