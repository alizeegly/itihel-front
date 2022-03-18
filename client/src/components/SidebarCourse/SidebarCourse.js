import React from 'react'
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import {Link, Link as LinkS} from 'react-scroll';
import {Link as LinkR, Navigate} from 'react-router-dom';
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useSession } from 'react-use-session';
import { FiSettings } from 'react-icons/fi';
import {theme} from '../../App';


const drawerWidth = 240;

const SidebarCourseComponent = (props) => {
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
                <ListItemButton component='a' href={"/courses/" + props.course._id + "#notes"}>
                    <ListItemText primary="Prise de notes" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"/courses/" + props.course._id + "#quiz"}>
                    <ListItemText primary="Quiz" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"/courses/" + props.course._id + "#flip-cards"}>
                    <ListItemText primary="Flip cards" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
            </List>
            <List>
                <ListItem button sx={{ background: theme.palette.primary.main }} component='button'>
                    <Typography variant="h6"  component="h6">
                        Modifier
                    </Typography>
                </ListItem>
            </List>
            <List>
                <ListItemButton component='a' href={"/courses/" + props.course._id + "/parameters"}>
                    <FiSettings size="1.5em"/>
                    <ListItemText primary="Paramètres" primaryTypographyProps={{fontSize: '18px', ml: 1}} />
                </ListItemButton>
            </List>
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
                            {props.course.title}
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

export default SidebarCourseComponent
