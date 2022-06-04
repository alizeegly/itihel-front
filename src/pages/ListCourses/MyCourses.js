import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import ListCourses from './ListCourses';
import PropTypes from "prop-types";
import Alert from '../../components/layout/Alert';
import { setCourses, getCourseOfUser } from '../../actions/list';
import axios from 'axios';

const MyCourses = (props) => {
    const dispatch = useDispatch();

    // const fetchProducts = async (id) => {
    //     const response = await axios
    //     .get(`http://localhost:8800/api/users/${id}/courses`)
    //     .catch((err) => {
    //         console.log("Err: ", err);
    //     });
    //     dispatch(setCourses(response.data));
    // };
    
    useEffect(() => {
        if (props.auth && props.auth.user && props.auth.user._id) {
            // fetchProducts(props.auth.user._id)
            props.getCourseOfUser(props.auth.user._id)
        }
    }, [props.auth, props.getCourseOfUser]);

    return (
        <>
            {
                props.list && props.list.courses.length > 0 && (<ListCourses list={props.list.courses}/>)
            }
        </>
    )
}

const mapStateToProps  = (state) => {
    return ({
        auth: state.auth,
        list: state.list
    })
}

export default connect(mapStateToProps, {getCourseOfUser})(MyCourses);