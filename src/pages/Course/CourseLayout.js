import React from 'react'
import Alert from '../../components/Alert/Alert'
import CourseHeader from '../../components/Course/CourseHeader'

const CourseLayout = ({ course }) => {
    return (
        <>
            <CourseHeader course={course}/>
            <h1>{course.title}</h1>
            <Alert/>
        </>
    )
}

export default CourseLayout