import React from 'react'
import { Link } from 'react-router-dom'
import "./navbar.scss"

const Navbar = ({user}) => {
    return (
        <div className="navbar_course">
            <div className="navbar_course__container">
                <div className="navbar_logo">
                    Itihel
                </div>
                <div className="menu">
                    <ul className="menu__item">
                        <li><a href="/courses">Mes cours</a></li>
                        <li><a href="/shared-whith-me-courses">Partagé avec moi</a></li>
                        <li><a href="/public-courses">Tous les cours</a></li>
                    </ul>
                </div>
                <div className="account">
                    <div>
                        <Link to={"/profile"}>
                            {
                                user && user.first_name && user.last_name ? 
                                    user.first_name[0] + user.last_name[0]
                                : ""
                            }
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
