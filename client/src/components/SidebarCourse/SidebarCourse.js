import React from 'react'
import "./sidebar_course.scss";
import { FaBars } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { Link } from "react-router-dom"

const SidebarCourseComponent = ({course}) => {
    
    return (
        <div className="sidebar">
            <div className="sidebar__container">
                <div className="menu">
                    <ul className="menu__item">
                        <li><Link to={"/courses/" + course._id}>Prise de notes</Link></li>
                        <li><Link to={"/courses/" + course._id}>Quiz</Link></li>
                        <li><Link to={"/courses/" + course._id}>Flip cards</Link></li>
                    </ul>
                </div>
                <div className="parameters">
                    <FiSettings size="2em"/>
                    <div>
                        <Link to={"/courses/" + course._id + "/parameters"}>Parametres</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidebarCourseComponent
