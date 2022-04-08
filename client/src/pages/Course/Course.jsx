import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import moment from 'moment'
import { Box } from '@mui/system'
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Navbar from './Navbar'
import HeaderCourse from './HeaderCourse'
import FlipCard from './FlipCards/FlipCard'
import {Carousel} from '3d-react-carousal';
// import Quiz from './Quizz/Quiz'
import Quiz from "react-quiz-component";
// import { quiz } from './quiz';

const drawerWidth = 240;


const Course = () => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const location = useLocation()
    const [course, setCourse] = useState({})
    const { id } = useParams();
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
    const [showEdit, setShowEdit] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [flipcards, setFlipcards] = useState([])
    const [quizz, setQuizz] = useState({})

    const cards = []
    flipcards.length > 0 && flipcards.map((card, index) => {
        cards.push(<FlipCard card={card} key={index}/>)
    })


    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
            const contentState = convertFromHTML(course.data.text);
            setEditorState(EditorState.createWithContent(contentState))
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

    const getQuiz = async () => {
        try {
            const quiz = await axios.get("/api/quizz/course/" + id)
            console.log(quiz.data)
            setQuizz(quiz.data[0]);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getFlipCards = async () => {
        try {
            const flipcards = await axios.get("/api/flip-cards/courses/" + id)
            setFlipcards(flipcards.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleChange = (editorState) => {
        setEditorState(editorState)
        setCourse({
            ...course,
            text: convertToHTML(editorState.getCurrentContent())
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("/api/courses/" + course._id, course)
            .then((res) => {
                console.log("modifié")
                setShowEdit(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getCourse()
        getUser()
        getFlipCards()
        getQuiz()
        console.log(quizz)
    }, [])

    return (
        <Box sx={{ display: 'flex', position: "relative", overflowX: "hidden", overflowY: "hidden" }}>
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
                    sx={{ mb: 2, mt: 3, px: { xs: 5, md: 7 } }}
                >
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Typography variant="h1" className="h1_notes">{course.title}</Typography>
                        <Typography variant="body" sx={{ mt: 2 }}>{course.description}</Typography>
                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
                            {
                                !showEdit ? (
                                    <Button onClick={() => setShowEdit(!showEdit)} variant="contained" sx={{ margin: "0 auto" }}>Modifier</Button>
                                ) : (
                                    ""
                                )
                            }
                        </Box>
                    </Box>
                    <Box id="notes">
                        {
                            !showEdit ? ReactHtmlParser(course.text) : (
                                <>
                                    <form onSubmit={handleSubmit} style={{ background: "#FFF", padding: 20 }}>
                                        <Editor
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperEditor"
                                            editorClassName="editor"
                                            onEditorStateChange={handleChange}
                                            toolbar={{
                                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                            }}
                                        />
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3, mb: 2 }}>
                                            <Button type="submit" variant="contained">Modifier</Button>
                                        </Box>
                                    </form>
                                </>
                            )
                        }
                    </Box>

                    <Box sx={{ mt: 5, width: "100%" }} id="flip-cards">
                        <Toolbar disableGutters sx={{ width: "100%", justifyContent: "space-between" }}>
                            <Typography variant="h1" component="div">FLIP CARDS</Typography>
                            <Stack direction="row" spacing={1}>
                                <Button variant="contained" color="primary" href={"/courses/" + course._id + "/flip-cards"}>Ajouter</Button>
                                <Button variant="contained" color="info" href={"/courses/" + course._id + "/flip-cards/edit"}>Modifier</Button>
                            </Stack>
                        </Toolbar>
                        <Stack direction="row" spacing={2} style={{ marginTop: 30 }} className="cards-slider">
                            {
                                cards.length > 1 ? (
                                    <Carousel slides={cards} arrows={true} />
                                ) : cards[0]
                            }
                        </Stack>
                    </Box>

                    <Box sx={{ mt: 5, width: "100%" }} id="quiz">
                        <Toolbar disableGutters sx={{ width: "100%", justifyContent: "space-between" }}>
                            <Typography variant="h1" component="div">Quiz</Typography>
                            {
                                !quizz || !quizz.quizTitle ? (
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="contained" color="primary" href={"/courses/" + course._id + "/quiz"}>Ajouter</Button>
                                        <Button variant="contained" color="info" href={"/courses/" + course._id + "/quiz"}>Modifier</Button>
                                    </Stack>
                                ) : null
                            }
                        </Toolbar>
                        <Stack direction="row" spacing={2} style={{ margin: "30px auto" }}>
                            {
                                quizz && quizz.quizTitle ? (<Quiz quiz={quizz}/>) : "Pas de quiz"
                            }
                        </Stack>
                    </Box>
                </Grid>
            </Box>
        </Box>
    )
}

export default Course
