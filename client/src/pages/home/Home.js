import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import Button from '@mui/material/Button';
import { Alert, AppBar, IconButton, List, ListItem, Toolbar } from '@mui/material';
import "./home.scss"

function Home() {

    const animation = useRef(null)

    useEffect (() => {
        lottie.loadAnimation({
            container: animation.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/home_animation.json")
        })
    })

    return (
        <section id="home">
            {/* <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div> */}
            <div className="wrap">
                <div className="left">
                    <h1>Bienvenue sur <br />
                    <span className="color">Itihel</span></h1>
                    <p className='big'>Easy to learn</p>
                    <h2>La plateforme étudiante de partage de cours</h2>
                    <div className="features">
                        <div className="join" data-aos="fade-up" data-aos-delay="500">
                            <p>Crée ou rejoint un cours</p>
                        </div>
                        <div className="add_note" data-aos="fade-up" data-aos-delay="800">
                            <p>Ajoute des prises notes</p>
                        </div>
                        <div className="share" data-aos="fade-up" data-aos-delay="1100">
                            <p>Partage le cours à tes camarades</p>
                        </div>
                        <div className="public" data-aos="fade-up" data-aos-delay="1400">
                            <p>Ajoute un cours en public</p>
                        </div>
                    </div>
                    <Button sx={{ mr: "30px" }} href="/login" variant="outlined" color="secondary">Se connecter</Button>
                    <Button href="/signup" variant="contained" color="secondary">S'inscrire</Button>
                </div>
                <div className="right">
                    <div className="animation" ref={animation} data-aos="fade-down"></div>
                </div>
            </div>
        </section>
    )
}

export default Home