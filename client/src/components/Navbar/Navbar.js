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
                        <li><Link to={"/courses"}>Mes cours</Link></li>
                        <li><Link to={"/courses"}>Partagés avec moi</Link></li>
                        <li><Link to={"/courses"}>Tous les cours</Link></li>
                    </ul>
                </div>
                <div className="account">
                    <Link to={"/profile"}>
                        <div>
                            {user.first_name[0] + user.last_name[0]}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
