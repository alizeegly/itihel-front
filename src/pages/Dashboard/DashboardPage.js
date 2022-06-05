import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navbar } from "../../components"

const DashboardPage = ({ auth: { user } }) => {
	console.log(user)
	return (
		<>
			<Navbar color="white"/>
			<div style={{ marginTop: "5rem", textAlign: "center" }}>
				<h1>Welcome, {user && user.first_name}</h1>
			</div>
		</>
	);
};

DashboardPage.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(DashboardPage);
