import React from "react";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Navbar } from "../../components"

const DashboardPage = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	return (
		<>
			<Navbar color="white"/>
			<div style={{ marginTop: "5rem", textAlign: "center" }}>
				<h1>Welcome, {userInfo && userInfo.first_name}</h1>
			</div>
		</>
	);
};

export default DashboardPage;
