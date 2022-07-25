import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { register } from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { setAlert } from "../../redux/actions/alertActions";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import LayoutAuth from "../../layouts/LayoutAuth";
import Loading from "../../components/Alert/Loading";
import { Alert } from "../../components";

const Register = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const userLogin = useSelector((state) => state.userLogin);

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	// Redirect if logged in
	if (userLogin.userInfo) {
		return <Redirect to="/dashboard" />;
	}
	
	const submitHandler = (e) => {
		e.preventDefault();
	
		if (password !== confirmpassword) {
		  setMessage("Les mots de passe ne sont pas identiques");
		} else dispatch(register({first_name: firstName, last_name: lastName, pseudo, email, password}));
	};

	return (
		<LayoutAuth title="S'inscrire">
			{error && <Alert variant="error">{error}</Alert>}
			{message && <Alert variant="error">{message}</Alert>}
			{loading && <Loading />}
			<Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1, width: "70%" }}>
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
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
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
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
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
					value={pseudo}
					onChange={(e) => setPseudo(e.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
							value={confirmpassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
