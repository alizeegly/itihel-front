import { Box, Button, FormControlLabel, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import ProfileCard from '../Profile/ProfilCard';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import SharedCourse from '../Modal/SharedCourse';
import { getCourseSharedOfCourse, updateCourse } from '../../redux/actions/courseActions';
import { useDispatch, useSelector } from 'react-redux';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 35,
        width: "375px",
        zIndex: 1000
    },
    overlay: {zIndex: 1000}
};

const Parameters = (props) => {
    // const { id } = props.match.params
    const [modalProfileIsOpen, setProfileIsOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [userRoles, setUserRoles] = useState([])
    const [course, setCourse] = useState(props.course);
    const [coursesShared, setCoursesShared] = useState([]);
    const [title, setTitle] = useState(props.course.title)
    const [description, setDescription] = useState(props.course.description)
    const [isPublic, setIsPublic] = useState(props.course.is_public)
    
    const dispatch = useDispatch();

    const courseShared = useSelector((state) => state.courseShared);

    function closeProfileModal() {
        setProfileIsOpen(false)
    }

    const getUsersRole = async (user, course) => {
        const res = await axios.get(process.env.LINK_API + "/api/courses-shared/" + user + "/" + course)
        setUserRoles(res.data)
    }

    const getCourseSharedOfCourse = async (course) => {
        const res = await axios.get(process.env.LINK_API + "/api/courses-shared/course/" + course)
        setCoursesShared(res.data)
    }

    const updateHandler = (e) => {
        e.preventDefault();

        dispatch(updateCourse(course));
    };

    useEffect(() => {

        if(coursesShared.length <= 0){
            getCourseSharedOfCourse(props.course._id)
        }

        if(props.user && course && course._id && userRoles && userRoles.length <= 0) getUsersRole(props.user._id, course._id)
    }, [userRoles, getUsersRole, course, props, props.user, getCourseSharedOfCourse]);

    return (
        <>
            <Grid item sm={12}>
                <h1>Paramètres</h1>
            </Grid>
            <Grid item sm={12} md={6}>
                <Box component="form" onSubmit={updateHandler}>
                    <Grid item sm={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="title"
                            label="Titre"
                            type="text"
                            id="title"
                            multiline
                            autoComplete="current-password"
                            value={course.title}
                            onChange={(e) => setCourse({
                                ...course,
                                title: e.target.value
                            })}
                            InputProps={{
                                style: {background: "white"}
                            }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            type="description"
                            id="description"
                            multiline
                            value={course.description}
                            onChange={(e) => setCourse({
                                ...course,
                                description: e.target.value
                            })}
                            InputProps={{
                                style: {background: "white"}
                            }}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <FormControlLabel 
                            control={
                                <Switch
                                checked={course.is_public}
                                onChange={(e) => setCourse({
                                    ...course,
                                    is_public: e.target.value
                                })}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } 
                            label="Mettre le cours en public" 
                            labelPlacement="start"
                            sx={{ ml: 0 }}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="info"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Modifier
                    </Button>
                </Box>
            </Grid>
            <Grid item sm={12} md={6}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell width="100px" sx={{ fontWeight: "bold" }}>Utilisateurs</TableCell>
                                <TableCell align="center" width="100px" sx={{ fontWeight: "bold" }}>Roles</TableCell>
                                <TableCell align="center" width="100px" sx={{ fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                coursesShared.length > 0 && coursesShared.map((row) => {
                                    return(
                                        <TableRow
                                            key={row.user_id && row.user_id.pseudo}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" width="100px">
                                                <Tooltip title="Voir le profil">
                                                    <Link
                                                        onClick={()=> {
                                                            setModalData(row);
                                                            setProfileIsOpen(true);
                                                        }}
                                                        underline="hover"
                                                        sx={{ cursor: "pointer" }}
                                                    >
                                                        @{row.user_id && row.user_id.pseudo}
                                                    </Link>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell align="center" width="100px" sx={{ padding: 0 }}>
                                                <List disablePadding>
                                                    {
                                                        row.roles.sort((a, b) => a.name > b.name ? 1 : -1).map((role, index) => {
                                                            return(
                                                                <ListItem disablePadding key={index}>
                                                                    <ListItemText primary={role.name} />
                                                                </ListItem>
                                                            )
                                                        })
                                                    }
                                                </List>
                                            </TableCell>
                                            <TableCell align="center" width="100px" sx={{ padding: 0 }}>
                                                {
                                                    props.user.pseudo !== row.user_id.pseudo && (
                                                        <>
                                                            {/* <SharedCourse course={course} courseShared={row}/> */}
                                                            <Tooltip title={"Ne plus partager le cours avec " + row.user_id.pseudo}>
                                                                <IconButton>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </>
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" colSpan={3}>
                                    <SharedCourse course={course}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    isOpen={modalProfileIsOpen}
                    onRequestClose={closeProfileModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ProfileCard user={modalData && modalData.user_id ? modalData.user_id : null}/>
                </Modal>
            </Grid>
        </>
    )
}

export default Parameters