import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	return(
		<Route
			{...rest}
			render={(props) =>
				!userInfo && !loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

export default ProtectedRoute;