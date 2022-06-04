# Récupérer l'user connecté :
Le composant doit se déclarer de cette forme ci :
````
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Dashboard = ({ auth: { user } }) => {
	return (
		<>
			<h1>Hello, {user && user.first_name}</h1>
		</>
	);
};

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
````