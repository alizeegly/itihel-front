import { Alert, Box, Grid, TextField, Button, Typography, Stack, Paper, Collapse, Switch, IconButton, Fab, Card, CardContent, CardActions } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { BrowserView } from 'react-device-detect'
import { useParams } from 'react-router-dom'
import NavbarOld from '../../../components/Navbar/NavbarOld'
import Papers from '../../../components/Papers/Papers'
import SidebarCourseComponent from '../../../components/SidebarCourse/SidebarCourse'
import HeaderCourse from '../HeaderCourse'
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddRounded from '@mui/icons-material/AddRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteRounded } from '@mui/icons-material'
import AddQuestion from './AddQuestion'
import { toast } from 'react-toastify'

const drawerWidth = 240;

const EditQuizz = () => {
    const [course, setCourse] = useState({})
    
    const { id } = useParams();
    const [isCreated, setIsCreated] = useState(false);
    const [collapseQuestion, setCollapseQuestion] = useState(false);
    const [collapseResponse, setCollapseResponse] = useState({});
    const [quizzId, setQuizzId] = useState("")
    const [quizz, setQuizz] = useState({})
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [newAnswer, setNewAnswer] = useState({})
    const [questions, setQuestions] = useState([])
    const [errors, setErrors] = useState([])
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        questionType: "text",
        questionPic: "",
        answerSelectionType: "",
        answers: [],
        correctAnswer: [1],
        messageForCorrectAnswer: "Correct answer. Good job.",
        messageForIncorrectAnswer: "Incorrect answer. Please try again.",
        explanation: "",
        point: "20"
    })
    const notify = () => toast.success("Le quizz a été modifié", {
        position: toast.POSITION.TOP_RIGHT
    });

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
            questions.forEach((question, index) => {
                collapseResponse["question_" + index] = false
                setCollapseResponse(collapseResponse)
            });
            setQuizzId(quiz.data[0]._id)
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            quizTitle: title,
            quizSynopsis: synopsis,
            course_id: course._id,
            nrOfQuestions: questions.length.toString(),
            questions: questions,
            _id: quizzId
        }
    
        axios.put("/api/quizz/" + data._id, data)
            .then((res) => {
                console.log("modifié")
                setNewQuestion({
                    question: "",
                    questionType: "text",
                    questionPic: "",
                    answerSelectionType: "",
                    answers: [],
                    correctAnswer: [],
                    messageForCorrectAnswer: "Correct answer. Good job.",
                    messageForIncorrectAnswer: "Incorrect answer. Please try again.",
                    explanation: "",
                    point: "20"
                })
                notify()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteQuestion = (id) => {
        const questionsTemp = [...questions]
        questionsTemp.splice(id, 1);
        setQuestions(questionsTemp)
    }

    useEffect(()=>{
        getCourse()
        getQuiz()
        console.log(questions)
        console.log(newAnswer)
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
                <NavbarOld/>

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
                        <Typography variant="h1" component="div">Quiz</Typography>

                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
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
                            <Grid
                                container
                                direction={{ xs: "column", md: "row" }}
                                columns={12}
                                rowSpacing={1} 
                                columnSpacing={2}
                                sx={{ mb: 2, mt: 3 }} 
                            >
                                {
                                    questions && questions.length > 0 && questions.map((question, index) => {
                                        return (
                                            <Grid item xs={12} md={6} key={index} sx={{ p: 3 }}>
                                                <Card sx={{ height: "100%", p:2 }} style={{ display: "flex", flexDirection: "column" }}>
                                                    <CardContent>
                                                        <Grid container columns={12} columnSpacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="h6">Question {index+1}</Typography>
                                                                <TextField
                                                                    id={"question-" + index}
                                                                    variant="outlined"
                                                                    label={"Question"}
                                                                    multiline
                                                                    name={"question-" + index}
                                                                    value={question.question}
                                                                    onChange={(e) => {
                                                                        const newQuestions = [...questions];
                                                                        newQuestions[index].question = e.target.value;
                                                                        setQuestions(newQuestions);
                                                                    }}
                                                                    sx={{
                                                                        mt: 3,
                                                                        mb: 3,
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                                <TextField
                                                                    id={"question-" + index}
                                                                    variant="outlined"
                                                                    label="Nombre de points"
                                                                    name={"question-" + index}
                                                                    value={question.point}
                                                                    onChange={(e) => {
                                                                        const newQuestions = [...questions];
                                                                        newQuestions[index].point = e.target.value;
                                                                        setQuestions(newQuestions);
                                                                    }}
                                                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                                                                    sx={{
                                                                        mt: 1,
                                                                        mb: 3,
                                                                    }}
                                                                />
                                                                {/* <Typography variant="h6">Explication</Typography> */}
                                                                <TextField
                                                                    id={"explanation"}
                                                                    variant="outlined"
                                                                    multiline
                                                                    label="Explication"
                                                                    name={"explanation"}
                                                                    value={question.explanation}
                                                                    onChange={(e) => {
                                                                        const newQuestions = [...questions];
                                                                        newQuestions[index].explanation = e.target.value;
                                                                        setQuestions(newQuestions);
                                                                    }}
                                                                    sx={{
                                                                        mt: 1,
                                                                        mb: 3,
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id={"reponses"}
                                                                    label="Réponses"
                                                                    variant="outlined"
                                                                    multiline
                                                                    name={"reponses"}
                                                                    value={question.answers.join('; ')}
                                                                    onChange={(e) => {
                                                                        const reponses = e.target.value.split('; ');
                                                                        const newQuestions = [...questions]
                                                                        newQuestions[index].answers = reponses
                                                                        setQuestions(newQuestions)
                                                                    }}
                                                                    sx={{
                                                                        mt: 1,
                                                                        mb: 3,
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    id={"reponses-correctes"}
                                                                    label="Réponses Correctes"
                                                                    variant="outlined"
                                                                    multiline
                                                                    name={"reponses-correctes"}
                                                                    value={
                                                                        typeof question.correctAnswer === 'string' 
                                                                        ? 
                                                                            question.correctAnswer 
                                                                        : 
                                                                            question.correctAnswer.join('; ')
                                                                    }
                                                                    onChange={(e) => {
                                                                        const reponses = e.target.value.split('; ');
                                                                        const newQuestions = [...questions]
                                                                        newQuestions[index].correctAnswer = reponses
                                                                        setQuestions(newQuestions)
                                                                    }}
                                                                    sx={{
                                                                        mt: 1,
                                                                        mb: 3,
                                                                        width: "100%",
                                                                    }}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </CardContent>
                                                    <CardActions style={{ marginTop: "auto", display: "flex", justifyContent:"flex-end" }}>
                                                        <Fab size="small" color="error" aria-label="delete" onClick={() => deleteQuestion(index)} style={{ zIndex: 30 }}>
                                                            <DeleteIcon style={{ fill: "white" }}/>
                                                        </Fab>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            
                            <Button type="submit" variant="contained" color="secondary" sx={{ margin: "0 auto", mt: 5, textAlign: "center" }}>Modifier</Button>
                        </Box>
                        <Box sx={{ mt: 3, mb: 3, textAlign: "center" }}>
                            <AddQuestion questions={questions} quizz={quizz}/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default EditQuizz