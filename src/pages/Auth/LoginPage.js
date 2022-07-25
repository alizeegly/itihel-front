import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import LayoutAuth from "../../layouts/LayoutAuth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { login } from "../../redux/actions/authActions"
import Loading from "../../components/Alert/Loading";
import { Alert } from "../../components";

const LoginPage = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	
	// Redirect if logged in
	if (userInfo) {
		return <Redirect to="/dashboard" />;
	}
	

	return (
		<LayoutAuth title="Se connecter">
			{error && <Alert variant="error">{error}</Alert>}
        	{loading && <Loading />}
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

export default LoginPage;
