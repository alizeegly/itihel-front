import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { Autocomplete, Box, Button, Fab, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import { addCourse } from '../../redux/actions/courseActions';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import Checkbox from 'react-simple-checkbox'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: 35,
        width: "40%",
        zIndex: 1000
    },
    overlay: {zIndex: 1000}
};


const SharedCourse = ({ course, courseShared = {} }) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [roles, setRoles] = useState([])

    // Nouveau user
    const [user, setUser] = useState("");
    const [userRoles, setUserRoles] = useState([])

    const getRoles = async () => {
        try {
            const roles = await axios.get("http://localhost:8800/api/roles/")
            setRoles(roles.data)
        } catch (err) {
            console.error(err.message);
        }
    };

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    const handleChange = (role) => {
        setUserRoles(roles => roles.includes(role) ? roles.filter(r => r !== role) : [role, ...roles])
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(user != "" && userRoles.length > 0){
            axios.post("http://localhost:8800/api/courses-shared/", {course_id: course._id, user_id: user, roles: userRoles})
                .then((res) => {
                    console.log("ajouté")
                    // navigate("/courses/" + courseid + "/parameters")
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("here")
        }
    }

    useEffect(() => {
        if(roles.length <= 0){
            getRoles()
        }
    }, [getRoles, roles]);

    return (
        <>
            {
                courseShared && courseShared._id ? (
                    <Tooltip title={"Modifier les rôles de " + courseShared.user_id.pseudo}>
                        <IconButton onClick={openModal}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Ajouter un utilisateur au cours">
                        <IconButton onClick={openModal}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box component="form" onSubmit={submitHandler} noValidate>
                    <Typography variant="h4">Partager le cours</Typography>

                    {
                        courseShared && courseShared._id ? (
                            <Typography>{courseShared.user_id.pseudo}</Typography>
                        ) : (
                            <>
                                <Box sx={{ marginTop: 3 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="user"
                                        label="Pseudo de l'utilisateur"
                                        type="text"
                                        id="user"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        InputProps={{
                                            style: {background: "white"}
                                        }}
                                    />
                                    {
                                        roles.filter(role => role.identifiant !== "ROLE_ADMIN").map(role => (
                                            <div className="roles" key={role._id}>
                                                <Checkbox 
                                                    color="#94DDDE"
                                                    onChange={() => handleChange(role)} 
                                                    size="3"
                                                    checked={userRoles.some(item => role.name === item.name)}
                                                    id={role.id}
                                                    className="role-checkbox"
                                                />
                                                <label htmlFor={role.id}>{role.name}</label>
                                            </div>
                                        ))
                                    }
                                </Box>
                            </>
                        )
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="info"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ajouter
                    </Button>
                </Box>
            </Modal>
        </>
    )
}

export default SharedCourse;