import React, { useEffect, useState } from 'react'
import "./course.scss"
import moment from 'moment'



const CourseItem = (props) => {
    const [creator, setCreator] = useState({})

    // const getCreator = async () => {
    //     try {
    //         var creator = await axios.get("/api/users/find/" + props.creator)
    //         setCreator(creator.data)
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // };

    useEffect(()=>{
        // if(props.page === "cours-publics"){
            // getCreator()
        // }
        // console.log(props.course)
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
                            <p>@{props.course.owner_id.pseudo}</p>
                        </div>
                    ) : props.page === "partages-avec-moi" ? (
                        <div className="d-flex justify-between w-full">
                            <p>{moment(props.date).format('DD/MM/YYYY')}</p>
                            {
                                <p>@{props.course.owner_id.pseudo}</p>
                            }
                        </div>
                    ) :(
                        <p>{moment(props.date).format('DD/MM/YYYY')}</p>
                    )
                }
                <div className='box-tags d-flex flex-wrap align-center'>
                    {
                        props.course.categories.map((category, index) => (
                            <div key={index} className='tag' style={{background: category.color ? category.color : "#fff"}}>
                                {category.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </a>
    )
}

export default CourseItem