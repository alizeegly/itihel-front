import React, { useEffect, useState } from 'react'
import "./mycourses.scss"
import axios from 'axios'

import { useNavigate, Link } from "react-router-dom"
import { useSession } from  'react-use-session'
import { useParams } from 'react-router'


const MyCourses = () => {
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [mycourses, setCourses] = useState({})
    const { id } = useParams();

    console.log(mycourses)
    const getCourses = async () => {
        try {
            const mycourses = await axios.get("/api/users/"+session.user.id+"/courses")
            setCourses(mycourses.data);
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
                {mycourses && mycourses.courses && mycourses.courses.map((user) => (
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












export default MyCourses