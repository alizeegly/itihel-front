import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Container from '../../components/User/Container'
import "./profil.scss"

const Profil = () => {
    return (
        <div className="profil">
            <Sidebar/>
            <div className="page">
                <div className="header">
                    <div className="header__button">
                        Log out
                    </div>
                </div>
                <div className="container">
                    <div className="carre_bleuc"></div>
                    <div className="carre_bleuf"></div>
                    <div className="carre_jaune"></div>
                    <div className="carre_bleu"></div>
                    <Container/>
                </div>
            </div>
        </div>
    )
}

export default Profil
