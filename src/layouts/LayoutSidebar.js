import React from 'react'
import { BrowserView } from 'react-device-detect'
import Papers from '../components/Papers/Papers'
import { Box, Grid } from '@mui/material'
import Sidebar from '../components/Sidebar/Sidebar'
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const LayoutSidebar = ({title, children, image, position, appbar = null, course=null}) => {

    const HeaderDiv = styled("div")(({ theme }) => ({
        background: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: `${position}`,
        height: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }));

    const TitleH2 = styled("h2")(({ theme }) => ({
        color: "white",
        textTransform: "uppercase",
        textShadow: "1px 1px 2px black",
        fontWeight: "bold",
        fontSize: "55px"
    }));

    return (
        <Box sx={{ display: 'flex', position: "relative", overflow: "hidden" }}>
            <Sidebar title={title} course={course} />
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                {
                    appbar ? (
                        appbar
                    ) : (
                        <HeaderDiv>
                            <TitleH2>{title}</TitleH2>
                        </HeaderDiv>
                        // <img src={image} style={{ width: "100%", height: "200px" }} alt="Profil"/>
                    )
                }
                <BrowserView>
                    <Papers
                        bg1="#94DDDE"
                        border1="#3D90BD"
                        bg2="#F3CD74"
                        border2="#3D90BD"
                    />
                </BrowserView>
                <Grid
                    container
                    columns={12}
                    spacing={3}
                    sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
                >
                    {children}
                </Grid>
            </Box>
        </Box>
    )
}

export default LayoutSidebar