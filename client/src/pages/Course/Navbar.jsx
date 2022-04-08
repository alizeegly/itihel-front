import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" color="light" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }  }}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <div>
                    <Button color="inherit" href="/courses">Mes cours</Button>
                    <Button color="inherit" href="/shared-whith-me-courses">Partagés avec moi</Button>
                    <Button color="inherit" href="/public-courses">Tous les cours</Button>
                </div>
                <div>
                    {/* Mettre avatar comme sidebar  */}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle sx={{ width: 40, height: 40 }}/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profil</MenuItem>
                        <MenuItem onClick={handleClose}>Se déconnecter</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar