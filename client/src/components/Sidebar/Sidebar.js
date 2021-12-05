import React, { useState } from 'react'
import "./sidebar.scss";
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import {Link as LinkS} from 'react-scroll';
import {Link as LinkR} from 'react-router-dom';

export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 310px;
    height: 100%;
    background: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    position: absolute;
    transition: 0.5s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0') };
    left: ${ ({isOpen}) => (isOpen ? '0' : '-100%')};
`;

export const SidebarLogo = styled.div`
    color: #444444;
    font-size: 55px;
    font-family: Quicksand;
    font-weight: bold;
`;

export const CloseIcon = styled(FaTimes)`
    color: #444;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    width: 80%;
    height: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const SidebarMenu = styled.div`
    list-style: none;
    font-family: Quicksand;
    font-size: 18px;
    font-weight: 600;
    text-transform: uppercase;
    color: #444444;    
    padding-left: 0;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 480px){
        grid-template-rows: repeat(6, 60px);
    }
`;

export const SidebarLink = styled(LinkS)`
    margin-top: 15px;
    padding-bottom: 30px;
`;

export const SideBtnWrap = styled.div`
    // display: flex;
    // justify-content: center;
`;

export const SidebarRoute = styled(LinkR)`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    background: #95DDDC;
    color: #1C2143;
    font-size: 20px;
    font-weight: 400;
    margin: 0 auto;
    transition: all 0.3s ease-out;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SidebarComponent = () => {
    
    return (
        <div className="navbar">
            <a className="s-sidebar__trigger" href="#">
                <FaBars size={32} color="#444444"/>
            </a>
            <div className="navbar__container">
                <div className="logo">
                    Itihel
                </div>
                <div className="menu">
                    <ul className="menu__item">
                        <li>Mes cours</li>
                        <li>Partagés avec moi</li>
                        <li>Tous les cours</li>
                    </ul>
                </div>
                <div className="account">
                    <div>
                        TG
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarComponent
