import { Alert, AlertTitle, Box, Chip, Grid, Typography } from '@mui/material'
import moment from 'moment'
import React from 'react'

const CourseHeader = ({ course, roles }) => {
    return (
        <Grid container spacing={2} columns={12} alignItems="center">
            <Grid item md={3}>
                <Typography>
                    Créé le {moment(course.createdAt).format('DD/MM/YYYY')}
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Alert severity="info">
                    <AlertTitle>
                        Vos rôles sur ce cours :
                    </AlertTitle>
                    <ul>
                        {
                            roles.map((role, index) => (
                                <>{role.name}{roles.length-1 != index && ', '}</>
                            ))
                        }
                    </ul>
                </Alert>
            </Grid>
            <Grid item md={3} display="flex" direction="row" justifyContent="flex-end" alignItems="center">
                Par @{course && course.owner_id && course.owner_id.pseudo ? course.owner_id.pseudo : ""}
                <Chip label={course.is_public ? "Public" : "Privé"} variant="outlined" color={course.is_public ? "success" : "warning"} sx={{ ml: 3 }}/>
            </Grid>
        </Grid>
    )
}

export default CourseHeader