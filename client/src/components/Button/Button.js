import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const Button = ({text, link, color, background}) => {

    const ButtonStyled = styled.button`
        font-family: Quicksand;
        font-size: 18px;
        padding: 15px 20px;
        background: ${background};
        border-radius: 15px;
        border: none;
        cursor: pointer;
        color: ${color}
    `;

    return (
        <Link to={link}>
            <div>
                <ButtonStyled theme="pink" to="/">{text}</ButtonStyled>
            </div>
        </Link>
    )
}




export default Button
