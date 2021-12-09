import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./profil.scss"
import { useNavigate } from "react-router-dom"
import { useSession } from  'react-use-session'
import axios from 'axios'
import Button from '../../components/Button/Button'

function Profil(){
    const navigate = useNavigate()
    const { session, saveJWT, clear } = useSession('itihel')
    const [user, setUser] = useState({
        courses: [],
        createdAt: "",
        email: "",
        first_name: "",
        last_connection: "",
        last_name: "",
        password: "",
        profile_picture: "",
        pseudo: "",
        updatedAt: "",
        _id: ""
    })
    const [showFormPassword, setShowFormPassword] = useState(false)

    const logout = () => {
        clear()
        console.log("logout")
        navigate("/login", {message: "Vous êtes déconnecté"})
    }
    
    const handleChange = e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put("/api/users/" + user._id, user)
            .then((res) => {
                console.log(res.data)
                console.log("modifié")
                navigate("/profile");
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getUser = async () => {
        try {
            const user = await axios.get("/api/users/find/" + session.user.id)
            setUser(user.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(()=>{
        getUser()
    }, [])

    return (
        <div className="profil">
            <Sidebar/>
            <div className="page">
                <div className="header">
                    <button className="header__button" onClick={logout}>
                        Se déconnecter
                    </button>
                </div>
                <div className="container">
                    <div className="carre_bleuc"></div>
                    <div className="carre_bleuf"></div>
                    <div className="carre_jaune"></div>
                    <div className="carre_bleu"></div>
                    <div className="container__wrapper">
                        <form className="container__box" onSubmit={handleSubmit} >
                            <h1 className="title">Mon compte</h1>
                            <div className="form">
                                <div className="form_inputs">
                                    <div className="form__item">
                                        <label>Nom</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="last_name"
                                            value={user.last_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label>Prénom</label>
                                        <input 
                                            type="text" 
                                            name="first_name"
                                            className="form-control" 
                                            value={user.first_name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label>Pseudo</label>
                                        <input 
                                            type="text" 
                                            name="pseudo"
                                            className="form-control"
                                            value={user.pseudo}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form__item">
                                        <label>E-mail</label>
                                        <input 
                                            type="text" 
                                            name="email"
                                            className="form-control"
                                            value={user.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form__buttons">
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
