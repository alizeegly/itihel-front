import { Avatar, Button, Container, IconButton, List, ListItem, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'


const AppBar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <List>
                        <ListItem button  component='a' href={"/"}>
                            <Typography variant="h1"  component="h1">
                                Itihel
                            </Typography>
                        </ListItem>
                    </List>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default AppBar