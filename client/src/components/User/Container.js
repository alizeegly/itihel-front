import React from 'react'
import './container.scss'

const Container = () => {
    return (
        <div className="container__wrapper">
           <div className="container__box">
                <h1 className="title">Mon compte</h1>
                <div className="form">
                    <div className="form__item">
                        <label>Nom</label>
                        <input type="text"/>
                    </div>
                    <div className="form__item">
                        <label>Prénom</label>
                        <input type="text"/>
                    </div>
                    <div className="form__item">
                        <label>Pseudo</label>
                        <input type="text"/>
                    </div>
                    <div className="form__item">
                        <label>E-mail</label>
                        <input type="text"/>
                    </div>
                    <div className="form__item">
                        <label>Mot de passe</label>
                        <input type="text"/>
                    </div>
                </div>
                <div>
                    <button>Modifier</button>
                </div>
           </div>
        </div>
    )
}

export default Container
