import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link } from "react-router-dom"
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
import ReactCardFlip from 'react-card-flip';
import Quiz from 'react-quiz-component';
import { quiz } from './quiz';
import { Box } from '@mui/system'
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { BrowserView } from 'react-device-detect'
import Papers from '../../components/Papers/Papers'
import AccountCircle from '@mui/icons-material/AccountCircle';
import Navbar from './Navbar'
import HeaderCourse from './HeaderCourse'

const drawerWidth = 240;

function Course(){
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
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
    const [isFlipped, setIsFlipped] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())



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
                console.log(res)
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
                    <Box sx={{ mb: 2, mt: 2 }}>
                        <Typography variant="h1">{course.title}</Typography>
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
                    <Box>
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
                </Grid>
            </Box>
        </Box>
    )
}

export default Course
