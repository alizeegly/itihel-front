import React, { useEffect, useState } from 'react'
import "./courseParameters.scss"
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'
import Navbar from '../../components/Navbar/Navbar'
import Checkbox from 'react-simple-checkbox'
import CourseSharedModal from './Modal/CourseSharedModal'
import EditCourseShared from './Modal/EditCourseShared'
import { FiEdit2 } from 'react-icons/fi'
import { FaRegTrashAlt } from 'react-icons/fa'

function CourseParameters(){
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [course, setCourse] = useState({})
    const [shared, setShared] = useState([])
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
    const { id } = useParams()
    const [userShared, setUserShared] = useState('')

    const getCourse = async () => {
        try {
            const course = await axios.get("/api/courses/find/" + id)
            setCourse(course.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUser = async () => {
        try {
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getShared = async () => {
        try {
            const shared = await axios.get("/api/courses-shared/course/" + id)
            setShared(shared.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("/api/courses/" + course._id, course)
            .then((res) => {
                console.log("modifié")
                navigate("/courses/" + course._id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        getCourse()
        getUser()
        getShared()
    }, [])

    return (
        <>
            <div className="course-parameters">
                <Navbar user={user} />
                <SidebarCourseComponent course={course}/>
                <div className="page">
                    <div className="container">
                        <div className="carre_1"></div>
                        <div className="carre_2"></div>
                        <div className="carre_3"></div>
                        <div className="carre_4"></div>
                        <div className="container__wrapper">
                            <div className="container__box">
                                <form onSubmit={handleSubmit}>
                                    <div className="form">
                                        <div className="form_inputs">
                                            <div className="form__item">
                                                <label>Nom du cours</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="last_name"
                                                    value={course.title}
                                                    onChange={(e) => setCourse({
                                                        ...course,
                                                        title: e.target.value
                                                    })}
                                                />
                                            </div>
                                            <div className="form__item2">
                                                <label>Rendre ce cours public ?</label>
                                                <Checkbox 
                                                    color="#94DDDE"
                                                    checked={course.is_public} 
                                                    onChange={(e) => setCourse({
                                                        ...course,
                                                        is_public: e
                                                    })} 
                                                    size="3"
                                                />
                                            </div>
                                            <div className="form__buttons">
                                                <button type="submit">Modifier</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="container__box">
                                <label>Partager le cours</label>
                                <div className="shared">
                                    <div className="shared_bloc1">
                                        <h6>Utilisateurs</h6>
                                        {shared.map(s => {
                                            return(
                                                <div className="role_user">
                                                    <p onClick={() => {setUserShared(s.user_id._id)}} key={s._id}>
                                                        {s.user_id.pseudo} {s.user_id._id === user._id ? "(Moi)" : ""}
                                                    </p>
                                                    {s.user_id._id === user._id ? "" : (<p><EditCourseShared/> <FaRegTrashAlt/></p>)}
                                                </div>
                                            )
                                        })}
                                        <CourseSharedModal course={course._id}/>
                                    </div>
                                    <div className="shared_bloc2">
                                        <h6>Rôles</h6>
                                        {
                                            userShared && shared
                                                .find(element => element.user_id._id === userShared).roles.map(r => (
                                                <p key={r._id}>{r.name}</p>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseParameters
