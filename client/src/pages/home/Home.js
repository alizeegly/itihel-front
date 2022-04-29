import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web';
import "./home.scss";
import { useSession } from  'react-use-session';
import { Button, TextField } from '@mui/material/';
import { Box } from '@mui/system'
import AOS from 'aos';

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

    AOS.init({
        startEvent: 'DOMContentLoaded'
    });

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

                <div data-aos="fade-down" data-aos-duration="500" className="home-presentation-container">
                    <div className="home-presentation-img home-img-2"></div>
                    <div className="home-presentation-text home-text-right">
                        <h2>Partagez vos notes entre amis !</h2>
                        <hr className="home-seperation-left"></hr>
                        <p>Créez un cours avec l'ensemble de vos notes sur le sujet de votre choix, élaborez des mini jeux si vous souhaitez créer du challenge, puis partagez vos cours avec les personnes de votre choix ! Plus de soucis de photos de mauvaises qualité et en plus vous pouvez tester vos connaissances entre amis !</p>
                    </div>
                </div>

                <div className="home-presentation-container">
                    <div className="home-presentation-text home-text-left">
                        <h2>Testez vos connaissances !</h2>
                        <hr className="home-seperation-left"></hr>
                        <p>Testez vos connaissances à l'aide de plusieurs mini jeux ! Réalisez des flip cards ou des quizz afin de tester vos amis sur leurs connaissances sur un cours ! De cette manière, apprenez tout en vous amusant ! Les flips cards comportent des cartes virtuelles avec des questions sur une face et les réponses de l'autre, et les quizz comportent une listes de questions avec la bonne réponses à choisir !.</p>
                    </div>
                    <div className="home-presentation-img home-img-3"></div>
                </div>

                <h2 class="form-title">Contactez-nous !</h2>

                <div class="contact-form-container">
                    <Box component="form" class="contact-form">
                        <div className="form-field field-email">
                            <label>Adresse mail :</label>
                            <TextField id="email"
                                       name="email"
                                       multiline
                                       rows={1}
                                       variant="outlined"
                                       sx={{
                                           width: "100%",
                                           mt: 2
                                       }}/>
                        </div>
                        <div className="form-field field-message">
                            <label>Message :</label>
                            <TextField id="message"
                                       name="message"
                                       multiline
                                       rows={4}
                                       variant="outlined"
                                       sx={{
                                           width: "100%",
                                           mt: 2
                                       }}/>
                        </div>
                        <Button type="submit" variant="contained" color="primary">Envoyer</Button>
                    </Box>
                </div>
            </div>
            <div class="home-footer">
                <div class="home-footer-container">
                    <p>Copyright © Itihel 2022.</p>
                    <div class="home-footer-redirection">
                        <a href="/login">Connexion</a>
                        <a href="/signup">Inscription</a>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
        </section>
    )
}

export default Home