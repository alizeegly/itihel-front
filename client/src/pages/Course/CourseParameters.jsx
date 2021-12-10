import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'
import Navbar from '../../components/Navbar/Navbar'

function CourseParameters(){
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [course, setCourse] = useState({})
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
    const { id } = useParams();
    console.log(course)

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
            console.log(session)
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getCourse()
        getUser()
    }, [])

    return (
        <div className="course-parameters">
            <Navbar user={user} />
            <SidebarCourseComponent user={user}/>
            <div>
                Course
                <p>
                    <Link to={"/courses/" + id}>Course</Link>
                </p>
            </div>
        </div>
    )
}

export default CourseParameters
