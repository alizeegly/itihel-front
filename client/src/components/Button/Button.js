import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'



const Button = ({text, link, color, background, border, size}) => {
    if(!color){
        color = "#444444"
    }
    if(!background){
        background = "#FEE996"
    }
    if(!border){
        border = "1px solid #FEE996"
    }
    if(!size){
        size = "normal"
    }
    const ButtonStyledSm = styled.button`
        font-family: Quicksand;
        font-size: 14px!important;
        padding: 10px 15px!important;
        border-radius: 10px!important;
        border: none;
        cursor: pointer;
        color: ${color};
        border: ${border};
        background: ${background};
    `;
    const ButtonStyled = styled.button`
        font-family: Quicksand;
        font-size: 18px;
        padding: 15px 20px;
        border-radius: 15px;
        border: none;
        cursor: pointer;
        color: ${color};
        border: ${border};
        background: ${background};
    `;
    const ButtonStyledLg = styled.button`
        font-family: Quicksand;
        font-size: 22px!important;
        padding: 18px 24px!important;
        border-radius: 19px!important;
        border: none;
        cursor: pointer;
        color: ${color};
        border: ${border};
        background: ${background};
    `;

    return (
        <Link to={link}>
            <div>
                {
                    size === "sm" ? (
                        <ButtonStyledSm to="/">{text}</ButtonStyledSm>
                    ) : size === "lg" ? (
                        <ButtonStyledLg to="/">{text}</ButtonStyledLg>
                    ) : size === "normal" ? (
                        <ButtonStyled to="/">{text}</ButtonStyled>
                    ) : (
                        <>{size}</>
                    )
                }
                
            </div>
        </Link>
    )
}




export default Button
