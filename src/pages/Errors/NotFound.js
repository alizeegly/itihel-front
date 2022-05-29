import React, { useEffect, useRef } from 'react';
import "./NotFound.scss"
import lottie from 'lottie-web'
import Navbar from '../../components/Navbar/Navbar';

function NotFound() {
    
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
                <div>Cette page n'existe pas</div>
            </div>
        </>
    )
}

export default NotFound;