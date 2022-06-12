import { Button, Grid } from '@mui/material'
import React from 'react'
import Alert from '../../components/Alert/Alert'
import CourseHeader from '../../components/Course/CourseHeader'
import { ShowForPermission } from './CoursePermissions'
import ReactHtmlParser from 'react-html-parser'
import { Box } from '@mui/system'

const CourseLayout = ({ course, roles }) => {
    return (
        <Grid container>
            <Grid item md={12}>
                <CourseHeader course={course} roles={roles}/>
            </Grid>
            <Grid item md={12}>
                <ShowForPermission 
                    course={course._id} 
                    permissionRequired={["618702283f5059816c261d99", "62a5e7af6cfa057af79fc341"]}
                    errorReturn={null}
                >
                    <Button variant="contained" sx={{ margin: "0 auto" }}>Modifier</Button>
                </ShowForPermission>
            </Grid>
            <Grid item md={12}>
                <h1>{course.title}</h1>
            </Grid>
            <Grid item md={12}>
                <Alert/>
            </Grid>
            <Grid item md={12} sx={{ pt: 0 }}>
                {ReactHtmlParser(course.text)}
            </Grid>
        </Grid>
    )
}

export default CourseLayout