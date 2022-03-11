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
import moment from 'moment'
import ReactCardFlip from 'react-card-flip';
import Quiz from 'react-quiz-component';
import { quiz } from './quiz';

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
    const [isFlipped, setIsFlipped] = useState(false)


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

    const handleFlippedCard = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    useEffect(()=>{
        getCourse()
        getUser()
        console.log(course)
    }, [])

    return (
        <div className="course">
            <Navbar user={user} />
            <SidebarCourseComponent course={course}/>
            <div className="page">
                <div className="container2">
                    <div className='container2-header'>
                        <div>
                            <p>
                                Modifié le {moment(course.updatedAt).format('DD/MM/YYYY, hh:mm a')}
                            </p>
                            <div className='box-tags d-flex flex-wrap align-center'>
                                {
                                    course.categories && course.categories.map((category, index) => (
                                        <div key={index} className='tag' style={{background: category.color ? category.color : "#fff"}}>
                                            {category.name}
                                        </div>
                                    ))
                                }
                            </div>
                            <h1 className="title-course">{course.title}</h1>
                            <p className='description-course'>{course.description}</p>
                        </div>
                        <div>
                            <p>By @{course && course.owner_id && course.owner_id.pseudo ? course.owner_id.pseudo : ""}</p>
                            <p className={course.is_public ? "badge-public public" : "badge-public prive"}>{course.is_public ? "Public" : "Privé"}</p>
                            {
                                !showEdit ? (
                                    <button className="button-save" onClick={() => setShowEdit(!showEdit)} type="submit">Modifier</button>
                                ) : (
                                    ""
                                )
                            }
                        </div>
                    </div>
                    <div className="container__page2">
                        <div className={`container__wrapper2 ${!showEdit ? "background-wrapper" : ""}`}>
                            <div className="container__text">
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
                                                <button type="submit" className='button-save button-form'>Modifier</button>
                                            </form>
                                        </>
                                    )
                                }
                                <div className='mt-5'>
                                    <h1>FLIP CARDS</h1>
                                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                                        <div className='flip-card flip-card-front' onClick={handleFlippedCard}>
                                            A quelle date eu lieu l'armistice ?
                                        </div>

                                        <div className='flip-card flip-card-back' onClick={handleFlippedCard}>
                                            Le 8 mai 1945
                                        </div>
                                    </ReactCardFlip>

                                    <h1>QUIZ</h1>
                                    <Quiz quiz={quiz}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course
