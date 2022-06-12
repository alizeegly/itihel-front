import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getCourse, getCourseSharedOfCourse } from '../../redux/actions/courseActions';
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import LayoutSidebar from '../../layouts/LayoutSidebar';
import CourseLayout from './CourseLayout';
import { Redirect } from 'react-router-dom';
import { ShowForPermission } from './CoursePermissions';

const CoursePage = (props) => {
  const { id } = props.match.params

  useEffect(() => {
    if(!props.course._id){
      props.getCourse(id)
    }
  }, [props, props.course, props.roles, props.getCourse]);

  return (
    <>
      <ShowForPermission course={id} permissionRequired={["618702283f5059816c261d99", "62a5dcb352fda754f6c97349"]} coursePublic={props.course.is_public}>
        <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={props.course.title} course={props.course}>
          <CourseLayout course={props.course}/>
        </LayoutSidebar>
      </ShowForPermission>
    </>
  )
}

const mapStateToProps = (state) => {
  return({
    user: state.auth.user,
    loading: state.auth.loading || state.course.loading,
    course: state.course.course,
    roles: state.course.user_roles
  })
}

export default connect(mapStateToProps, { setAlert, getCourse })(CoursePage);