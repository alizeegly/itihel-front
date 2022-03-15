import { Paper } from '@mui/material'
import React from 'react'

const Papers = (props) => {
    return (
        <>
            <Paper
                elevation={0}
                square 
                sx={{
                    width: 230, 
                    height: 230,
                    background: props.bg1,
                    position: "absolute",
                    transform: "rotate(-15deg)",
                    bottom: 20,
                    left: 180,
                    zIndex: -1
                }}
            />
            <Paper 
                variant="outlined" 
                sx={{
                    width: 230, 
                    height: 230,
                    border: "3px solid " + props.border1,
                    background: "none",
                    position: "absolute",
                    transform: "rotate(-15deg)",
                    bottom: 50,
                    left: 200,
                    zIndex: -1
                }}
            />

            <Paper 
                elevation={0}
                square 
                sx={{
                    width: 230, 
                    height: 230,
                    background: props.bg2,
                    position: "absolute",
                    transform: "rotate(-15deg)",
                    top: "calc(50% - 20px)",
                    right: -10,
                    zIndex: -1
                }}
            />
            <Paper 
                variant="outlined" 
                sx={{
                    width: 230, 
                    height: 230,
                    border: "3px solid " + props.border2,
                    background: "none",
                    position: "absolute",
                    transform: "rotate(-15deg)",
                    top: "50%",
                    right: -40,
                    zIndex: -1
                }}
            />
        </>
    )
}

export default Papers