import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import ListCourses from './ListCourses';
import PropTypes from "prop-types";
import Alert from '../../components/layout/Alert';
import { getCourseShared } from '../../actions/list';

const SharedCourses = ({ auth: { user }, list: {items} }) => {

    if(user && user._id) getCourseShared(user._id)

    return (
        <>
            <Alert/>
            <ListCourses list={items && items}/>
        </>
    )
}

SharedCourses.propTypes = {
	auth: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log(state)
    return ({
	    auth: state.auth,
        list: state.list
    })
};

export default connect(mapStateToProps)(SharedCourses);