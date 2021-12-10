import React, { useState } from 'react'
import "./sign_up.scss"
import Button from '../../components/Button/Button'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session';

const initialState = {last_name: "", first_name: "", pseudo: "", email:"", password: "", password_confirm: ""}

function Sign_up() {
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel'); // Récupérer la session itihel

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "" || formData.pseudo === "" || formData.first_name === "" || formData.last_name === "") {
            setError("Les champs sont requis pour s'inscrire");
            return;
        } else {
            axios.post("/api/users/signup", {
                pseudo: formData.pseudo,
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                password: formData.password})
                .then((res) => {
                    saveJWT(res.data.token) // Créer la session
                    console.log(session)
                    navigate("/profile"); // Redirection vers la page profile
                })
                .catch(err => {
                    setError("Erreur lors de l'inscription")
                })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="signup_page">
            <div className="header">
                <div className="logo">
                    <p>Itihel</p>
                </div>
                <div className="options">
                    <button className="login_button" href="#">Login</button>
                </div>
            </div>
            <div className="main_content">
                <div className="carre_bleu_c"></div>
                <div className="carre_bleu_f"></div>
                <div className="carre_jaune"></div>
                <div className="carre_bleu"></div>
                <form className="card" onSubmit={handleSubmit}>
                    <div className="sign_up">
                        <h2>Sign up</h2>
                    </div>
                    <div className="form">
                        <div className="form-col-left">
                            <div className="last_name">
                                <label>Nom</label>
                                <input name="last_name" onChange={handleChange}/>
                            </div>
                            <div className="pseudo">
                                <label>Pseudo</label>
                                <input name="pseudo" onChange={handleChange}/>
                            </div>
                            <div className="password">
                                <label>Mot de passe</label>
                                <input name="password" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="form-col-right">
                            <div className="first_name">
                                <label>Prénom</label>
                                <input name="first_name" onChange={handleChange}/>
                            </div>
                            <div className="email">
                                <label>E-mail</label>
                                <input name="email" onChange={handleChange}/>
                            </div>
                            <div className="password_confirm">
                                <label>Confirmation du mot de passe</label>
                                <input name="password_confirm" onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    <p>{error}</p>
                    <button className="button_signup" type="submit">Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default Sign_up