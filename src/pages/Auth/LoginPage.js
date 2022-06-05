import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";
import LayoutAuth from "./LayoutAuth";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginPage = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<LayoutAuth title="Se connecter">
			<Box component="form" onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Adresse mail"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={(e) => onChange(e)}
					value={email}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					name="password"
					label="Mot de passe"
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => onChange(e)}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="info"
					sx={{ mt: 3, mb: 2 }}
				>
					Se connecter
				</Button>
			</Box>
			<Typography>
				Pas encore de compte ? <Link to="/register">S'inscrire</Link>
			</Typography>
		</LayoutAuth>
	);
};

LoginPage.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);
