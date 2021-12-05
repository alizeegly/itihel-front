import React from 'react'
import "./home.scss"
// import ReactSession from 'react-client-session'
import UserProfile from '../../UserProfile'

function Home() {
    console.log(UserProfile.getPseudo())
    return (
        <div className="wrap">
            <h1>Je suis la home !</h1>
            <p>bonjour à tous !</p>
        </div>
    )
}

export default Home
