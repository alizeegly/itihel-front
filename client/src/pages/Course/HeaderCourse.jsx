import { Grid, Typography, Chip } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import moment from 'moment'

const HeaderCourse = (props) => {
    return (
        <>
            <img src="https://iris2.gettimely.com/images/default-cover-image.jpg" style={{ width: "100%", height: "200px" }} alt="Profil"/>
            <Grid
                container
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                sx={{ mb: 2, mt: 3, px: { xs: 0, md: 7 } }}
            >
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Typography>
                        Modifié le {moment(props.course.updatedAt).format('DD/MM/YYYY, hh:mm a')}
                    </Typography>
                    <div>
                        By @{props.course && props.course.owner_id && props.course.owner_id.pseudo ? props.course.owner_id.pseudo : ""}
                        <Chip label={props.course.is_public ? "Public" : "Privé"} variant="outlined" color="secondary" sx={{ ml: 3 }}/>
                    </div>
                </Box>
            </Grid>
        </>
    )
}

export default HeaderCourse