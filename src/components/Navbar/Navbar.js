import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/authActions";
import { AppBar, Box, Button, Container, Divider, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';

const colorGrey = grey[900]

const Navbar = ({color = "primary", styleButton = {color: colorGrey}, course = null }) => {
	
	const dispatch = useDispatch();
	
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const authLinks = (
		<>
			<Box sx={{ flexGrow: 1, display: "flex" }}>
				<Button href="/dashboard" sx={styleButton}>Tableau de bord</Button>
				<Button href="/courses" sx={styleButton}>Mes cours</Button>
				<Button href="/shared-courses" sx={styleButton}>Partagés avec moi</Button>
				<Button href="/public-courses" sx={styleButton}>Cours publics</Button>
			</Box>
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Ouvrir les paramètres">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar sx={{textTransform: "uppercase"}} alt={userInfo && userInfo.pseudo[0]}>{userInfo && userInfo.pseudo[0]}</Avatar>
					</IconButton>
				</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem component={Link}  to="/dashboard">
						<Typography textAlign="center">Tableau de bord</Typography>
					</MenuItem>
					<MenuItem component={Link} to="/profile">
						<Typography textAlign="center">Profil</Typography>
					</MenuItem>
					<Divider />
					<MenuItem onClick={logoutHandler}>
						<Typography textAlign="center">Se déconnecter</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
	const guestLinks = (
		<Box sx={{ flexGrow: 1, display: "flex" }}>
			<Button href="/register" sx={styleButton}>S'inscrire</Button>
			<Button href="/login" sx={styleButton}>Se connecter</Button>
		</Box>
	);

	return (
		<AppBar position="static" sx={{ background: color }} elevation={5}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{
						course && (
							<Typography
								variant="h4"
								noWrap
								component="a"
								href="/"
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
									fontWeight: 700,
									textDecoration: 'none',
									color: "black"
								}}
							>
								Itihel
							</Typography>
						)
					}
					
					{!loading && (
						<Fragment>{userInfo ? authLinks : guestLinks}</Fragment>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
