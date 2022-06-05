import React, { useState } from 'react'
import Modal from 'react-modal'
import { Box, Button, Fab, TextField, Tooltip, Typography } from '@mui/material'
import Alert from '../../components/Alert/Alert';
import { setAlert } from "../../redux/actions/alertActions";
import { addCourse } from '../../redux/actions/courseActions';
import { connect } from 'react-redux';
import AddIcon from "@mui/icons-material/Add";

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


const CreateCourse = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [course, setCourse] = useState({
        title: "",
        text: "",
        isPublic: false,
        owner_id: props.auth && props.auth.user && props.auth.user._id ? props.auth.user._id : "",
        profile_picture: "",
        categories: [],
        description: ""
    })

    function closeModal() {
        setIsOpen(false)
    }
    function openModal() {
        setIsOpen(true)
    }

    
    const onChange = (e) =>
        setCourse({ ...course, [e.target.name]: e.target.value });
    
    const onSubmit = async (e) => {
        e.preventDefault();
        props.addCourse(course);
        console.log("Course", course);
    };

    return (
        <>
            <Tooltip title="Créer un cours">
                <Fab
                    sx={{
                        position: "fixed",
                        bottom: (theme) => theme.spacing(4),
                        right: (theme) => theme.spacing(4)
                    }}
                    color="primary"
                    onClick={openModal}
                >
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <Box component="form" onSubmit={(e) => onSubmit(e)} noValidate>
                    <Typography variant="h4">Créer un cours</Typography>
                    <Alert/>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="title"
                        label="Titre"
                        type="text"
                        id="title"
                        multiline
                        autoComplete="current-password"
                        value={course.title}
                        onChange={(e) => onChange(e)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Description"
                        type="description"
                        id="description"
                        multiline
                        value={course.description}
                        onChange={(e) => onChange(e)}
                    />
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

const mapStateToProps  = (state) => {
    return ({
        auth: state.auth
    })
}
  
export default connect(mapStateToProps, { setAlert, addCourse })(CreateCourse);