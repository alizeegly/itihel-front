import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import ListCourses from './ListCourses';
import PropTypes from "prop-types";
import Alert from '../../components/layout/Alert';
import { getCourseOfUser } from '../../actions/list';

const MyCourses = ({ auth: {user}, list: {items} }) => {
    console.log(items)
    return (
        <>
            <Alert/>
            {
                items && items.length > 0 ? (
                    <ListCourses />
                ) : "pas de cours"
            }
        </>
    )
}

MyCourses.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    console.log(state)
    return ({
	    auth: state.auth, 
        list: state.list
    })
};

export default connect(mapStateToProps, {getCourseOfUser})(MyCourses);