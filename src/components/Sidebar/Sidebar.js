import React from 'react'
import {Link} from 'react-router-dom';
import { AppBar, Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { MobileView } from 'react-device-detect';
import { connect, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authActions";
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = ({ window, course = null, title }) => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorElUser] = React.useState(null);
    const path = useLocation().pathname
    const hash = useLocation().hash

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const drawer = (
        <div style={{
            display: "flex",
            justifyContent: "space-between", 
            flexDirection: "column",
            height: "90vh"
        }}>
            <List>
                <ListItem button  component='a' href={"/"}>
                    <Typography variant="h3"  component="h1">
                        Itihel
                    </Typography>
                </ListItem>
            </List>
            <List>
                <ListItemButton component='a' href={"/courses"} sx={{ background: path === "/courses" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Mes cours" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"/shared-courses"} sx={{ background: path === "/shared-courses" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Partagés avec moi" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"/public-courses"} sx={{ background: path === "/public-courses" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Cours publics" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
            </List>
            <Box display={"flex"} justifyContent={"center"}>
                <Tooltip title="Ouvrir les paramètres">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt={userInfo && userInfo.first_name[0] + " " + userInfo && userInfo.last_name[0]}>{userInfo && userInfo.first_name[0]}{userInfo && userInfo.last_name[0]}</Avatar>
					</IconButton>
				</Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem component={Link} to="/dashboard">
						<Typography textAlign="center">Tableau de bord</Typography>
					</MenuItem>
                    <MenuItem component={Link} to="/profile">Mon profil</MenuItem>
                    <Divider />
                    <MenuItem onClick={logout}>Se déconnecter</MenuItem>
                </Menu>
            </Box>
        </div>
    );

    const drawerCourse = (
        <div style={{
            display: "flex",
            justifyContent: "space-between", 
            flexDirection: "column",
            height: "90vh"
        }}>
            <List>
                <ListItem button  component='a' href={"/"}>
                    <Typography variant="h3"  component="h1">
                        Itihel
                    </Typography>
                </ListItem>
            </List>
            <List>
                <ListItemButton component='a' href={"#prise-de-notes"} sx={{ background: hash === "#prise-de-notes" || hash === null ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Prise de notes" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"#flip-cards"} sx={{ background: hash === "#flip-cards" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Flip cards" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
                <ListItemButton component='a' href={"#quiz"} sx={{ background: hash === "#quiz" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <ListItemText primary="Quiz" primaryTypographyProps={{fontSize: '18px'}} />
                </ListItemButton>
            </List>
            <List>
                <ListItemButton component='a' href={course ? "/courses/" + course._id + "/parameters" : null} sx={{ background: hash === "#quiz" ? "rgba(0, 0, 0, 0.04)" : "none" }}>
                    <SettingsIcon sx={{ mr: 1 }}/>
                    <ListItemText primary="Paramètres" primaryTypographyProps={{fontSize: '18px'}} />
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
                            {title}
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
                    {
                        course ? drawerCourse : drawer
                    }
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
                    {
                        course ? drawerCourse : drawer
                    }
                </Drawer>
            </Box>
        </>
    )
}

export default Sidebar;
