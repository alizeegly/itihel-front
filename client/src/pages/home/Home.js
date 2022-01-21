import React from 'react'
import "./home.scss"

function Home() {
    return (
        <div className="home">
            <div className="wrap">
                <div className="left">
                    <h1>Bienvenue sur <br />
                    <span className="color">ITHIEL&nbsp;!</span></h1>
                    <h3>La plateforme étudiante de partage de cours !</h3>
                    <div className="features">
                        <div className="join" data-aos="fade-up" data-aos-delay="500">
                            <p>Crée ou rejoint un cours !</p>
                        </div>
                        <div className="add_note" data-aos="fade-up" data-aos-delay="800">
                            <p>Ajoute des prises notes !</p>
                        </div>
                        <div className="share" data-aos="fade-up" data-aos-delay="1100">
                            <p>Partage le cours à tes camarades !</p>
                        </div>
                        <div className="public" data-aos="fade-up" data-aos-delay="1400">
                            <p>Ajoute un cours en public !</p>
                        </div>
                    </div>
                    <p>
                        <a href="/signup" className="btn">S'inscrire</a>
                        <a href="/login" className="btn">Se connecter</a>
                    </p>
                </div>
                <div className="right">

                </div>
            </div>
        </div>
    )
}

export default Home