import React, { useEffect, useState } from 'react'
import "./course.scss"
import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'
import axios from 'axios'

function Course(){
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
        <div className="course">
            Course
            <p>
                <Link to={"/courses/" + id + "/parameters"}>Parameters</Link>
            </p>
        </div>
    )
}

export default Course
