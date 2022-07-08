import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { setAlert } from "../../redux/actions/alertActions";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LayoutAuth from "../../layouts/LayoutAuth";

const Register = () => {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		pseudo: "",
		email: "",
		password: "",
		password2: "",
	});
	
	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	
	const onSubmit = async (e) => {
		console.log(formData)
		e.preventDefault();
		if (formData.password !== formData.password2) {
			dispatch(setAlert("Les mots de passe ne sont pas identique", "error"))
		} else {
			dispatch(register(formData));
		}
	};

	// Redirect if logged in
	if (userInfo) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<LayoutAuth title="S'inscrire">
			<Box component="form" onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1, width: "70%" }}>
				<Grid container spacing={2} columns={12}>
					<Grid item xs={12} sm={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="first_name"
							label="Prénom"
							name="first_name"
							autoComplete="first_name"
							autoFocus
							value={formData.first_name}
							onChange={(e) => onChange(e)}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="last_name"
							label="Nom"
							name="last_name"
							autoComplete="last_name"
							value={formData.last_name}
							onChange={(e) => onChange(e)}
						/>
					</Grid>
				</Grid>
				<TextField
					margin="normal"
					required
					fullWidth
					id="pseudo"
					label="Pseudo"
					name="pseudo"
					autoComplete="pseudo"
					value={formData.pseudo}
					onChange={(e) => onChange(e)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					value={formData.email}
					onChange={(e) => onChange(e)}
				/>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Mot de passe"
							type="password"
							id="password"
							autoComplete="password"
							value={formData.password}
							onChange={(e) => onChange(e)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password2"
							label="Confirmation du mot de passe"
							type="password"
							id="password2"
							autoComplete="password2"
							value={formData.password2}
							onChange={(e) => onChange(e)}
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="info"
					sx={{ mt: 3, mb: 2 }}
				>
					S'inscrire
				</Button>
			</Box>
			<Typography>
				Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
			</Typography>
		</LayoutAuth>
	);
};

export default Register;
