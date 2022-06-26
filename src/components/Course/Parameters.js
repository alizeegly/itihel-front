import { Box, Button, FormControlLabel, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from 'react-modal'
import ProfileCard from '../Profile/ProfilCard';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

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
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [roles, setRoles] = useState([])
    const [course, setCourse] = useState(props.course);
    const [coursesShared, setCoursesShared] = useState(props.courses_shared);

    function closeModal() {
        setIsOpen(false)
    }

    const getRoles = async () => {
        try {
            const roles = await axios.get("/api/roles/")
            setRoles(roles.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if(roles.length <= 0){
            getRoles()
        }
    }, [roles, getRoles]);

    return (
        <>
            <Grid item sm={12}>
                <h1>Paramètres</h1>
            </Grid>
            <Grid item sm={12} md={6}>
                <Box component="form">
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
                                                            setIsOpen(true);
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
                                                            <Tooltip title={"Modifier les rôles de " + row.user_id.pseudo}>
                                                                <IconButton>
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Tooltip>
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
                                    <Tooltip title="Ajouter un utilisateur au cours">
                                        <IconButton>
                                            <AddIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
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