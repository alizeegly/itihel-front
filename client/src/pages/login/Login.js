import React, { useState } from 'react'
import "./login.scss"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session';
const initialState = {email: "", password: ""}

function Login({message}) {
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel'); // Récupérer la session itihel

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "") {
            setError("Les champs sont requis pour se connecter");
            return;
        } else {
            axios.post("/api/users/login", {email: formData.email, password: formData.password})
                .then((res) => {
                    saveJWT(res.data.token) // Créer la session
                    console.log(session)
                    navigate("/profile"); // Redirection vers la page profile
                })
            .catch(err => {
                setError("Mauvais email ou mauvais mot de passe")
            })
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="login_page">
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
                {message}
                <form className="card" onSubmit={handleSubmit}>
                    <div className="log_in">
                        <h2>Log in</h2>
                    </div>
                    <div className="form">
                        <div className="email_pseudo">
                            <label>Email</label>
                            <input name="email" onChange={handleChange}/>
                        </div>
                        <div className="password">
                            <label>Password</label>
                            <input name="password" onChange={handleChange}/>
                        </div>
                    </div>
                    <p>{error}</p>
                    <button className="button_login" type="submit">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login