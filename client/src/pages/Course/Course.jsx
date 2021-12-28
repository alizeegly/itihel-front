import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import ReactHtmlParser from 'react-html-parser';
import { convertToHTML, convertFromHTML } from 'draft-convert';


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
    const [showEdit, setShowEdit] = useState(false)
    const [editorState, setEditorState] = useState({})


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
    }, [])

    return (
        <div className="course">
            <Navbar user={user} />
            <SidebarCourseComponent course={course}/>
            <div className="page">
                <div className="container2">
                    <div class="container__page2">
                        <div className={`container__wrapper2 ${!showEdit ? "background-wrapper" : ""}`}>
                            <div class="container__text">
                                {
                                    !showEdit ? ReactHtmlParser(course.text) : (
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <Editor
                                                    editorState={editorState}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperEditor"
                                                    editorClassName="editor"
                                                    onEditorStateChange={handleChange}
                                                />
                                                <button type="submit">Modifier</button>
                                            </form>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="form__buttons2">
                            {
                                !showEdit ? (
                                    <button className="button-save" onClick={() => setShowEdit(!showEdit)} type="submit">Modifier</button>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course
