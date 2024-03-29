import { Avatar, Card, CardActions, CardContent, CardMedia, Button, IconButton, Tooltip, Typography, Chip, Stack, Fab } from '@mui/material';
import React from 'react'
import Highlighter from 'react-highlight-words';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseAction } from '../../redux/actions/listActions';

const CourseCard = ({ course, setModalData, setIsOpen, searchQuery }) => {
    const path = useLocation().pathname
    const dispatch = useDispatch();

    const courseDelete = useSelector((state) => state.courseDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = courseDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce cours ?")) {
            dispatch(deleteCourseAction(id));
        }
    };
    

    return (
        <Card sx={{ position: "relative", height: "100%" }}>
            {
                path === "/courses" && (
                    <Fab color="error" aria-label="delete" size="small" sx={{ position: "absolute", top: -5, right: -5 }} onClick={() => deleteHandler(course._id)}>
                        <DeleteRoundedIcon />
                    </Fab>
                )
            }
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
                <Stack direction="row" alignItems="center">
                    <Tooltip title="Voir le profil">
                        <IconButton onClick={()=> {
                            setModalData(course);
                            setIsOpen(true);
                        }}>
                            <Avatar sx={{textTransform: "uppercase"}}>
                                {course && course.owner_id && course.owner_id.pseudo[0]}
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                    {
                        course.is_public ? (
                            <Chip label="Public" color="success" size="small" />
                        ) : (        
                            <Chip label="Privé" color="warning" size="small" />
                        )
                    }
                </Stack>
                <Button
                    size="small" 
                    href={"/courses/" + course._id}
                    variant="outlined"
                    color='info'
                >Voir le cours</Button>
            </CardActions>
        </Card>
    )
}

export default CourseCard