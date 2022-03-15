import React from 'react'
import "./sidebar.scss";
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import {Link, Link as LinkS} from 'react-scroll';
import {Link as LinkR, Navigate} from 'react-router-dom';
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useSession } from 'react-use-session';


const drawerWidth = 240;

const SidebarComponent = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { session, saveJWT, clear } = useSession('itihel')

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        clear()
        console.log("logout")
        Navigate("/login", {message: "Vous êtes déconnecté"})// redirect vers page login + test d'envoi de message pour dire qu'on est bien déconnecté (ça marche pas)
    }
    
    const drawer = (
        <div style={{
            display: "flex",
            justifyContent: "space-between", 
            flexDirection: "column",
            height: "90vh"
        }}>
            <List>
                <ListItem button  component='a' href={"/"}>
                    <Typography variant="h1"  component="h1">
                        Itihel
                    </Typography>
                </ListItem>
            </List>
            <List>
                <ListItem component='a' href={"/courses"}>
                    <ListItemText button primary="Mes cours" className="sidebar-item"/>
                </ListItem>
                <ListItem component='a' href={"/shared-whith-me-courses"}>
                    <ListItemText button primary="Partagés avec moi" className="sidebar-item"/>
                </ListItem>
                <ListItem component='a' href={"/public-courses"}>
                    <ListItemText button primary="Tous les cours" className="sidebar-item"/>
                </ListItem>
            </List>
            <div>
                <Avatar
                    sx={{ 
                        width: 56, 
                        height: 56,
                        margin: "0 auto",
                        cursor: "pointer",
                        bgcolor: "primary.main"
                    }}
                    onClick={handleMenu}
                    src={props.user.profile_picture}
                >{props.user.first_name[0] + props.user.last_name[0]}</Avatar>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component='a' href={"/profile"}>Mon profil</MenuItem>
                    <MenuItem onClick={logout}>Se déconnecter</MenuItem>
                </Menu>
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <>
            <MobileView>
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        background: "#fff",
                        display: { sm: 'none' }
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon color="primary" />
                        </IconButton>
                        <Typography variant="h6" component="div" color="secondary" sx={{ flexGrow: 1 }}>
                            Mon compte
                        </Typography>
                    </Toolbar>
                </AppBar>
            </MobileView>
            <Box
                component="nav"
                sx={{ height: '100%', width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, 
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        height: '100vh',
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    )
}

export default SidebarComponent
