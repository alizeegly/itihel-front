import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BrowserView } from 'react-device-detect';
import { useParams } from 'react-router-dom';
import HeaderCourse from '../pages/Course/HeaderCourse';
import NavbarCourse from './Navbar/NavbarCourse';
import Papers from './Papers/Papers';
import SidebarCourseComponent from './SidebarCourse/SidebarCourse';

const drawerWidth = 240;

const CourseLayout = (props) => {
    const [course, setCourse] = useState({})
    const { id } = useParams();

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getCourse()
        console.log(course)
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
                <NavbarCourse/>

                <HeaderCourse course={course}/>

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
                    <Grid item xs={12}>
                        <Typography variant="h1" component="div">{props.title}</Typography>
                        {props.children}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default CourseLayout