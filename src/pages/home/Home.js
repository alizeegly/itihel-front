import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web';
import "./home.scss";
import { useSession } from  'react-use-session';
import { Button, TextField, Box, Container, Paper } from '@mui/material'
import NavbarHome from '../../components/Navbar/NavbarHome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import store from '../../redux/store';
import PropTypes from "prop-types";
import {Navigate} from 'react-router-dom';
import { isAuth } from '../../actions/authActions'

function Home() {
    // const { session } = useSession('itihel');
    const container = useRef(null)

    const propTypes = {
        button: PropTypes.bool,
        isAuthenticated: PropTypes.bool,
    };
    

    useEffect (() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/home_animation.json")
        })
    });

    return (
        <>
            <NavbarHome/>
            <div className="home">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
                <div className="wrap">
                    <div className="left">
                        <h1>Bienvenue sur <br />
                            <span className="color">ITIHEL&nbsp;!</span></h1>
                        <h3>La plateforme étudiante de partage de cours !</h3>
                        <div className="features">
                            <div className="join" data-aos="fade-up" data-aos-delay="500">
                                <p>Crée ou rejoint un cours !</p>
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
                        <Box textAlign='center'>
                            {
                                // session ? (
                                //     <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="/courses">
                                //         Commencer un cours !
                                //     </Button>
                                // ) : (
                                    <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} href="/login">
                                        Commencer l'aventure !
                                    </Button>
                                // )
                            }
                        </Box>
                    </div>
                    <div className="right">
                        <div className="container" ref={container} data-aos="fade-down"></div>
                    </div>
                </div>
                <Container className="home-presentation">
                    <div data-aos="fade-right" className="home-presentation-container first-presentation-div">
                        <div className="home-presentation-text home-text-left">
                            <h2>Bienvenue sur ITIHEL !</h2>
                            <hr className="home-seperation-left"></hr>
                            <p>Il nous ai tous arrivé d'avoir loupé certains de nos cours car nous étions malade ou pour d'autres raisons. Quand c'est le cas, on demande en général à nos amis de nous envoyer le cours manqué et nous nous retrouvons par exemple avec des photos floutées. Avec ITIHEL, nous comptons faciliter le partage de vos notes et vous viter ce genre de problèmes !</p>
                        </div>
                        <div className="home-presentation-img home-img-1"></div>
                    </div>

                    <div data-aos="fade-left" className="home-presentation-container">
                        <div className="home-presentation-img home-img-2"></div>
                        <div className="home-presentation-text home-text-right">
                            <h2>Partagez vos notes entre amis !</h2>
                            <hr className="home-seperation-left"></hr>
                            <p>Créez un cours avec l'ensemble de vos notes sur le sujet de votre choix, élaborez des mini jeux si vous souhaitez créer du challenge, puis partagez vos cours avec les personnes de votre choix ! Plus de soucis de photos de mauvaises qualité et en plus vous pouvez tester vos connaissances entre amis !</p>
                        </div>
                    </div>

                    <div data-aos="fade-right" className="home-presentation-container">
                        <div className="home-presentation-text home-text-left">
                            <h2>Testez vos connaissances !</h2>
                            <hr className="home-seperation-left"></hr>
                            <p>Testez vos connaissances à l'aide de plusieurs mini jeux ! Réalisez des flip cards ou des quizz afin de tester vos amis sur leurs connaissances sur un cours ! De cette manière, apprenez tout en vous amusant ! Les flips cards comportent des cartes virtuelles avec des questions sur une face et les réponses de l'autre, et les quizz comportent une listes de questions avec la bonne réponses à choisir !.</p>
                        </div>
                        <div className="home-presentation-img home-img-3"></div>
                    </div>


                    <Paper data-aos="fade-down" sx={{ width: "50%", margin: "0 auto", p: 2, mt: 10, mb: 10 }}>
                        <h2 data-aos="fade-down" className="form-title">Contactez-nous !</h2>
                        <Box component="form" className="contact-form">
                            <div className="form-field field-email">
                                <TextField id="email"
                                    name="email"
                                    multiline
                                    label="Adresse mail"
                                    rows={1}
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                        mt: 2
                                    }}
                                />
                            </div>
                            <div className="form-field field-message">
                                <TextField id="message"
                                    name="message"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                        mt: 3,
                                        mb: 3
                                    }}
                                />
                            </div>
                            <Box textAlign='center'>
                                <Button type="submit" variant="contained" color="primary">Envoyer</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
                <div className="home-footer">
                    <div className="home-footer-container">
                        <p>Copyright © Itihel 2022.</p>
                        <div className="home-footer-redirection">
                            <a href="/login">Connexion</a>
                            <a href="/signup">Inscription</a>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default Home