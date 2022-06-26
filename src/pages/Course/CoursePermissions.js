import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourse, getCourseSharedOfUserCourse } from '../../redux/actions/courseActions';

const CoursePermissions = (props) => {
    if(props.user && props.user._id) props.getCourseSharedOfUserCourse(props.user._id, props.course)

    let couldShow = false;
    if(props.userPermissions){
        couldShow = props.userPermissions.some( role =>  props.permissionRequired.includes(role['_id']) )
    }
    
    if(props.coursePublic){
        couldShow = true;
    }
    
    return couldShow ? props.children : props.errorReturn;
};

const mapStateToProps = state => ({
    userPermissions: state.course.user_roles,
    user: state.auth.user
});

export const ShowForPermission = connect(mapStateToProps, { getCourseSharedOfUserCourse })(CoursePermissions);