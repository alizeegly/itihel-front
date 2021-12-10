import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Container from '../../components/User/Container'
import CreateCourse from './CreateCourse'
import Course from '../../components/Course/course.js'
import "./courses.scss"

const Courses = () => {
    return (
        <>
            <CreateCourse/>
            <Course/>
        </>
    )
}

export default Courses