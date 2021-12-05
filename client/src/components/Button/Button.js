import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const Button = ({text, link, color="#444444", background="#FEE996", border="1px solid #FEE996"}) => {

    const ButtonStyled = styled.button`
        font-family: Quicksand;
        font-size: 18px;
        padding: 15px 20px;
        background: ${background};
        border-radius: 15px;
        border: none;
        cursor: pointer;
        color: ${color};
        border: ${border};
    `;

    return (
        <Link to={link}>
            <div>
                <ButtonStyled to="/">{text}</ButtonStyled>
            </div>
        </Link>
    )
}




export default Button
