import React, {useState, useEffect} from 'react'
import ReactCardFlip from 'react-card-flip'
import { Alert, Box, Grid, TextField, Button, Typography, Stack } from '@mui/material'


const FlipCard = ({card}) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleFlippedCard = (e) => {
        e.preventDefault();
        setIsFlipped(!isFlipped)
    }

    useEffect(()=>{
        // console.log(card)
    }, [])

    return (
        <>
        <Grid>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className='flip-card flip-card-front' onClick={handleFlippedCard}>
                <Typography sx={{ fontWeight: 'bold', }} component="div">{card.question}</Typography>
                </div>

                <div className='flip-card flip-card-back' onClick={handleFlippedCard}>
                <Typography sx={{ fontWeight: 'bold', }} component="div">{card.answer}</Typography>
                </div>
            </ReactCardFlip>
         </Grid>
        </>
    )
}

export default FlipCard