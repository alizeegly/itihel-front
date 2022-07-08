import React, { useEffect } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect, useDispatch, useSelector } from 'react-redux';
import ListCourses from './ListCourses';
import { getCoursesOfUser } from '../../redux/actions/listActions';

const MyCoursesPage = () => {
    
    const dispatch = useDispatch();

    const coursesList = useSelector((state) => state.coursesList);
    const { loading, error, courses } = coursesList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        dispatch(getCoursesOfUser());
        if (!userInfo) {
            return <Redirect to="/login" />;
        }
    }, [getCoursesOfUser, userInfo]);
    
    console.log(coursesList)
    
    return (
        <>
            <ListCourses list={courses} title="Mes Cours" loading={loading}/>
        </>
    )
}

export default MyCoursesPage;