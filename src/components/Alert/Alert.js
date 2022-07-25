import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Alert as Alert2} from '@mui/material';

const Alert = ({ variant = "info", children }) => (
	<Alert2 severity={variant}>
		{children}
	</Alert2>
);

export default Alert;
