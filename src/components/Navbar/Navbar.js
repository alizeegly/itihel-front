import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import Tooltip from '@mui/material/Tooltip';

const settings = ['Profile', 'Mon compte', 'Tableau de bord', 'Se déconnecter'];

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
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
				<Button href="/dashboard" sx={{ color: "white" }}>Dashboard</Button>
				<Button onClick={logout} to="/" sx={{ color: "white" }}>Logout</Button>
			</Box>
			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
					<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
						<Avatar alt="Remy Sharp">AG</Avatar>
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
					<MenuItem onClick={handleCloseUserMenu}>
						<Typography textAlign="center">Profil</Typography>
					</MenuItem>
					<MenuItem onClick={handleCloseUserMenu}>
						<Typography textAlign="center">Mon compte</Typography>
					</MenuItem>
					<MenuItem onClick={logout}>
						<Typography textAlign="center">Se déconnecter</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</>
	);
	const guestLinks = (
		<Box sx={{ flexGrow: 1, display: "flex" }}>
			<Button href="/register" sx={{ color: "white" }}>S'inscrire</Button>
			<Button href="/login" sx={{ color: "white" }}>Se connecter</Button>
		</Box>
	);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
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
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Itihel
					</Typography>
					
					{!loading && (
						<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
