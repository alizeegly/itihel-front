import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import ListCourses from './ListCourses';
import { getCoursesOfUser } from '../../redux/actions/listActions';

const MyCoursesPage = (props) => {
    
    // const dispatch = useDispatch();

    // const noteList = useSelector((state) => state.noteList);
    // const { loading, error, notes } = noteList;
    // useEffect(() => {
    //     if (props.auth && props.auth.user && props.auth.user._id && props.list.courses.length <= 0) {
    //         props.getCoursesOfUser(props.auth.user._id)
    //     }
    // }, [props, props.auth, props.getCoursesOfUser]);

    return (
        <>
            {/* <ListCourses list={notes} title="Mes Cours"/> */}
        </>
    )
}

const mapStateToProps  = (state) => {
    return ({
        auth: state.auth,
        // list: state.list
    })
}

export default connect(mapStateToProps, {getCoursesOfUser})(MyCoursesPage);