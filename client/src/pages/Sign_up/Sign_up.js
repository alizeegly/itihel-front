import React, { useState } from 'react'
import "./sign_up.scss"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session';

function Sign_up() {
    return (
        <div className="signup_page">
            <div className="header">
                <div className="logo">
                    <p>Itihel</p>
                </div>
                <div className="options">
                    <button className="login_option" href="#">Log in</button>
                    <button className="signup_option" href="#">Sign up</button>
                </div>
            </div>
            <div className="main_content">
                <div className="carre_bleu_c"></div>
                <div className="carre_bleu_f"></div>
                <div className="carre_jaune"></div>
                <div className="carre_bleu"></div>
                <form className="card">
                    <div className="sign_up">
                        <h2>Sign up</h2>
                    </div>
                    <div className="form">
                        <div className="form-col-left">
                            <div className="last_name">
                                <label>Nom</label>
                                <input name="last_name"/>
                            </div>
                            <div className="pseudo">
                                <label>Pseudo</label>
                                <input name="pseudo"/>
                            </div>
                            <div className="password">
                                <label>Mot de passe</label>
                                <input name="password"/>
                            </div>
                        </div>
                        <div className="form-col-right">
                            <div className="first_name">
                                <label>Prénom</label>
                                <input name="first_name"/>
                            </div>
                            <div className="email">
                                <label>E-mail</label>
                                <input name="email"/>
                            </div>
                            <div className="password_confirm">
                                <label>Confirmation du mot de passe</label>
                                <input name="password_confirm"/>
                            </div>
                        </div>
                    </div>
                    <button className="signup_login" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Sign_up