import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ListCourses from './ListCourses';
import { getPublicCourses } from '../../actions/listActions';

const PublicCourses = (props) => {
    
    useEffect(() => {
        if (props.list.courses.length <= 0) {
            props.getPublicCourses()
        }
    }, [props.auth, props.getPublicCourses]);

    return (
        <>
            {
                props.list && props.list.courses.length > 0 && (
                    <ListCourses list={props.list} />
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

export default connect(mapStateToProps, {getPublicCourses})(PublicCourses);