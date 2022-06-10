import React from 'react'
import { BrowserView } from 'react-device-detect'
import Papers from '../components/Papers/Papers'
import { Box, Grid } from '@mui/material'
import Sidebar from '../components/Sidebar/Sidebar'

const drawerWidth = 240;

const LayoutSidebar = ({title, children}) => {

    return (
        <Box sx={{ display: 'flex', position: "relative", overflow: "hidden" }}>
            <Sidebar title={title} />
            <Box
                component="main"
                sx={{ 
                    flexGrow: 1, 
                    width: { sm: `calc(100% - ${drawerWidth}px)` } 
                }}
            >
                <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>
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