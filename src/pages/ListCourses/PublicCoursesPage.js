import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import ListCourses from './ListCourses';
import { getPublicCourses } from '../../redux/actions/listActions';
import { Redirect } from 'react-router-dom';

const PublicCoursesPage = () => {
    
    const dispatch = useDispatch();

    const coursesList = useSelector((state) => state.coursesList);
    const { loading, error, courses } = coursesList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(() => {
        dispatch(getPublicCourses())

        if (!userInfo) {
            return <Redirect to="/login" />;
        }
    }, [getPublicCourses, userInfo]);

    return (
        <>
            <ListCourses list={courses} title="Cours Publics" loading={loading} error={error} />
        </>
    )
}

export default PublicCoursesPage;