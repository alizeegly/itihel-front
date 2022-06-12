import React from 'react'
import Alert from '../../components/Alert/Alert'
import CourseHeader from '../../components/Course/CourseHeader'

const CourseLayout = ({ course, roles }) => {
    return (
        <>
            <CourseHeader course={course} roles={roles}/>
            <h1>{course.title}</h1>
            <Alert/>
        </>
    )
}

export default CourseLayout