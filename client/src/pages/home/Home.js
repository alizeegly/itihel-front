import React from 'react'
import "./home.scss"

function Home() {
    return (
        <div className="home">
            <div className="left_home">
                <div>
                    <h1>Bienvenue sur <span>ITHIEL !</span></h1>
                    <p>Nous sommes une plateforme de partage de notes de cours !<br />
                    Il vous suffit de créer un compte et gooooo !</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt<br /> ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate</p>
                    <a href="#">Comment ça fonctionne ?</a>
                </div>
            </div>
            <div className="right_home">
                <a href="/login">Se connecter</a>
                <a href="/signup">Créer un compte</a>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
        </div>
    )
}

export default Home
