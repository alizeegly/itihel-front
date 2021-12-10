import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <p><Link to="/">Go Home</Link></p>
    <p><Link to="/login">Go Login</Link></p>
    <p><Link to="/sign-up">Go Create an account</Link></p>
  </div>
);

export default NotFound;