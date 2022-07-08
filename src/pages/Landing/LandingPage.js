import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web';
import "./home.scss";
import {Navbar} from '../../components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Redirect } from 'react-router-dom';

import learn from '../../assets/img/learn.svg';
import share from '../../assets/img/share.svg';

function LandingPage() {
    const container = useRef(null)

    useEffect (() => {
        const instance = lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/home_animation.json")
        });

        return () => instance.destroy();

    }, []);

    return (
        <>
            <Navbar/>
            <section className="home">
                <div className="wrap">
                    <div className="left">
                        <h1>Bienvenue sur <br />
                            <span className="color">ITIHEL&nbsp;!</span></h1>
                        <h3>La plateforme étudiante de partage de cours !</h3>
                        <div className="features">
                            <div className="join" data-aos="fade-up" data-aos-delay="500">
                                <p>Créé ou rejoint un cours !</p>
                            </div>
                            <div className="add_note" data-aos="fade-up" data-aos-delay="800">
                                <p>Ajoute des prises de notes !</p>
                            </div>
                            <div className="share" data-aos="fade-up" data-aos-delay="1100">
                                <p>Partage le cours à tes camarades !</p>
                            </div>
                            <div className="public" data-aos="fade-up" data-aos-delay="1400">
                                <p>Ajoute un cours en public !</p>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="container" ref={container} data-aos="fade-down"></div>
                    </div>
                </div>
            </section>
            <section className="presentation">
                <div className="wrap">
                    <div className="col_2">
                        <div data-aos="fade-up" data-aos-delay="200">
                            <img src={learn} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h2>ITIHEL !</h2>
                            <p>Il nous ai tous arrivé d'avoir loupé certains de nos cours car nous étions malade ou pour d'autres raisons. Quand c'est le cas, on demande en général à nos amis de nous envoyer le cours manqué et nous nous retrouvons par exemple avec des photos floutées. Avec ITIHEL, nous comptons faciliter le partage de vos notes et vous viter ce genre de problèmes !</p>
                        </div>
                    </div>
                    <div className="col_2 reverse">
                        <div data-aos="fade-up" data-aos-delay="200">
                            <img src={share} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h2>Partagez vos notes entre amis !</h2>
                            <p>Testez vos connaissances à l'aide de plusieurs mini jeux ! Réalisez des flip cards ou des quizz afin de tester vos amis sur leurs connaissances sur un cours ! De cette manière, apprenez tout en vous amusant ! Les flips cards comportent des cartes virtuelles avec des questions sur une face et les réponses de l'autre, et les quizz comportent une listes de questions avec la bonne réponses à choisir !</p>
                        </div>
                    </div>
                    <div className="col_2">
                        <div data-aos="fade-up" data-aos-delay="200">
                            <img src={learn} />
                        </div>
                        <div data-aos="fade-up" data-aos-delay="400">
                            <h2>Bienvenue sur ITIHEL !</h2>
                            <p>Il nous ai tous arrivé d'avoir loupé certains de nos cours car nous étions malade ou pour d'autres raisons. Quand c'est le cas, on demande en général à nos amis de nous envoyer le cours manqué et nous nous retrouvons par exemple avec des photos floutées. Avec ITIHEL, nous comptons faciliter le partage de vos notes et vous viter ce genre de problèmes !</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="home-footer ">
                <div className="home-footer-container">
                    <p>Copyright © Itihel 2022.</p>
                    <div className="home-footer-redirection">
                        <a href="/login">Connexion</a>
                        <a href="/signup">Inscription</a>
                    </div>
                </div>
            </div>
        </>
    )
}


export default LandingPage;