import React from 'react'
import "./course.scss";
import styled from 'styled-components';


const CourseItem = (props) => {
    return (
    <div className="card_cours">
        <div className="image">
            {/* <img src="{this.props.img}"></img> */}
        </div>

        <div className="information">
            <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>{props.date}</p>
        </div>

        </div>
    )
}

export default CourseItem