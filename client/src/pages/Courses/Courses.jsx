import React, { useEffect, useState } from 'react'
import "./courses.scss"
import CreateCourse from './CreateCourse'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Course from '../../components/Course/course.js'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'




const Courses = () => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [courses, setCourses] = useState({})
    const { id } = useParams();

    console.log(courses)
    const getCourses = async () => {
        try {
            const courses = await axios.get("/api/users/"+session.user.id+"/courses")
            setCourses(courses.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getCourses()
    }, [])

    return (
        <>
        
            <CreateCourse/>

           
          <div class="mes_cours">
            <div class="title_mes_cours">
                <h1>Mes Cours</h1>
            </div>
             <ul>
                {courses && courses.courses && courses.courses.map((user) => (
                    <div key={user._id} className="user">
                        <Course
                            title={user.title}
                            description={user.description}
                            date={user.createdAt}
                        />
                    </div>
                ))}
            </ul>
          </div>
        </>
    )
}

export default Courses