import { Alert, Box, Grid, TextField, Button, Typography, Stack, Paper, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const drawerWidth = 240;

const EditQuizz = () => {
    const [course, setCourse] = useState({})
    
    const { id } = useParams();
    const [isCreated, setIsCreated] = useState(false);
    const [quizz, setQuizz] = useState({})
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [questions, setQuestions] = useState([])

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getQuiz = async () => {
        try {
            const quiz = await axios.get("/api/quizz/course/" + id)
            setQuizz(quiz.data[0]);
            setTitle(quiz.data[0].quizTitle)
            setSynopsis(quiz.data[0].quizSynopsis)
            setQuestions(quiz.data[0].questions)
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
        getQuiz()
        console.log(quizz)
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
                    <Grid item xs={10}>
                        <Typography variant="h1" component="div">Quiz</Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 10 }}>
                            <TextField
                                id="title"
                                label="Titre du quiz"
                                variant="outlined"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{
                                    width: "100%",
                                    mt: 5
                                }}
                            />
                            <TextField
                                id="synopsis"
                                label="Synopsis du quiz"
                                variant="outlined"
                                name="synopsis"
                                value={synopsis}
                                onChange={(e) => setSynopsis(e.target.value)}
                                sx={{
                                    width: "100%",
                                    mt: 5
                                }}
                            />
                            {
                                questions && questions.length > 0 && questions.map((question, index) => {
                                    // console.log(question)
                                    return (
                                        <Paper sx={{ mt: 3, p: 2 }} key={index}>
                                            <Grid container columns={12} columnSpacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6">Question</Typography>
                                                    <TextField
                                                        id={"question-" + index}
                                                        variant="outlined"
                                                        multiline
                                                        name={"question-" + index}
                                                        value={question.question}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        sx={{
                                                            mt: 1,
                                                            mb: 3,
                                                            width: "100%",
                                                        }}
                                                    />
                                                    <Typography variant="h6">Type de réponse</Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={question.answerSelectionType}
                                                        onChange={(e) => console.log(e)}
                                                        sx={{
                                                            mt: 1,
                                                            mb: 3,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <FormControlLabel value="single" control={<Radio />} label="Simple" />
                                                        <FormControlLabel value="multiple" control={<Radio />} label="Multiple" />
                                                    </RadioGroup>
                                                    <Typography variant="h6">Nombre de points</Typography>
                                                    <TextField
                                                        id={"question-" + index}
                                                        variant="outlined"
                                                        name={"question-" + index}
                                                        defaultValue={question.point}
                                                        // onChange={(e) => setTitle(e.target.value)}
                                                       
                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="h6">Réponses</Typography>
                                                    <Grid container direction={{ xs: "column", md: "row" }} spacing={1}>
                                                        {
                                                            question && question.answers.length > 0 && question.answers.map((answer, indexA) => {
                                                                return (
                                                                    <Grid item xs={8} key={indexA}>
                                                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                            <TextField
                                                                                id={"reponse-" + indexA}
                                                                                label={"Réponse " + (indexA+1)}
                                                                                variant="outlined"
                                                                                multiline
                                                                                name={"reponse-" + indexA}
                                                                                value={answer}
                                                                                onChange={(e) => setTitle(e.target.value)}
                                                                                sx={{
                                                                                    width: "90%",
                                                                                    mt: 1
                                                                                }}
                                                                            />
                                                                            {
                                                                                question.correctAnswer.includes((indexA+1).toString()) ? (<CheckCircleIcon color='success' />) : question.correctAnswer.includes((indexA+1)) ? (<CheckCircleIcon color='success' />) : (<CancelIcon color='danger' />) 
                                                                            }
                                                                        </Stack>
                                                                    </Grid>
                                                                )
                                                            })
                                                        }
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography variant="h6">Explication</Typography>
                                                    <TextField
                                                        id={"explanation"}
                                                        variant="outlined"
                                                        multiline
                                                        name={"explanation"}
                                                        value={question.explanation}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        sx={{
                                                            mt: 2,
                                                            mb: 3,
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    )
                                })
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default EditQuizz