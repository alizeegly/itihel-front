import { Box, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'

const drawerWidth = 240;

const FlipCardAdd = () => {
    const [course, setCourse] = useState({})
    const [flipcard, setFlipcard] = useState({})
    const { id } = useParams();

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = e => {
        setFlipcard({
          ...flipcard,
          [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setFlipcard({
            ...flipcard,
            course_id: course._id
        })
        axios.post("/api/flip-cards", flipcard) // Lien create course de l'api
            .then((res) => {
                console.log("ajouté !")
            })
            .catch(err => {
                console.log(err)
            })
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
                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            id="question"
                            label="Question"
                            variant="outlined"
                            name="question"
                            value={flipcard.question}
                            onChange={handleChange}
                            sx={{
                                width: "100%",
                                mt: 5
                            }}
                        />
                        <TextField
                            id="answer"
                            label="Réponse"
                            variant="outlined"
                            name="answer"
                            value={flipcard.answer}
                            onChange={handleChange}
                            sx={{
                                width: "100%",
                                mt: 5
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default FlipCardAdd