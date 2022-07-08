import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getCourse, getFlipCardsOfCourse } from '../../redux/actions/courseActions';
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import LayoutSidebar from '../../layouts/LayoutSidebar';
import CourseLayout from './CourseLayout';
import { Redirect } from 'react-router-dom';
import { ShowForPermission } from './CoursePermissions';
import Error404Page from '../Errors/Error404Page';
import ScrollToTop from "react-scroll-up"
import upArrow from "../../assets/img/up-arrow.png"

const CoursePage = (props) => {
  const { id } = props.match.params

  useEffect(() => {
    if(!props.course._id){
      props.getCourse(id)
    }
    if(!props.cards || (props.cards && props.cards.length <= 0)){
      props.getFlipCardsOfCourse(id)
    }
  }, [props, props.course, props.roles, props.getCourse, props.cards, props.getFlipCardsOfCourse]);

  return (
    <>
        <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={props.course.title} course={props.course}>
          <ShowForPermission 
            course={id} 
            permissionRequired={["618702283f5059816c261d99", "62a5dcb352fda754f6c97349"]} 
            coursePublic={props.course.is_public}
            errorReturn={Error404Page}
          >
              <CourseLayout course={props.course} roles={props.roles} cards={props.cards}/>
          </ShowForPermission>
          <ScrollToTop showUnder={160}>
            <span><img src={upArrow} style={{height: "50px", position: "relative", bottom: "50px"}}></img></span>
          </ScrollToTop>
        </LayoutSidebar>
    </>
  )
}

const mapStateToProps = (state) => {
  return({
    user: state.auth.user,
    loading: state.auth.loading || state.course.loading,
    course: state.course.course,
    roles: state.course.user_roles,
    cards: state.course.flipCards
  })
}

export default connect(mapStateToProps, { setAlert, getCourse, getFlipCardsOfCourse })(CoursePage);