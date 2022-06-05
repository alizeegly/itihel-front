import { Avatar, Card, CardActions, CardContent, CardMedia, Grid, Button, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react'
import Highlighter from 'react-highlight-words';

const CourseCard = ({ course, setModalData, setIsOpen, searchQuery }) => {
    return (
        <Grid item xs={12} md={4} height="450px">
            <Card sx={{ position: "relative", height: "100%" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
                    alt={course.title}
                />
                <CardContent sx={{mb: 7}}>
                    <Typography gutterBottom variant="h5" component="div">
                        <Highlighter
                            highlightStyle={{background: "yellow"}}
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={course.title}
                        />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <Highlighter
                            highlightStyle={{background: "yellow"}}
                            searchWords={[searchQuery]}
                            autoEscape={true}
                            textToHighlight={course.description.length > 250 ? course.description.substr(0, 250)+"..." : course.description}
                        />
                    </Typography>
                </CardContent>
                <CardActions sx={{ position: "absolute", bottom: 0, left: 0, display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Tooltip title="Voir le profil">
                        <IconButton onClick={()=> {
                            setModalData(course);
                            setIsOpen(true);
                        }}>
                            <Avatar>
                                {course && course.owner_id && course.owner_id.first_name[0]+course.owner_id.last_name[0]}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    <Button
                        size="small" 
                        to={"/courses/" + course._id}
                    >Voir le cours</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CourseCard