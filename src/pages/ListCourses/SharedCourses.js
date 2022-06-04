import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ListCourses from './ListCourses';
import { getCoursesShared } from '../../actions/list';

const SharedCourses = (props) => {

    useEffect(() => {
        if (props.auth && props.auth.user && props.auth.user._id && props.list.courses.length <= 0) {
            props.getCoursesShared(props.auth.user._id)
        }
    }, [props, props.auth, props.getCoursesShared]);

    return (
        <>
            {
                props.list && props.list.courses.length > 0 && (
                    <ListCourses list={props.list.courses}/>
                )
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

export default connect(mapStateToProps, {getCoursesShared})(SharedCourses);