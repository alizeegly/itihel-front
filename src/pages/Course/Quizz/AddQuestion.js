import { AddRounded } from '@mui/icons-material'
import { Box, Button, Fab, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Modal from 'react-modal'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChipInput from 'material-ui-chip-input'
import { useParams } from 'react-router-dom'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 35,
      width: "50%",
      zIndex: 1000
    },
    overlay: {zIndex: 1000}
};

Modal.setAppElement('#root');

const AddQuestion = ({questions, quizz}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [questionsList, setQuestionsList] = useState({})
    const [question, setQuestion] = useState({
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
    const { id } = useParams();
    const notify = () => toast.success("La question a été ajoutée", {
        position: toast.POSITION.TOP_RIGHT
    });

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }

    const getQuiz = async () => {
        try {
            const quiz = await axios.get("/api/quizz/course/" + id)
            // setQuizz(quiz.data[0]);
            // setTitle(quiz.data[0].quizTitle)
            // setSynopsis(quiz.data[0].quizSynopsis)
            setQuestionsList(quiz.data[0].questions)
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        // Ajout de la question
        const questionsTemp = [...questionsList]
        questionsTemp.push(question)
        questionsTemp.forEach((question, index) => {
            let correctAnswersTemp = [...question.correctAnswer];
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
        setQuestionsList(questionsTemp)

        const data = {
            quizTitle: quizz.quizTitle,
            quizSynopsis: quizz.quizSynopsis,
            course_id: quizz.course_id,
            nrOfQuestions: questionsTemp.length.toString(),
            questions: questionsTemp,
            _id: quizz._id
        }
    
        console.log(data)
        axios.put("/api/quizz/" + data._id, data)
            .then((res) => {
                console.log("Ajouté")
                setQuestion({
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
                setIsOpen(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getQuiz()
        console.log(questions)
    }, [])


    return (
        <>
            <Fab color="primary" aria-label="add" onClick={openModal}>
                <AddIcon />
            </Fab>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal">
                    <FaTimes className="closeIcon" onClick={closeModal}/>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h4">Ajouter une question</Typography>
                        <Grid container columns={12} spacing={2} sx={{ mb: 4, mt: 2}}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id={"question"}
                                    label="Question"
                                    variant="outlined"
                                    multiline
                                    name={"question"}
                                    value={question.question}
                                    onChange={(e) => {
                                        setQuestion(prev => ({...prev, question: e.target.value}))
                                    }}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    id={"points"}
                                    variant="outlined"
                                    label="Nombre de points"
                                    name={"points"}
                                    value={question.point}
                                    onChange={(e) => {
                                        setQuestion(prev => ({...prev, point: e.target.value}))
                                    }}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                                    sx={{
                                        mt: 1,
                                        mb: 1
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <ChipInput
                                    value={question.answers}
                                    onAdd={(chip) => {
                                        const answersTemp = [...question.answers]
                                        answersTemp.push(chip)
                                        setQuestion(prev => ({...prev, answers: answersTemp}))
                                        console.log("add : " + chip)
                                        console.log(question)
                                    }}
                                    onDelete={(chip, index) => {
                                        const answersTemp = [...question.answers]
                                        answersTemp.splice(index, 1);
                                        setQuestion(prev => ({...prev, answers: answersTemp}))
                                        console.log("delete : " + chip)
                                        console.log(question)
                                    }}
                                    disableUnderline
                                    fullWidth
                                    label="Réponses (press enter to add )"
                                    variant='outlined'
                                /> */}
                                <TextField
                                    id={"reponses"}
                                    variant="outlined"
                                    label="Réponses (séparées par des ; )"
                                    multiline
                                    name={"reponses"}
                                    value={question.answers.join('; ')}
                                    onChange={(e) => {
                                        const reponses = e.target.value.split('; ');
                                        setQuestion(prev => ({...prev, answers: reponses}))
                                    }}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <ChipInput
                                    value={question.correctAnswer}
                                    onAdd={(chip) => {
                                        const answersTemp = [...question.correctAnswer]
                                        answersTemp.push(chip)
                                        setQuestion(prev => ({...prev, correctAnswer: answersTemp}))
                                        console.log("add : " + chip)
                                        console.log(question)
                                    }}
                                    onDelete={(chip, index) => {
                                        const answersTemp = [...question.correctAnswer]
                                        answersTemp.splice(index, 1);
                                        setQuestion(prev => ({...prev, correctAnswer: answersTemp}))
                                        console.log("delete : " + chip)
                                        console.log(question)
                                    }}
                                    disableUnderline
                                    fullWidth
                                    label="Réponses correctes (press enter to add )"
                                    variant='outlined'
                                    newChipKeys={[";"]}
                                /> */}
                                <TextField
                                    id={"correct_answers"}
                                    label="Réponses correctes (séparées par des ; )"
                                    variant="outlined"
                                    multiline
                                    name={"correct_answers"}
                                    value={question.correctAnswer.join('; ')}
                                    onChange={(e) => {
                                        const reponses = e.target.value.split('; ');
                                        setQuestion(prev => ({...prev, correctAnswer: reponses}))
                                    }}
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    id={"explanation"}
                                    variant="outlined"
                                    label="Explication"
                                    multiline
                                    name={"explanation"}
                                    value={question.explanation}
                                    onChange={(e) => {
                                        setQuestion(prev => ({...prev, explanation: e.target.value}))
                                    }}
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default AddQuestion