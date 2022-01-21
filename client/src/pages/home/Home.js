import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import "./home.scss"

function Home() {

    const container = useRef(null)

    useEffect (() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/home_animation.json")
        })
    })

    return (
        <div className="home">
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
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
                        <a href="/login" className="btn">Se connecter</a>
                        <a href="/signup" className="btn">S'inscrire</a>
                    </p>
                </div>
                <div className="right">
                    <div className="container" ref={container} data-aos="fade-down"></div>
                </div>
            </div>
        </div>
    )
}

export default Home