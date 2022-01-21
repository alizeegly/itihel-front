import React, { useEffect, useState } from 'react'
import "./course.scss"
import styled from 'styled-components'
import moment from 'moment'
import axios from 'axios'


const CourseItem = (props) => {
    const [creator, setCreator] = useState({})

    const getCreator = async () => {
        try {
            var creator = await axios.get("/api/users/find/" + props.creator)
            setCreator(creator.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        if(props.page === "cours-publics"){
            getCreator()
        }
    }, [])
    return (
        <a href={"/courses/" + props.id} className="card_cours">
            <div className="w-full">
                {
                    props.page === "partages-avec-moi" && props.course.course_id ? (
                        <>
                            <h4>{props.course.course_id.title}</h4>
                            <p className="card__description">{props.course.course_id.description}</p>
                        </>
                    ) : (
                        <>
                            <h4>{props.title}</h4>
                            <p className="card__description">{props.description}</p>
                        </>
                    )
                }
                
                {
                    props.page === "cours-publics" ? (
                        <div className="d-flex justify-between w-full">
                            <p>{moment(props.date).format('DD/MM/YYYY')}</p>
                            <p>@{creator.pseudo}</p>
                        </div>
                    ) : props.page === "partages-avec-moi" ? (
                        <div className="d-flex justify-between w-full">
                            <p>{moment(props.date).format('DD/MM/YYYY')}</p>
                            {
                                props.page === "partages-avec-moi" && props.course ? (
                                    <p>@{props.course.user_id.pseudo}</p>
                                ) : (
                                    <p>@{creator.pseudo}</p>
                                )
                            }
                        </div>
                    ) :(
                        <p>{moment(props.date).format('DD/MM/YYYY')}</p>
                    )
                }
            </div>
        </a>
    )
}

export default CourseItem