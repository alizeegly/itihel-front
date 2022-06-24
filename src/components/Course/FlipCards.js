import { Button, Stack, Toolbar } from '@mui/material'
import React, { useEffect } from 'react'
import { ShowForPermission } from '../../pages/Course/CoursePermissions'
import {Carousel} from '3d-react-carousal';
import FlipCard from './FlipCard';

const FlipCards = (props) => {
    
    const flipcards = []

    useEffect(() => {
        if(flipcards.length <= 0){
            props.cards.length > 0 && props.cards.map((card, index) => {
                flipcards.push(<FlipCard card={card} key={index}/>)
            })
        }
    }, [])
    
    return (
        <>
            <Toolbar disableGutters sx={{ width: "100%", justifyContent: "space-between" }}>
                <h1 style={{ fontWeight: "bold" }}>FLIP CARDS</h1>
                <Stack direction="row" spacing={1}>
                    <ShowForPermission 
                        course={props.course} 
                        permissionRequired={["618702283f5059816ààc261d99", "6173234a35654816126ff1cf"]}
                        errorReturn={null}
                    >
                        <Button variant="contained" color="primary" href={"/courses/" + props.course + "/flip-cards"}>Ajouter</Button>
                    </ShowForPermission>
                    <ShowForPermission 
                        course={props.course} 
                        permissionRequired={["618702283f5059816c261d99", "617effba64f5c17ca15e72fb", "617effc664f5c17ca15e72fd"]}
                        errorReturn={null}
                    >
                        <Button variant="contained" color="secondary" href={"/courses/" + props.course + "/flip-cards/edit"}>Modifier</Button>
                    </ShowForPermission>
                </Stack>
            </Toolbar>
            <Stack direction="row" spacing={2} style={{ marginTop: 30 }} className="cards-slider">
                {
                    flipcards.length > 1 ? (
                        <Carousel slides={flipcards} arrows={true} />
                    ) : flipcards[0]
                }
            </Stack>
        </>
    )
}

export default FlipCards