import React from 'react'
import "./sidebar_course.scss";
import { FaBars } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

const SidebarCourseComponent = ({user}) => {
    
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="menu">
                    <ul className="menu__item">
                        <li>Prise de notes</li>
                        <li>Quiz</li>
                        <li>Flip cards</li>
                    </ul>
                </div>
                <div className="parameters">
                    <FiSettings size="2em"/>
                    <div>
                        Parametres
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarCourseComponent
