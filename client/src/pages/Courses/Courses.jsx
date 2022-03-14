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

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'



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
            var courses = []
            if(page === "mes-cours"){
                courses = await axios.get("/api/users/"+session.user.id+"/courses")
                setCourses(courses.data.courses)
                // console.log(courses)
            } else if(page === "partages-avec-moi"){
                courses = await axios.get("/api/courses-shared/user/"+session.user.id)
                setCourses(courses.data)
                console.log(courses.data)
            } else if(page === "cours-publics"){
                courses = await axios.get("/api/courses/public")
                setCourses(courses.data)
                // console.log(courses)
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
            <div className="page page2">
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
                                {page === "mes-cours" ? (<CreateCourse/>) : ""}
                                </div>
                            </div>
                            
                            <div className="d-inline d-wrap">
                                {
                                    courses.length > 0 && courses.map((course, index) => {
                                        if(page !== "partages-avec-moi"){
                                            return (
                                                (
                                                    <CourseItem
                                                        key={index}
                                                        title={course.title}
                                                        description={course.description}
                                                        date={course.createdAt}
                                                        creator={course.owner_id}
                                                        id={course._id}
                                                        page={page}
                                                        course={course}
                                                    />
                                                    // <Card variant="outlined">
                                                    //     <CardContent>
                                                    //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    //         {/* {course.owner_id} */}
                                                    //         </Typography>
                                                    //         <Typography variant="h5" component="div">
                                                    //         {course.title}
                                                    //         </Typography>
                                                    //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                    //         {course.createdAt}
                                                    //         </Typography>
                                                    //         <Typography variant="body2">
                                                    //         {course.description}
                                                    //         </Typography>
                                                    //     </CardContent>
                                                    //     <CardActions>
                                                    //         <Button size="small">Learn More</Button>
                                                    //     </CardActions>
                                                    // </Card>
                                                )
                                            )
                                        } else {
                                            // return (
                                            //     (
                                                    <CourseItem/>
                                            //             key={index}
                                            //             title={course.title}
                                            //             description={course.description}
                                            //             date={course.createdAt}
                                            //             creator={course.owner_id}
                                            //             id={course._id}
                                            //             page={page}
                                            //             course={course}
                                            //         />
                                            //     )
                                            // )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Courses