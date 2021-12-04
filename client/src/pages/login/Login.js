import React from 'react'
import "./login.scss"

function Login() {
    return (
        <div className="login_page">
            <div className="header">
                <div className="logo">
                    <p>Itihel</p>
                </div>
                <div className="options">
                    <a className="login_option" href="">Log in</a>
                    <a className="signup_option" href="">Sign up</a>
                </div>
            </div>
            <div className="main_content">
                <div className="card">
                    <div className="log_in">
                        <h2>Log in</h2>
                    </div>
                    <div className="form">
                        <div className="email_pseudo">
                            <label>Email ou pseudo</label>
                            <input/>
                        </div>
                        <div className="password">
                            <label>Password</label>
                            <input/>
                        </div>
                    </div>
                    <a className="button_login" href="./">Log in</a>
                </div>
            </div>
        </div>
    )
}

export default Login