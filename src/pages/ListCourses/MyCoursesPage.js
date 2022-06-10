import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ListCourses from './ListCourses';
import { getCoursesOfUser } from '../../redux/actions/listActions';

const MyCoursesPage = (props) => {
    
    useEffect(() => {
        if (props.auth && props.auth.user && props.auth.user._id && props.list.courses.length <= 0) {
            props.getCoursesOfUser(props.auth.user._id)
        }
    }, [props, props.auth, props.getCoursesOfUser]);

    return (
        <>
            {
                props.list && props.list.courses.length > 0 && (
                    <ListCourses list={props.list} title="Mes Cours"/>
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

export default connect(mapStateToProps, {getCoursesOfUser})(MyCoursesPage);