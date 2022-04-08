import { Alert, Box, Grid, TextField, Button, Typography, Stack } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'
import CheckIcon from '@mui/icons-material/Check';

const drawerWidth = 240;

const AddQuizz = () => {
    const [course, setCourse] = useState({})
    
    const { id } = useParams();
    const [isCreated, setIsCreated] = useState(false);

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = e => {
        
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        
    }

    useEffect(()=>{
        getCourse()
    }, [])

    return (
        <Box sx={{ display: 'flex', position: "relative", overflowX: "hidden" }}>
            <SidebarCourseComponent course={course}/>
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <Navbar/>

                <HeaderCourse course={course}/>

                {
                    isCreated ? (
                        <Stack sx={{ width: '95%', margin: "0 auto" }} spacing={2}>
                            <Alert icon={<CheckIcon fontSize="inherit" color='#5EB760' />} severity="success" onClose={() => {setIsCreated(false)}} sx={{ background: "#EDF7ED", color: "#5EB760", fontWeight: "bold" }}>La flash card a bien été créée</Alert>
                        </Stack>
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
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    <Typography variant="h1" component="div">Quiz</Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>

                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default AddQuizz