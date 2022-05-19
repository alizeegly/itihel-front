import { Alert, Box, Grid, TextField, Button, Typography, Stack, Paper, Collapse, Switch, IconButton } from '@mui/material'
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
import AddRounded from '@mui/icons-material/AddRounded';
import { DeleteRounded } from '@mui/icons-material'

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

        // Ajout de la nouvelle question
        if(newQuestion.question !== "" && newQuestion.answers.length > 0 && newQuestion.correctAnswer.length > 0){
            setQuestions([...questions, newQuestion]);
        }
        const questionsTemp = [...questions]
        questionsTemp.push(newQuestion)
        questionsTemp.forEach((question, index) => {
            let correctAnswersTemp = [...question.correctAnswer];
            // si la question a une nouvelle réponse, on l'ajoute
            if(newAnswer["question_" + index] && newAnswer["question_" + index] !== ""){
                question.answers.push(newAnswer["question_" + index])
            }
            console.log(questionsTemp.answers)
            // Si y'a qu'une seule réponse correcte alors type = single sinon multiple
            if(correctAnswersTemp.length === 1){
                correctAnswersTemp = correctAnswersTemp[0].toString()
                question.answerSelectionType = "single"
            } else {
                correctAnswersTemp.forEach((newAnswer, indexA) => {
                    newAnswer = parseInt(newAnswer)
                });
                question.answerSelectionType = "multiple"
            }
            questionsTemp[index].correctAnswer = correctAnswersTemp
        });
        setQuestions(questionsTemp)

        setNewQuestion({
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
        setNewAnswer({})

        const data = {
            quizTitle: title,
            quizSynopsis: synopsis,
            course_id: course._id,
            nrOfQuestions: questionsTemp .length.toString(),
            questions: questionsTemp,
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
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteQuestion = (id) => {
        console.log(id)
        const questionsTemp = [...questions]
        questionsTemp.splice(id, 1);
        setQuestions(questionsTemp)
        console.log(questions)
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
                <Navbar/>

                <HeaderCourse course={course}/>

                {
                    isCreated ?? (
                        <Stack sx={{ width: '95%', margin: "0 auto" }} spacing={2}>
                            <Alert icon={<CheckIcon fontSize="inherit" color='#5EB760' />} severity="success" onClose={() => {setIsCreated(false)}} sx={{ background: "#EDF7ED", color: "#5EB760", fontWeight: "bold" }}>Le quizz a bien été modifié</Alert>
                        </Stack>
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
                            {
                                questions && questions.length > 0 && questions.map((question, index) => {
                                    if (question.question !== "") {
                                        return (
                                            <Stack direction="row" alignItems="center" sx={{ gap: 3 }} key={index}>
                                                <Paper sx={{ mt: 3, p: 3 }}>
                                                    <Grid container columns={12} columnSpacing={2}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6">Question</Typography>
                                                            <TextField
                                                                id={"question-" + index}
                                                                variant="outlined"
                                                                multiline
                                                                name={"question-" + index}
                                                                value={question.question}
                                                                onChange={(e) => {
                                                                    const newQuestions = [...questions];
                                                                    newQuestions[index].question = e.target.value;
                                                                    setQuestions(newQuestions);
                                                                }}
                                                                sx={{
                                                                    mt: 1,
                                                                    mb: 3,
                                                                    width: "100%",
                                                                }}
                                                            />
                                                            <Typography variant="h6">Nombre de points</Typography>
                                                            <TextField
                                                                id={"question-" + index}
                                                                variant="outlined"
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
                                                            <Typography variant="h6">Explication</Typography>
                                                            <TextField
                                                                id={"explanation"}
                                                                variant="outlined"
                                                                multiline
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
                                                        <Grid item xs={6}>
                                                            <Typography variant="h6">Réponses</Typography>
                                                            <Grid container direction={{ xs: "column", md: "row" }} spacing={1}>
                                                                {
                                                                    question && question.answers.length > 0 && question.answers.map((answer, indexA) => {
                                                                        return (
                                                                            <Grid item xs={12} key={indexA}>
                                                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                                    <TextField
                                                                                        id={"reponse-" + indexA}
                                                                                        label={"Réponse " + (indexA+1)}
                                                                                        variant="outlined"
                                                                                        multiline
                                                                                        name={"reponse-" + indexA}
                                                                                        value={answer}
                                                                                        onChange={(e) => {
                                                                                            const newAnswers = [...question.answers];
                                                                                            newAnswers[indexA] = e.target.value
                                                                                            const newQuestions = [...questions]
                                                                                            newQuestions[index].answers = newAnswers
                                                                                            setQuestions(newQuestions)
                                                                                        }}
                                                                                        sx={{
                                                                                            width: "90%",
                                                                                            mt: 1
                                                                                        }}
                                                                                    />
                                                                                    <Switch
                                                                                        checked={question.correctAnswer.includes((indexA+1).toString()) || question.correctAnswer.includes((indexA+1))}
                                                                                        onChange={(e) => {
                                                                                            const newAnswers = [...question.correctAnswer];
                                                                                            // question.correctAnswer.length > 1 ? question.correctAnswer.map(Number) : Number(question.correctAnswer)

                                                                                            if(newAnswers.includes((indexA+1).toString()) || newAnswers.includes((indexA+1))){
                                                                                                console.log("suppression")
                                                                                                newAnswers.splice(newAnswers.indexOf(indexA+1), 1)
                                                                                            } else {
                                                                                                console.log("ajout")
                                                                                                newAnswers.push((indexA+1))
                                                                                            }

                                                                                            const newQuestions = [...questions]
                                                                                            newQuestions[index].correctAnswer = newAnswers
                                                                                            setQuestions(newQuestions)
                                                                                            console.log(question.correctAnswer)
                                                                                        }}
                                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                                    />
                                                                                    <IconButton aria-label="Supprimer une réponse" size="normal" color="danger">
                                                                                        <DeleteRounded fontSize="small" sx={{ fontSize: 25 }} />
                                                                                    </IconButton>
                                                                                </Stack>
                                                                            </Grid>
                                                                        )
                                                                    })
                                                                }
                                                            </Grid>
                                                            <Collapse in={collapseResponse["question_" + index]}>
                                                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                                    <TextField
                                                                        id={"reponse-" + question.answers.length}
                                                                        label={"Réponse " + (question.answers.length+1)}
                                                                        variant="outlined"
                                                                        multiline
                                                                        name={"reponse-" + question.answers.length}
                                                                        value={newAnswer["question_" + index]}
                                                                        onChange={(e) => {
                                                                            const newAnswerTemp = {...newAnswer}
                                                                            newAnswerTemp["question_" + index] = e.target.value
                                                                            setNewAnswer(shopCart => ({
                                                                                ...newAnswerTemp
                                                                            }))
                                                                        }}
                                                                        sx={{
                                                                            width: "90%",
                                                                            mt: 1
                                                                        }}
                                                                    />
                                                                    <Switch
                                                                        checked={question.correctAnswer.includes((question.answers.length+1).toString()) || question.correctAnswer.includes((question.answers.length+1))}
                                                                        onChange={(e) => {
                                                                            const newAnswers = [...question.correctAnswer];
                                                                            // question.correctAnswer.length > 1 ? question.correctAnswer.map(Number) : Number(question.correctAnswer)

                                                                            if(newAnswers.includes((question.answers.length+1).toString()) || newAnswers.includes((question.answers.length+1))){
                                                                                console.log("suppression")
                                                                                newAnswers.splice(newAnswers.indexOf(question.answers.length+1), 1)
                                                                            } else {
                                                                                console.log("ajout")
                                                                                newAnswers.push((question.answers.length+1))
                                                                            }

                                                                            const newQuestions = [...questions]
                                                                            newQuestions[index].correctAnswer = newAnswers
                                                                            setQuestions(newQuestions)
                                                                            console.log(question.correctAnswer)
                                                                        }}
                                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                                    />
                                                                    <IconButton aria-label="Supprimer une réponse" size="normal" color="danger">
                                                                        <DeleteRounded fontSize="small" sx={{ fontSize: 25 }} />
                                                                    </IconButton>
                                                                </Stack>
                                                            </Collapse>
                                                            {
                                                                question.answers.length < 5 ? (
                                                                    <IconButton aria-label="Add a response" size="large" color="primary" onClick={() => {
                                                                        const collapseResponseTemp = {...collapseResponse}
                                                                        collapseResponseTemp["question_" + index] = !collapseResponseTemp["question_" + index] 
                                                                        setCollapseResponse(shopCart => ({
                                                                            ...collapseResponseTemp
                                                                        }))
                                                                        if(!collapseResponseTemp["question_" + index]){
                                                                            const newAnswerTemp = {...newAnswer}
                                                                            newAnswerTemp["question_" + index] = ""
                                                                            setNewAnswer(shopCart => ({
                                                                                ...newAnswerTemp
                                                                            }))
                                                                        }
                                                                    }}>
                                                                        <AddRounded fontSize="small" sx={{ fontSize: 35 }} />
                                                                    </IconButton>
                                                                ) : null
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                                <IconButton aria-label="Supprimer une question" size="large" color="danger"onClick={() => deleteQuestion(index)}>
                                                    <DeleteRounded fontSize="small" sx={{ fontSize: 35 }} />
                                                </IconButton>
                                            </Stack>
                                        )
                                    }
                                })
                            }
                            <Collapse in={collapseQuestion}>
                                <Paper sx={{ mt: 10, p: 3 }}>
                                    <Grid container columns={12} columnSpacing={2}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">Question</Typography>
                                            <TextField
                                                id={"question-" + questions.length+1}
                                                variant="outlined"
                                                multiline
                                                name={"question-" + questions.length+1}
                                                value={newQuestion.question}
                                                onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                                                sx={{
                                                    mt: 1,
                                                    mb: 3,
                                                    width: "100%",
                                                }}
                                            />
                                            <Typography variant="h6">Nombre de points</Typography>
                                            <TextField
                                                id={"question-" + questions.length+1}
                                                variant="outlined"
                                                name={"question-" + questions.length+1}
                                                value={newQuestion.point}
                                                onChange={(e) => setNewQuestion({...newQuestion, point: e.target.value})}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                                                sx={{
                                                    mt: 1,
                                                    mb: 3,
                                                }}
                                            />
                                            <Typography variant="h6">Explication</Typography>
                                            <TextField
                                                id={"explanation"}
                                                variant="outlined"
                                                multiline
                                                name={"explanation"}
                                                value={newQuestion.explanation}
                                                onChange={(e) => setNewQuestion({...newQuestion, explanation: e.target.value})}
                                                sx={{
                                                    mt: 1,
                                                    mb: 3,
                                                    width: "100%",
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">Réponses</Typography>
                                            <Grid container direction={{ xs: "column", md: "row" }} spacing={1}>
                                                <Grid item xs={8}>
                                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                        <TextField
                                                            id={"reponse-"}
                                                            label={"Réponse "}
                                                            variant="outlined"
                                                            multiline
                                                            name={"reponse-" }
                                                            value={newQuestion.answers[0]}
                                                            onChange={(e) => {
                                                                const newAnswers = [...newQuestion.answers];
                                                                newAnswers[0] = e.target.value
                                                                setNewQuestion({...newQuestion, answers: newAnswers})
                                                            }}
                                                            sx={{
                                                                width: "90%",
                                                                mt: 1
                                                            }}
                                                        />
                                                        <Switch
                                                            defaultChecked={false}
                                                            // checked={question.correctAnswer.includes((indexA+1).toString()) || question.correctAnswer.includes((indexA+1))}
                                                            // onChange={(e) => {
                                                            //     const newAnswers = [...question.correctAnswer];
                                                            //     // question.correctAnswer.length > 1 ? question.correctAnswer.map(Number) : Number(question.correctAnswer)

                                                            //     if(newAnswers.includes((indexA+1).toString()) || newAnswers.includes((indexA+1))){
                                                            //         console.log("suppression")
                                                            //         newAnswers.splice(newAnswers.indexOf(indexA+1), 1)
                                                            //     } else {
                                                            //         console.log("ajout")
                                                            //         newAnswers.push((indexA+1))
                                                            //     }

                                                            //     const newQuestions = [...questions]
                                                            //     newQuestions[index].correctAnswer = newAnswers
                                                            //     setQuestions(newQuestions)
                                                            //     console.log(question.correctAnswer)
                                                            // }}
                                                            inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Collapse>

                            <Box sx={{ mt: 3, mb: 3, textAlign: "center" }}>
                                <IconButton aria-label="Add a question" size="large" color="primary" onClick={() => setCollapseQuestion((prev) => !prev)}>
                                    <AddRounded fontSize="small" sx={{ fontSize: 35 }} />
                                </IconButton>
                            </Box>
                            
                            <Button type="submit" variant="contained" color="secondary" sx={{ margin: "0 auto", mt: 5, textAlign: "center" }}>Modifier</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default EditQuizz