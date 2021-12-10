import React from 'react'
import "./course.scss";
import styled from 'styled-components';


const Course = (props) => {
    return (
    <div className="card_cours">
        <div class="image">
            {/* <img src="{this.props.img}"></img> */}
        </div>

        <div class="information">
            <h1>{props.title}</h1>
                <p>{props.description}</p>
        </div>

        </div>
    )
}

export default Course