import React, {useState} from 'react'
import ReactCardFlip from 'react-card-flip'
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'

const FlipCard = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlippedCard = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    return (
        <>
            <Toolbar sx={{ width: "100%", justifyContent: "space-between" }}>
                <Typography variant="h1" component="div">FLIP CARDS</Typography>
                <Button variant="contained" color="primary" href={"/courses/" + props.course._id + "/flip-cards"}>Ajouter</Button>
            </Toolbar>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className='flip-card flip-card-front' onClick={handleFlippedCard}>
                    A quelle date eu lieu l'armistice ?
                </div>

                <div className='flip-card flip-card-back' onClick={handleFlippedCard}>
                    Le 8 mai 1945
                </div>
            </ReactCardFlip>
        </>
    )
}

export default FlipCard