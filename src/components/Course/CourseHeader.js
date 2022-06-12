import { Box, Chip, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const CourseHeader = ({ course }) => {
    return (
        <Box sx={{ width: 1 }} display="flex" justifyContent="space-between" >
            <Typography>
                Créé le {moment(course.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <div>
                Par @{course && course.owner_id && course.owner_id.pseudo ? course.owner_id.pseudo : ""}
                <Chip label={course.is_public ? "Public" : "Privé"} variant="outlined" color={course.is_public ? "success" : "warning"} sx={{ ml: 3 }}/>
            </div>
        </Box>
    )
}

export default CourseHeader