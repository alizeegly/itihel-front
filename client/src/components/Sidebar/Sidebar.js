import React from 'react'
import "./sidebar.scss"

const Sidebar = () => {
    return (
        <div className="navbar">
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

export default Sidebar
