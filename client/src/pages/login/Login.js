import React, { useState } from 'react'
import "./login.scss"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
// import ReactSession from 'react-client-session';
import UserProfile from '../../UserProfile'

const initialState = {email: "", password: ""}

function Login() {
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.email === "" || formData.password === "") {
            setError("Les champs sont requis pour se connecter");
            return;
        } else {
            axios.post("/api/users/login", {email: formData.email, password: formData.password})
            .then((res) => {
                console.log(res.data)
                UserProfile.setPseudo(res.data.user.pseudo);
                UserProfile.setEmail(res.data.user.email);
                UserProfile.setId(res.data.user.id);
                UserProfile.setToken(res.data.token);
                UserProfile.setIsAdmin(res.data.isAdmin);
                navigate("/");
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