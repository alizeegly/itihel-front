import React, { useEffect, useState } from 'react'
import CreateCourse from './CreateCourse'
import Sidebar from '../../components/Sidebar/Sidebar.js'

import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Alert, Avatar, Box, CardMedia, Grid, TextField } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import Highlighter from "react-highlight-words";
import {theme} from '../../App';

const drawerWidth = 240;

const MyCourses = () => {
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
    const [anchorEl, setAnchorEl] = useState(null);
    const { search } = window.location;
    const query = new URLSearchParams(search).get('q');
    const [searchQuery, setSearchQuery] = useState(query || '');

    // const getCourses = async () => {
    //     try {
    //         if (user){
                
    //         }
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };

    const getUser = async () => {
        try {
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
            let courses = await axios.get(process.env.LINK_API + "/api/courses/user/" + user.data._id)
            setCourses(courses.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }
    
        return posts.filter((post) => {
            const postName = post.title.toLowerCase()
            const description = post.description.toLowerCase()
            const pseudo = post.owner_id.pseudo.toLowerCase()
            return postName.includes(query) || description.includes(query) || pseudo.includes(query)
        });
    };
    
    const filteredPosts = filterPosts(courses, query);

    
    const [isCreated, setIsCreated] = useState(false)
    const handleCallback = (childData) =>{
        setIsCreated(childData)
    }

    useEffect(()=>{
        // getCourses()
        getUser()
    }, [])


    return (
        <Box sx={{ display: 'flex', position: "relative", overflow: "hidden"  }}>
            <Sidebar user={user}/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>

                {
                    isCreated ? (
                        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => {setIsCreated(false)}}>Le cours a bien été créé.</Alert>
                    ) : (
                        ""
                    )
                }

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
                        justifyContent: "space-between",
                        gap: 10,
                        margin: "0 auto",
                        mt: 3
                    }}
                >
                    <Box component="form" sx={{ width: "50%", margin: "0 auto", display: "flex", justifyContent: "space-between"}}>
                        <TextField
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                            placeholder="Rechercher"
                            name="q"
                            sx={{
                                outline: "none",
                                pl: 1,
                                width: "80%"
                            }}
                            InputProps={{
                                startAdornment: <SearchIcon color="light" sx={{ pr: 1, width: 35, height: 35 }}/>
                            }}
                        />
                        <Button type="submit" color="primary" variant="outlined">Rechercher</Button>
                    </Box>
                    <CreateCourse handleCallback={handleCallback}/>
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
                        filteredPosts && filteredPosts.length > 0 && filteredPosts.map((course, index) => {
                            return(
                                <Card sx={{ width: 345, position: "relative" }} key={index}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={course.picture || "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
                                        alt={course.title}
                                    />
                                    <CardContent sx={{mb: 7}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <Highlighter
                                                highlightStyle={{background: theme.palette.primary.main}}
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={course.title}
                                            />
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <Highlighter
                                                highlightStyle={{background: theme.palette.primary.main}}
                                                searchWords={[searchQuery]}
                                                autoEscape={true}
                                                textToHighlight={course.description}
                                            />
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ position: "absolute", bottom: 0, left: 0, display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <Avatar 
                                            // src={course.owner_id.profile_picture !== "" ? course.owner_id.profile_picture : ""}
                                        >{course.owner_id.first_name[0]}{course.owner_id.last_name[0]}</Avatar>
                                        <Button 
                                            size="small" 
                                            href={"/courses/" + course._id}
                                        >Voir le cours</Button>
                                    </CardActions>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default MyCourses