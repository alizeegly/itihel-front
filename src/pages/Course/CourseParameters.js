import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCourse, getCourseSharedOfCourse } from '../../redux/actions/courseActions';
import { setAlert } from "../../redux/actions/alertActions";
import LayoutSidebar from '../../layouts/LayoutSidebar'
import Error404Page from '../Errors/Error404Page'
import CourseLayout from './CourseLayout'
import { ShowForPermission } from './CoursePermissions'
import { Navbar } from '../../components';
import Parameters from '../../components/Course/Parameters';
import axios from 'axios';

const CourseParameters = (props) => {

    const { id } = props.match.params
    const dispatch = useDispatch();

    const courseUpdate = useSelector((state) => state.course);
    const { loading, error } = courseUpdate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    const [course, setCourse] = useState({});

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(process.env.LINK_API + `/api/courses/find/${id}`);
            setCourse(data);
        };

        fetching();
    }, [id, setCourse]);

    return (
        <ShowForPermission
            course={id} 
            permissionRequired={["618702283f5059816c261d99", "62a5dcb352fda754f6c97349"]} 
            coursePublic={course && course.is_public}
            errorReturn={Error404Page}
        >
            <LayoutSidebar img={false} appbar={<Navbar color="white"/>} title={course && course.title} course={course}>
                <Parameters course={course} user={userInfo}/>
            </LayoutSidebar>
        </ShowForPermission>
    )
}

export default CourseParameters;
