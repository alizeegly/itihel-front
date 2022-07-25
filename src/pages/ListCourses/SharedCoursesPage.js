import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import ListCourses from './ListCourses';
import { getCoursesShared } from '../../redux/actions/listActions';
import { Redirect } from 'react-router-dom';

const SharedCoursesPage = () => {

    const dispatch = useDispatch();

    const coursesList = useSelector((state) => state.coursesList);
    const { loading, error, courses } = coursesList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        dispatch(getCoursesShared(userInfo._id));
        if (!userInfo) {
            return <Redirect to="/login" />;
        }
    }, [getCoursesShared, userInfo]);

    return (
        <>
            <ListCourses list={courses} title="Partagés avec moi" loading={loading} error={error} />
        </>
    )
}

export default SharedCoursesPage;