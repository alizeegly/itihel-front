import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getCourse, getCourseSharedOfCourse } from '../../redux/actions/courseActions';
import { setAlert } from "../../redux/actions/alertActions";
import LayoutSidebar from '../../layouts/LayoutSidebar'
import Error404Page from '../Errors/Error404Page'
import CourseLayout from './CourseLayout'
import { ShowForPermission } from './CoursePermissions'
import { Navbar } from '../../components';
import Parameters from '../../components/Course/Parameters';

const CourseParameters = (props) => {

    const { id } = props.match.params
  
    useEffect(() => {
      if(!props.course._id){
        props.getCourse(id)
      }
    }, [props, props.course, props.roles, props.getCourse]);

    return (
        <ShowForPermission
            course={id} 
            permissionRequired={["618702283f5059816c261d99", "62a5dcb352fda754f6c97349"]} 
            coursePublic={props.course.is_public}
            errorReturn={Error404Page}
        >
            <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={props.course.title} course={props.course}>
                <Parameters/>
            </LayoutSidebar>
        </ShowForPermission>
    )
}

const mapStateToProps = (state) => {
    return({
        user: state.auth.user,
        loading: state.auth.loading || state.course.loading,
        course: state.course.course,
        roles: state.course.user_roles,
    })
}
  
export default connect(mapStateToProps, { setAlert, getCourse })(CourseParameters);
