import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/authActions";
import PropTypes from "prop-types";

const Register = ({ register, isAuthenticated }) => {
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
			console.log("Password do not match", "danger");
		} else {
			register({ first_name, last_name, pseudo, email, password });
		}
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<div className="register-form">
			<h1 className="heading">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			{/* <Alert /> */}
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Prénom"
						name="first_name"
						value={first_name}
						onChange={(e) => onChange(e)}
					/>
                    <input
						type="text"
						placeholder="Nom"
						name="last_name"
						value={last_name}
						onChange={(e) => onChange(e)}
					/>
				</div>
                <div className="form-group">
					<input
						type="text"
						placeholder="Pseudo"
						name="pseudo"
						value={pseudo}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Mot de passe"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirmation du mot de passe"
						name="password2"
						minLength="6"
						value={password2}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="S'inscrire" />
			</form>
			<p className="link">
            Déjà un compte ? <Link to="/login">Se connecter</Link>
			</p>
		</div>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);