import React, {useState, useEffect} from 'react'
import ReactCardFlip from 'react-card-flip'
import axios from 'axios'

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
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className='flip-card flip-card-front' onClick={handleFlippedCard}>
                    {card.question}
                </div>

                <div className='flip-card flip-card-back' onClick={handleFlippedCard}>
                    {card.answer}
                </div>
            </ReactCardFlip>
        </>
    )
}

export default FlipCard