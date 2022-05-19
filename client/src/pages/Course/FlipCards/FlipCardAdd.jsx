import { Alert, Box, Grid, TextField, Button, Typography, Stack } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'
import CheckIcon from '@mui/icons-material/Check';
import NavbarCourse from '../../../components/Navbar/NavbarCourse'

const drawerWidth = 240;

const FlipCardAdd = () => {
    const [course, setCourse] = useState({})
    const [flipcard, setFlipcard] = useState({})
    const { id } = useParams();
    const [isCreated, setIsCreated] = useState(false);
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            course_id: course._id,
            question,
            answer
        }
        setFlipcard(data)
        axios.post("http://localhost:8800/api/flip-cards/create", flipcard)
            .then((res) => {
                setIsCreated(true)
                setQuestion("")
                setAnswer("")
                console.log("ajouté")
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
                <NavbarCourse/>

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
                    direction="column"
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    <Typography variant="h1" component="div">AJOUTER UNE FLIP CARD</Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>
                        <TextField
                            id="question"
                            label="Question"
                            variant="outlined"
                            name="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
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
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            sx={{
                                width: "100%",
                                mt: 5
                            }}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 5 }}>Ajouter</Button>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default FlipCardAdd