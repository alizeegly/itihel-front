import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../../components/layout/Alert";
import { setAlert } from "../../actions/alert";
import { Box, Button, Grid, TextField } from "@mui/material";
import LayoutAuth from "./LayoutAuth";

const Register = ({ setAlert, register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		pseudo: "",
		email: "",
		password: "",
		password2: "",
	});

	const { first_name, last_name, pseudo, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		console.log("Form data", e);
		e.preventDefault();
		if (password !== password2) {
			setAlert("Password do not match", "danger");
		} else {
			register({ first_name, last_name, pseudo, email, password });
		}
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<LayoutAuth title="S'inscrire">
			<Box component="form" onSubmit={(e) => onSubmit(e)} noValidate sx={{ mt: 1 }}>
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
							value={first_name}
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
							autoFocus
							value={last_name}
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
					autoFocus
					value={pseudo}
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
					autoFocus
					value={email}
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
							value={password}
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
							value={password2}
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
		</LayoutAuth>
		// <div className="register-form">
		// 	<h1 className="heading">Sign Up</h1>
		// 	<p className="lead">
		// 		<i className="fas fa-user"></i> Create Your Account
		// 	</p>
		// 	<Alert />
		// 	<br />
		// 	<form className="form" onSubmit={(e) => onSubmit(e)}>
		// 		<div className="form-group">
		// 			<input
		// 				type="text"
		// 				placeholder="Name"
		// 				name="name"
		// 				value={name}
		// 				onChange={(e) => onChange(e)}
		// 			/>
		// 		</div>
		// 		<div className="form-group">
		// 			<input
		// 				type="email"
		// 				placeholder="Email Address"
		// 				name="email"
		// 				value={email}
		// 				onChange={(e) => onChange(e)}
		// 			/>
		// 		</div>
		// 		<div className="form-group">
		// 			<input
		// 				type="password"
		// 				placeholder="Password"
		// 				name="password"
		// 				minLength="6"
		// 				value={password}
		// 				onChange={(e) => onChange(e)}
		// 			/>
		// 		</div>
		// 		<div className="form-group">
		// 			<input
		// 				type="password"
		// 				placeholder="Confirm Password"
		// 				name="password2"
		// 				minLength="6"
		// 				value={password2}
		// 				onChange={(e) => onChange(e)}
		// 			/>
		// 		</div>
		// 		<input type="submit" className="btn btn-primary" value="Register" />
		// 	</form>
		// 	<p className="link">
		// 		Already have an account? <Link to="/login">Sign In</Link>
		// 	</p>
		// </div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
