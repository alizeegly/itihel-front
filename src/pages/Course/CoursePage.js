import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCourse, getFlipCardsOfCourse, getRolesOfUserCourse } from '../../redux/actions/courseActions';
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
import axios from 'axios';
import { getCourses } from '../../redux/actions/listActions';

const CoursePage = (props) => {
  const { id } = props.match.params
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [course, setCourse] = useState({})
  const [userRoles, setUserRoles] = useState([])
  const [cards, setCards] = useState([])

  const getCourse = async (id) => {
    const res = await axios.get("http://localhost:8800/api/courses/find/" + id)
    setCourse(res.data)
  }

  const getUsersRole = async (user, course) => {
    const res = await axios.get("http://localhost:8800/api/courses-shared/" + user + "/" + course)
    setUserRoles(res.data)
  }

  const getCards = async (course) => {
    const res = await axios.get("http://localhost:8800/api/flip-cards/courses/" + course)
    setCards(res.data)
  }

  useEffect(() => {
    if(course && !course._id) getCourse(id)

    if(userInfo && course && course._id && userRoles && userRoles.length <= 0) getUsersRole(userInfo._id, course._id)

    if(course && course._id && cards && cards.length <= 0) getCards(course._id)

    if (!userInfo) {
      return <Redirect to="/login" />;
    }
  }, [getCourse, userInfo, getUsersRole, getCards]);
  
  return (
    <>
        <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={course && course.title} course={course && course}>
          <ShowForPermission 
            course={id} 
            permissionRequired={["618702283f5059816c261d99", "62a5dcb352fda754f6c97349"]} 
            coursePublic={course && course.is_public}
            errorReturn={Error404Page}
          >
            {/* {
              course && rolesOfUser && rolesOfUser.user_roles && cards && ( */}
                <CourseLayout course={course} roles={userRoles} cards={cards}/>
              {/* )
            }
            <p>Hey</p> */}
          </ShowForPermission>
          <ScrollToTop showUnder={160}>
            <span><img src={upArrow} style={{height: "50px", position: "relative", bottom: "50px"}}></img></span>
          </ScrollToTop>
        </LayoutSidebar>
    </>
  )
}

// const mapStateToProps = (state) => {
//   return({
//     loading: state.auth.loading || state.course.loading,
//     course: state.course.course,
//     roles: state.course.user_roles,
//     cards: state.course.flipCards
//   })
// }

export default CoursePage;