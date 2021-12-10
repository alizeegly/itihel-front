import React from 'react'
import "./course.scss";
import styled from 'styled-components';


const Course = (props) => {
    return (
    <div className="card_cours">
            <h1>{props.title} </h1>
                <p>{props.description}</p>
              {/* <img src="{this.props.img}"></img> */}
        </div>
    )
}

export default Course