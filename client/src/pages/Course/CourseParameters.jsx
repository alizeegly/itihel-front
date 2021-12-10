import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'

function CourseParameters(){
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [course, setCourse] = useState({})
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

    useEffect(()=>{
        getCourse()
    }, [])

    return (
        <div className="course-parameters">
            Course
            <p>
                <Link to={"/course/" + id}>Course</Link>
            </p>
        </div>
    )
}

export default CourseParameters
