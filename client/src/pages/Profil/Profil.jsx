import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./profil.scss"

function Profil(){
    
    return (
        <div className="profil">
            <Sidebar/>
            <div className="page">
                <div className="header">
                    <div className="header__button">
                        Se déconnecter
                    </div>
                </div>
                <div className="container">
                    <div className="carre_bleuc"></div>
                    <div className="carre_bleuf"></div>
                    <div className="carre_jaune"></div>
                    <div className="carre_bleu"></div>
                    <div className="container__wrapper">
                        <form className="container__box">
                            <h1 className="title">Mon compte</h1>
                            <div className="form">
                                <div className="form__item">
                                    <label>Nom</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                    />
                                </div>
                                <div className="form__item">
                                    <label>Prénom</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                    />
                                </div>
                                <div className="form__item">
                                    <label>Pseudo</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                    />
                                </div>
                                <div className="form__item">
                                    <label>E-mail</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div>
                                <button type="submit">Modifier</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil
