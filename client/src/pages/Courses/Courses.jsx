import React, { useEffect, useState } from 'react'
import "./courses.scss"
import CreateCourse from './CreateCourse'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import CourseItem from '../../components/Course/CourseItem.js'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import Navbar from '../../components/Navbar/Navbar'
import SidebarCourseComponent from '../../components/SidebarCourse/SidebarCourse'
import moment from 'moment'



const Courses = ({page}) => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [courses, setCourses] = useState({})
    const { id } = useParams()
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

    const getCourses = async () => {
        try {
            if(page === "mes-cours"){
                const courses = await axios.get("/api/users/"+session.user.id+"/courses")
                setCourses(courses.data)
                console.log(page)
                console.log(courses.data.courses)
            } else if(page === "partages-avec-moi"){
                const courses = await axios.get("/api/courses-shared/user/"+session.user.id)
                setCourses(courses.data)
                console.log(page)
                console.log(courses.data.courses)
            } else if(page === "cours-publics"){
                const courses = await axios.get("/api/courses/public")
                setCourses(courses.data)
                console.log(page)
                console.log(courses.data.courses)
            }
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

    useEffect(()=>{
        getCourses()
        getUser()
    }, [])

    return (
        <div className="courses">
            <Sidebar user={user} />
            <div className="page">
                <div className="container">
                    <div className="carre_1"></div>
                    <div className="carre_2"></div>
                    <div className="carre_3"></div>
                    <div className="carre_4"></div>
                    <div className="container__wrapper">
                        <div className="container__box">
                            <div className="d-flex align-center justify-between">
                                <h1 className="title text-center">
                                    {page === "mes-cours" ? "Mes Cours" : page === "partages-avec-moi" ? "Partagés avec moi" : page === "cours-publics" ? "Cours publics" : ""}
                                </h1>
                                <div>
                                    <CreateCourse/>
                                </div>
                            </div>
                            
                            {courses && courses.courses && courses.courses.map((course, index) => (
                                <div key={index} className="user">
                                    <CourseItem
                                        title={user.title}
                                        description={user.description}
                                        date={user.createdAt}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses