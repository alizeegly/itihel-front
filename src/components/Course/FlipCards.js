import { Button, Grid, Stack, Toolbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ShowForPermission } from '../../pages/Course/CoursePermissions'
import {Carousel} from '3d-react-carousal';
import FlipCard from './FlipCard';
import '../../styles/carousel.scss'

const FlipCards = (props) => {
    
    const [flipcards, setFlipcards] = useState([]);

    useEffect(() => {
        if(flipcards.length <= 0){
            props.cards.length > 0 && props.cards.map((card, index) => {
                setFlipcards(oldArray => [...oldArray, <FlipCard card={card} key={index}/>]);
            })
            console.log(flipcards)
            // console.log(props.cards)
        }
    }, [props, props.cards, flipcards, setFlipcards])
    
    return (
        <Grid item md={12} sx={{ pt: 0 }} id="flip-cards">
            <Toolbar disableGutters sx={{ width: "100%", mt: 3, justifyContent: "space-between" }}>
                <h1 style={{ fontWeight: "bold" }}>FLIP CARDS</h1>
                <Stack direction="row" spacing={1}>
                    <ShowForPermission 
                        course={props.course} 
                        permissionRequired={["618702283f5059816c261d99", "6173234a35654816126ff1cf"]}
                        errorReturn={null}
                    >
                        <Button variant="contained" color="primary" href={"/courses/" + props.course + "/flip-cards"}>Ajouter</Button>
                    </ShowForPermission>
                    {
                        props.cards.length > 0 ? (
                            <ShowForPermission 
                                course={props.course} 
                                permissionRequired={["618702283f5059816c261d99", "617effba64f5c17ca15e72fb", "617effc664f5c17ca15e72fd"]}
                                errorReturn={null}
                            >
                                <Button variant="contained" color="secondary" href={"/courses/" + props.course + "/flip-cards/edit"}>Modifier</Button>
                            </ShowForPermission>
                        ) : null
                    }
                </Stack>
            </Toolbar>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }} className="cards-slider">
                {
                    flipcards && flipcards.length > 1 ? (
                        <Carousel slides={flipcards} arrows={true} />
                    ) : flipcards[0]
                }
            </Stack>
        </Grid>
    )
}

export default FlipCards