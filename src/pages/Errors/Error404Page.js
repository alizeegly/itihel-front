import React, { useEffect, useRef } from 'react';
import "./NotFound.scss"
import { Button } from '@mui/material'
import lottie from 'lottie-web'
import {Navbar} from '../../components';

function Error404Page() {
    
    const container = useRef(null)

    useEffect (() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require("../../assets/json/web-not-found.json")
        })
    })

    return (
        <>
            <Navbar/>

            <div>
                <div className="container animation-404" ref={container} data-aos="fade-down"></div>
                <div className="redirection-404">
                    <h3>Une erreur est survenue. Redirigez-vous.</h3>
                    <div className="redirection-404-buttons">
                        <Button color="primary" variant="contained" href="/">Accueil</Button>
                        <Button color="primary" variant="contained" href="/register">Inscription</Button>
                        <Button color="primary" variant="contained" href="/login">Connexion</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error404Page;